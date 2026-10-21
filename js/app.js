/**
 * emoTIC - Orquestador Principal de la Aplicación
 * Inicializa módulos, accesibilidad y eventos globales.
 */

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Iniciando emoTIC: Mundos de las Emociones...");

  // 1. Inicializar almacenamiento local (IndexedDB)
  await emoTIC_DB.init();

  // 2. Inicializar sistema de sonido y voz
  emoTIC_Sound.init();

  // 3. Inicializar personaje guía (Lumi)
  emoTIC_Guide.init();

  // 4. Inicializar PWA y red
  emoTIC_PWA.init();

  // 5. Inicializar navegación y grado escolar
  await emoTIC_Navigation.init();

  // 6. Configurar accesibilidad guardada
  await initAccessibilitySettings();

  // 7. Enlazar eventos de la interfaz principal
  bindGlobalEvents();

  // Renderizar pantalla de bienvenida inicial
  emoTIC_Navigation.renderWelcomeScreen();
});

// Configuración de accesibilidad (sin modo nocturno, garantizando paleta clara y alegre)
async function initAccessibilitySettings() {
  const isLargeText = await emoTIC_DB.getSetting("largeText", false);
  const isReducedMotion = await emoTIC_DB.getSetting("reducedMotion", false);
  const isMuted = await emoTIC_DB.getSetting("soundMuted", false);

  if (isLargeText) document.body.classList.add("large-text");
  if (isReducedMotion) document.body.classList.add("reduced-motion");
  if (isMuted) {
    emoTIC_Sound.soundEnabled = false;
    emoTIC_Sound.speechEnabled = false;
    const btnMute = document.getElementById("btn-toggle-sound");
    if (btnMute) btnMute.textContent = "🔇";
  }
}

function bindGlobalEvents() {
  // Pestañas de la pantalla de inicio estilo Emoti
  const tabJugar = document.getElementById("tab-home-jugar");
  const tabEstrellas = document.getElementById("tab-home-estrellas");
  const tabDocente = document.getElementById("tab-home-docente");
  const panelJugar = document.getElementById("card-panel-jugar");
  const panelEstrellas = document.getElementById("card-panel-estrellas");

  if (tabJugar && tabEstrellas && panelJugar && panelEstrellas) {
    tabJugar.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      tabJugar.classList.add("active");
      tabEstrellas.classList.remove("active");
      if (tabDocente) tabDocente.classList.remove("active");
      panelJugar.style.display = "block";
      panelEstrellas.style.display = "none";
    });

    tabEstrellas.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      tabEstrellas.classList.add("active");
      tabJugar.classList.remove("active");
      if (tabDocente) tabDocente.classList.remove("active");
      panelJugar.style.display = "none";
      panelEstrellas.style.display = "block";
      renderHomeStarsBadges();
    });

    if (tabDocente) {
      tabDocente.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        emoTIC_Teacher.checkAccess(() => {
          emoTIC_Teacher.renderTeacherDashboard();
          emoTIC_Navigation.showScreen("teacher-screen");
        });
      });
    }
  }

  // Botón comenzar aventura / Jugar desde la pantalla principal -> Inicia directamente el Nivel 1
  const btnStart = document.getElementById("btn-start-adventure");
  if (btnStart) {
    btnStart.addEventListener("click", () => {
      emoTIC_Sound.playSuccess();
      const activities = emoTIC_Navigation.getAllActivities();
      const act1 = activities.find(a => a.id === "act-1") || activities[0];
      if (act1) {
        emoTIC_Games.launchActivity(act1);
        emoTIC_Navigation.showScreen("activity-screen");
      } else {
        emoTIC_Navigation.showScreen("worlds-screen");
      }
    });
  }

  // Selector de Avatar del Estudiante (Niña y Niño - Estilo nuevo)
  const btnAvatarNina = document.getElementById("btn-avatar-nina");
  const btnAvatarNino = document.getElementById("btn-avatar-nino");
  const avatarMainImg = document.getElementById("notebook-avatar-main-img");

  if (btnAvatarNina && btnAvatarNino) {
    btnAvatarNina.addEventListener("click", async () => {
      emoTIC_Sound.playClick();
      btnAvatarNina.classList.add("active");
      btnAvatarNino.classList.remove("active");
      if (avatarMainImg) {
        avatarMainImg.src = "assets/illustrations/avatar-display-nina.svg";
        avatarMainImg.style.transform = "scale(0.9)";
        setTimeout(() => avatarMainImg.style.transform = "scale(1)", 150);
      }
      await emoTIC_DB.saveSetting("homeAvatarSelected", "nina");
    });

    btnAvatarNino.addEventListener("click", async () => {
      emoTIC_Sound.playClick();
      btnAvatarNino.classList.add("active");
      btnAvatarNino.classList.remove("active");
      if (avatarMainImg) {
        avatarMainImg.src = "assets/illustrations/avatar-display-nino.svg";
        avatarMainImg.style.transform = "scale(0.9)";
        setTimeout(() => avatarMainImg.style.transform = "scale(1)", 150);
      }
      await emoTIC_DB.saveSetting("homeAvatarSelected", "nino");
    });
  }

  // Selector rápido de accesorios en el cuaderno (Sombrero, Perrito, Nube)
  const btnAccHat = document.getElementById("btn-acc-hat");
  const btnAccDog = document.getElementById("btn-acc-dog");
  const btnAccCloud = document.getElementById("btn-acc-cloud");
  const slotHatDisplay = document.getElementById("slot-hat-display");
  const slotPetDisplay = document.getElementById("slot-pet-display");

  if (btnAccHat && btnAccDog && btnAccCloud) {
    btnAccHat.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      btnAccHat.classList.toggle("active");
      if (slotHatDisplay) {
        slotHatDisplay.style.display = btnAccHat.classList.contains("active") ? "flex" : "none";
      }
    });

    btnAccDog.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      btnAccDog.classList.add("active");
      btnAccCloud.classList.remove("active");
      if (slotPetDisplay) {
        slotPetDisplay.textContent = "🐶";
        slotPetDisplay.style.transform = "scale(1.2)";
        setTimeout(() => slotPetDisplay.style.transform = "scale(1)", 200);
      }
    });

    btnAccCloud.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      btnAccCloud.classList.add("active");
      btnAccDog.classList.remove("active");
      if (slotPetDisplay) {
        slotPetDisplay.textContent = "☁️";
        slotPetDisplay.style.transform = "scale(1.2)";
        setTimeout(() => slotPetDisplay.style.transform = "scale(1)", 200);
      }
    });
  }

  // Botón Editar Avatar (rotar accesorios y celebrar)
  const btnEditAvatar = document.getElementById("btn-edit-avatar");
  if (btnEditAvatar) {
    btnEditAvatar.addEventListener("click", () => {
      emoTIC_Sound.playSuccess();
      if (btnAccDog && btnAccCloud && slotPetDisplay) {
        if (slotPetDisplay.textContent === "☁️") {
          btnAccDog.click();
        } else {
          btnAccCloud.click();
        }
      }
    });
  }

  // Acceso Docente sin login ni password: con suma matemática
  const btnTeacherEnter = document.getElementById("btn-sidebar-teacher-enter");
  const mathInput = document.getElementById("home-math-input");
  const mathErr = document.getElementById("home-math-err");

  const verifyTeacherMath = () => {
    if (!mathInput) return;
    const val = parseInt(mathInput.value, 10);
    if (val === window._homeMathAnswer) {
      emoTIC_Sound.playSuccess();
      if (mathErr) mathErr.style.display = "none";
      mathInput.value = "";
      emoTIC_Teacher.renderTeacherDashboard();
      emoTIC_Navigation.showScreen("teacher-screen");
    } else {
      emoTIC_Sound.playGentleNotice();
      if (mathErr) mathErr.style.display = "block";
      mathInput.value = "";
      mathInput.focus();
    }
  };

  if (btnTeacherEnter) {
    btnTeacherEnter.addEventListener("click", verifyTeacherMath);
  }

  if (mathInput) {
    mathInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        verifyTeacherMath();
      }
    });
  }

  // Clic en la tarjeta de estrellas de la barra lateral
  const sidebarStarsCard = document.getElementById("btn-sidebar-view-stars");
  if (sidebarStarsCard) {
    sidebarStarsCard.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_Navigation.showScreen("worlds-screen");
    });
  }

  const btnStarsToPlay = document.getElementById("btn-stars-to-adventure");
  if (btnStarsToPlay) {
    btnStarsToPlay.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_Navigation.showScreen("worlds-screen");
    });
  }

  // Personaje Lumi interactivo que saluda alegremente al tocarlo
  const faceAvatar = document.getElementById("emoti-interactive-face");
  if (faceAvatar) {
    faceAvatar.addEventListener("click", () => {
      emoTIC_Sound.playSuccess();
      faceAvatar.style.animation = "none";
      setTimeout(() => faceAvatar.style.animation = "emotiFloat 1.2s ease-in-out", 10);
      emoTIC_Sound.speak("¡Hola! Soy Lumi, tu personaje guía. ¿Listo para descubrir tus emociones?");
    });
  }

  // Botón Modo Docente (superior y enlace inferior)
  const openTeacherFlow = () => {
    emoTIC_Sound.playClick();
    emoTIC_Teacher.checkAccess(() => {
      emoTIC_Teacher.renderTeacherDashboard();
      emoTIC_Navigation.showScreen("teacher-screen");
    });
  };

  const btnTeacherTop = document.getElementById("btn-header-teacher");
  if (btnTeacherTop) {
    btnTeacherTop.addEventListener("click", () => {
      if (emoTIC_Navigation.currentScreen !== "welcome-screen") {
        emoTIC_Sound.playClick();
        emoTIC_Navigation.showScreen("welcome-screen");
      } else {
        openTeacherFlow();
      }
    });
  }

  const btnTeacherBottom = document.getElementById("btn-open-teacher-bottom");
  if (btnTeacherBottom) btnTeacherBottom.addEventListener("click", openTeacherFlow);

  const btnTeacher = document.getElementById("btn-open-teacher");
  if (btnTeacher) btnTeacher.addEventListener("click", openTeacherFlow);

  // Botón Biblioteca de Aventuras / Para Familias
  const btnLib = document.getElementById("btn-open-library");
  if (btnLib) {
    btnLib.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_Library.renderLibrary();
      emoTIC_Navigation.showScreen("library-screen");
    });
  }

  // Botón explicativo de modo sin internet
  const btnOffHelp = document.getElementById("btn-offline-info");
  if (btnOffHelp) {
    btnOffHelp.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_PWA.showOfflineHelpModal();
    });
  }

  // Control de selector de voz interactivo
  const btnVoice = document.getElementById("btn-voice-settings");
  if (btnVoice) {
    btnVoice.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_Sound.openVoiceSettingsModal();
    });
  }

  const btnText = document.getElementById("btn-toggle-text-size");
  if (btnText) {
    btnText.addEventListener("click", async () => {
      emoTIC_Sound.playClick();
      const active = document.body.classList.toggle("large-text");
      await emoTIC_DB.saveSetting("largeText", active);
      btnText.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  const btnSound = document.getElementById("btn-toggle-sound");
  if (btnSound) {
    btnSound.addEventListener("click", async () => {
      emoTIC_Sound.soundEnabled = !emoTIC_Sound.soundEnabled;
      emoTIC_Sound.speechEnabled = emoTIC_Sound.soundEnabled;
      btnSound.textContent = emoTIC_Sound.soundEnabled ? "🔊" : "🔇";
      await emoTIC_DB.saveSetting("soundMuted", !emoTIC_Sound.soundEnabled);
      if (emoTIC_Sound.soundEnabled) emoTIC_Sound.playSuccess();
    });
  }

  // Enlaces de navegación rápida en el encabezado
  const btnNavHome = document.getElementById("nav-link-home");
  if (btnNavHome) {
    btnNavHome.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_Navigation.showScreen("welcome-screen");
    });
  }

  const btnNavPlay = document.getElementById("nav-link-play") || document.getElementById("nav-link-worlds");
  if (btnNavPlay) {
    btnNavPlay.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_Navigation.showScreen("worlds-screen");
    });
  }

  const btnNavStars = document.getElementById("nav-link-stars");
  if (btnNavStars) {
    btnNavStars.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_Navigation.showStarsTab();
    });
  }

  const btnNavLib = document.getElementById("nav-link-library");
  if (btnNavLib) {
    btnNavLib.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_Library.renderLibrary();
      emoTIC_Navigation.showScreen("library-screen");
    });
  }
}

// Renderizar insignias y estrellas en la pestaña de inicio
async function renderHomeStarsBadges() {
  const container = document.getElementById("home-stars-badges-grid");
  if (!container) return;

  const allProgress = await emoTIC_DB.getAllProgress();
  const completedList = Object.values(allProgress);

  if (completedList.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 24px 12px; color: var(--emoti-purple-sub);">
        <span style="font-size: 2.4rem; display:block; margin-bottom: 8px;">🌟</span>
        <strong style="font-size: 1rem; color: #2D2158; display:block;">Aún no tienes estrellas acumuladas</strong>
        <p style="font-size: 0.88rem; margin-top: 6px; line-height: 1.4;">¡Presiona el botón "Jugar" y completa tu primer reto para ganar tu primera insignia brillante!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = completedList.map(rec => `
    <div style="background:#F8FAFD; border:1px solid #D5DCED; border-radius:14px; padding:12px 10px; text-align:center;">
      <span style="font-size:2rem; display:block; margin-bottom:4px;">${rec.badgeIcon || '⭐'}</span>
      <strong style="font-size:0.85rem; color:#2D2158; display:block; line-height:1.2;">${rec.badgeName || rec.title}</strong>
      <span style="font-size:0.75rem; color:#F59E0B; font-weight:800; display:block; margin-top:4px;">⭐⭐⭐</span>
    </div>
  `).join('');
}
