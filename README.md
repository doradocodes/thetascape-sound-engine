# Thetascape Sound Engine

A powerful sound engine built with Tone.js for creating dynamic, interactive audio experiences.

## Installation

```bash
npm install thetascape-sound-engine
```

## Prerequisites

This library requires Tone.js as a peer dependency:

```bash
npm install tone
```

## Usage

### Basic Setup

```javascript
import ThetascapeSoundEngine from 'thetascape-sound-engine';
import * as Tone from 'tone';

// Initialize the engine
const engine = await ThetascapeSoundEngine.init();

// Play a song (0 = Intro, 1 = Delta, 2 = Theta, 3 = Alpha, 4 = Beta, 5 = Gamma)
engine.playSong(0);
```

### Quick Test with CDN

For quick testing without a build process:

```js
import ThetascapeSoundEngine from 'thetascape-sound-engine';
import * as Tone from 'tone';

// Initialize the engine
const engine = await ThetascapeSoundEngine.init();

// Play a song (0 = Intro, 1 = Delta, 2 = Theta, 3 = Alpha, 4 = Beta, 5 = Gamma)
engine.playSong(0);

```

## API Reference

### `ThetascapeSoundEngine.init()`

Initializes the audio engine and returns a promise that resolves to the engine instance.

**Returns:** `Promise<AudioEngine>`

### `engine.playSong(songID)`

Plays a specific song by ID.

**Parameters:**
- `songID` (number): The ID of the song to play
  - `0`: Intro
  - `1`: Delta
  - `2`: Theta
  - `3`: Alpha
  - `4`: Beta
  - `5`: Gamma

### `engine.stopSong()`

Stops the currently playing song.

## Song Frequencies

Each song is designed to work with specific brainwave frequencies:

- **Intro**: General introduction
- **Delta**: 0.5-4 Hz (Deep sleep)
- **Theta**: 4-8 Hz (Meditation, creativity)
- **Alpha**: 8-13 Hz (Relaxation, calm)
- **Beta**: 13-30 Hz (Active thinking, focus)
- **Gamma**: 30-100 Hz (High-level processing)

## Features

- **Dynamic Audio Engine**: Built on Tone.js for high-performance audio
- **Multiple Song Types**: 6 different songs optimized for different brainwave frequencies
- **Real-time Control**: Start, stop, and switch between songs dynamically
- **Browser Compatible**: Works in all modern browsers with Web Audio API support
- **Modular Design**: Easy to integrate into existing projects

## Browser Support

This library requires a browser that supports:
- Web Audio API
- ES6 Modules
- Async/Await

## License

ISC

## Author

Jason Snell

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
