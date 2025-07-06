import { SongIDs } from '../Constants'; // Assuming your brainwave enums are here

const VisualizerColors = {
  getColors(brainwaveID) {
    switch (brainwaveID) {
      case SongIDs.DELTA:
        return {
          barColors: [
            '#1d262d',
            '#0468b8', 
            '#bbd0e0', 
            '#43b3d3',
            '#202025'
          ],
          bgColors: [
            '#1d262d', 
            '#15445d', 
            '#202025'
          ],
        };

      case SongIDs.THETA:
        return {
          barColors: [
            '#22242f', 
            '#7d82a6', 
            '#f8f8fa', 
            '#5d6393',
            '#1f1f24'
          ],
          bgColors: [
            '#22242f', 
            '#373e73', 
            '#1f1f24'
          ],
        };

      case SongIDs.ALPHA:
        return {
          barColors: [
            '#01a2cb', 
            '#45bbd9', 
            '#ffffff', 
            '#038ecf',
            '#0398cf'
          ],
          bgColors: [
            '#01a2cb', 
            '#e1eff3', 
            '#0398cf'
          ],
        };

      case SongIDs.BETA:
        return {
          barColors: [
            '#0072CE', 
            '#127cd1', 
            '#ffffff', 
            '#00a2cb',
            '#022d97'
          ],
          bgColors: [
            '#0072CE', 
            '#a9cfee', 
            '#022d97'
          ],
        };

      case SongIDs.GAMMA:
        return {
          barColors: [
            '#168cb9', 
            '#168cb9', 
            '#ffffff', 
            '#5e6ac9',
            '#5e6ac9'
          ],
          bgColors: [
            '#168cb9', 
            '#ffffff', 
            '#5e6ac9'
          ],
        };

      default:
        return {
          barColors: [
            '#111111', 
            '#888888', 
            '#ffffff', 
            '#cccccc',
            '#111111'
          ],
          bgColors: [
            '#111111', 
            '#222222', 
            '#111111'
          ],
        };
    }
  },
};

export default VisualizerColors;
