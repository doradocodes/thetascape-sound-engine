import Song from "../Song";
import Instrument from "../Instrument";

export default class ThetaSong extends Song {

    constructor(tone, id) {

        super(tone, id, Song.NAME_THETA);

        //BACKGROUND LOOP
        //14m
        const thetaBgLoop = new Instrument("thetaBgLoop", {"C3": "theta/t_bg_loop_H5.mp3"}, Instrument.TYPE_BG_LOOP );
        thetaBgLoop.notes = [
            { time: "0", pitch: "C3"},
        ];
        thetaBgLoop.loopLength = "10m";
        thetaBgLoop.loopTotal = -1;
        thetaBgLoop.db = -8; 
        this.instruments.push(thetaBgLoop);

        //8m
        const thetaBass = new Instrument("thetaBass", {"C3": "theta/t_bass_note_H5.mp3"}, Instrument.TYPE_STANDARD );
        thetaBass.notes = [
            { time: "0", pitch: "F2"},
            { time: "6m", pitch: "G2"},
            { time: "12m", pitch: "C3"}
        ];
        thetaBass.loopLength = "18m";
        thetaBass.loopTotal = 1;
        thetaBass.velocityRange = 0.2;
        thetaBass.skipChance = 0.05;
        thetaBass.noteChance = 0.1;
        thetaBass.db = 0;
        this.instruments.push(thetaBass);



        const thetaChimesNote = new Instrument("thetaChimesNote", {"C3": "theta/t_chimes_note_H5.mp3"}, Instrument.TYPE_STANDARD );
        thetaChimesNote.notes = [
            { time: "0:0:0", pitch: "C2"},
            { time: "1:0:0", pitch: "F2"},
            { time: "2:2:0", pitch: "G2"},
            { time: "3:2:0", pitch: "F2"},
        ];
        thetaChimesNote.loopLength = "5m";
        thetaChimesNote.loopTotal = 1;
        thetaChimesNote.timingRange = 0.2;
        thetaChimesNote.velocityRange = 0.5;
        thetaChimesNote.skipChance = 0.23;
        thetaChimesNote.noteChance = 0.25;
        thetaChimesNote.db = 4;
        this.instruments.push(thetaChimesNote);



        const thetaBellNote = new Instrument("thetaBellNote", {"C3": "theta/t_bell_note_H5.mp3"}, Instrument.TYPE_STANDARD );
        thetaBellNote.notes = [
            { time: "0", pitch: "G2"},
            { time: "4m", pitch: "G3"}
            
        ];
        thetaBellNote.loopLength = "8m";
        thetaBellNote.loopTotal = 1;
        thetaBellNote.timingRange = 0.3;
        thetaBellNote.velocityRange = 0.3;
        thetaBellNote.skipChance = 0.2;
        thetaBellNote.noteChance = 0.5;
        thetaBellNote.db = -19;
        this.instruments.push(thetaBellNote);
    
    }
}