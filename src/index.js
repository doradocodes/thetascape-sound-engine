import * as Tone from "tone";
import { SongIDs, SongFrequencies } from "./AudioEngine/Constants";

const init = async () => {
    console.log("APP: Init ToneJS and Audio Engine");

    //create context for playback, which is not that interactive / responsive, but easier on the CPU
    const context = new Tone.Context(
        { latencyHint: "playback" }
    );
    Tone.setContext(context);
    console.log("AUDIO: Tone.Context: Latency Hint:", Tone.getContext().latencyHint, "| Sample Rate:", Tone.getContext().sampleRate);

    //prevents clicking sound with Tone starts up below
    Tone.getContext().rawContext.suspend();

    // Start up tone
    await Tone.start();
    console.log("AUDIO: Tone started", Tone.getContext().state, Tone);

    //import AudioEngine class (we can't do this before tone is init'd)
    const { default: AudioEngine } = await import('./AudioEngine/AudioEngine');

    //pass tone reference into audio engine on init
    const engine = new AudioEngine(Tone);
    return engine;
};

export { SongIDs, SongFrequencies } from "./AudioEngine/Constants";

export { default as Visualizer } from "./AudioEngine/Visualizer/Visualizer";

export default {
    init,
};
