/**
 * emoTIC - Personaje Guía Acompañante: LUMI
 * Proporciona el acompañamiento socioemocional y las explicaciones completas requeridas.
 */

window.emoTIC_Guide = {
  currentActivity: null,

  init() {
    this.createFloatingButton();
    this.createGuideModal();
  },

  createFloatingButton() {
    if (document.getElementById("lumi-floating-btn")) return;

    const btn = document.createElement("button");
    btn.id = "lumi-floating-btn";
    btn.className = "lumi-floating-btn";
    btn.setAttribute("aria-label", "Abrir ayuda de Lumi, tu personaje guía");
    btn.innerHTML = `
      <div class="lumi-avatar-wrapper">
        <img src="assets/illustrations/lumi.png" alt="Lumi el guía" class="lumi-mini-img"/>
        <span class="lumi-badge-pulse"></span>
      </div>
      <span class="lumi-btn-text">¡Ayuda de Lumi!</span>
    `;

    btn.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      this.openGuideModal();
    });

    document.body.appendChild(btn);
  },

  createGuideModal() {
    if (document.getElementById("lumi-guide-modal")) return;

    const modal = document.createElement("div");
    modal.id = "lumi-guide-modal";
    modal.className = "lumi-modal-overlay";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "lumi-modal-title");
    modal.style.display = "none";

    modal.innerHTML = `
      <div class="lumi-modal-card">
        <div class="lumi-modal-header">
          <div class="lumi-header-info">
            <img src="assets/illustrations/lumi.png" alt="Lumi" class="lumi-modal-img"/>
            <div>
              <h2 id="lumi-modal-title" class="lumi-title">¡Hola! Soy Lumi, tu guía</h2>
              <p class="lumi-subtitle" id="lumi-world-indicator">Acompañándote en cada paso de tu aventura</p>
            </div>
          </div>
          <button class="lumi-close-btn" id="lumi-close-btn" aria-label="Cerrar ayuda">&times;</button>
        </div>

        <!-- Barra de pestañas con los 10 puntos clave del acompañamiento -->
        <nav class="lumi-tabs-nav" aria-label="Temas de ayuda">
          <button class="lumi-tab active" data-tab="tab-mision">1. ¿Qué aprenderemos?</button>
          <button class="lumi-tab" data-tab="tab-como-jugar">2. ¿Cómo se juega?</button>
          <button class="lumi-tab" data-tab="tab-botones">3. ¿Qué significan los botones?</button>
          <button class="lumi-tab" data-tab="tab-aciertos">4. ¿Aciertos y errores?</button>
          <button class="lumi-tab" data-tab="tab-repetir">5. Repetir y repasar</button>
        </nav>

        <div class="lumi-modal-body">
          <!-- Pestaña 1: Mundo y Objetivo -->
          <div class="lumi-tab-pane active" id="tab-mision">
            <div class="lumi-speech-box">
              <h3 class="lumi-pane-title">🌟 Mundo y Misión Actual</h3>
              <p id="lumi-txt-mundo">Estás visitando los Mundos de las Emociones.</p>
              <p id="lumi-txt-aprender">Aquí aprenderás a identificar lo que sientes, conectar con los demás y comunicarte en paz.</p>
              <div class="lumi-audio-action">
                <button class="btn-voice-read" id="btn-read-mision">🔊 Escuchar a Lumi</button>
                <button class="btn-voice-read" id="btn-config-voice-from-guide" style="background:#EDE7F6; color:#4527A0; border-color:#D1C4E9; margin-left:8px;">🗣️ Cambiar Voz</button>
              </div>
            </div>
          </div>

          <!-- Pestaña 2: Cómo se juega e interacciones -->
          <div class="lumi-tab-pane" id="tab-como-jugar">
            <div class="lumi-speech-box">
              <h3 class="lumi-pane-title">🎮 Instrucciones del Nivel</h3>
              <p id="lumi-txt-hacer">En este nivel pondrás a prueba tus habilidades observando con atención y tomando decisiones conscientes.</p>
              <div class="lumi-interaction-tips">
                <div class="tip-card">
                  <span class="tip-icon">👆</span>
                  <div>
                    <strong>Toca o Haz Clic:</strong>
                    <p>En celular toca suavemente tu opción; en computador usa el ratón o el teclado.</p>
                  </div>
                </div>
                <div class="tip-card">
                  <span class="tip-icon">🔀</span>
                  <div>
                    <strong>Relaciona o Une:</strong>
                    <p>Toca primero una emoción y luego toca la carita o situación que le corresponde.</p>
                  </div>
                </div>
                <div class="tip-card">
                  <span class="tip-icon">👂</span>
                  <div>
                    <strong>Escucha con calma:</strong>
                    <p>Puedes pulsar el botón de audio en cualquier momento para oír las instrucciones.</p>
                  </div>
                </div>
              </div>
              <div class="lumi-audio-action">
                <button class="btn-voice-read" id="btn-read-como-jugar">🔊 Escuchar instrucciones</button>
              </div>
            </div>
          </div>

          <!-- Pestaña 3: Significado de botones -->
          <div class="lumi-tab-pane" id="tab-botones">
            <div class="lumi-speech-box">
              <h3 class="lumi-pane-title">🔘 ¿Qué significan los botones?</h3>
              <div class="lumi-buttons-legend">
                <div class="legend-row">
                  <span class="legend-pill" style="background:#43A047">Continuar ▶</span>
                  <span>Avanza a la siguiente fase o juego una vez que hayas leído o completado el ejercicio.</span>
                </div>
                <div class="legend-row">
                  <span class="legend-pill" style="background:#FB8C00">Pista 💡</span>
                  <span>Te da una ayuda amistosa sin darte la respuesta de inmediato, para que lo descubras tú.</span>
                </div>
                <div class="legend-row">
                  <span class="legend-pill" style="background:#5C6BC0">🔊 Escuchar</span>
                  <span>Lee en voz alta las instrucciones si prefieres oír en lugar de leer.</span>
                </div>
                <div class="legend-row">
                  <span class="legend-pill" style="background:#7E57C2">Volver ↩</span>
                  <span>Regresa al mapa de mundos para elegir otra aventura. ¡Tu progreso queda guardado!</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Pestaña 4: Qué pasa si aciertas o te equivocas -->
          <div class="lumi-tab-pane" id="tab-aciertos">
            <div class="lumi-speech-box">
              <h3 class="lumi-pane-title">✨ Aciertos y Oportunidades</h3>
              <div class="card-feedback-guide">
                <div class="guide-box positive">
                  <h4>🎉 ¿Qué ocurre al responder correctamente?</h4>
                  <p>¡El sistema te felicitará explicando por qué tu respuesta promueve la empatía o la calma! Recibirás estrellas doradas y avanzarás hacia tu insignia.</p>
                </div>
                <div class="guide-box support">
                  <h4>🌱 ¿Qué pasa si te equivocas?</h4>
                  <p><strong>¡Nunca te castigaremos ni te juzgaremos!</strong> Equivocarse es la forma más natural de aprender. Te daremos una pista amable para que lo intentes de nuevo con calma.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pestaña 5: Repetir nivel y aprendizajes -->
          <div class="lumi-tab-pane" id="tab-repetir">
            <div class="lumi-speech-box">
              <h3 class="lumi-pane-title">🔄 Repetir para Fortalecer</h3>
              <p>Puedes repetir cualquier nivel tantas veces como quieras. Cada vez que juegues, reforzarás tu cerebro socioemocional.</p>
              <div class="summary-box">
                <h4>🎯 ¿Qué habrás aprendido al terminar?</h4>
                <p id="lumi-txt-cierre-resumen">Aprenderás a nombrar lo que sientes, actuar con serenidad y convivir en armonía con tus compañeros.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="lumi-modal-footer">
          <button class="btn-primary" id="lumi-modal-ok">¡Entendido, Lumi! A jugar</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Eventos del modal
    document.getElementById("lumi-close-btn").addEventListener("click", () => this.closeGuideModal());
    document.getElementById("lumi-modal-ok").addEventListener("click", () => this.closeGuideModal());

    modal.addEventListener("click", (e) => {
      if (e.target === modal) this.closeGuideModal();
    });

    // Pestañas
    const tabs = modal.querySelectorAll(".lumi-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        tabs.forEach(t => t.classList.remove("active"));
        modal.querySelectorAll(".lumi-tab-pane").forEach(p => p.classList.remove("active"));

        tab.classList.add("active");
        const targetId = tab.getAttribute("data-tab");
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add("active");
      });
    });

    // Botones de lectura por voz
    document.getElementById("btn-read-mision").addEventListener("click", () => {
      const text = document.getElementById("lumi-txt-mundo").textContent + " " + document.getElementById("lumi-txt-aprender").textContent;
      emoTIC_Sound.speak(text);
    });

    document.getElementById("btn-read-como-jugar").addEventListener("click", () => {
      const text = document.getElementById("lumi-txt-hacer").textContent;
      emoTIC_Sound.speak(text);
    });

    const btnConfigVoice = document.getElementById("btn-config-voice-from-guide");
    if (btnConfigVoice) {
      btnConfigVoice.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        emoTIC_Sound.openVoiceSettingsModal();
      });
    }
  },

  setContextActivity(activity) {
    this.currentActivity = activity;
    this.updateModalTexts();
  },

  updateModalTexts() {
    const act = this.currentActivity;
    const worldInd = document.getElementById("lumi-world-indicator");
    const txtMundo = document.getElementById("lumi-txt-mundo");
    const txtAprender = document.getElementById("lumi-txt-aprender");
    const txtHacer = document.getElementById("lumi-txt-hacer");
    const txtResumen = document.getElementById("lumi-txt-cierre-resumen");

    if (act) {
      if (worldInd) worldInd.textContent = `${act.officialCode ? act.officialCode + " • " : ""}${act.title}`;
      if (txtMundo) txtMundo.textContent = `Estás en la misión: «${act.title}», guiado por ${act.characterName || "Lumi"}.`;
      if (txtAprender) txtAprender.textContent = `Aprenderás sobre: ${act.competence}. Objetivo: ${act.learningObjective}`;
      if (txtHacer) txtHacer.textContent = act.pedagogicalPhases ? act.pedagogicalPhases.welcome.text : "Observa con atención y responde con el corazón.";
      if (txtResumen) txtResumen.textContent = act.pedagogicalPhases ? act.pedagogicalPhases.closing.reflection : "Aprenderás a relacionarte con paz y respeto.";
    } else {
      if (worldInd) worldInd.textContent = "Elige un mundo para comenzar tu aventura";
      if (txtMundo) txtMundo.textContent = "Estás en el mapa interactivo de emoTIC.";
      if (txtAprender) txtAprender.textContent = "Aprenderás a través de los 18 niveles ordenados de la Aventura de las Emociones.";
      if (txtHacer) txtHacer.textContent = "Selecciona cualquiera de los niveles desbloqueados para comenzar tu misión y jugar.";
    }
  },

  openGuideModal() {
    this.updateModalTexts();
    const modal = document.getElementById("lumi-guide-modal");
    if (modal) {
      modal.style.display = "flex";
      // Hablar bienvenida breve
      if (this.currentActivity && this.currentActivity.pedagogicalPhases) {
        emoTIC_Sound.speak(this.currentActivity.pedagogicalPhases.welcome.audioText || "¡Hola! Aquí tienes la guía de este nivel.");
      }
    }
  },

  closeGuideModal() {
    emoTIC_Sound.stopSpeaking();
    const modal = document.getElementById("lumi-guide-modal");
    if (modal) modal.style.display = "none";
  },

  // Mostrar mensaje emergente de Lumi con retroalimentación formativa
  showFeedbackToast(message, isSuccess = true) {
    let toast = document.getElementById("lumi-feedback-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "lumi-feedback-toast";
      toast.className = "lumi-feedback-toast";
      document.body.appendChild(toast);
    }

    toast.className = `lumi-feedback-toast ${isSuccess ? "toast-success" : "toast-support"}`;
    toast.innerHTML = `
      <img src="assets/illustrations/lumi.png" alt="Lumi" class="toast-lumi-icon"/>
      <div class="toast-body">
        <strong>${isSuccess ? "¡Maravilloso progreso!" : "¡Buen intento, vamos a reflexionar!"}</strong>
        <p>${message}</p>
      </div>
    `;

    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 7000);

    emoTIC_Sound.speak(message);
  }
};
