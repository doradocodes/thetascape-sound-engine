import Song from "../Song";
import Instrument from "../Instrument";

export default class BetaSong extends Song {

    constructor(tone, id) {

        super(tone, id, Song.NAME_BETA);


        const betaBass = new Instrument("betaBass", {"C3": "beta/b_bass_H5.mp3"}, Instrument.TYPE_BG_LOOP);
        betaBass.notes = [
            { time: "0", pitch: "C3" },
        ];
        betaBass.loopLength = "11m";
        betaBass.loopTotal = -1; 
        betaBass.db = -2;
        this.instruments.push(betaBass);

        
        //BELLS ARP
        const betaBellsArp = new Instrument("betaBellsArp", {"C3": "beta/b_bells_arp_H5.mp3"}, Instrument.TYPE_STANDARD );
        betaBellsArp.notes = [
            { time: "0", pitch: "C3"},
        ];
        betaBellsArp.loopLength = "16m";
        betaBellsArp.loopTotal = 1;
        betaBellsArp.db = -3;
        this.instruments.push(betaBellsArp);

        

        //11m
        const betaBellsBg = new Instrument("betaBellsBg", {"C3": "beta/b_bells_bg_H5.mp3"}, Instrument.TYPE_STANDARD );
        betaBellsBg.notes = [
            { time: "0", pitch: "C3"},
        ];
        betaBellsBg.loopLength = "10m";
        betaBellsBg.loopTotal = 1;
        betaBellsBg.velocityRange = 0.3
        betaBellsBg.db = -10;
        this.instruments.push(betaBellsBg);

       

        //8m
        const betaDreamPad = new Instrument("betaDreamPad", {"C3": "beta/b_dream_pad_H5.mp3"}, Instrument.TYPE_STANDARD );
        betaDreamPad.notes = [
            { time: "0", pitch: "G3"},
            { time: "3m", pitch: "G2"},
        ];
        betaDreamPad.loopLength = "14m";
        betaDreamPad.loopTotal = 1;
        betaDreamPad.velocityRange = 0.5
        //betaDreamPad.noteChance = 0.5
        betaDreamPad.skipChance = 0.4;
        betaDreamPad.db = -17;
        this.instruments.push(betaDreamPad);

        

        //7m
        const betaDriftBg = new Instrument("betaDriftBg", {"C3": "beta/b_drift_bg_H5.mp3"}, Instrument.TYPE_STANDARD );
        betaDriftBg.notes = [
            { time: "0", pitch: "C2", velocity: 0.55},
            { time: "4m", pitch: "C4", velocity: 0.2},
            { time: "9m", pitch: "C3", velocity: 0.6}
        ];
        
        betaDriftBg.loopLength = "17m";
        betaDriftBg.loopTotal = 1;
        betaDriftBg.timingRange = 0.6;
        betaDriftBg.velocityRange = 0.15;
        betaDriftBg.skipChance = 0.3;
        betaDriftBg.db = -4;
        this.instruments.push(betaDriftBg);
        
        
        //HARP ARP
        const betaHarpArp = new Instrument("betaHarpArp", {"C3": "beta/b_harp_arp_H5.mp3"}, Instrument.TYPE_STANDARD );
        betaHarpArp.notes = [
            { time: "0", pitch: "C3"}
        ];
        betaHarpArp.loopLength = "14m";
        betaHarpArp.loopTotal = 1;
        betaHarpArp.velocityRange = 0.6
        betaHarpArp.db = 3
        this.instruments.push(betaHarpArp);
        
        
        //6m
        const betaHarpBg = new Instrument("betaHarpBg", {"C3": "beta/b_harp_bg_H5.mp3"}, Instrument.TYPE_STANDARD );
        betaHarpBg.notes = [
            { time: "0", pitch: "C3"}
        ];
        betaHarpBg.loopLength = "6m";
        betaHarpBg.loopTotal = 1;
        betaHarpBg.db = 2;
        this.instruments.push(betaHarpBg);
        

        const betaHarpNote = new Instrument("betaHarpNote", {"C3": "beta/b_harp_note_H5.mp3"}, Instrument.TYPE_STANDARD );
        betaHarpNote.notes = [
            { time: "0:3:0",  pitch: ["C2", "G1"]},
            { time: "3:3:0",  pitch: ["G2", "C2"]},
            { time: "6:1:0",  pitch: ["C3", "G2"]},
            { time: "8:3:0",  pitch: ["C2", "G1"]},
            { time: "10:3:0", pitch: ["E2", "C3"]},
        ];
        betaHarpNote.loopLength = "12m";
        betaHarpNote.loopTotal = 1;
        betaHarpNote.timingRange = 0.4;
        betaHarpNote.velocityRange = 0.7;
        betaHarpNote.skipChance = 0.3; 
        betaHarpNote.noteChance = 0.75;
        betaHarpNote.db = -23;
        this.instruments.push(betaHarpNote);
    }
}