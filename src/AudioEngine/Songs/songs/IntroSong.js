import Song from "../Song";
import Instrument from "../Instrument";

export default class IntroSong extends Song {

     constructor(tone, id) {

         super(tone, id, Song.NAME_INTRO);

    //  //BACKGROUND LOOP
    //  //26s
        const introBgLoop = new Instrument("introBgLoop", {"C3": "alpha/a_bg_loop_H5.mp3"}, Instrument.TYPE_BG_LOOP );
        introBgLoop.notes = [
            { time: "0", pitch: "C3"},
        ];
        introBgLoop.loopLength = "11m"; 
        introBgLoop.loopTotal = -1;
        introBgLoop.db = -22; 
        this.instruments.push(introBgLoop);

        //played from AudioEngine on launch
        // const introPad = new Instrument("introPad", {"C3": "intro/intro_H5.mp3"}, Instrument.TYPE_STANDARD );
        // introPad.notes = [
        //     { time: "0", pitch: "C3"},
        // ];
        // introPad.loopLength = "10m";
        // introPad.loopTotal = 1;
        // introPad.db = 5;
        // this.instruments.push(introPad);
    }

    
}