import Song from "../Song";
import Instrument from "../Instrument";

export default class GammaSong extends Song {

    constructor(tone, id) {

        super(tone, id, Song.NAME_GAMMA);

        //BACKGROUND LOOP
        //30s
        const gammaBgLoop = new Instrument("gammaBgLoop", {"C3": "gamma/g_bg_loop_H5.mp3"}, Instrument.TYPE_BG_LOOP );
        gammaBgLoop.notes = [
            { time: "0", pitch: "C3"},
        ];
        gammaBgLoop.loopLength = "9m"; 
        gammaBgLoop.loopTotal = -1;
        gammaBgLoop.db = -26; 
        this.instruments.push(gammaBgLoop);

        

        const gammaShimmer1 = new Instrument("gammaShimmer1", {"C3": "gamma/g_shimmer_H5.mp3"}, Instrument.TYPE_STANDARD );
        gammaShimmer1.notes = [
            { time: "0", pitch: "C3"},
        ];
        gammaShimmer1.loopLength = "9m";
        gammaShimmer1.loopTotal = 1;
        gammaShimmer1.velocityRange = 0.2;
        gammaShimmer1.db = 0;
        this.instruments.push(gammaShimmer1);

        
    
        const gammaChakraBg = new Instrument("gammaChakraBg", {"C3": "gamma/g_chakra_bg_H5.mp3"}, Instrument.TYPE_STANDARD );
        gammaChakraBg.notes = [
            { time: "0", pitch: "G3"}
        ];
        gammaChakraBg.loopLength = "13m";
        gammaChakraBg.loopTotal = 1;
        gammaChakraBg.velocityRange = 0.2;
        gammaChakraBg.db = 0;
        this.instruments.push(gammaChakraBg);
       

        //12m
        const gammaChakraArpHigh = new Instrument("gammaChakraArpHigh", {"C3": "gamma/g_chakra_arp_high_H5.mp3"}, Instrument.TYPE_STANDARD );
        gammaChakraArpHigh.notes = [
            { time: "0",  pitch: "C3"},           
        ];
        gammaChakraArpHigh.loopLength = "10m";
        gammaChakraArpHigh.loopTotal = 1;
        gammaChakraArpHigh.timingRange = 0.0;
        gammaChakraArpHigh.velocityRange = 0.5;
        gammaChakraArpHigh.db = -3;
        this.instruments.push(gammaChakraArpHigh);

        
        const gammaChakraArpMid = new Instrument("gammaChakraArpMid", {"C3": "gamma/g_chakra_arp_mid_H5.mp3"}, Instrument.TYPE_STANDARD );
        gammaChakraArpMid.notes = [
            { time: "0",  pitch: "C3"},
        ];
        gammaChakraArpMid.loopLength = "12m";
        gammaChakraArpMid.loopTotal = 1;
        gammaChakraArpMid.timingRange = 0.0;
        gammaChakraArpMid.velocityRange = 0.5;
        gammaChakraArpMid.db = -3;
        this.instruments.push(gammaChakraArpMid);
        

        const gammaChakraArpLow = new Instrument("gammaChakraArpLow", {"C3": "gamma/g_chakra_arp_low_H5.mp3"}, Instrument.TYPE_STANDARD );
        gammaChakraArpLow.notes = [
            { time: "0",  pitch: "C3"},
        ];
        gammaChakraArpLow.loopLength = "32m";
        gammaChakraArpLow.loopTotal = 1;
        gammaChakraArpLow.timingRange = 0.0;
        gammaChakraArpLow.velocityRange = 0.3;
        gammaChakraArpLow.db = -3;
        this.instruments.push(gammaChakraArpLow);
        
        
        
        // 13m
        //spinning wheel
        // const gammaSpinningWheel = new Instrument("gammaSpinningWheel", {"C3": "gamma/g_spinning_wheel.mp3"}, Instrument.TYPE_STANDARD );
        // gammaSpinningWheel.notes = [
        //     { time: "0", pitch: "C3", velocity: 1.0},
        //     { time: "10m", pitch: "C4", velocity: 0.25},
        // ];
        // gammaSpinningWheel.loopLength = "12m";
        // gammaSpinningWheel.loopTotal = 1;
        // gammaSpinningWheel.velocityRange = 0.125;
        // gammaSpinningWheel.skipChance = 0.4;
        // gammaSpinningWheel.db = -3;
        // this.instruments.push(gammaSpinningWheel);


        //sparkle
        const gammaCrystalSparkle = new Instrument("gammaCrystalSparkle", {"C3": "gamma/g_crystal_sparkle_H5.mp3"}, Instrument.TYPE_STANDARD );
        gammaCrystalSparkle.notes = [
            { time: "0", pitch: "C1", velocity: 0.9},
            { time: "2m", pitch: "G1", velocity: 0.7},
            { time: "4m", pitch: "C2", velocity: 0.3},
            { time: "6m", pitch: "G1", velocity: 0.6},
            { time: "8m", pitch: "C3", velocity: 0.6},
        ];
        gammaCrystalSparkle.loopLength = "10m";
        gammaCrystalSparkle.loopTotal = 1;
        gammaCrystalSparkle.velocityRange = 0.2;
        gammaCrystalSparkle.skipChance = 0.5;
        gammaCrystalSparkle.db = 1;
        this.instruments.push(gammaCrystalSparkle);
    
        
        const gammaChoirPad = new Instrument("gammaChoirPad", {"C3": "gamma/g_warm_choir_H5.mp3"}, Instrument.TYPE_STANDARD );
        gammaChoirPad.notes = [
            
            { time: "0",  pitch: ["C1", "C2"]},
            { time: "4:0:0",  pitch: ["F1", "F2"]},
            { time: "7:0:0",  pitch: ["G1", "G2"]},
            { time: "9:2:0",  pitch: ["C2", "C3"]},

        ];
        gammaChoirPad.loopLength = "13m";
        gammaChoirPad.loopTotal = 4;
        gammaChoirPad.velocityRange = 0.2;
        gammaChoirPad.skipChance = 0.3; 
        gammaChoirPad.noteChance = 0.3
        gammaChoirPad.db = -3

        this.instruments.push(gammaChoirPad);
    

        //bell
        const gammaBell = new Instrument("gammaBell", {"C3": "gamma/g_bell_note_H5.mp3"}, Instrument.TYPE_STANDARD );
        gammaBell.notes = [
            { time: "0:0:0",  pitch: "C3", velocity: 0.8},
            { time: "0:1:0",  pitch: "F3", velocity: 0.8},
            { time: "0:2:0",  pitch: "G3", velocity: 0.8},

            { time: "2:0:0",  pitch: "C1", velocity: 0.8},
            { time: "2:1:0",  pitch: "F1", velocity: 0.8},
            { time: "2:2:0",  pitch: "G1", velocity: 0.7},

            { time: "4:0:0",  pitch: "C2", velocity: 0.6},
            { time: "4:1:0",  pitch: "F2", velocity: 0.5},
            { time: "4:2:0",  pitch: "G2", velocity: 0.35},
        ];
        gammaBell.loopLength = "6m";
        gammaBell.loopTotal = 1;
        gammaBell.velocityRange = 0.15;
        gammaBell.skipChance = 0.6;
        gammaBell.db = -4;
        this.instruments.push(gammaBell);      
    
    }
}