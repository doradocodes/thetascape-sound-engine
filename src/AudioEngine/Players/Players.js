import Player from "./Player";
import SolfeggioSynth from "./SolfeggioSynth";

export default class Players {

    //pass dry and wet output down into the players
    constructor(tone, mainOutput, playComplete, ) {

        this.tone = tone;

        //note players
        //limits the number of instruments that can play at one time
        this.players = [
            new Player(tone, 0, mainOutput, playComplete),
            new Player(tone, 1, mainOutput, playComplete),
            new Player(tone, 2, mainOutput, playComplete),
            new Player(tone, 3, mainOutput, playComplete),
            //new Player(tone, 4, mainOutput, playComplete)
        ];

        this.solfeggioSynth = new SolfeggioSynth(tone, mainOutput);

        //this tracks which instruments are active so the same one isn't loaded twice
        this.activeInstrumentNames = [];

        //scheduling events
        this.bgLoopID = null;
        this.playerID_1 = null;
        this.playerID_2 = null;
        this.playerID_3 = null;
        this.playerID_4 = null;

        //this.introTonePlayed = false;
    }

    start(){
        this.solfeggioSynth.start();
    }

    setFrequency(frequency){
        this.solfeggioSynth.setFrequency(frequency);
    }

    
    playIntroTone(songID){
       if (songID === 0){ //don't play solfeggio for intro
        return
       }
       this.solfeggioSynth.play(songID); 
    }

    //loads a new set of audio files and data sets into the app
    play(song) {

        console.log("PLAYERS: Play", song.name, "song");
        //reset all players
        this.stopAll();

        //introduce sounds gradually
        
        this.bgLoopID = this.tone.getTransport().scheduleOnce((time) => {
            console.log("---> PLAYERS: BG LOOP");
            this.playBackgroundLoop(song); //start with background loop
        }, "+" + this.tone.Time("0"));

        this.playerID_1 = this.tone.getTransport().scheduleOnce((time) => {
            console.log("---> PLAYERS: PLAYER 2");
            this.playInstrument(song); //player 2
        }, "+" + this.tone.Time("2m"));  //6m

        this.playerID_2 = this.tone.getTransport().scheduleOnce((time) => {
            console.log("---> PLAYERS: PLAYER 3");
            this.playInstrument(song); //player 3
        }, "+" + this.tone.Time("8m"));  //14m
       
        this.playerID_3 = this.tone.getTransport().scheduleOnce((time) => {
            console.log("---> PLAYERS: PLAYER 4");
            this.playInstrument(song); //player 4
        }, "+" + this.tone.Time("14m")); //20

        this.playerID_4 = this.tone.getTransport().scheduleOnce((time) => {
            console.log("---> PLAYERS: PLAYER 5");
            //this.playInstrument(song); //player 5
        }, "+" + this.tone.Time("20m")); //20
        
    }

    
    //PLAY
    //bg and instruments
    playBackgroundLoop(song) {
        const bgLoop = song.getBackgroundLoop();
        if (!bgLoop) {
            console.warn("PLAYERS: No background loop found");
            return;
        }
        //console.log("PLAYERS: Play background loop", instrument.name);
        this._playInstrument(bgLoop);
    }

    playInstrument(song) {

        // Filter out the ones that are already active
        const availableInstruments = song.getInstruments().filter(instrument => 
            !this.activeInstrumentNames.includes(instrument.name)
        );
        //console.log("PLAYERS: Available instruments:", availableInstruments);

        if (availableInstruments.length === 0) {
            console.warn("Players: All available instruments are playing");
            return;
        }

        // Pick one at random from the available instruments
        const randomIndex = Math.floor(Math.random() * availableInstruments.length);
        const instrument = availableInstruments[randomIndex];

        //console.log("PLAYERS: Play instrument", instrument);
        this._playInstrument(instrument);
    }

    //RESET
    resetPlayer(instrumentName) {
        
        // Loop through the players array
        for (const player of this.players) {

            // If the notePlayer's instrumentName matches the given instrumentName...
            if (player.getInstrumentName() === instrumentName) {

                // ...reset it to null and make it available again
                console.log("PLAYERS: Player", player.id, "with instrumentName", instrumentName, "has been reset.");
                player.resetInstrument();

                //remove instrument name from activeInstrumentNames
                const index = this.activeInstrumentNames.indexOf(instrumentName);
                if (index > -1) { this.activeInstrumentNames.splice(index, 1); }   

                console.log("--- RMV PLAYLIST", instrumentName);
                break;
            }
        }
    }

    //PLAYBACK
    _playInstrument(instrument) {

        // Mark this instrument as active
        this.activeInstrumentNames.push(instrument.name);
        console.log("+++ ADD PLAYLIST", this.activeInstrumentNames);

        //get an available player
        const availablePlayer = this._getAvailablePlayer();
        
        if (availablePlayer) {

            console.log('Players: Play', instrument.name, "on player", availablePlayer.id);
            availablePlayer.playInstrument(instrument);

        } else {
          console.warn("Players: All note players are being used");
        }
    }
   
    _getAvailablePlayer(){

        // Loop through each player until we find one that's not in use
        let availablePlayer = null;
        
        for (const player of this.players) {

            //if note player doesn't have a instrument name, it's available
            if (!player.getInstrumentName()) {
                availablePlayer = player;
                break;
            }
        }
        return availablePlayer;
    }

    

    //loop through all players and stop them
    stopAll(){

        console.log("PLAYERS: Stop all");

        //stop all scheduled events
        this.tone.getTransport().clear(this.bgLoopID);
        this.tone.getTransport().clear(this.playerID_1);
        this.tone.getTransport().clear(this.playerID_2);
        this.tone.getTransport().clear(this.playerID_3);
        this.tone.getTransport().clear(this.playerID_4);
        
        //null out scheduled events
        this.bgLoopID = null;
        this.playerID_1 = null;
        this.playerID_2 = null;
        this.playerID_3 = null;
        this.playerID_4 = null;

        //stop all players
        this.players.forEach(player => player.stop());

        //reset array
        this.activeInstrumentNames = [];
    }
}