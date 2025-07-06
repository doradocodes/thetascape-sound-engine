// Visualizer.jsx
import React, { useRef, useEffect, useMemo } from 'react';
import Sketch from 'react-p5';
import VisualizerBars from './VisualizerBars';
import { SongIDs } from '../Constants';
import VisualizerColors from './VisualizerColors';
import { VisualizerUtils } from './VisualizerUtils';
import BrainwaveGenerator from './BrainwaveGenerator';

const Visualizer = ({ getLevels, brainwaveID = SongIDs.BETA }) => {
  
  const visualizerBars = useRef(null);
  const generatorRef = useRef(null);
  const barCountRef = useRef(null);
  const drawnBackgroundRef = useRef(false);
  const colors = useMemo(() => VisualizerColors.getColors(brainwaveID), [brainwaveID]);


  // Update generator parameters if brainwave changes
  useEffect(() => {
    if (generatorRef.current) {
      generatorRef.current.setBrainwave(brainwaveID);
    }

    drawnBackgroundRef.current = false; // reset background

    // Update bar colors
    if (visualizerBars.current) {
      // We'll need the same containerHeight used originally
      // and the new bar colors
      const { p5 } = visualizerBars.current;
      const containerHeight = p5.height;
      const newColors = VisualizerColors.getColors(brainwaveID).barColors;
      
      // Reset all bars
      visualizerBars.current.resetAllBars(brainwaveID, containerHeight, newColors);
    }
  }, [brainwaveID]);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.frameRate(8); //5
    p5.noSmooth();

    // Set up bars
    const barWidth = 2; //1;
    const barSpacing = 11; //40;
    const barCount = Math.floor(p5.width / (barWidth + barSpacing));
    barCountRef.current = barCount;

    visualizerBars.current = new VisualizerBars(
      p5,
      brainwaveID,
      barCount,
      barWidth,
      barSpacing,
      p5.height,
      colors.barColors
    );

    // Initialize generator only once
    if (!generatorRef.current) {
      generatorRef.current = new BrainwaveGenerator(barCount);
      generatorRef.current.setBrainwave(brainwaveID); // initial config
    }
  };

  const draw = (p5) => {
    //if (!drawnBackgroundRef.current) {

      const bg = VisualizerColors.getColors(brainwaveID).bgColors;
      const gradient = p5.drawingContext.createLinearGradient(0, 0, 0, p5.height);
      gradient.addColorStop(0.0, bg[0]);
      gradient.addColorStop(0.5, bg[1]);
      gradient.addColorStop(1.0, bg[2]);
      p5.drawingContext.fillStyle = gradient;
      p5.noStroke();
      p5.rect(0, 0, p5.width, p5.height);
      drawnBackgroundRef.current = true;
    //}
    

    if (!visualizerBars.current || !getLevels || !generatorRef.current) return;

    const meters = getLevels();

    let binRange = [0, 16];
    let mirror = false;

    switch (brainwaveID) {
      case SongIDs.DELTA:
        binRange = [0, 4]; // low freq bins
        mirror = true;
        break;
      case SongIDs.THETA:
        binRange = [2, 8];
        mirror = true;
        break;
      case SongIDs.ALPHA:
        binRange = [2, 10];
        mirror = true;
        break;
      case SongIDs.BETA:
        binRange = [4, 12];
        mirror = false;
        break;
      case SongIDs.GAMMA:
        binRange = [6, 16]; // higher bins only
        mirror = true;
        break;
      default:
        binRange = [0, 16];
        mirror = true;
        break;
    }

    const carrierWave = VisualizerUtils.processMeters(() => meters, visualizerBars.current.bars.length, binRange, mirror);
    
    generatorRef.current.update();
    const modulatorWave = generatorRef.current.getModulatorWave();

    visualizerBars.current.updateAndDraw(carrierWave, modulatorWave);
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default Visualizer;
