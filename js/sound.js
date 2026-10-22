/**
 * emoTIC - Sistema de Sonido y Voz Educativa
 * Utiliza Web Audio API para sintetizar efectos sonoros alegres 100% locales (sin archivos externos)
 * y Web Speech API para narración hablada con selector de voces personalizable y subtítulos accesibles.
 */

window.emoTIC_Sound = {
  audioCtx: null,
  soundEnabled: true,
  speechEnabled: true,
  currentUtterance: null,
  availableVoices: [],
  selectedVoiceURI: null,
  voicePitch: 1.15, // Tono ligeramente cálido e infantil por defecto
  voiceRate: 0.95,  // Velocidad pausada y clara para niños

  async init() {
    // Cargar preferencias de voz guardadas
    this.selectedVoiceURI = await emoTIC_DB.getSetting("selectedVoiceURI", null);
    this.voicePitch = parseFloat(await emoTIC_DB.getSetting("voicePitch", 1.15));
    this.voiceRate = parseFloat(await emoTIC_DB.getSetting("voiceRate", 0.95));

    // Escuchar voces de Web Speech API
    if ("speechSynthesis" in window) {
      const loadVoices = () => {
        this.availableVoices = window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  },

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  },

  // Tono de click suave amigable
  playClick() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  },

  // Acorde mayor alegre de acierto (éxito)
  playSuccess() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // Do, Mi, Sol, Do alto
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.09 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.09);
      osc.stop(ctx.currentTime + idx * 0.09 + 0.35);
    });
  },

  // Sonido suave de retroalimentación constructiva (amable, nunca punitivo)
  playGentleNotice() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [392.00, 440.00]; // Sol, La suave
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.25);
    });
  },

  // Fanfarria de insignia / medalla obtenida
  playBadge() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const start = ctx.currentTime + idx * 0.1;
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.01, start);
      gain.gain.linearRampToValueAtTime(0.22, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.5);
    });
  },

  // Sonido respiración inhalar (Globito se infla)
  playBreatheIn(durationSec = 3) {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + durationSec);

    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + durationSec * 0.8);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + durationSec);
  },

  // Sonido respiración exhalar (Globito se desinfla suave)
  playBreatheOut(durationSec = 3) {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + durationSec);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + durationSec);
  },

  // Obtener lista de voces disponibles priorizando español
  getAvailableVoicesList() {
    if ("speechSynthesis" in window) {
      this.availableVoices = window.speechSynthesis.getVoices();
    }
    return this.availableVoices;
  },

  getSpanishVoices() {
    const all = this.getAvailableVoicesList();
    const es = all.filter(v => v.lang.startsWith("es"));
    return es.length > 0 ? es : all;
  },

  // Narración por voz del navegador con subtítulos accesibles
  speak(text, onEnd) {
    this.showSubtitles(text);

    if (!this.speechEnabled || !("speechSynthesis" in window)) {
      if (onEnd) setTimeout(onEnd, 1200);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "es-ES";
      utter.rate = this.voiceRate || 0.95;
      utter.pitch = this.voicePitch || 1.15;

      // Obtener voces actualizadas
      if (this.availableVoices.length === 0) {
        this.availableVoices = window.speechSynthesis.getVoices();
      }

      // Si el usuario seleccionó una voz específica, usarla
      let chosenVoice = null;
      if (this.selectedVoiceURI) {
        chosenVoice = this.availableVoices.find(v => v.voiceURI === this.selectedVoiceURI || v.name === this.selectedVoiceURI);
      }

      // Si no hay voz seleccionada o no se encontró, buscar una voz en español
      if (!chosenVoice) {
        chosenVoice = this.availableVoices.find(v => v.lang.startsWith("es"));
      }

      if (chosenVoice) {
        utter.voice = chosenVoice;
        utter.lang = chosenVoice.lang;
      }

      utter.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };
      utter.onerror = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      this.currentUtterance = utter;
      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.warn("SpeechSynthesis error:", e);
      if (onEnd) setTimeout(onEnd, 1000);
    }
  },

  stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
    const sub = document.getElementById("emotic-subtitles");
    if (sub) sub.classList.remove("visible");
  },

  showSubtitles(text) {
    let sub = document.getElementById("emotic-subtitles");
    if (!sub) {
      sub = document.createElement("div");
      sub.id = "emotic-subtitles";
      sub.className = "emotic-subtitles-bar";
      sub.setAttribute("role", "status");
      sub.setAttribute("aria-live", "polite");
      document.body.appendChild(sub);
    }
    sub.innerHTML = `<span>💬 ${text}</span>`;
    sub.classList.add("visible");
    clearTimeout(sub._timer);
    sub._timer = setTimeout(() => {
      sub.classList.remove("visible");
    }, 7000);
  }
};

