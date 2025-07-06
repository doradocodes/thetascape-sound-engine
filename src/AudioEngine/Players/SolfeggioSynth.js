export default class SolfeggioSynth {

    constructor(
        tone,
        mainOutput
    ){

        //build synth
        this.osc = new tone.Oscillator(523.25, "sine");
        this.osc.volume.value = -35;
        this.ampEnv = new tone.AmplitudeEnvelope({
            attack: 3.5,   // gradual fade-in
            decay: 1.0,    // slower drop to the sustain level
            sustain: 0.9,  // lower level to simulate natural decay
            release: "8m"  // long tail after note release
        })

        this.autoPan = new tone.AutoPanner(
              5, //frequency
              1.0 //depth
        );

   
        //create lightweight reverb
        // this.reverb = new tone.Reverb({
        //     decay: 12,
        //     preDelay: 0.1,
        //     wet: 0.8
        // });

        //routing
        this.osc.connect(this.ampEnv);
        this.ampEnv.connect(this.autoPan);
        this.autoPan.connect(mainOutput);

        //frequencies quantiezed to C E G or D
        //this.frequencies = [164.81, 392.00, 523.25, 783.99, 1046.50]
        //pure solfeggios
        this.frequencies = [392.00, 164.81, 392.00, 523.25, 783.99, 1046.50]
        this.volumes = [-35, -35, -38, -39, -40, -48]
    }

    setFrequency(frequency){
        this.autoPan.frequency.value = frequency;
    }

    start(){
        this.autoPan.start();
        this.osc.start();
    }

    play(set){
        this.osc.volume.value = this.volumes[set];
        this.osc.frequency.value = this.frequencies[set];
        this.ampEnv.triggerAttackRelease("2m");
    }

    
}