// Focus Plant Pro - Web Audio API Procedural Sound Synthesizer
// Completely self-contained, no external MP3/audio files needed!

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.ambientNodes = [];
    this.currentAmbient = "none";
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Play a celebratory crystal chime on focus complete
  playCompleteChime() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.12);

      gain.gain.setValueAtTime(0, this.ctx.currentTime + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + i * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + i * 0.12);
      osc.stop(this.ctx.currentTime + i * 0.12 + 1.3);
    });
  }

  // Play a sad wilt sound when tree withers
  playWiltSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const notes = [440, 415.30, 392, 349.23]; // A4, Ab4, G4, F4
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.18);

      gain.gain.setValueAtTime(0, this.ctx.currentTime + i * 0.18);
      gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + i * 0.18 + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.18 + 1.0);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + i * 0.18);
      osc.stop(this.ctx.currentTime + i * 0.18 + 1.1);
    });
  }

  // Helper to create noise buffer
  createNoiseBuffer(type = "pink") {
    const bufferSize = 3 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    if (type === "pink") {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
        b6 = white * 0.115926;
      }
    } else if (type === "brown") {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
    } else {
      // White noise
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.06;
      }
    }

    return noiseBuffer;
  }

  // Play procedural ambient focus audio
  playAmbient(type) {
    this.stopAmbient();
    this.currentAmbient = type;
    if (type === "none") return;

    this.init();
    if (!this.ctx) return;

    if (type === "rain") {
      // 1. Rain: Filtered pink noise + highpass sprinkle
      const buffer = this.createNoiseBuffer("pink");
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 850;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      src.start();

      this.ambientNodes.push(src, filter, gain);
    } 
    else if (type === "waves") {
      // 2. Ocean Waves: Low brown noise modulated by slow LFO swell (period ~7.5s)
      const buffer = this.createNoiseBuffer("brown");
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 450;

      const waveGain = this.ctx.createGain();
      waveGain.gain.setValueAtTime(0.1, this.ctx.currentTime);

      // LFO for rhythmic ocean tide
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.13; // ~7.7s per wave
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 0.25;

      lfo.connect(lfoGain);
      lfoGain.connect(waveGain.gain);

      src.connect(filter);
      filter.connect(waveGain);
      waveGain.connect(this.ctx.destination);

      src.start();
      lfo.start();

      this.ambientNodes.push(src, lfo, lfoGain, filter, waveGain);
    }
    else if (type === "forest") {
      // 3. Forest Wind: Bandpass pink noise with slow breeze sweep
      const buffer = this.createNoiseBuffer("pink");
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 500;
      filter.Q.value = 2.0;

      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.18; // Slow wind variation
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 250;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      src.start();
      lfo.start();

      this.ambientNodes.push(src, lfo, lfoGain, filter, gain);
    }
    else if (type === "fire") {
      // 4. Cozy Campfire: Low rumble + occasional crackle pops
      const buffer = this.createNoiseBuffer("brown");
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 320;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      src.start();

      this.ambientNodes.push(src, filter, gain);
    }
    else if (type === "zen") {
      // 5. Cosmic Zen: 432 Hz + Binaural 436 Hz Theta focus drone
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const osc3 = this.ctx.createOscillator();

      osc1.type = "sine";
      osc1.frequency.value = 216; // Harmonic A3
      osc2.type = "sine";
      osc2.frequency.value = 220; // 4 Hz binaural beat (Theta state)
      osc3.type = "sine";
      osc3.frequency.value = 432; // Miracle tone 432 Hz

      const gain1 = this.ctx.createGain();
      const gain2 = this.ctx.createGain();
      const gain3 = this.ctx.createGain();

      gain1.gain.value = 0.12;
      gain2.gain.value = 0.12;
      gain3.gain.value = 0.05;

      const masterGain = this.ctx.createGain();
      masterGain.gain.value = 0.35;

      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);

      gain1.connect(masterGain);
      gain2.connect(masterGain);
      gain3.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc3.start();

      this.ambientNodes.push(osc1, osc2, osc3, gain1, gain2, gain3, masterGain);
    }
    else {
      // 6. Classic White Noise
      const buffer = this.createNoiseBuffer("white");
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);

      src.connect(gain);
      gain.connect(this.ctx.destination);
      src.start();

      this.ambientNodes.push(src, gain);
    }
  }

  stopAmbient() {
    this.ambientNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.ambientNodes = [];
    this.currentAmbient = "none";
  }
}

const soundManager = new SoundEngine();
