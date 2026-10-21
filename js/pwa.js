/**
 * emoTIC - Módulo PWA y Gestión Sin Conexión (Offline)
 * Registro de Service Worker, instalación en dispositivo y monitor de conexión en tiempo real.
 */

window.emoTIC_PWA = {
  deferredPrompt: null,
  isOnline: navigator.onLine,

  init() {
    this.registerServiceWorker();
    this.setupNetworkMonitor();
    this.setupInstallPrompt();
    this.updateNetworkUI();
  },

  // Registrar Service Worker
  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
          .then(registration => {
            console.log("Service Worker de emoTIC registrado con éxito:", registration.scope);
            registration.update();
          })
          .catch(error => {
            console.warn("Fallo en registro de Service Worker (esperable en file:// directo):", error);
          });
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
      emoTIC_Guide.showFeedbackToast("Estás en modo sin internet. ¡Todos los juegos y cuentos locales siguen funcionando perfectamente!", true);
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
      pill.innerHTML = `🟠 <span>Sin Internet (Juegos listos)</span>`;
      pill.title = "Modo sin conexión activo. Todos los juegos y actividades esenciales siguen disponibles.";
    }
  },

  // Capturar evento para botón de instalación
  setupInstallPrompt() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;

      // Mostrar botón de instalación
      const btnInstall = document.getElementById("btn-install-app");
      if (btnInstall) {
        btnInstall.style.display = "inline-flex";
        btnInstall.addEventListener("click", () => this.promptInstall());
      }
    });

    window.addEventListener("appinstalled", () => {
      console.log("emoTIC ha sido instalada exitosamente en el dispositivo.");
      const btnInstall = document.getElementById("btn-install-app");
      if (btnInstall) btnInstall.style.display = "none";
      emoTIC_Guide.showFeedbackToast("¡emoTIC instalada! Ahora puedes abrirla desde tu pantalla de inicio sin internet.", true);
    });
  },

  promptInstall() {
    if (!this.deferredPrompt) {
      alert("Para instalar emoTIC, abre el menú de tu navegador (los tres puntos o el botón de compartir) y selecciona 'Instalar aplicación' o 'Agregar a la pantalla principal'.");
      return;
    }
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("Usuario aceptó la instalación de emoTIC.");
      }
      this.deferredPrompt = null;
    });
  },

  // Mostrar modal informativo de cómo preparar el modo sin conexión
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
          <h2 class="lumi-title">📶 Cómo usar emoTIC sin internet</h2>
          <button class="lumi-close-btn" id="btn-close-offhelp">&times;</button>
        </div>
        <div class="lumi-modal-body">
          <p>emoTIC está diseñada como una <strong>PWA (Progressive Web App)</strong> para que las escuelas y hogares puedan utilizarla en cualquier lugar, incluso sin conexión a internet.</p>
          
          <div class="offline-steps-list">
            <div class="off-step">
              <span class="off-step-num">1</span>
              <div>
                <strong>Abre la aplicación con conexión la primera vez:</strong>
                <p>Al abrir la aplicación con internet, el Service Worker descarga y guarda automáticamente todos los juegos, personajes y sonidos en la memoria de tu dispositivo.</p>
              </div>
            </div>
            <div class="off-step">
              <span class="off-step-num">2</span>
              <div>
                <strong>Instálala como aplicación:</strong>
                <p>Presiona el botón verde <strong>«Instalar App»</strong> o elige 'Agregar a inicio' en tu celular o computador.</p>
              </div>
            </div>
            <div class="off-step">
              <span class="off-step-num">3</span>
              <div>
                <strong>¡Aprende sin conexión!</strong>
                <p>Desconecta el WiFi o viaja a zonas rurales. Todos los 3 territorios, los 18 niveles ordenados de la aventura y el guardado de progreso seguirán funcionando al 100%.</p>
              </div>
            </div>
          </div>

          <div class="off-note-warning">
            📌 <em>Nota importante:</em> Los videos externos de YouTube requieren internet, pero cada video cuenta con su actividad o cuento local alternativo que nunca se apaga.
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
