import BusMain from './Outputs/BusMain';
import IntroSong from './Songs/songs/IntroSong';
import DeltaSong from './Songs/songs/DeltaSong';
import ThetaSong from './Songs/songs/ThetaSong';
import AlphaSong from './Songs/songs/AlphaSong';
import BetaSong from './Songs/songs/BetaSong';
import GammaSong from './Songs/songs/GammaSong';


import Players from './Players/Players';
import { SongFrequencies, SongIDs } from './Constants';

export default class AudioEngine {

  //INIT ENGINE
  constructor(tone) {

    console.log("AUDIO: Init Audio Engine");

    this.tone = tone;

    //songs
    this.songs = [];
    this.currSong = null;

    //this is the entry point for all the busses
    this.mainBusInput = null
    this.mainBus = null;

    //init players
    this.players = null;

    //scheduler for the intro delay
    this.startSongID = null;

    this.initComplete = false;

  }

  async initAudioEngine() {

    console.log("AUDIO: Init Audio Engine with Tone", this.tone);

    if (!this.initComplete) {

      //if the context change caused state to be suspended, resume it
      if (this.tone.getContext().state === "suspended") { await this.tone.getContext().resume(); }
      console.log("AUDIO: Tone resumed", this.tone.getContext().state);

      // global BPM
      this.tone.getTransport().bpm.value = 100;
      //lookahead time in seconds, for scheduling. Higher numbers help CPU performance, but can cause timing issues
      this.tone.getContext().lookAhead = 1.0;
      console.log("AUDIO: Lookahead time", this.tone.getContext().lookAhead);

      if (this.tone.getTransport().state !== "started") {
        console.log("AUDIO: Start transport");
        this.tone.getTransport().start();
      } else {
        console.log("AUDIO: Transport already started");
      }

      //now that tone is init with a user click, it's safe to init the rest of the engine
      this.songs = [
        new IntroSong(this.tone, 0),
        new DeltaSong(this.tone, 1),
        new ThetaSong(this.tone, 2),
        new AlphaSong(this.tone, 3),
        new BetaSong(this.tone, 4),
        new GammaSong(this.tone, 5),
      ];

      this.mainBusInput = new this.tone.Gain(1.0);
      this.mainBus = new BusMain(this.tone, this.mainBusInput);

      //init players
      this.players = new Players(
        this.tone, //pass in tone
        this.mainBusInput, //pass in main input
        this.playComplete, //completion callback
      );

      this.initComplete = true;
    }
  }

  //LOAD and PLAY SONG 
  async playSong(songID) {

    //init tone and engine components
    await this.initAudioEngine();

    console.log("AUDIO: Load song", songID);

    const song = this.songs[songID];
    if (!song) {
      console.error("AUDIO: No song found for ID", songID);
      return;
    }

    //is this song already playing?
    if (this.currSong && this.currSong.id === songID) {
      console.warn("AUDIO: Song already playing", this.currSong.name);
      return;
    } else {
      this.currSong = song; //save new song
    }

    //play intro tone
    console.log("AUDIO: Play intro tone", songID);
    this.players.playIntroTone(songID);

    //fade in main bus
    this.mainBus.fadeIn(1);

    // Wait for the song to load and capture the result
    const isLoaded = await this.currSong.load();

    if (isLoaded) {
      console.log("AUDIO: Song", songID, "loaded");
    } else {
      console.error("AUDIO: Failed to load song", songID);
    }

    //start automations at specific Hz
    this.players.setFrequency(SongFrequencies[songID]);
    this.players.start();

    //play song after delay
    this.startSongID = this.tone.getTransport().scheduleOnce((time) => {
      console.log("AUDIO: Play Song", songID, "at time", time);
      this.players.play(this.currSong);

      //play intro sound
      if (songID === SongIDs.INTRO) {
        this.playIntroSound()
      }

    }, "+" + this.tone.Time("4n"));

  }

  playIntroSound() {
    console.log("PLAYERS: Play intro");
    const url = `./../sounds/intro/intro_H5.mp3`;

    const introPlayer = new this.tone.Player({
      url: url,
      autostart: false, // set false to manually control
      volume: 5, // db
      onload: () => {
        console.log("INTRO PLAYER: Loaded, starting now");
        introPlayer.start();
      },
      onerror: (err) => {
        console.error("INTRO PLAYER: Error loading", err);
      }
    }).toDestination();

    // Fallback: start transport if needed (safeguard)
    if (this.tone.Transport.state !== "started") {
      this.tone.Transport.start();
    }

    // Optional: dispose after playback ends
    introPlayer.onstop = () => {
      introPlayer.dispose();
      console.log("INTRO PLAYER: Disposed after stop");
    };
  }


  playComplete = (instrumentName) => {
    console.log("AUDIO: Instrument", instrumentName, "complete, play next");
    this.players.resetPlayer(instrumentName);
    this.players.playInstrument(this.currSong);
  };

  stopSong() {

    //stop startSongID
    this.tone.getTransport().clear(this.startSongID);
    this.startSongID = null;

    //stop all players
    this.players.stopAll();

    //fade out main bus
    this.mainBus.fadeOut();

    //null out current song
    this.currSong = null;
  }
}