class BusMain {
  constructor(tone, mainBusInput) {
    this.tone = tone;
    this.fft = new tone.FFT(16); // Small FFT = fast + still useful
    this.volume = new tone.Volume(0); // You can still adjust this if needed

    // Connect signal chain
    mainBusInput.connect(this.volume);
    this.volume.connect(this.fft);

    // Optionally connect to output
    this.volume.toDestination();
  }

  // Fade out to -100 dB over specified duration (default 4s)
  fadeOut(duration = 5) {
    this.volume.volume.rampTo(-60, duration);
  }
  

  // Fade in to 0 dB over specified duration (default 1s)
  fadeIn(duration = 1) {
    this.volume.volume.rampTo(0, duration);
  }

  // Returns array of 32 values in dB (range: ~[-100, 0])
  getLevels() {
    return this.fft.getValue(); // Float32Array of dB values
  }
}

export default BusMain;

