import Song from "../Song";
import Instrument from "../Instrument";

export default class AlphaSong extends Song {

    constructor(tone, id) {

        super(tone, id, Song.NAME_ALPHA);

        //BACKGROUND LOOP
        //33s
        const alphaBgLoop = new Instrument("alphaBgLoop", {"C3": "alpha/a_bg_loop_H5.mp3"}, Instrument.TYPE_BG_LOOP );
        alphaBgLoop.notes = [
            { time: "0", pitch: "C3"},
        ];
        alphaBgLoop.loopLength = "12m";
        alphaBgLoop.loopTotal = -1;
        alphaBgLoop.db = -18; 
        this.instruments.push(alphaBgLoop);



        const alphaMindfullnessPad = new Instrument("alphaMindfullnessPad", {"C3": "alpha/a_mindfulness_pad_H5.mp3"}, Instrument.TYPE_STANDARD );
        alphaMindfullnessPad.notes = [
            { time: "0",   pitch: ["A2", "D3", "F3", "A3"], velocity: 1.0 }, //soft
            { time: "6m",  pitch: ["E2", "G2", "C4", "E3"], velocity: 0.75}, //bright
            { time: "12m", pitch: ["G2", "A2", "C3", "E3"], velocity: 1.0 }, //nice
            { time: "18m", pitch: ["E2", "A2", "C3", "F4"], velocity: 0.3 }, //very bright
            { time: "24m", pitch: ["G2", "C3", "E3"], velocity: 1.0 }, //floating
            { time: "30m", pitch: ["C3", "E3", "G3", "G4"], velocity: 0.3 },//very bright
        ];
        alphaMindfullnessPad.loopLength = "36m";
        alphaMindfullnessPad.loopTotal = 1;
        alphaMindfullnessPad.velocityRange = 0.2;
        alphaMindfullnessPad.skipChance = 0.05; 
        alphaMindfullnessPad.noteChance = 0.7;
        alphaMindfullnessPad.db = -14;
        this.instruments.push(alphaMindfullnessPad);

        const alphaJvAnalogPad = new Instrument("alphaJvAnalogPad", {"C3": "alpha/a_JV_analog_pad_H5.mp3"}, Instrument.TYPE_STANDARD );
        alphaJvAnalogPad.notes = [
            { time: "0",   pitch: "E3", velocity: 0.7},
            { time: "6m",  pitch: "F2", velocity: 0.7},
            { time: "12m", pitch: "G2", velocity: 0.7},
            { time: "18m", pitch: "A2", velocity: 0.7},
            { time: "24m", pitch: "C3", velocity: 0.7},
        ];
        alphaJvAnalogPad.loopLength = "30m";
        alphaJvAnalogPad.loopTotal = 1;
        alphaJvAnalogPad.velocityRange = 0.35;
        alphaJvAnalogPad.skipChance = 0.05;
        alphaJvAnalogPad.noteChance = 0.3;
        alphaJvAnalogPad.db = -4;
        this.instruments.push(alphaJvAnalogPad);


        const alphaDreamBg = new Instrument("alphaDreamBg", {"C3": "alpha/a_dream_bg_H5.mp3"}, Instrument.TYPE_STANDARD );
        alphaDreamBg.notes = [
            { time: "0", pitch: "C3", velocity: 1.0},
        ];
        alphaDreamBg.loopLength = "7m";
        alphaDreamBg.loopTotal = 1;
        alphaDreamBg.velocityRange = 0.3;
        alphaDreamBg.db = -6;
        this.instruments.push(alphaDreamBg);


        const alphaTangerineBg = new Instrument("alphaTangerineBg", {"C3": "alpha/a_tangerine_bg_H5.mp3"}, Instrument.TYPE_STANDARD );
        alphaTangerineBg.notes = [
            { time: "0", pitch: "C3", velocity: 0.5},
            { time: "7m", pitch: "C2", velocity: 0.8}, 
        ];
        alphaTangerineBg.loopLength = "19m";
        alphaTangerineBg.loopTotal = 1;
        alphaTangerineBg.skipChance = 0.1;
        alphaTangerineBg.db = -6;
        this.instruments.push(alphaTangerineBg);


        const betaHarpBg = new Instrument("betaHarpBg", {"C3": "beta/b_harp_bg_H5.mp3"}, Instrument.TYPE_STANDARD );
        betaHarpBg.notes = [
            { time: "0", pitch: "C2"}, 
        ];
        betaHarpBg.loopLength = "12m";
        betaHarpBg.loopTotal = 1;
        betaHarpBg.velocityRange = 0.2;
        betaHarpBg.db = 2;
        this.instruments.push(betaHarpBg);


        const alphaSoftKey = new Instrument("alphaSoftKey", {"C3": "alpha/a_soft_key_H5.mp3"}, Instrument.TYPE_STANDARD );
        alphaSoftKey.notes = [
            { time: "0:0:0", pitch: "C2"},
            { time: "0:4:0", pitch: "D2"},
            { time: "2:0:0", pitch: "E2"},
            { time: "2:4:0", pitch: "G2"},
            { time: "4:0:0", pitch: "A2"},
            { time: "4:4:0", pitch: "C3"},
            { time: "6:0:0", pitch: "D3"},
          
        ];
        alphaSoftKey.loopLength = "6:3:0";
        alphaSoftKey.loopTotal = 1;
        alphaSoftKey.timingRange = 0.6;
        alphaSoftKey.velocityRange = 0.2;
        alphaSoftKey.skipChance = 0.45; 
        alphaSoftKey.noteChance = 0.9;
        alphaSoftKey.db = -17;
        this.instruments.push(alphaSoftKey);


        const alphaLoundBell = new Instrument("alphaLoundBell", {"C3": "alpha/a_lound_note_H5.mp3"}, Instrument.TYPE_STANDARD );
        alphaLoundBell.notes = [
            { time: "0:3:0", pitch: "C2"},
            { time: "1:1:0", pitch: "D2"},
            { time: "3:2:0", pitch: "G2"},
            { time: "4:2:0", pitch: "A2"},
        ];
        alphaLoundBell.loopLength = "6m";
        alphaLoundBell.loopTotal = 1;
        alphaLoundBell.timingRange = 0.4;
        alphaLoundBell.velocityRange = 0.3;
        alphaLoundBell.skipChance = 0.2; 
        alphaLoundBell.noteChance = 0.9;
        alphaLoundBell.db = -30;
        this.instruments.push(alphaLoundBell);


    }
}