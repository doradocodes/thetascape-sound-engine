import Instrument from './Instrument';

export default class Song {

    static NAME_INTRO = "Intro";
    static NAME_DELTA = "Delta";
    static NAME_THETA = "Theta";
    static NAME_ALPHA = "Alpha";
    static NAME_BETA = "Beta";
    static NAME_GAMMA = "Gamma";

    constructor(tone, id, name) {

        //capture vars
        this.tone = tone;
        this.id = id;
        this.name = name;

        this.buffers = null; //will be populated by subclass

        //init instruments array to be populated by subclass
        this.instruments = [];
    }

    async load() {

        if (this.buffers) {
            console.log("Song: Load already complete");
            return true; // already loaded
        }

        console.log("Song: Load URLs from", this.instruments.length, "instruments");

        // PREP URLs: Build full URLs from each Instrument's fileNames
        const fullSoundURLs = {};


        this.instruments.forEach(instrument => {
            // sampleMap is an object like: { C0: "beta/b_beat_1.mp3", C1: "beta/b_beat_2.mp3", ... }
            const sampleMap = instrument.sampleMap;

            // Loop through each note/file pair in the sampleMap
            Object.entries(sampleMap).forEach(([note, filePath]) => {
                // Construct a unique key using the instrument name and note
                // (e.g., "betaBeats_C0", "betaBeats_C1", etc.)
                const uniqueKey = `${instrument.name}_${note}`;

                // Build the full URL from your /sounds folder
                const url = `./dist/sounds/${filePath}`;

                fullSoundURLs[uniqueKey] = url;
            });
        });

        // LOAD BUFFERS: create Tone.Buffers instance
        this.buffers = new this.tone.Buffers(fullSoundURLs);

        // LOAD SUCCESS?
        try {
            // Wait until all buffers are loaded
            await this.tone.loaded();

            // Assign each loaded buffer to its corresponding Instrument

            //multiple file assignments
            this.instruments.forEach(instrument => {

                //get keys from buffers
                const bufferKeys = Array.from(this.buffers._buffers.keys());
                //console.log("this.buffers._buffers keys:", bufferKeys);

                const noteBufferPairs = bufferKeys
                    .filter(key => key.startsWith(instrument.name + "_")) // "betaBeats_C0", "betaBeats_C1", etc.
                    .map(key => {
                        // For a key like "betaBeats_C0", split out just "C0"
                        const note = key.substring(instrument.name.length + 1);
                        return {
                            note,
                            buffer: this.buffers.get(key) // A ToneAudioBuffer
                        };
                    });

                //console.log(`Matching note-buffer pairs for "${instrument.name}":`, noteBufferPairs);

                // Pass the array of { note, buffer } objects to the instrument.
                instrument.updateBuffers(noteBufferPairs);
            });

            console.log("Song: Load complete:", this.instruments.length, "instruments");

            return true; // signal successful load
        } catch (error) {
            console.error("Song: Error loading buffers:", error);
            return false; // signal error during loading
        }
    }

    //GETTERS FOR SONG PARTS
    //get full set of instruments by type
    //get random instrument of type

    getInstrumentByName(name) {
        return this.instruments.find(instrument => {
            if (instrument.name === name) {
                return true;
            }
            return false;
        });
    }
    getBackgroundLoop() {
        return this.instruments.filter(instrument => instrument.type === Instrument.TYPE_BG_LOOP)[0]; //only one bg loop per song
    }
    getInstruments() {
        return this.instruments.filter(instrument => instrument.type === Instrument.TYPE_STANDARD);
    }
    getRandomInstrument() {
        const instruments = this.getInstruments();
        return instruments[Math.floor(Math.random() * instruments.length)];
    }
}