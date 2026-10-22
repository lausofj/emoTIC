/**
 * emoTIC - Módulo de Estado de Conexión y Red
 * Monitor de conexión en tiempo real y desregistro preventivo de Service Workers.
 */

window.emoTIC_PWA = {
  isOnline: navigator.onLine,

  init() {
    this.unregisterExistingServiceWorkers();
    this.setupNetworkMonitor();
    this.updateNetworkUI();
  },

  // Desregistrar Service Workers existentes y limpiar cachés PWA
  unregisterExistingServiceWorkers() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
          registration.unregister().then(success => {
            if (success) {
              console.log("Service Worker de emoTIC desregistrado correctamente.");
            }
          });
        }
      }).catch(err => {
        console.warn("Aviso al consultar Service Workers:", err);
      });
    }

    if ("caches" in window) {
      caches.keys().then(keys => {
        return Promise.all(keys.map(k => caches.delete(k)));
      }).catch(err => {
        console.warn("Aviso al limpiar cachés previas:", err);
      });
    }
  },

  // Monitorear cambios de red online / offline
  setupNetworkMonitor() {
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.updateNetworkUI();
      emoTIC_Sound.playSuccess();
      emoTIC_Guide.showFeedbackToast("¡Conexión a internet restablecida! Recursos en línea disponibles.", true);
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
      this.updateNetworkUI();
      emoTIC_Sound.playGentleNotice();
      emoTIC_Guide.showFeedbackToast("Estás en modo sin internet. ¡Los juegos y cuentos locales siguen funcionando perfectamente!", true);
    });
  },

  // Actualizar la insignia visual en la barra superior
  updateNetworkUI() {
    const pill = document.getElementById("network-status-pill");
    if (!pill) return;

    if (navigator.onLine) {
      pill.className = "network-pill online";
      pill.innerHTML = `🟢 <span>En Línea</span>`;
      pill.title = "Conexión a internet activa. Videos y recursos externos disponibles.";
    } else {
      pill.className = "network-pill offline";
      pill.innerHTML = `🟠 <span>Sin Internet</span>`;
      pill.title = "Modo sin conexión. Todos los juegos y actividades locales siguen disponibles.";
    }
  },

  // Mostrar modal informativo de cómo utilizar la plataforma
  showOfflineHelpModal() {
    let modal = document.getElementById("offline-help-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "offline-help-modal";
      modal.className = "lumi-modal-overlay";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="lumi-modal-card" style="max-width:540px;">
        <div class="lumi-modal-header">
          <h2 class="lumi-title">📶 Cómo usar emoTIC</h2>
          <button class="lumi-close-btn" id="btn-close-offhelp">&times;</button>
        </div>
        <div class="lumi-modal-body">
          <p>emoTIC está diseñada para que las escuelas y hogares puedan utilizarla en cualquier navegador de forma rápida y sencilla.</p>
          
          <div class="offline-steps-list">
            <div class="off-step">
              <span class="off-step-num">1</span>
              <div>
                <strong>Aprende a tu propio ritmo:</strong>
                <p>Todos los territorios, actividades guiadas y retos de autoconocimiento emocional están disponibles directamente desde el navegador.</p>
              </div>
            </div>
            <div class="off-step">
              <span class="off-step-num">2</span>
              <div>
                <strong>Progreso y estrellas:</strong>
                <p>Tus avances y estrellas se guardan automáticamente en tu navegador para que nunca pierdas tus logros.</p>
              </div>
            </div>
          </div>

          <div class="off-note-warning">
            📌 <em>Nota:</em> Los videos externos requieren conexión a internet activa, pero las dinámicas interactivas locales están siempre listas.
          </div>
        </div>
        <div class="lumi-modal-footer">
          <button class="btn-primary" id="btn-offhelp-ok">¡Comprendido!</button>
        </div>
      </div>
    `;

    modal.style.display = "flex";

    document.getElementById("btn-close-offhelp").addEventListener("click", () => {
      modal.style.display = "none";
    });
    document.getElementById("btn-offhelp-ok").addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
};
