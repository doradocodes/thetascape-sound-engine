// VisualizerBar.js
export default class VisualizerBar {
  constructor(brainwaveID, barWidth, containerHeight, colors) {
    this.brainwaveID = brainwaveID;
    this.barWidth = barWidth;
    this.containerHeight = containerHeight;
    this.colors = colors;

    // Live values
    this.carrierValue = 0;
    this.carrierAmp = 1.0;
    this.modulatorValue = 0.5;

    // Animated states
    this.currentHeight = containerHeight;
    this.currentOffset = 0;

    // For optimized gradient drawing
    this.gradient = null;
    this.lastGradientHeight = null;

    // Pick your wave parameters
    this._configureBrainwave(brainwaveID);
  }

  // Just factor out the switch into a helper
  _configureBrainwave(brainwaveID) {
    switch (brainwaveID) {
      case 1: // DELTA
        this.carrierAmp = 1.1;
        this.animSmoothing = 5;
        this.minWaveHeight = this.containerHeight * 0.8;
        this.maxWaveHeight = this.containerHeight * 1.1;
        this.modulationStrength = 0.12;
        break;
      case 2: // THETA
        this.carrierAmp = 1.1;
        this.animSmoothing = 4;
        this.minWaveHeight = this.containerHeight * 0.85;
        this.maxWaveHeight = this.containerHeight * 1.1;
        this.modulationStrength = 0.05;
        break;
      case 3: // ALPHA
        this.carrierAmp = 1.45;
        this.animSmoothing = 2;
        this.minWaveHeight = this.containerHeight * 1.25;
        this.maxWaveHeight = this.containerHeight * 1.55;
        this.modulationStrength = 0.075;
        break;
      case 4: // BETA
        this.carrierAmp = 1.2;
        this.animSmoothing = 3;
        this.minWaveHeight = this.containerHeight * 1.55;
        this.maxWaveHeight = this.containerHeight * 4.0;
        this.modulationStrength = 0.2;
        break;
      case 5: // GAMMA
        this.carrierAmp = 1.2;
        this.animSmoothing = 1;
        this.minWaveHeight = this.containerHeight * 1.1;
        this.maxWaveHeight = this.containerHeight * 2.75;
        this.modulationStrength = 0.115;
        break;
      default:
        this.carrierAmp = 1.0;
        this.animSmoothing = 4;
        this.minWaveHeight = this.containerHeight * 0.05;
        this.maxWaveHeight = this.containerHeight;
        this.modulationStrength = 0.05;
        break;

    }
  }

  reset(brainwaveID, containerHeight, colors) {
    // Overwrite existing properties
    this.brainwaveID = brainwaveID;
    this.containerHeight = containerHeight;
    this.colors = colors;

    // Reset live values
    this.carrierValue = 0;
    this.modulatorValue = 0.5;
    this.currentHeight = containerHeight;
    this.currentOffset = 0;
    this.gradient = null;
    this.lastGradientHeight = null;

    // Re-run wave parameter config
    this._configureBrainwave(brainwaveID);
  }

  setValues(carrierValue, modulatorValue) {
    this.carrierValue = carrierValue * this.carrierAmp;
    this.modulatorValue = modulatorValue;
  }

  updateColors(newColors) {
    this.colors = newColors;
    this.gradient = null; 
  }

  update(p5) {
    const smoothingFactor = 1 / this.animSmoothing;

    const targetHeight =
      this.maxWaveHeight -
      this.carrierValue * (this.maxWaveHeight - this.minWaveHeight);
    this.currentHeight += (targetHeight - this.currentHeight) * smoothingFactor;

    const centeredMod = this.modulatorValue - 0.5;
    const maxOffset = this.containerHeight * this.modulationStrength;
    const targetOffset = centeredMod * 2 * maxOffset;
    this.currentOffset += (targetOffset - this.currentOffset) * smoothingFactor;
  }

  draw(p5, x, y) {
    if (this.currentHeight < 1) return;

    p5.push();
    p5.translate(x, y + this.currentOffset);

    const heightDiff = Math.abs(this.currentHeight - this.lastGradientHeight);
    if (!this.gradient || heightDiff > 5) {
      // Rebuild gradient
      this.gradient = p5.drawingContext.createLinearGradient(
        0,
        -this.currentHeight / 2,
        0,
        this.currentHeight / 2
      );
      this.gradient.addColorStop(0.0, this.colors[0]);
      this.gradient.addColorStop(0.25, this.colors[1]);
      this.gradient.addColorStop(0.5, this.colors[2]);
      this.gradient.addColorStop(0.75, this.colors[3]);
      this.gradient.addColorStop(1.0, this.colors[4]);
      this.lastGradientHeight = this.currentHeight;
    }

    p5.drawingContext.fillStyle = this.gradient;
    p5.noStroke();
    p5.rect(-this.barWidth / 2, -this.currentHeight / 2, this.barWidth, this.currentHeight);
    p5.pop();
  }
}
