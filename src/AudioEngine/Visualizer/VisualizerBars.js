import VisualizerBar from './VisualizerBar';

export default class VisualizerBars {
  constructor(p5, brainwaveID, barCount, barWidth, barSpacing, containerHeight, colors) {
    this.p5 = p5;
    this.bars = [];

    const totalWidth = barCount * (barWidth + barSpacing);
    const xStart = (p5.width - totalWidth) / 2 + barSpacing / 2;

    for (let i = 0; i < barCount; i++) {
      const x = xStart + i * (barWidth + barSpacing);
      const bar = new VisualizerBar(brainwaveID, barWidth, containerHeight, colors);
      this.bars.push({ bar, x });
    }
  }

  resetAllBars(brainwaveID, containerHeight, colors) {
    for (const { bar } of this.bars) {
      bar.reset(brainwaveID, containerHeight, colors);
    }
  }

  updateColors(newColors) {
    // Optional: Only update if changed
    for (const { bar } of this.bars) {
      bar.updateColors?.(newColors);
    }
  }

  updateAndDraw(carrierSpectrum, modulatorSpectrum) {
    if (carrierSpectrum.length !== modulatorSpectrum.length) return;
    
    const { p5 } = this;
    for (let i = 0; i < this.bars.length; i++) {
      const { bar, x } = this.bars[i];
      bar.setValues(carrierSpectrum[i] || 0, modulatorSpectrum[i] || 0.5);
      bar.update(p5);
      bar.draw(p5, x, p5.height / 2);
    }
  }
}
