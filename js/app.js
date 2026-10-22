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

// Configuración de accesibilidad (diseño diurno, alegre y claro)
async function initAccessibilitySettings() {
  const isReducedMotion = await emoTIC_DB.getSetting("reducedMotion", false);
  if (isReducedMotion) document.body.classList.add("reduced-motion");
}

function bindGlobalEvents() {


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
        avatarMainImg.src = "assets/illustrations/avatar-display-nina.png";
        avatarMainImg.style.transform = "scale(0.9)";
        setTimeout(() => avatarMainImg.style.transform = "scale(1)", 150);
      }
      await emoTIC_DB.saveSetting("homeAvatarSelected", "nina");
    });

    btnAvatarNino.addEventListener("click", async () => {
      emoTIC_Sound.playClick();
      btnAvatarNino.classList.add("active");
      btnAvatarNina.classList.remove("active");
      if (avatarMainImg) {
        avatarMainImg.src = "assets/illustrations/avatar-display-nino.png";
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

  // Acceso Docente con autenticación
  const btnTeacherEnter = document.getElementById("btn-sidebar-teacher-enter");
  if (btnTeacherEnter) {
    btnTeacherEnter.addEventListener("click", () => {
      openTeacherFlow();
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
    if (window.emoTIC_Teacher && emoTIC_Teacher.isAuthenticated && emoTIC_Teacher.isAuthenticated()) {
      emoTIC_Teacher.renderTeacherDashboard();
      emoTIC_Navigation.showScreen("teacher-screen");
    } else if (window.emoTIC_Teacher) {
      emoTIC_Teacher.checkAccess(() => {
        emoTIC_Teacher.renderTeacherDashboard();
        emoTIC_Navigation.showScreen("teacher-screen");
      });
    }
  };

  const btnTeacherTop = document.getElementById("btn-header-teacher");
  if (btnTeacherTop) {
    btnTeacherTop.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      if (emoTIC_Navigation.currentScreen === "teacher-screen") {
        if (window.emoTIC_Teacher && typeof emoTIC_Teacher.logout === "function") {
          emoTIC_Teacher.logout();
        } else {
          emoTIC_Navigation.showScreen("welcome-screen");
        }
      } else if (emoTIC_Navigation.currentScreen !== "welcome-screen") {
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

  // Botón explicativo de modo sin internet
  const btnOffHelp = document.getElementById("btn-offline-info");
  if (btnOffHelp) {
    btnOffHelp.addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_PWA.showOfflineHelpModal();
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
}

