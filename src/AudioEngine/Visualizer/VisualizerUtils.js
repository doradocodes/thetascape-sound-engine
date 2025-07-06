export const VisualizerUtils = {
  processMeters: (getMeters, barTotal, binRange = [0, 16], mirror = false) => {
    const meters = getMeters();
    const rawValues = Object.values(meters);
    const [start, end] = binRange;
    const values = rawValues.slice(start, end);

    const spectrum = [];
    const lastIdx = values.length - 1;

    // Normalization range for very quiet input
    const dBMin = -135;
    const dBMax = -80;
    const clamp01 = (n) => Math.max(0, Math.min(1, n));
    const normalize = (v) => clamp01((v - dBMin) / (dBMax - dBMin));
    const boost = (v) => Math.pow(v, 0.5); // Try 0.5 (sqrt) or 2 (power) for visual punch

    if (mirror) {
      const half = Math.ceil(barTotal / 2); // includes center if odd

      for (let i = 0; i < half; i++) {
        const t = i / (half - 1 || 1);
        const scaledIndex = t * lastIdx;

        const i0 = Math.floor(scaledIndex);
        const i1 = Math.min(i0 + 1, lastIdx);
        const alpha = scaledIndex - i0;

        const interpolated = values[i0] * (1 - alpha) + values[i1] * alpha;
        const normalized = normalize(interpolated); //boost(normalize(interpolated));

        spectrum[i] = normalized; // left side
        spectrum[barTotal - 1 - i] = normalized; // mirror right side
      }

      return spectrum;

    } else {
      for (let i = 0; i < barTotal; i++) {
        const t = i / (barTotal - 1 || 1);
        const scaledIndex = t * lastIdx;

        const i0 = Math.floor(scaledIndex);
        const i1 = Math.min(i0 + 1, lastIdx);
        const alpha = scaledIndex - i0;

        const interpolated = values[i0] * (1 - alpha) + values[i1] * alpha;
        const normalized = normalize(interpolated); //boost(normalize(interpolated));

        // Debug output
        //console.log('interpolated', interpolated, 'normalized', normalized);

        spectrum.push(normalized);
      }

      return spectrum;
    }
  }
};
