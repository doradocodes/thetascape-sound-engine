import Instrument from "../Songs/Instrument";

export default class Player {

    constructor(
        tone,
        id,
        mainOutput,
        onComplete
    ) {

        //store tone
        this.tone = tone;

        //store id for console logging
        this.id = id;

        this.mainOutput = mainOutput;

        //callback to parent when playback is complete
        this.onComplete = onComplete;

        //is their any data loaded in? what is its name?
        this.instrumentName = null;

        //track type for onComplete
        this.instrumentType = null;

        //Tone.Samplers need a test file to get started
        const testTone = `dist/sounds/global/z_test_tone.mp3`;

        this.player = new this.tone.Sampler({
            urls: {
                "C1": testTone,
                "C2": testTone,
                "C3": testTone,
                "C4": testTone,
                "C5": testTone,
                "C6": testTone,
                "C7": testTone,
                "C8": testTone
            },
            attack: 0.0
        });
        this.player.connect(mainOutput);

        // Bind stop method so that "this" always refers to the NotePlayer instance
        this.stop = this.stop.bind(this);

        //init a blank part
        this.part = null

        //scheduler IDS
        this.onCompleteID = null;

        // Calculate the duration (in seconds) of a sixteenth note for random shifts in loops
        this.sixteenthSeconds = this.tone.Time("16n").toSeconds();


    }



    //PLAYBACK
    playInstrument(instrument) {

        if (this._checkInstrumentName(instrument.name)) {
            console.log("");
            console.log("//////////////////////////////")
            console.log("PLYR", this.id, "Queued to play", instrument.name);
        } else {
            return;
        }

        //save type
        this.instrumentType = instrument.type;

        //LOADING
        //console.log("PLYR", this.id, ": Load buffer", instrument.buffer);
        const bufferLoaded = this._loadBuffers(instrument.buffers);
        if (!bufferLoaded) {
            console.warn("PLYR", this.id, ": Error loading buffer.");
            return;
        }

        //EXTRACT DATA
        const notes = instrument.notes;
        const loopLength = instrument.loopLength;
        const loopTotal = instrument.loopTotal;
        let timeRange = instrument.timingRange;
        if (!timeRange) { timeRange = 0; }
        let velocityRange = instrument.velocityRange;
        if (!velocityRange) { velocityRange = 0; }
        let skipChance = instrument.skipChance;
        if (!skipChance) { skipChance = 0; }
        let noteChance = instrument.noteChance;
        if (!noteChance) { noteChance = 0; }
        const db = instrument.db;

        // console.log(
        //     "NotePlayer", this.id, ": Play:",
        //     notes,
        //     "loop<->", loopLength,
        //     "time<->", timeRange,
        //     "velo<->", velocityRange,
        //     "skip%", skipChance,
        //     "note%", noteChance,
        // );

        //set volume smoothly
        if (instrument.type === Instrument.TYPE_BG_LOOP) {
            this.player.volume.rampTo(db, 10); //fade to other bg loop volumes slowly (10 sec)
        } else {
            this.player.volume.rampTo(db, 3); //fade to all other sounds quicker
        }

        // Dispose of any existing part to avoid overlapping schedules
        if (this.part) { this.part.dispose(); }

        //TONE.PART
        // Create a new Tone.Part with the passed in note events
        this.part = new this.tone.Part((time, scheduledNote) => {

            // Clone pitch and velocity to start with what's already scheduled
            let pitch = scheduledNote.pitch;
            let noteVelocity = scheduledNote.velocity || 1.0;

            // If noteChance passes, pick a completely different note (with pitch + velocity)
            if (noteChance > 0 && notes.length > 0 && Math.random() < noteChance) {
                const randomNote = notes[Math.floor(Math.random() * notes.length)];
                pitch = randomNote.pitch;
                noteVelocity = randomNote.velocity || 1.0;
            }

            // === Velocity Randomization with Skip Chance ===
            if (Math.random() < skipChance) {
                noteVelocity = 0;
            } else if (velocityRange !== 0) {
                const velocityChange = Math.random() * velocityRange + (1 - velocityRange);
                noteVelocity *= velocityChange;
            }

            // === Time Shift ===
            let finalTime = time;
            if (timeRange !== 0) {
                const randomShift = (Math.random() * (timeRange * 2) - timeRange) * this.sixteenthSeconds;
                finalTime = Math.max(time + randomShift, 0);
            }

            // === Trigger Note ===
            if (noteVelocity === 0) {
                console.log("---------------- PLYR", this.id, this.instrumentName, "SKIPPED");
            } else {
                console.log("++++++++++++++++ PLYR", this.id, this.instrumentName, "note at", finalTime, "w/pitch", pitch, "& velo", noteVelocity);
                this.player.triggerAttack(pitch, finalTime, noteVelocity);
            }

        }, notes);


        // LOOPING
        //if loop total is -1, loop forever
        //if loop total is 0, play once
        //if loop total is more than 1, play X times

        //if loop is 0, error
        if (loopTotal === 0) {
            console.error("PLYR", this.id, this.instrumentName, ": Error: loopTotal is 0. This will not play. Use -1 to loop forever, 1 for single play, and 2 and above for multiple plays.");
            return;
        } else if (loopTotal === -1 || loopTotal > 1) {
            this.part.loop = true;
            this.part.loopEnd = loopLength;
        } //else if loopTotal = 1, play once and call onComplete

        // extract first note from notes
        const note = notes[0];
        const noteStartTime = this.tone.Time(note.time).toSeconds();
        const defaultDelay = 2.4 //1 measure added to all incoming parts
        const partStartTime = this.tone.now() + noteStartTime + defaultDelay;

        //ON LOOP COMPLETE
        //code for single play, X times play, but not infinite play (loopTotal = -1)
        if (loopTotal > 0) {
            //how long is this sample?
            const sampleDuration = this.tone.Time(loopLength).toSeconds();

            //was attemping to create an accurate loop, but easier to use Tone Part scheduling
            //time shift for queuing next sample
            //subtract 2.4 for the 1 measure delay
            //subtract 1.0 for the lookahead time
            // 2.4 for 1 measure, 1.0 for the lookahead time, and XXX for the extra tweak
            //const timeShiftForNextSample = 2.4 + 1.0 + 0.195; //0.095; //short 4m bar

            //schedule the onComplete callback at the end of the sample playback
            const onCompleteTime = partStartTime + sampleDuration; // - timeShiftForNextSample;

            this.onCompleteID = this.tone.getTransport().scheduleOnce((time) => {

                //this.part.stop(time); //needed?
                console.log("PLYR ---------------->>>> ", this.id, this.instrumentName, "onComplete at", time);
                if (this.onComplete) this.onComplete(this.instrumentName);

            }, onCompleteTime);
        }

        //START PART SEQUENCER
        this.part.start(partStartTime);


        // Ensure the Transport is running.
        if (this.tone.getTransport().state !== "started") {
            console.log("PLYR", this.id, ": Transport not started, starting now.");
            this.tone.getTransport().start();
        } else {
            //console.log("PLYR", this.id, ": Transport already started.");
        }
    }

    stop() {

        // Stop the part only if it valid and has been started
        if (this.part) { this.part.stop(); }

        //stop onComplete callback
        this.tone.getTransport().clear(this.onCompleteID);
        this.onCompleteID = null;

        //clear var that instruments if this player has content
        this.instrumentName = null;
        this.instrumentType = null;
    }

    getInstrumentName() {
        return this.instrumentName;
    }
    resetInstrument() {
        this.instrumentName = null;
        this.instrumentType = null;
    }

    //SUBS
    _checkInstrumentName(instrumentName) {
        if (this.instrumentName) {
            console.warn("PLYR", this.id, ": Already playing", this.instrumentName);
            return false;
        } else {
            //activate
            this.instrumentName = instrumentName;
            //console.log("PLYR", this.id, ": Play:", instrumentName);
            return true;
        }
    }

    //load a new audio file buffers into the player's note slots
    _loadBuffers(newBuffers) {
        try {
            // Ensure player exists
            if (!this.player) {
                console.error("PLYR: this.player is not initialized");
                return false;
            }

            // Ensure newBuffers is defined; if not, return false
            if (!newBuffers) {
                console.warn("PLYR: _loadBuffers: newBuffers is not defined.");
                return false;
            }

            // If there is only one buffer, map it only to its designated note.
            if (newBuffers.length === 1) {

                // Expecting an object like { note: "C3", buffer: ToneAudioBuffer }
                const singleEntry = newBuffers[0];

                // Extract the note and raw audio buffer.
                const note = singleEntry.note;
                const rawBuffer = singleEntry.buffer ? singleEntry.buffer._buffer : singleEntry._buffer;

                if (!rawBuffer || !note) {
                    console.warn("PLYR: _loadBuffers: The single entry is missing a note or buffer.", singleEntry);
                    return false;
                }

                // Clear out any previous multi-sample mappings.
                this.player._buffers._buffers.clear();

                // Map the single sample only to its designated note.
                //console.log("Setting note", note, "to buffer", rawBuffer);
                this.player.add(note, rawBuffer);

                return true;
            }
            // If there are multiple entries
            else {
                // Expect an array of objects like: [{ note: "C0", buffer: ToneAudioBuffer }, …]
                newBuffers.forEach(entry => {
                    // Extract the note and buffer from each entry
                    const note = entry.note;
                    const toneBuffer = entry.buffer;

                    if (!note || !toneBuffer || !toneBuffer._buffer) {
                        console.warn("PLYR: _loadBuffers: Missing note or buffer in entry:", entry);
                        return;
                    }

                    // Assign this buffer to the specified note
                    this.player.add(note, toneBuffer._buffer);
                });

                //console.log("PLYR: Multiple buffers updated using custom note mappings.");
                return true;
            }
        } catch (error) {
            console.error("PLYR: Error updating buffers in _loadBuffers:", error);
            return false;
        }
    }
}