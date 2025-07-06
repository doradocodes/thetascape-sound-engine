import { SongIDs } from '../Constants';

export default class BrainwaveGenerator {
  constructor(barTotal) {
    this.barTotal = barTotal;

    // Phases
    this.phase = 0;
    this.freqModPhase = 0;
    this.ampModPhase = 0;
    this.widthModPhase = 0;

    // Mod speeds and ranges
    this.freqModSpeed = 0;
    this.ampModSpeed = 0;
    this.widthModSpeed = 0;

    this.ampMultiplier = 1;
    this.widthMultiplier = 1;
    this.minHz = 1;
    this.maxHz = 1;
    this.speed = 0;

    // Output modifiers
    this._ampModValue = 1;
    this._widthModValue = 1;

    this.active = false;
    this._idleArray = new Array(this.barTotal).fill(0.5); // reuse for idle state
  }

  setBrainwave(brainwaveID) {
    // Lookup table to reduce switch boilerplate
    const presets = {
      [SongIDs.DELTA]:  { 
        minHz: 0.075, 
        maxHz: 0.175, 
        amp: 0.8, 
        width: 0.04, 
        freq: 0.003, 
        ampS: 0.004, 
        widthS: 0.003 
      },
      [SongIDs.THETA]:  { 
        minHz: 0.175,  
        maxHz: 0.3,   
        amp: 1.2, 
        width: 0.05, 
        freq: 0.004, 
        ampS: 0.005, 
        widthS: 0.004 
      },

      [SongIDs.ALPHA]:  { 
        minHz: 0.2,   
        maxHz: 0.4,   
        amp: 1.5, 
        width: 0.05, 
        freq: 0.005, 
        ampS: 0.001, 
        widthS: 0.0025 
      },
    
      [SongIDs.BETA]:   
      { 
        minHz: 2.2,   
        maxHz: 3.3,  
         amp: 1.5, 
         width: 1.5, 
         freq: 0.001, 
         ampS: 0.0,   
         widthS: 0.001 },
      
    
      [SongIDs.GAMMA]:  
        { 
          minHz: 1.1,   
          maxHz: 1.6,   
            amp: 1.025, 
            width: 0.75, 
            freq: 0.001, 
            ampS: 0.001,   
            widthS: 0.0 
        },
    };

    const config = presets[brainwaveID];
    if (!config) {
      console.warn('Unknown brainwave ID:', brainwaveID);
      return;
    }

    this.minHz = config.minHz;
    this.maxHz = config.maxHz;
    this.ampMultiplier = config.amp;
    this.widthMultiplier = config.width;
    this.freqModSpeed = config.freq;
    this.ampModSpeed = config.ampS;
    this.widthModSpeed = config.widthS;

    this.active = true;
  }

  _computeSpeed(freqHz) {
    const framesPerCycle = 8 / freqHz; // assuming 30 FPS
    return (2 * Math.PI) / framesPerCycle;
  }

  update() {
    if (!this.active) return;

    // Advance all modulation phases
    this.freqModPhase += this.freqModSpeed;
    this.ampModPhase += this.ampModSpeed;
    this.widthModPhase += this.widthModSpeed;

    // Wrap manually (avoids % op cost)
    if (this.freqModPhase > Math.PI * 2) this.freqModPhase -= Math.PI * 2;
    if (this.ampModPhase > Math.PI * 2) this.ampModPhase -= Math.PI * 2;
    if (this.widthModPhase > Math.PI * 2) this.widthModPhase -= Math.PI * 2;

    // Sine-based modulation
    const freqMod = Math.sin(this.freqModPhase) * 0.5 + 0.5;
    const ampMod = Math.sin(this.ampModPhase) * 0.5 + 0.5;
    const widthMod = Math.sin(this.widthModPhase) * 0.5 + 0.5;

    const currentHz = this.minHz + freqMod * (this.maxHz - this.minHz);
    this.speed = this._computeSpeed(currentHz);

    this._ampModValue = ampMod * this.ampMultiplier;
    this._widthModValue = 1.0 + widthMod * this.widthMultiplier;

    // Advance wave phase
    this.phase += this.speed;
    if (this.phase > Math.PI * 2) this.phase -= Math.PI * 2;
  }

  getModulatorWave() {
    if (!this.active) return this._idleArray;

    const amp = this._ampModValue;
    const width = this._widthModValue;
    const wave = new Array(this.barTotal); // reuse outside if desired

    const twoPi = Math.PI * 2;
    for (let i = 0; i < this.barTotal; i++) {
      const t = i / this.barTotal;
      const offset = t * twoPi * width;
      wave[i] = Math.sin(this.phase + offset) * 0.5 * amp + 0.5;
    }

    return wave;
  }
}
