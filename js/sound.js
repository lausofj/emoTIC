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
  },

  // Probar la voz configurada
  testVoice() {
    this.speak("¡Hola! Soy Lumi. Así suena mi voz para acompañarte en los Mundos de las Emociones.");
  },

  // Modal para cambiar y personalizar la voz
  openVoiceSettingsModal() {
    const voices = this.getSpanishVoices();
    let modal = document.getElementById("voice-settings-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "voice-settings-modal";
      modal.className = "lumi-modal-overlay";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="lumi-modal-card" style="max-width:520px;">
        <div class="lumi-modal-header" style="background: linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%);">
          <div class="lumi-header-info">
            <span style="font-size:2.2rem;">🗣️</span>
            <div>
              <h2 class="lumi-title" style="color:#283593;">Personalizar la Voz de Lumi</h2>
              <p class="lumi-subtitle" style="color:#3949AB;">Elige la voz y el tono que más te guste para la narración</p>
            </div>
          </div>
          <button class="lumi-close-btn" id="btn-close-voice-modal" style="color:#283593;">&times;</button>
        </div>

        <div class="lumi-modal-body">
          <div class="form-group" style="margin-bottom:18px;">
            <label for="select-voice-picker" style="font-weight:800; font-size:1rem; color:#263238; display:block; margin-bottom:8px;">
              🎙️ Selecciona una Voz del Dispositivo:
            </label>
            <select id="select-voice-picker" class="form-select" style="width:100%; padding:10px; font-size:0.95rem; border-radius:8px; border:2px solid #5C6BC0;">
              ${voices.length === 0 ? '<option value="">(Cargando voces del sistema...)</option>' : 
                voices.map(v => `
                  <option value="${v.voiceURI || v.name}" ${(v.voiceURI === this.selectedVoiceURI || v.name === this.selectedVoiceURI) ? 'selected' : ''}>
                    ${v.name} (${v.lang})${v.default ? ' [Predeterminada]' : ''}
                  </option>
                `).join('')
              }
            </select>
            <small style="color:#64748B; display:block; margin-top:4px;">
              Se muestran las voces en español instaladas en tu navegador y sistema operativo (Windows, Android, iOS o Mac).
            </small>
          </div>

          <!-- Control de Tono / Timbre -->
          <div class="form-group" style="margin-bottom:18px;">
            <label style="font-weight:800; font-size:1rem; color:#263238; display:flex; justify-content:space-between; margin-bottom:8px;">
              <span>🎭 Tono de la Voz:</span>
              <span id="label-pitch-val" style="color:#5C6BC0; font-weight:900;">${this.voicePitch >= 1.2 ? 'Infantil / Agudo' : this.voicePitch <= 0.9 ? 'Grave / Serio' : 'Cálido / Normal'}</span>
            </label>
            <input type="range" id="range-voice-pitch" min="0.6" max="1.8" step="0.1" value="${this.voicePitch}" style="width:100%; accent-color:#5C6BC0; cursor:pointer;" />
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:#64748B; margin-top:4px;">
              <span>Grave</span>
              <span>Normal</span>
              <span>Infantil / Juvenil</span>
            </div>
          </div>

          <!-- Control de Velocidad -->
          <div class="form-group" style="margin-bottom:18px;">
            <label style="font-weight:800; font-size:1rem; color:#263238; display:flex; justify-content:space-between; margin-bottom:8px;">
              <span>⏱️ Velocidad de Lectura:</span>
              <span id="label-rate-val" style="color:#5C6BC0; font-weight:900;">${this.voiceRate < 0.9 ? 'Despacio' : this.voiceRate > 1.05 ? 'Rápido' : 'Pausado (Ideal niños)'}</span>
            </label>
            <input type="range" id="range-voice-rate" min="0.7" max="1.3" step="0.05" value="${this.voiceRate}" style="width:100%; accent-color:#5C6BC0; cursor:pointer;" />
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:#64748B; margin-top:4px;">
              <span>Lento</span>
              <span>Pausado</span>
              <span>Rápido</span>
            </div>
          </div>

          <!-- Botón de prueba -->
          <div style="background:#F0F4FF; padding:14px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; gap:12px;">
            <div>
              <strong style="color:#283593; display:block; font-size:0.95rem;">¿Cómo se escucha?</strong>
              <small style="color:#546E7A;">Prueba la voz antes de guardar los cambios.</small>
            </div>
            <button class="btn-secondary" id="btn-test-voice-sample" style="white-space:nowrap;">
              🔊 Probar Voz
            </button>
          </div>
        </div>

        <div class="lumi-modal-footer" style="display:flex; justify-content:space-between; align-items:center;">
          <button class="btn-secondary" id="btn-reset-voice-defaults" style="font-size:0.85rem;">Restablecer Predeterminada</button>
          <div style="display:flex; gap:10px;">
            <button class="btn-primary" id="btn-save-voice-settings">💾 Guardar Voz</button>
          </div>
        </div>
      </div>
    `;

    modal.style.display = "flex";

    // Eventos del modal
    const close = () => {
      this.stopSpeaking();
      modal.style.display = "none";
    };

    document.getElementById("btn-close-voice-modal").addEventListener("click", close);

    const pitchRange = document.getElementById("range-voice-pitch");
    const pitchLabel = document.getElementById("label-pitch-val");
    pitchRange.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      this.voicePitch = val;
      pitchLabel.textContent = val >= 1.25 ? "Infantil / Agudo" : val <= 0.85 ? "Grave" : "Cálido / Normal";
    });

    const rateRange = document.getElementById("range-voice-rate");
    const rateLabel = document.getElementById("label-rate-val");
    rateRange.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      this.voiceRate = val;
      rateLabel.textContent = val < 0.9 ? "Despacio" : val > 1.05 ? "Rápido" : "Pausado (Ideal niños)";
    });

    const voicePicker = document.getElementById("select-voice-picker");
    voicePicker.addEventListener("change", (e) => {
      this.selectedVoiceURI = e.target.value;
    });

    // Probar voz
    document.getElementById("btn-test-voice-sample").addEventListener("click", () => {
      this.selectedVoiceURI = voicePicker.value;
      this.voicePitch = parseFloat(pitchRange.value);
      this.voiceRate = parseFloat(rateRange.value);
      this.testVoice();
    });

    // Restablecer valores
    document.getElementById("btn-reset-voice-defaults").addEventListener("click", () => {
      this.voicePitch = 1.15;
      this.voiceRate = 0.95;
      pitchRange.value = 1.15;
      rateRange.value = 0.95;
      pitchLabel.textContent = "Cálido / Normal";
      rateLabel.textContent = "Pausado (Ideal niños)";
      if (voices.length > 0) {
        const defaultEs = voices.find(v => v.lang.startsWith("es"));
        if (defaultEs) {
          voicePicker.value = defaultEs.voiceURI || defaultEs.name;
          this.selectedVoiceURI = voicePicker.value;
        }
      }
      this.testVoice();
    });

    // Guardar configuración
    document.getElementById("btn-save-voice-settings").addEventListener("click", async () => {
      this.selectedVoiceURI = voicePicker.value;
      this.voicePitch = parseFloat(pitchRange.value);
      this.voiceRate = parseFloat(rateRange.value);

      await emoTIC_DB.saveSetting("selectedVoiceURI", this.selectedVoiceURI);
      await emoTIC_DB.saveSetting("voicePitch", this.voicePitch);
      await emoTIC_DB.saveSetting("voiceRate", this.voiceRate);

      emoTIC_Sound.playSuccess();
      emoTIC_Guide.showFeedbackToast("¡Voz personalizada guardada con éxito!", true);
      close();
    });
  }
};
