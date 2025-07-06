import Song from "../Song";
import Instrument from "../Instrument";

export default class DeltaSong extends Song {

    constructor(tone, id) {

        super(tone, id, Song.NAME_DELTA);

        //BACKGROUND LOOP
        //29m
        const deltaBgLoop = new Instrument("deltaBgLoop", {"C3": "delta/d_bg_loop_H5.mp3"}, Instrument.TYPE_BG_LOOP );
        deltaBgLoop.notes = [
            { time: "0", pitch: "C3"},
        ];
        deltaBgLoop.loopLength = "11m"; 
        deltaBgLoop.loopTotal = -1;
        deltaBgLoop.db = -7; 
        this.instruments.push(deltaBgLoop);

        const deltaPad = new Instrument("deltaPad", {"C3": "delta/d_pad_H5.mp3"}, Instrument.TYPE_STANDARD );
        deltaPad.notes = [
            { time: "0", pitch: "G3", velocity: 0.8},
            { time: "7m", pitch: "A3", velocity: 0.8},
            { time: "14m", pitch: "G3", velocity: 0.8},
            { time: "21m", pitch: ["G3", "C4"], velocity: 0.6},
          
        ];
        deltaPad.loopLength = "28m";
        deltaPad.loopTotal = 1;
        deltaPad.velocityRange = 0.1;
        deltaPad.db = 4;
        this.instruments.push(deltaPad);
      
        //NOTES

        const deltaSubBassNote = new Instrument("deltaSubBassNote", {"C3": "delta/d_sub_bass_note_H5.mp3"}, Instrument.TYPE_STANDARD );
        deltaSubBassNote.notes = [
            { time: "0", pitch: "G3", velocity: 0.5},
            { time: "6m", pitch: "A3", velocity: 0.5},
            { time: "12m", pitch: "C3", velocity: 0.6},
        ];
        deltaSubBassNote.loopLength = "16m";
        deltaSubBassNote.loopTotal = 1;
        deltaSubBassNote.velocityRange = 0.3;
        deltaSubBassNote.noteChance = 0.5;
        deltaSubBassNote.skipChance = 0.3;
        deltaSubBassNote.db = -10;
        this.instruments.push(deltaSubBassNote);

     
        const deltaAmbientTinesNote = new Instrument("deltaAmbientTinesNote", {"C3": "delta/d_ambient_tines_H5.mp3"}, Instrument.TYPE_STANDARD );
        deltaAmbientTinesNote.notes = [
            { time: "0", pitch: "C3", velocity: 0.2},
            { time: "5m", pitch: "C2", velocity: 0.65},
          
        ];
        deltaAmbientTinesNote.loopLength = "15m";
        deltaAmbientTinesNote.loopTotal = 1;
        deltaAmbientTinesNote.velocityRange = 0.4;
  
        deltaAmbientTinesNote.skipChance = 0.5;
        deltaAmbientTinesNote.db = 0;
        this.instruments.push(deltaAmbientTinesNote);

        

    }
}