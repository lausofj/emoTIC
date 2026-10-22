/**
 * emoTIC - Sistema de Navegación y Enrutamiento de Pantallas
 * Administra las transiciones fluidas de la aventura socioemocional unificada (18 niveles ordenados).
 */

window.emoTIC_Navigation = {
  currentScreen: "welcome-screen",

  async init() {
    this.renderWelcomeScreen();
    this.setupQuickEnterWorldListeners();
  },

  showScreen(screenId) {
    emoTIC_Sound.stopSpeaking();
    
    // Ocultar todas las pantallas con seguridad absoluta
    const screens = document.querySelectorAll(".app-screen");
    screens.forEach(s => {
      s.classList.remove("active-screen");
      s.style.setProperty("display", "none", "important");
    });

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add("active-screen");
      target.style.setProperty("display", "flex", "important");
      this.currentScreen = screenId;
      window.scrollTo(0, 0);

      // Acciones específicas al entrar a una pantalla
      const headerBtn = document.getElementById("btn-header-teacher");
      if (headerBtn) {
        if (screenId === "teacher-screen") {
          headerBtn.textContent = "Cerrar Sesión";
        } else if (screenId === "welcome-screen") {
          headerBtn.textContent = "Docente";
        } else {
          headerBtn.textContent = "Salir";
        }
      }

      // Marcar visualmente el enlace activo del encabezado
      const navPlay = document.getElementById("nav-link-play") || document.getElementById("nav-link-worlds");
      if (navPlay) navPlay.classList.toggle("nav-active", screenId === "worlds-screen");

      if (screenId === "worlds-screen") {
        this.renderWorldsMap();
      } else if (screenId === "welcome-screen") {
        this.renderWelcomeScreen();
      } else if (screenId === "teacher-screen") {
        if (window.emoTIC_Teacher && typeof window.emoTIC_Teacher.renderTeacherDashboard === "function") {
          window.emoTIC_Teacher.renderTeacherDashboard();
        }
      }
    }
  },

  // Obtener la lista de actividades actualizada
  getAllActivities() {
    return window.EMOTIC_ACTIVITIES || [];
  },

  // Renderizar la pantalla de bienvenida con el contador de progreso y estilo cuaderno
  async renderWelcomeScreen() {
    const allProgress = await emoTIC_DB.getAllProgress();
    const completedList = Object.values(allProgress);
    const completedCount = completedList.length;
    const totalActivities = 6;
    const totalStars = completedList.reduce((acc, curr) => acc + (curr.stars || 3), 0);

    const headerStars = document.getElementById("header-stars-count");
    if (headerStars) {
      headerStars.textContent = `Estrellas: ${totalStars}`;
    }

    const sidebarStars = document.getElementById("sidebar-stars-count");
    if (sidebarStars) {
      sidebarStars.textContent = totalStars;
    }

    // Actualizar Progress Tracker (Chevrons multicolor)
    const chevronSegs = document.querySelectorAll(".chevron-seg");
    chevronSegs.forEach((seg, idx) => {
      seg.classList.toggle("active", idx < completedCount);
    });

    const progressCaption = document.getElementById("notebook-progress-caption");
    if (progressCaption) {
      if (completedCount > 0) {
        progressCaption.textContent = `${completedCount} de ${totalActivities} mundos conquistados ⭐`;
      } else {
        progressCaption.textContent = `0 de ${totalActivities} mundos conquistados ⭐`;
      }
    }

    // Renderizar las 8 insignias de Mi Colección
    const badgesGrid = document.getElementById("notebook-badges-grid");
    if (badgesGrid) {
      const collectionBadges = [
        { id: "act-1", icon: "🐱", name: "Gato: Emociones" },
        { id: "act-2", icon: "🐡", name: "La calma de Globito" },
        { id: "act-3", icon: "👫", name: "Empatía con Sofi y Nico" },
        { id: "act-4", icon: "🦸", name: "Amigo que Ayuda" },
        { id: "act-5", icon: "🌳", name: "Bosque de las Familias" },
        { id: "act-6", icon: "🐹", name: "Kori: Emociones y Sentimientos" },
        { id: "badge-star", icon: "⭐", name: "Estrella Radiante" },
        { id: "badge-key2", icon: "🏆", name: "Gran Maestro Emocional" }
      ];

      badgesGrid.innerHTML = collectionBadges.map((badge, idx) => {
        const isUnlocked = idx < completedCount || !!allProgress[badge.id];
        return `
          <div class="notebook-badge-item ${isUnlocked ? 'unlocked' : 'locked'}" title="${badge.name}">
            <span>${badge.icon}</span>
            <span class="notebook-badge-stars">${isUnlocked ? '⭐⭐⭐' : '🔒'}</span>
          </div>
        `;
      }).join('');
    }

    // Restaurar avatar seleccionado en la pantalla de inicio
    try {
      const savedAvatar = await emoTIC_DB.getSetting("homeAvatarSelected", "nina");
      const btnNina = document.getElementById("btn-avatar-nina");
      const btnNino = document.getElementById("btn-avatar-nino");
      if (btnNina && btnNino) {
        if (savedAvatar === "nino") {
          btnNino.classList.add("active");
          btnNina.classList.remove("active");
        } else {
          btnNina.classList.add("active");
          btnNino.classList.remove("active");
        }
      }
    } catch (e) {
      console.warn("Error restaurando avatar:", e);
    }
  },

  // Clics directos desde las tarjetas de mundo en la pantalla principal
  setupQuickEnterWorldListeners() {
    const w1 = document.getElementById("quick-enter-w1");
    if (w1) {
      w1.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.showScreen("worlds-screen");
      });
    }

    const w2 = document.getElementById("quick-enter-w2");
    if (w2) {
      w2.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.showScreen("worlds-screen");
      });
    }

    const w3 = document.getElementById("quick-enter-w3");
    if (w3) {
      w3.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.showScreen("worlds-screen");
      });
    }
  },

  // Renderizar la pantalla de selección de juegos (Estilo Imagen 1: "Elige tu juego · Primero de primaria")
  async renderWorldsMap() {
    const container = document.getElementById("worlds-map-container");
    if (!container) return;

    const allProgress = await emoTIC_DB.getAllProgress();
    const activities = this.getAllActivities();
    const totalStars = Object.values(allProgress).reduce((acc, curr) => acc + (curr.stars || 3), 0);

    container.innerHTML = `
      <div class="games-selection-view">
        
        <!-- Saludo y Título de Selección (Fiel a Imagen 1) -->
        <div class="games-hero-header">
          <h1 class="games-user-greeting">¡Hola, Explorador!</h1>
          <p class="games-grade-sub">Elige tu juego · Primero de primaria</p>
        </div>

        <!-- Fila de Tarjetas de Juegos -->
        <div class="games-cards-grid">
          ${activities.map((act) => {
            const isCompleted = !!allProgress[act.id];
            const isAvailable = act.id === "act-1" || act.id === "act-2" || act.id === "act-3" || act.id === "act-4" || act.id === "act-5" || act.id === "act-6";

            if (isAvailable) {
              let circleBg = 'background: radial-gradient(circle, #FFFBEB 40%, #FEF3C7 100%); box-shadow: 0 4px 14px rgba(245, 158, 11, 0.2);';
              let badgeBg = 'background: #F59E0B;';
              let badgeIcon = '🐱';
              let btnColor = 'color: #B45309;';
              let avatarSrc = (act.character && act.character.avatarSvg) || 'assets/illustrations/gato-alegria.png';

              if (act.id === "act-2") {
                circleBg = 'background: radial-gradient(circle, #E0F2FE 40%, #BAE6FD 100%); box-shadow: 0 4px 14px rgba(2, 132, 199, 0.25);';
                badgeBg = 'background: #0284C7;';
                badgeIcon = '🐡';
                btnColor = 'color: #0284C7;';
                avatarSrc = (act.character && act.character.avatarSvg) || 'assets/illustrations/globito.png';
              } else if (act.id === "act-3") {
                circleBg = 'background: radial-gradient(circle, #F5F3FF 40%, #EDE9FE 100%); box-shadow: 0 4px 14px rgba(124, 58, 237, 0.25);';
                badgeBg = 'background: #7C3AED;';
                badgeIcon = '👫';
                btnColor = 'color: #7C3AED;';
                avatarSrc = (act.character && act.character.avatarSvg) || 'assets/illustrations/nino-nina.png';
              } else if (act.id === "act-4") {
                circleBg = 'background: radial-gradient(circle, #EFF6FF 40%, #DBEAFE 100%); box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);';
                badgeBg = 'background: #2563EB;';
                badgeIcon = '<img src="assets/illustrations/hero-badge.png" alt="Superhéroe" style="width: 20px; height: 20px; object-fit: contain; display: block;" />';
                btnColor = 'color: #2563EB;';
                avatarSrc = (act.character && act.character.avatarSvg) || 'assets/illustrations/heroe-heroina-duo.png';
              } else if (act.id === "act-5") {
                circleBg = 'background: radial-gradient(circle, #ECFDF5 40%, #D1FAE5 100%); box-shadow: 0 4px 14px rgba(5, 150, 105, 0.25);';
                badgeBg = 'background: #059669;';
                badgeIcon = '🌳';
                btnColor = 'color: #059669;';
                avatarSrc = (act.character && act.character.avatarSvg) || 'assets/illustrations/timo.png';
              } else if (act.id === "act-6") {
                circleBg = 'background: radial-gradient(circle, #FEF3C7 40%, #FDE68A 100%); box-shadow: 0 4px 14px rgba(217, 119, 6, 0.25);';
                badgeBg = 'background: #D97706;';
                badgeIcon = '🐹';
                btnColor = 'color: #D97706;';
                avatarSrc = (act.character && act.character.avatarSvg) || 'assets/illustrations/cuy.png';
              }

              return `
                <div class="game-select-card" id="card-game-${act.id}">
                  <div class="game-avatar-circle" style="${circleBg}">
                    <img src="${avatarSrc}" alt="${act.character ? act.character.name : 'Personaje'}" class="game-avatar-img" />
                  </div>
                  <div class="game-badge-icon" style="${badgeBg}" title="${act.title}">
                    <span>${badgeIcon}</span>
                  </div>
                  <h3 class="game-card-title">${act.title}</h3>
                  <span class="game-card-status">${isCompleted ? 'Completado' : 'No iniciado'}</span>
                  <span class="game-card-stars ${isCompleted ? 'has-stars' : ''}">
                    ${isCompleted ? '⭐⭐⭐ 3 Estrellas' : 'Estrellas: 0'}
                  </span>
                  <button class="game-card-btn" data-act-id="${act.id}" style="${btnColor}">
                    Jugar
                  </button>
                </div>
              `;
            } else {
              return `
                <div class="game-select-card locked-card">
                  <div class="game-avatar-circle" style="background: #F1F5F9;">
                    <span class="game-avatar-placeholder">🔒</span>
                  </div>
                  <div class="game-badge-icon locked-icon">
                    <span>✨</span>
                  </div>
                  <h3 class="game-card-title">${act.title}</h3>
                  <span class="game-card-status">Esperando tema</span>
                  <span class="game-card-stars">Estrellas: 0</span>
                  <button class="game-card-btn btn-disabled" disabled>
                    Pronto
                  </button>
                </div>
              `;
            }
          }).join('')}
        </div>

        <!-- Banner de aviso amarillo (Fiel a Imagen 1) -->
        <div class="emoti-tip-banner">
          Tus estrellas se guardan al terminar. La partida empieza de nuevo si sales antes.
        </div>

        <!-- Pie sutil informativo -->
        <div class="emoti-games-subfooter">
          <span>Emoti · Aprendemos a sentir, escuchar y convivir.</span>
          <span class="subfooter-link">Privacidad</span>
        </div>

      </div>
    `;

    // Conectar clics en los botones de "Jugar"
    container.querySelectorAll(".game-card-btn:not(.btn-disabled)").forEach(btn => {
      btn.addEventListener("click", () => {
        const actId = btn.getAttribute("data-act-id");
        const act = activities.find(a => a.id === actId);
        if (act) {
          emoTIC_Sound.playClick();
          emoTIC_Games.launchActivity(act);
          this.showScreen("activity-screen");
        }
      });
    });
  }
};
