/**
 * emoTIC - Motor de Juegos Interactivos y Actividades Socioemocionales
 * Soporta:
 * - Nivel 1: Memoria de emociones (Personaje: El Gato) con audio y 12 tarjetas 3D.
 * - Nivel 2: La historia de Globito (Personaje: Globito el pez) con audio del cuento, medidor de intensidad y regulación.
 */

window.emoTIC_Games = {
  currentActivity: null,

  // Estado del juego de Unir Emociones con Líneas (Nivel 1)
  matchingState: {
    containerId: "activity-player-container",
    stage: "intro",
    pairs: [],
    emotions: [],
    meanings: [],
    connections: [],
    selectedEmotion: null,
    selectedMeaning: null,
    isDragging: false,
    dragData: null,
    matchedCount: 0,
    totalPairs: 6
  },

  // Estado del juego de Memoria (Nivel 1 - compatibilidad)
  memoryState: {
    cards: [],
    flippedCards: [],
    matchedPairsCount: 0,
    totalPairs: 6,
    attempts: 0,
    isLocked: false
  },

  // Estado de la actividad de Globito (Nivel 2)
  globitoState: {
    situationIndex: 0,
    sliderValue: 3,
    breathsCompleted: 0,
    isBreathingCycleActive: false
  },

  // Estado de la actividad de Empatía (Nivel 3)
  empathyState: {
    missionIndex: 0,
    qStepIndex: 0,
    score: 0,
    isQuestionLocked: false
  },

  // Reproductor de audio local grabado
  audioPlayer: null,
  isPlayingAudio: false,

  // =========================================================================
  // ENTRADA PRINCIPAL A CUALQUIER ACTIVIDAD
  // =========================================================================
  launchActivity(activity, containerId = "activity-player-container") {
    this.currentActivity = activity;
    this.stopAudio();

    if (activity.gameType === "matching-emotions" || activity.id === "act-1") {
      this.launchMatchingActivity(activity, containerId);
    } else if (activity.gameType === "globito-regulation") {
      this.launchGlobitoActivity(activity, containerId);
    } else if (activity.gameType === "empathy-detective") {
      this.launchEmpathyActivity(activity, containerId);
    } else if (activity.gameType === "hero-helping") {
      this.launchHeroHelpActivity(activity, containerId);
    } else if (activity.gameType === "family-forest") {
      this.launchFamilyForestActivity(activity, containerId);
    } else if (activity.gameType === "baskets-classification") {
      this.launchBasketsActivity(activity, containerId);
    } else {
      this.launchMatchingActivity(activity, containerId);
    }
  },

  // =========================================================================
  // NIVEL 1: EMOCIONES - UNIR CON LÍNEAS Y ESPACIO DE VIDEO (EL GATO)
  // =========================================================================
  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  getNodeCoords(nodeEl, svgEl) {
    if (!nodeEl || !svgEl) return { x: 0, y: 0 };
    const nRect = nodeEl.getBoundingClientRect();
    const sRect = svgEl.getBoundingClientRect();
    return {
      x: nRect.left + (nRect.width / 2) - sRect.left,
      y: nRect.top + (nRect.height / 2) - sRect.top
    };
  },

  drawBezierCurve(svg, x1, y1, x2, y2, color = "#F59E0B", isTemp = false, isError = false) {
    const dx = Math.abs(x2 - x1) * 0.45;
    const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathD);
    path.setAttribute("fill", "none");

    if (isError) {
      path.setAttribute("class", "matching-svg-error-line");
      path.setAttribute("stroke", "#EF4444");
    } else if (isTemp) {
      path.setAttribute("class", "matching-svg-active-line");
      path.setAttribute("id", "drag-temp-line");
      path.setAttribute("stroke", color || "#F59E0B");
    } else {
      path.setAttribute("class", "matching-svg-matched-line");
      path.setAttribute("stroke", color || "#10B981");
    }

    svg.appendChild(path);

    if (!isTemp && !isError) {
      const c1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c1.setAttribute("cx", x1);
      c1.setAttribute("cy", y1);
      c1.setAttribute("r", "5");
      c1.setAttribute("fill", color || "#10B981");
      svg.appendChild(c1);

      const c2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c2.setAttribute("cx", x2);
      c2.setAttribute("cy", y2);
      c2.setAttribute("r", "5");
      c2.setAttribute("fill", color || "#10B981");
      svg.appendChild(c2);
    }

    return path;
  },

  drawAllConnections(svg) {
    if (!svg) return;
    svg.innerHTML = "";
    this.matchingState.connections.forEach(conn => {
      const nodeEmotion = document.getElementById(`node-emotion-${conn.pairId}`);
      const nodeMeaning = document.getElementById(`node-meaning-${conn.pairId}`);
      if (nodeEmotion && nodeMeaning) {
        const c1 = this.getNodeCoords(nodeEmotion, svg);
        const c2 = this.getNodeCoords(nodeMeaning, svg);
        this.drawBezierCurve(svg, c1.x, c1.y, c2.x, c2.y, conn.color, false, false);
      }
    });
  },

  // Entrada a la actividad de Unir Emociones
  launchMatchingActivity(activity, containerId = "activity-player-container") {
    const rawPairs = activity.pairs || [];
    this.matchingState = {
      containerId,
      stage: "intro",
      pairs: rawPairs,
      emotions: [...rawPairs],
      meanings: this.shuffleArray([...rawPairs]),
      connections: [],
      selectedEmotion: null,
      selectedMeaning: null,
      isDragging: false,
      dragData: null,
      matchedCount: 0,
      totalPairs: rawPairs.length || 6
    };

    this.renderMatchingIntro(containerId);
  },

  // Alias de compatibilidad
  launchMemoryActivity(activity, containerId = "activity-player-container") {
    this.launchMatchingActivity(activity, containerId);
  },

  // 1. Vista de Presentación del Gato y Espacio para el Video Educativo
  renderMatchingIntro(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const cat = act.character || {};
    const videoData = act.video || {};

    container.innerHTML = `
      <div class="activity-viewport">
        <!-- Barra superior -->
        <div class="activity-top-bar">
          <button class="btn-back-to-menu" id="btn-back-to-games">
            <span>←</span> Volver a los juegos
          </button>
          <div class="activity-title-group">
            <span class="activity-level-tag">Nivel 1</span>
            <h2 class="activity-game-heading">${act.title}</h2>
          </div>
          <div style="width: 140px; text-align: right;">
            <span style="font-size: 0.88rem; font-weight: 800; color: #F59E0B;">🐱 El Gato</span>
          </div>
        </div>

        <div class="matching-intro-viewport">
          <!-- Presentación del Gato de las Emociones -->
          <section class="globito-story-card" style="border-color: #FDE68A; background: #FFFFFF;">
            <div class="cat-avatar-stage" id="cat-avatar-stage">
              <img src="${cat.avatarSvg || 'assets/illustrations/gato-alegria.png'}" alt="El Gato de las Emociones" class="cuy-hero-avatar-img" />
            </div>

            <div class="character-speech-bubble" style="background:#FFFBEB; border-color:#FCD34D;">
              <span class="character-name-badge" style="background:#FDE68A; color:#B45309;">🐱 ${cat.name || 'El Gato de las Emociones'}</span>
              <h3 style="font-size:1.35rem; color:#B45309; margin:4px 0 10px 0;">¡Descubramos las 6 Emociones!</h3>
              
              <p style="font-size:1.05rem; line-height:1.55; color:#1E293B; margin-bottom:12px;">
                ${cat.greeting || '¡Hola! Soy tu amigo el Gato. Hoy descubriremos las emociones: alegría, tristeza, enojo, miedo, asco y sorpresa.'}
              </p>
              <p style="font-size:1.02rem; line-height:1.5; color:#475569; margin-bottom:12px;">
                ${cat.explanation || 'Puedes ver nuestro video educativo para conocer las 6 emociones básicas. Luego, ayúdame a unir cada emoción con su significado trazando una línea. ¡Miau, vamos a aprender juntos!'}
              </p>

              <!-- Botones de audio -->
              <div class="character-audio-actions" style="margin-top: 14px;">
                <button class="btn-cat-audio" id="btn-play-voice-action" style="background:#F59E0B; box-shadow:0 4px 14px rgba(245, 158, 11, 0.35);">
                  <span id="voice-audio-icon">🔊</span>
                  <span id="voice-audio-label">Escuchar la voz del Gato</span>
                </button>
              </div>
            </div>
          </section>

          <!-- Espacio para el Video Educativo -->
          <div class="matching-video-card">
            <div style="text-align: center; max-width: 650px;">
              <h3 style="font-size: 1.35rem; color: #1E293B; margin: 0 0 6px 0; font-weight: 900;">
                🎬 ${videoData.title || 'Video: Conociendo nuestras emociones'}
              </h3>
              <p style="font-size: 0.95rem; color: #64748B; margin: 0;">
                ${videoData.description || 'Aprende qué sentimos y cómo se refleja cada emoción en nuestro rostro y cuerpo.'}
              </p>
            </div>

            <div class="matching-video-box" id="emociones-video-box">
              <div class="matching-video-placeholder-inner" id="btn-play-emociones-video">
                <button class="btn-play-video-trigger" aria-label="Reproducir video de emociones">
                  ▶
                </button>
                <strong style="font-size:1.15rem; letter-spacing:0.5px;">Reproducir Video Educativo</strong>
                <span style="font-size:0.88rem; color:#CBD5E1; max-width:440px;">
                  Toca aquí para reproducir el video. Puedes compartir tu archivo de video y se verá en este marco.
                </span>
                
                <div class="matching-video-file-picker" onclick="event.stopPropagation()">
                  <span>O carga tu video local:</span>
                  <label class="matching-file-label" for="input-emociones-video">Seleccionar archivo</label>
                  <input type="file" id="input-emociones-video" class="matching-video-file-input" accept="video/mp4,video/webm,video/ogg" />
                </div>
              </div>
            </div>

            <button class="btn-timo-advance" id="btn-start-matching-game" style="background:#F59E0B; color:#78350F; font-size:1.18rem; padding:14px 44px; box-shadow:0 6px 20px rgba(245, 158, 11, 0.4); margin-top: 6px;">
              ¡Comenzar a Unir Emociones! ✏️
            </button>
          </div>
        </div>
      </div>
    `;

    // Conectar eventos
    const btnBack = document.getElementById("btn-back-to-games");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    const btnAudio = document.getElementById("btn-play-voice-action");
    if (btnAudio) {
      btnAudio.addEventListener("click", () => {
        this.toggleCustomAudio(
          act.character.audioFile || "assets/audio/gato-nivel1.mp3",
          act.character.audioTranscript || act.character.greeting,
          "cat-avatar-stage"
        );
      });
    }

    const playVideoBtn = document.getElementById("btn-play-emociones-video");
    if (playVideoBtn) {
      playVideoBtn.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        const box = document.getElementById("emociones-video-box");
        if (box) {
          box.innerHTML = `
            <video controls autoplay style="width:100%; height:100%; object-fit:contain; border-radius:18px;">
              <source src="${videoData.placeholderUrl || 'assets/videos/emociones-video.mp4'}" type="video/mp4">
              Tu navegador no soporta video local HTML5.
            </video>
          `;
        }
      });
    }

    const fileInput = document.getElementById("input-emociones-video");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          emoTIC_Sound.playClick();
          const fileUrl = URL.createObjectURL(file);
          const box = document.getElementById("emociones-video-box");
          if (box) {
            box.innerHTML = `
              <video controls autoplay style="width:100%; height:100%; object-fit:contain; border-radius:18px;">
                <source src="${fileUrl}" type="${file.type || 'video/mp4'}">
              </video>
            `;
          }
        }
      });
    }

    const btnStart = document.getElementById("btn-start-matching-game");
    if (btnStart) {
      btnStart.addEventListener("click", () => {
        emoTIC_Sound.playSuccess();
        this.stopAudio();
        this.renderMatchingGame(containerId);
      });
    }
  },

  // 2. Arena de Juego: Unir Emociones con su Significado Trazando Líneas
  renderMatchingGame(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const emotions = this.matchingState.emotions;
    const meanings = this.matchingState.meanings;

    container.innerHTML = `
      <div class="activity-viewport">
        <!-- Barra de navegación superior -->
        <div class="activity-top-bar">
          <button class="btn-back-to-menu" id="btn-back-to-games">
            <span>←</span> Volver a los juegos
          </button>
          <div class="activity-title-group">
            <span class="activity-level-tag">Nivel 1</span>
            <h2 class="activity-game-heading">${act.title}</h2>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button class="btn-restart-game" id="btn-watch-video-again" style="background: #FFFBEB; border: 2px solid #FCD34D; color: #92400E; font-weight: 800; border-radius: 12px; padding: 6px 12px; cursor: pointer;">
              🎬 Ver Video
            </button>
            <button class="btn-restart-game" id="btn-restart-matching" style="background: #F1F5F9; border: 2px solid #CBD5E1; color: #475569; font-weight: 800; border-radius: 12px; padding: 6px 12px; cursor: pointer;">
              🔄 Reiniciar
            </button>
          </div>
        </div>

        <div class="matching-game-arena">
          <!-- Banner de instrucciones -->
          <div class="matching-banner-instructions">
            <p class="matching-instruction-text">
              <span>✏️</span> Toca o dibuja con el mouse una línea desde cada emoción hacia su significado correcto.
            </p>
            <div class="matching-pairs-counter-pill" id="matching-counter-pill">
              Parejas unidas: ${this.matchingState.matchedCount} / ${this.matchingState.totalPairs}
            </div>
          </div>

          <!-- Columnas de unión y SVG interactivo -->
          <div class="matching-columns-wrapper" id="matching-columns-wrapper">
            
            <!-- SVG para dibujar las conexiones fluidas -->
            <svg class="matching-connections-svg" id="matching-svg"></svg>

            <!-- Columna Izquierda: Emociones (Con los gatos exactos del usuario) -->
            <div class="matching-column" id="matching-col-emotions">
              <h3 class="matching-column-title">
                <span>🐱</span> Emociones
              </h3>
              ${emotions.map(item => `
                <div class="matching-card matching-emotion-card" 
                     id="card-emotion-${item.id}" 
                     data-pair-id="${item.id}" 
                     data-type="emotion" 
                     data-color="${item.color}"
                     role="button" 
                     tabindex="0"
                     aria-label="Emoción: ${item.emotion}">
                  <div class="matching-cat-avatar-wrap" style="background: ${item.bgLight || '#FEF3C7'};">
                    <img src="${item.img}" alt="Gato ${item.emotion}" class="matching-cat-img" />
                  </div>
                  <h4 class="matching-emotion-name" style="color: ${item.color};">${item.emotion}</h4>
                  <div class="matching-node node-right" id="node-emotion-${item.id}" data-node-id="${item.id}"></div>
                </div>
              `).join('')}
            </div>

            <!-- Columna Derecha: Significados Cortos (Aleatorizados) -->
            <div class="matching-column" id="matching-col-meanings">
              <h3 class="matching-column-title">
                <span>📖</span> Significados
              </h3>
              ${meanings.map(item => `
                <div class="matching-card matching-meaning-card" 
                     id="card-meaning-${item.id}" 
                     data-pair-id="${item.id}" 
                     data-type="meaning"
                     role="button" 
                     tabindex="0"
                     aria-label="Significado de emoción">
                  <div class="matching-node node-left" id="node-meaning-${item.id}" data-node-id="${item.id}"></div>
                  <p class="matching-meaning-text">${item.shortMeaning}</p>
                </div>
              `).join('')}
            </div>

          </div>
        </div>
      </div>
    `;

    const svg = document.getElementById("matching-svg");
    const wrapper = document.getElementById("matching-columns-wrapper");

    // Conectar botones superiores
    const btnBack = document.getElementById("btn-back-to-games");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    const btnVideoAgain = document.getElementById("btn-watch-video-again");
    if (btnVideoAgain) {
      btnVideoAgain.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.renderMatchingIntro(containerId);
      });
    }

    const btnRestart = document.getElementById("btn-restart-matching");
    if (btnRestart) {
      btnRestart.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.matchingState.connections = [];
        this.matchingState.selectedEmotion = null;
        this.matchingState.selectedMeaning = null;
        this.matchingState.matchedCount = 0;
        this.matchingState.meanings = this.shuffleArray([...this.matchingState.pairs]);
        this.renderMatchingGame(containerId);
      });
    }

    if (this._matchingResizeListener) {
      window.removeEventListener("resize", this._matchingResizeListener);
    }
    this._matchingResizeListener = () => {
      this.drawAllConnections(svg);
    };
    window.addEventListener("resize", this._matchingResizeListener);

    setTimeout(() => this.drawAllConnections(svg), 60);

    const emotionCards = container.querySelectorAll(".matching-emotion-card");
    const meaningCards = container.querySelectorAll(".matching-meaning-card");

    // 1. Manejo de Clics
    emotionCards.forEach(card => {
      card.addEventListener("click", () => {
        if (card.classList.contains("matched")) return;
        emoTIC_Sound.playClick();

        if (this.matchingState.selectedMeaning) {
          this.validateMatchingPair(card, this.matchingState.selectedMeaning);
        } else {
          emotionCards.forEach(c => c.classList.remove("selected"));
          card.classList.add("selected");
          this.matchingState.selectedEmotion = card;
        }
      });
    });

    meaningCards.forEach(card => {
      card.addEventListener("click", () => {
        if (card.classList.contains("matched")) return;
        emoTIC_Sound.playClick();

        if (this.matchingState.selectedEmotion) {
          this.validateMatchingPair(this.matchingState.selectedEmotion, card);
        } else {
          meaningCards.forEach(c => c.classList.remove("selected"));
          card.classList.add("selected");
          this.matchingState.selectedMeaning = card;
        }
      });
    });

    // 2. Manejo de Dibujo con Mouse y Táctil
    const startDrag = (sourceCard, e) => {
      if (sourceCard.classList.contains("matched")) return;
      this.matchingState.isDragging = true;

      const sourceType = sourceCard.getAttribute("data-type");
      const pairId = sourceCard.getAttribute("data-pair-id");
      const color = sourceCard.getAttribute("data-color") || "#F59E0B";
      const nodeEl = sourceType === "emotion" 
        ? document.getElementById(`node-emotion-${pairId}`)
        : document.getElementById(`node-meaning-${pairId}`);

      const startCoords = this.getNodeCoords(nodeEl, svg);
      this.matchingState.dragData = {
        sourceType,
        pairId,
        color,
        sourceCard,
        startX: startCoords.x,
        startY: startCoords.y
      };

      container.querySelectorAll(".matching-card").forEach(c => c.classList.remove("selected"));
      sourceCard.classList.add("selected");
    };

    const moveDrag = (clientX, clientY) => {
      if (!this.matchingState.isDragging || !this.matchingState.dragData) return;
      const sRect = svg.getBoundingClientRect();
      const currX = clientX - sRect.left;
      const currY = clientY - sRect.top;

      const oldTemp = document.getElementById("drag-temp-line");
      if (oldTemp) oldTemp.remove();

      const dd = this.matchingState.dragData;
      if (dd.sourceType === "emotion") {
        this.drawBezierCurve(svg, dd.startX, dd.startY, currX, currY, dd.color, true, false);
      } else {
        this.drawBezierCurve(svg, currX, currY, dd.startX, dd.startY, dd.color, true, false);
      }
    };

    const endDrag = (clientX, clientY) => {
      if (!this.matchingState.isDragging) return;
      this.matchingState.isDragging = false;

      const oldTemp = document.getElementById("drag-temp-line");
      if (oldTemp) oldTemp.remove();

      const dd = this.matchingState.dragData;
      this.matchingState.dragData = null;
      if (!dd) return;

      const targetElement = document.elementFromPoint(clientX, clientY);
      const targetCard = targetElement ? targetElement.closest(".matching-card") : null;

      if (targetCard && !targetCard.classList.contains("matched")) {
        const targetType = targetCard.getAttribute("data-type");
        if (targetType !== dd.sourceType) {
          if (dd.sourceType === "emotion") {
            this.validateMatchingPair(dd.sourceCard, targetCard);
          } else {
            this.validateMatchingPair(targetCard, dd.sourceCard);
          }
          return;
        }
      }

      container.querySelectorAll(".matching-card").forEach(c => c.classList.remove("selected"));
      this.matchingState.selectedEmotion = null;
      this.matchingState.selectedMeaning = null;
    };

    // Eventos Mouse
    wrapper.addEventListener("mousedown", (e) => {
      const card = e.target.closest(".matching-card");
      if (card) {
        startDrag(card, e);
      }
    });

    window.addEventListener("mousemove", (e) => {
      if (this.matchingState.isDragging) {
        moveDrag(e.clientX, e.clientY);
      }
    });

    window.addEventListener("mouseup", (e) => {
      if (this.matchingState.isDragging) {
        endDrag(e.clientX, e.clientY);
      }
    });

    // Eventos Touch
    wrapper.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const card = target ? target.closest(".matching-card") : null;
      if (card) {
        startDrag(card, touch);
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (this.matchingState.isDragging && e.touches[0]) {
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener("touchend", (e) => {
      if (this.matchingState.isDragging && e.changedTouches[0]) {
        endDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      }
    });
  },

  // 3. Validación de Pareja Seleccionada
  validateMatchingPair(emotionCard, meaningCard) {
    const emotionPairId = emotionCard.getAttribute("data-pair-id");
    const meaningPairId = meaningCard.getAttribute("data-pair-id");
    const svg = document.getElementById("matching-svg");

    emotionCard.classList.remove("selected");
    meaningCard.classList.remove("selected");
    this.matchingState.selectedEmotion = null;
    this.matchingState.selectedMeaning = null;

    if (emotionPairId === meaningPairId) {
      // ¡ACIERTO!
      emoTIC_Sound.playSuccess();
      emotionCard.classList.add("matched");
      meaningCard.classList.add("matched");

      if (!emotionCard.querySelector(".matching-check-badge")) {
        const badge = document.createElement("span");
        badge.className = "matching-check-badge";
        badge.textContent = "✔";
        emotionCard.appendChild(badge);
      }
      if (!meaningCard.querySelector(".matching-check-badge")) {
        const badge = document.createElement("span");
        badge.className = "matching-check-badge";
        badge.textContent = "✔";
        meaningCard.appendChild(badge);
      }

      const pairData = this.currentActivity.pairs.find(p => p.id === emotionPairId);
      const color = (pairData && pairData.color) || "#10B981";

      this.matchingState.connections.push({
        pairId: emotionPairId,
        color
      });

      this.drawAllConnections(svg);

      this.matchingState.matchedCount++;
      const pill = document.getElementById("matching-counter-pill");
      if (pill) {
        pill.textContent = `Parejas unidas: ${this.matchingState.matchedCount} / ${this.matchingState.totalPairs}`;
      }

      if (pairData && pairData.catFeedback) {
        emoTIC_Sound.speak(pairData.catFeedback);
      }

      if (this.matchingState.matchedCount >= this.matchingState.totalPairs) {
        setTimeout(() => this.handleMatchingVictory(), 700);
      }
    } else {
      // ¡ERROR AMIGABLE!
      emoTIC_Sound.playIncorrect();

      if (svg) {
        const nodeEmotion = document.getElementById(`node-emotion-${emotionPairId}`);
        const nodeMeaning = document.getElementById(`node-meaning-${meaningPairId}`);
        if (nodeEmotion && nodeMeaning) {
          const c1 = this.getNodeCoords(nodeEmotion, svg);
          const c2 = this.getNodeCoords(nodeMeaning, svg);
          const errLine = this.drawBezierCurve(svg, c1.x, c1.y, c2.x, c2.y, "#EF4444", false, true);
          setTimeout(() => {
            if (errLine) errLine.remove();
          }, 650);
        }
      }

      emotionCard.classList.add("shake-error");
      meaningCard.classList.add("shake-error");
      emoTIC_Sound.speak("¡Casi! Ese gato siente otra emoción, intenta de nuevo.");

      setTimeout(() => {
        emotionCard.classList.remove("shake-error");
        meaningCard.classList.remove("shake-error");
      }, 650);
    }
  },

  // 4. Celebración Final de Victoria: Nivel 1 (Emociones)
  async handleMatchingVictory() {
    this.stopAudio();
    emoTIC_Sound.playSuccess();

    await emoTIC_DB.saveProgress({
      activityId: "act-1",
      title: "Emociones",
      stars: 3,
      badgeName: "Maestro de las Emociones",
      badgeIcon: "🐱",
      completedAt: new Date().toISOString()
    });

    this.launchConfetti();

    const modal = document.createElement("div");
    modal.className = "victory-modal-overlay";
    modal.innerHTML = `
      <div class="victory-card-box">
        <div class="victory-cat-avatar" style="background: radial-gradient(circle, #FEF3C7 30%, #FDE68A 100%); box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);">
          <img src="assets/illustrations/gato-alegria.png" alt="Gato de las Emociones" style="width: 85px; height: 85px; object-fit: contain;" />
        </div>
        <h3 class="victory-title" style="color:#B45309;">¡Miau-ravilloso! 🐱</h3>
        <div class="victory-stars-row">⭐⭐⭐</div>
        <p class="victory-message-text">
          ¡Felicitaciones! Has unido las <strong>6 emociones</strong> con su significado correcto trazando líneas junto al Gato de las Emociones.
        </p>
        <div class="victory-actions-row">
          <button class="btn-victory-replay" id="btn-replay-game" style="background:#F59E0B; color:#78350F;">Unir otra vez 🔄</button>
          <button class="btn-victory-menu" id="btn-victory-to-menu">Elegir otro juego 🗺️</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("btn-replay-game").addEventListener("click", () => {
      modal.remove();
      this.launchActivity(this.currentActivity);
    });

    document.getElementById("btn-victory-to-menu").addEventListener("click", () => {
      modal.remove();
      emoTIC_Navigation.showScreen("worlds-screen");
    });
  },

  // =========================================================================
  // NIVEL 2: LA HISTORIA DE GLOBITO (GLOBITO EL PEZ)
  // =========================================================================
  launchGlobitoActivity(activity, containerId = "activity-player-container") {
    this.globitoState = {
      situationIndex: 0,
      selectedOption: null,
      breathsCompleted: 0,
      isBreathingCycleActive: false
    };

    // Comenzamos mostrando el cuento y video de Globito
    this.renderGlobitoStory(containerId);
  },

  // 1. Vista del Cuento y Video de Globito
  renderGlobitoStory(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const globito = act.character || {};
    const videoData = act.video || {};

    container.innerHTML = `
      <div class="activity-viewport">
        
        <!-- Barra de navegación -->
        <div class="activity-top-bar">
          <button class="btn-back-to-menu" id="btn-back-to-games">
            <span>←</span> Volver a los juegos
          </button>
          <div class="activity-title-group">
            <span class="activity-level-tag">Nivel 2 · La historia de Globito</span>
            <h2 class="activity-game-heading">${act.title}</h2>
          </div>
          <div style="width: 140px; text-align: right;">
            <span style="font-size: 0.88rem; font-weight: 800; color: #0284C7;">🐡 Globito el pez</span>
          </div>
        </div>

        <div class="matching-intro-viewport">
          <!-- Tarjeta del Cuento de Globito -->
          <section class="globito-story-card">
            <div class="globito-avatar-stage" id="globito-avatar-stage">
              <img src="${globito.avatarSvg || 'assets/illustrations/globito.png'}" alt="Globito el pez globo" class="globito-story-avatar-img" />
            </div>

            <div class="character-speech-bubble">
              <span class="character-name-badge" style="background:#E0F2FE; color:#0369A1;">🐡 ${globito.name || 'Globito'}</span>
              <h3 style="font-size:1.4rem; color:#0369A1; margin:4px 0 10px 0;">La historia de Globito</h3>
              
              <p style="font-size:1.05rem; line-height:1.55; color:#1E293B; margin-bottom:12px;">
                Globito es un pez globo que vive en el mar; tiene muchos amigos y le gusta jugar mucho con ellos. Globito estaba preocupado; sus amigos ya no querían estar con él porque se enojaba mucho, los trataba mal y a veces hasta les pegaba.
              </p>
              <p style="font-size:1.05rem; line-height:1.55; color:#1E293B; margin-bottom:12px;">
                Pero Globito encontró una solución: <strong>¡aprendió a calmarse!</strong> Un día se dio cuenta de que, si respiraba profundamente hasta inflarse varias veces, se calmaba y ya no trataba mal a sus amigos y les podía decir calmadamente lo que quería.
              </p>

              <div class="globito-rules-box">
                <span>Ahora, cuando Globito siente rabia o miedo:</span>
                <ol>
                  <li>Se queda quieto.</li>
                  <li>Respira profundamente y despacito hasta inflarse varias veces.</li>
                </ol>
              </div>

              <!-- Botones de audio -->
              <div class="character-audio-actions" style="margin-top: 18px;">
                <button class="btn-cat-audio" id="btn-play-voice-action" style="background:#0284C7; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);">
                  <span id="voice-audio-icon">🔊</span>
                  <span id="voice-audio-label">Escuchar el cuento de Globito</span>
                </button>
              </div>
            </div>
          </section>

          <!-- Espacio para el Video de la Historia de Globito -->
          <div class="matching-video-card" style="border-color: #BAE6FD; box-shadow: 0 10px 30px rgba(2, 132, 199, 0.12);">
            <div style="text-align: center; max-width: 650px;">
              <h3 style="font-size: 1.35rem; color: #1E293B; margin: 0 0 6px 0; font-weight: 900;">
                🎬 ${videoData.title || 'Video: La historia de Globito el Pez Globo'}
              </h3>
              <p style="font-size: 0.95rem; color: #64748B; margin: 0;">
                ${videoData.description || 'Descubre en video cómo Globito aprendió a calmarse quedándose quieto y respirando despacito.'}
              </p>
            </div>

            <div class="matching-video-box" id="globito-video-box" style="border-color: #0284C7;">
              <div class="matching-video-placeholder-inner" id="btn-play-globito-video">
                <button class="btn-play-video-trigger" style="background: linear-gradient(135deg, #0284C7, #0369A1);" aria-label="Reproducir video de Globito">
                  ▶
                </button>
                <strong style="font-size:1.15rem; letter-spacing:0.5px;">Reproducir Video de la Historia</strong>
                <span style="font-size:0.88rem; color:#CBD5E1; max-width:440px;">
                  Espacio reservado para el video de Globito. Cuando compartas tu archivo o enlace, se reproducirá aquí automáticamente.
                </span>

                <div class="matching-video-file-picker" onclick="event.stopPropagation()">
                  <span>O carga tu video local:</span>
                  <label class="matching-file-label" for="input-globito-video" style="color:#38BDF8;">Seleccionar archivo</label>
                  <input type="file" id="input-globito-video" class="matching-video-file-input" accept="video/mp4,video/webm,video/ogg" />
                </div>
              </div>
            </div>

            <button class="btn-timo-advance" id="btn-start-situations" style="background:#0284C7; color:#FFFFFF; font-size:1.15rem; padding:14px 44px; box-shadow:0 6px 20px rgba(2, 132, 199, 0.4); margin-top: 6px;">
              ¡Practicar las 2 situaciones con Globito! 🚀
            </button>
          </div>
        </div>

      </div>
    `;

    // Conectar eventos
    const btnBack = document.getElementById("btn-back-to-games");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    const btnAudio = document.getElementById("btn-play-voice-action");
    if (btnAudio) {
      btnAudio.addEventListener("click", () => {
        this.toggleCustomAudio(
          act.character.audioFile || "assets/audio/globito-cuento.mp3",
          act.character.storyText,
          "globito-avatar-stage"
        );
      });
    }

    const playVideoBtn = document.getElementById("btn-play-globito-video");
    if (playVideoBtn) {
      playVideoBtn.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        const box = document.getElementById("globito-video-box");
        if (box) {
          box.innerHTML = `
            <video controls autoplay style="width:100%; height:100%; object-fit:contain; border-radius:18px;">
              <source src="${videoData.placeholderUrl || 'assets/videos/globito-cuento.mp4'}" type="video/mp4">
              Tu navegador no soporta video local HTML5.
            </video>
          `;
        }
      });
    }

    const fileInput = document.getElementById("input-globito-video");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          emoTIC_Sound.playClick();
          const fileUrl = URL.createObjectURL(file);
          const box = document.getElementById("globito-video-box");
          if (box) {
            box.innerHTML = `
              <video controls autoplay style="width:100%; height:100%; object-fit:contain; border-radius:18px;">
                <source src="${fileUrl}" type="${file.type || 'video/mp4'}">
              </video>
            `;
          }
        }
      });
    }

    const btnStart = document.getElementById("btn-start-situations");
    if (btnStart) {
      btnStart.addEventListener("click", () => {
        emoTIC_Sound.playSuccess();
        this.stopAudio();
        this.globitoState.situationIndex = 0;
        this.renderGlobitoSituation(containerId);
      });
    }
  },

  // 2. Vista de Situaciones con Opciones Claras para Niños (Sin líneas/sliders difíciles)
  renderGlobitoSituation(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const sit = act.situations[this.globitoState.situationIndex] || act.situations[0];
    this.globitoState.selectedOption = null;

    container.innerHTML = `
      <div class="activity-viewport">
        
        <!-- Barra de navegación -->
        <div class="activity-top-bar">
          <button class="btn-back-to-menu" id="btn-back-to-games">
            <span>←</span> Volver a los juegos
          </button>
          <div class="activity-title-group">
            <span class="activity-level-tag">Nivel 2 · ${sit.badge}</span>
            <h2 class="activity-game-heading">${sit.title}</h2>
          </div>
          <button class="btn-restart-game" id="btn-reread-story" style="background:#E0F2FE; color:#0369A1; border: 2px solid #BAE6FD; font-weight:800; border-radius:12px; padding:6px 14px;">
            📖 Ver Cuento y Video
          </button>
        </div>

        <div class="globito-situation-wrapper">
          
          <!-- Tarjeta Central de la Situación -->
          <div class="globito-situation-card" style="border-radius: 24px; border-color: #BAE6FD;">
            
            <div class="situation-top-icon">${sit.icon}</div>
            <span class="regulation-phase-banner">${sit.badge}</span>
            <h3 class="situation-title" style="font-size: 1.45rem; margin-top: 6px; color: #1E293B;">
              ${sit.question}
            </h3>

            <!-- Opciones Claras y Grandes para los Niños -->
            <div class="globito-options-grid" id="globito-options-container">
              ${sit.options.map((opt, idx) => `
                <button class="globito-option-btn" data-opt-idx="${idx}" type="button">
                  <span class="globito-opt-icon">${opt.icon}</span>
                  <div class="globito-opt-texts">
                    <h4 class="globito-opt-title">${opt.title}</h4>
                    <p class="globito-opt-sub">${opt.subtitle}</p>
                  </div>
                </button>
              `).join('')}
            </div>

            <!-- Caja de retroalimentación pedagógica tras responder -->
            <div id="globito-situation-feedback" style="display:none;" class="globito-feedback-card">
              <p id="globito-feedback-text" class="globito-feedback-text"></p>
              <button class="btn-globito-confirm" id="btn-go-to-breathing" style="background:#0284C7; font-size:1.15rem; padding:12px 34px;">
                ¡Ahora respira con Globito para calmarte! 🐡
              </button>
            </div>

          </div>

        </div>

      </div>
    `;

    // Conectar botones
    const btnBack = document.getElementById("btn-back-to-games");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    const btnCuento = document.getElementById("btn-reread-story");
    if (btnCuento) {
      btnCuento.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.renderGlobitoStory(containerId);
      });
    }

    // Manejo de clic en las opciones
    const optButtons = container.querySelectorAll(".globito-option-btn");
    const feedbackBox = document.getElementById("globito-situation-feedback");
    const feedbackText = document.getElementById("globito-feedback-text");
    const btnGoBreath = document.getElementById("btn-go-to-breathing");

    optButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        optButtons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");

        const optIdx = parseInt(btn.getAttribute("data-opt-idx"), 10);
        const opt = sit.options[optIdx];
        if (opt) {
          this.globitoState.selectedOption = opt;
          feedbackText.textContent = `✨ ${opt.feedback}`;
          feedbackBox.style.display = "block";
          emoTIC_Sound.speak(opt.feedback);
          feedbackBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    });

    if (btnGoBreath) {
      btnGoBreath.addEventListener("click", () => {
        emoTIC_Sound.playSuccess();
        this.renderGlobitoBreathing(containerId);
      });
    }
  },

  // 3. Vista de Regulación: Respirar tocando DIRECTAMENTE a Globito (2 VECES)
  renderGlobitoBreathing(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const sit = act.situations[this.globitoState.situationIndex] || act.situations[0];
    this.globitoState.breathsCompleted = 0;
    this.globitoState.isBreathingCycleActive = false;

    container.innerHTML = `
      <div class="activity-viewport">
        
        <div class="activity-top-bar">
          <button class="btn-back-to-menu" id="btn-back-to-games">
            <span>←</span> Volver a los juegos
          </button>
          <div class="activity-title-group">
            <span class="activity-level-tag">Técnica de Globito · Paso a Paso</span>
            <h2 class="activity-game-heading">¡Aprendo a calmarme!</h2>
          </div>
          <span style="font-size:1rem; font-weight:800; color:#0284C7;">🐡 2 Respiraciones</span>
        </div>

        <div class="globito-regulation-stage">
          <span class="regulation-phase-banner">1. Quédate quieto &nbsp;•&nbsp; 2. Respira hondo</span>
          <h3 class="regulation-heading">${sit.title}</h3>
          <p class="regulation-desc">
            ${sit.calmingPrompt || "Cuando sentimos rabia o tristeza, ¡hacemos lo que hizo Globito! Toca directamente a Globito para inflarlo y respira 2 veces despacito."}
          </p>

          <!-- Gran Globito interactivo (Se toca DIRECTAMENTE a Globito para inflarlo) -->
          <div class="breathing-fish-container clickable-fish" id="breathing-globito-trigger" role="button" tabindex="0" aria-label="Tocar a Globito para inflarlo y respirar">
            <img src="assets/illustrations/globito.png" alt="Globito el pez globo" class="breathing-fish-img" id="breathing-fish-img" />
            <div class="touch-hint-pill" id="touch-hint-pill">👆 ¡Toca a Globito!</div>
          </div>

          <div class="breathing-instruction-badge" id="breathing-label-badge">
            ¡Toca a Globito para inflarlo y respirar! 🫧
          </div>

          <div class="breathing-counter-row" id="breathing-counter-text">
            Respiraciones completadas: <strong>0 de 2</strong>
          </div>

          <div id="solution-box" style="display:none; margin-top:24px; padding:18px; background:#F0FDF4; border-radius:18px; border:2px solid #86EFAC; animation: fadeInModal 0.25s ease-out;">
            <p style="font-size:1.05rem; font-weight:800; color:#166534; margin:0 0 14px 0;">
              ✨ ${sit.calmingSolution}
            </p>
            <button class="btn-globito-confirm" id="btn-next-situation-step" style="background:#0284C7; font-size:1.15rem; padding:12px 32px;">
              ${this.globitoState.situationIndex === 0 ? 'Siguiente Situación (2 de 2) ▶' : '¡Completar Nivel 2 y Ganar Estrellas! ⭐⭐⭐'}
            </button>
          </div>

        </div>

      </div>
    `;

    // Conectar botón volver
    const btnBack = document.getElementById("btn-back-to-games");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    // CLIC DIRECTO SOBRE GLOBITO PARA INICIAR RESPIRACIÓN (Sin botones)
    const globitoTrigger = document.getElementById("breathing-globito-trigger");
    const fishImg = document.getElementById("breathing-fish-img");
    const labelBadge = document.getElementById("breathing-label-badge");
    const counterText = document.getElementById("breathing-counter-text");
    const touchHintPill = document.getElementById("touch-hint-pill");
    const solutionBox = document.getElementById("solution-box");

    const doBreathCycle = () => {
      if (this.globitoState.isBreathingCycleActive) return;
      if (this.globitoState.breathsCompleted >= 2) return;

      this.globitoState.isBreathingCycleActive = true;
      globitoTrigger.classList.add("inflating");
      if (touchHintPill) touchHintPill.style.display = "none";

      // Fase 1: Inhala y Globito se infla (3 segundos)
      emoTIC_Sound.playClick();
      labelBadge.textContent = "1. Inhala profundo por la nariz... ¡Globito se infla! 🫧";
      labelBadge.style.color = "#0284C7";
      fishImg.style.transform = "scale(1.52)";

      setTimeout(() => {
        // Fase 2: Sostén (1.2 segundos)
        labelBadge.textContent = "¡Quédate quieto con el aire adentro! 🛑";
        labelBadge.style.color = "#D97706";

        setTimeout(() => {
          // Fase 3: Exhala y Globito se desinfla (2.8 segundos)
          labelBadge.textContent = "2. Bota el aire despacio por la boca... ¡Globito se desinfla! 💨";
          labelBadge.style.color = "#059669";
          fishImg.style.transform = "scale(1.0)";
          emoTIC_Sound.playSuccess();

          setTimeout(() => {
            this.globitoState.breathsCompleted++;
            globitoTrigger.classList.remove("inflating");
            counterText.innerHTML = `Respiraciones completadas: <strong>${this.globitoState.breathsCompleted} de 2</strong>`;

            if (this.globitoState.breathsCompleted < 2) {
              this.globitoState.isBreathingCycleActive = false;
              if (touchHintPill) touchHintPill.style.display = "block";
              labelBadge.textContent = "¡Muy bien! Toca a Globito una vez más para tu segunda respiración.";
              labelBadge.style.color = "#0284C7";
              emoTIC_Sound.speak("¡Muy bien! Toca a Globito una vez más para completar tu segunda respiración.");
            } else {
              // Completó exactamente las 2 respiraciones
              this.globitoState.isBreathingCycleActive = false;
              globitoTrigger.classList.remove("clickable-fish");
              labelBadge.textContent = "¡Misión cumplida! Tu cuerpo y mente recuperaron la calma 🌟";
              labelBadge.style.color = "#166534";
              solutionBox.style.display = "block";
              emoTIC_Sound.speak("¡Excelente! Respiraste dos veces como Globito. Tu cuerpo y mente recuperaron la calma.");
            }
          }, 1100);

        }, 1200);

      }, 3000);
    };

    if (globitoTrigger) {
      globitoTrigger.addEventListener("click", doBreathCycle);
      globitoTrigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          doBreathCycle();
        }
      });
    }

    // Botón avanzar siguiente situación o finalizar
    const btnNext = document.getElementById("btn-next-situation-step");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        if (this.globitoState.situationIndex === 0) {
          this.globitoState.situationIndex = 1;
          this.renderGlobitoSituation(containerId);
        } else {
          this.handleGlobitoVictory();
        }
      });
    }
  },

  // Celebración de victoria de Globito (Nivel 2)
  async handleGlobitoVictory() {
    this.stopAudio();
    emoTIC_Sound.playSuccess();

    await emoTIC_DB.saveProgress({
      activityId: "act-2",
      title: "La historia de Globito: Regular nuestras emociones",
      stars: 3,
      badgeName: "Maestro de la Calma",
      badgeIcon: "🐡",
      completedAt: new Date().toISOString()
    });

    this.launchConfetti();

    const modal = document.createElement("div");
    modal.className = "victory-modal-overlay";
    modal.innerHTML = `
      <div class="victory-card-box">
        <div class="victory-cat-avatar" style="background: radial-gradient(circle, #E0F2FE 30%, #BAE6FD 100%); box-shadow: 0 8px 24px rgba(2, 132, 199, 0.3);">
          <img src="assets/illustrations/globito.png" alt="Globito Feliz" style="width: 85px; height: 85px; object-fit: contain;" />
        </div>
        <h3 class="victory-title" style="color:#0369A1;">¡Increíble logro! 🐡</h3>
        <div class="victory-stars-row">⭐⭐⭐</div>
        <p class="victory-message-text">
          ¡Aprendiste la técnica de <strong>Globito el pez globo</strong>! Ahora sabes quedarte quieto y respirar 2 veces profundamente para calmarte ante cualquier situación.
        </p>
        <div class="victory-actions-row">
          <button class="btn-victory-replay" id="btn-replay-globito">Practicar de nuevo 🔄</button>
          <button class="btn-victory-menu" id="btn-victory-to-menu" style="background:#0284C7;">Elegir otro juego 🗺️</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("btn-replay-globito").addEventListener("click", () => {
      modal.remove();
      this.launchGlobitoActivity(this.currentActivity);
    });

    document.getElementById("btn-victory-to-menu").addEventListener("click", () => {
      modal.remove();
      emoTIC_Navigation.showScreen("worlds-screen");
    });

    emoTIC_Sound.speak("¡Burbujas de felicidad! Aprendiste a quedarte quieto y respirar como Globito. ¡Ganaste tres estrellas!");
  },

  // Victoria genérica para Nivel 1 (Gato)
  async handleGameVictory(characterType = "gato") {
    this.stopAudio();
    emoTIC_Sound.playSuccess();

    await emoTIC_DB.saveProgress({
      activityId: this.currentActivity.id,
      title: this.currentActivity.title,
      stars: 3,
      badgeName: "Maestro de las Emociones",
      badgeIcon: "🐱",
      completedAt: new Date().toISOString()
    });

    this.launchConfetti();

    const modal = document.createElement("div");
    modal.className = "victory-modal-overlay";
    modal.innerHTML = `
      <div class="victory-card-box">
        <div class="victory-cat-avatar">
          <img src="assets/illustrations/gato.svg" alt="Gato Feliz" style="width: 85px; height: 85px; object-fit: contain;" />
        </div>
        <h3 class="victory-title">¡Miau-ravilloso!</h3>
        <div class="victory-stars-row">⭐⭐⭐</div>
        <p class="victory-message-text">
          ¡Felicitaciones! Encontraste las <strong>6 parejas</strong> y aprendiste el significado de la alegría, tristeza, enojo, miedo, asco y sorpresa junto al Gato.
        </p>
        <div class="victory-actions-row">
          <button class="btn-victory-replay" id="btn-replay-game">Jugar otra vez</button>
          <button class="btn-victory-menu" id="btn-victory-to-menu">Elegir otro juego</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("btn-replay-game").addEventListener("click", () => {
      modal.remove();
      this.launchActivity(this.currentActivity);
    });

    document.getElementById("btn-victory-to-menu").addEventListener("click", () => {
      modal.remove();
      emoTIC_Navigation.showScreen("worlds-screen");
    });

    emoTIC_Sound.speak("¡Miau-ravilloso! Has encontrado todas las parejas de emociones y sus significados. ¡Ganaste tres estrellas!");
  },

  // =========================================================================
  // NIVEL 3: DESCUBRIENDO LAS EMOCIONES DE LOS DEMÁS (SOFI Y NICO)
  // =========================================================================
  launchEmpathyActivity(activity, containerId = "activity-player-container") {
    this.empathyState = {
      missionIndex: 0,
      qStepIndex: 0,
      score: 0,
      isQuestionLocked: false
    };

    this.renderEmpathyIntro(containerId);
  },

  // 1. Presentación de Sofi y Nico
  renderEmpathyIntro(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const kids = act.character || {};

    container.innerHTML = `
      <div class="activity-viewport">
        
        <!-- Barra superior -->
        <div class="activity-top-bar">
          <button class="btn-back-to-menu" id="btn-back-to-games">
            <span>←</span> Volver a los juegos
          </button>
          <div class="activity-title-group">
            <span class="activity-level-tag">Nivel 3 · Empatía y Convivencia</span>
            <h2 class="activity-game-heading">${act.title}</h2>
          </div>
          <div style="width: 140px; text-align: right;">
            <span style="font-size: 0.88rem; font-weight: 800; color: #7C3AED;">👫 Sofi y Nico</span>
          </div>
        </div>

        <!-- Tarjeta de Presentación de los Niños -->
        <section class="empathy-presentation-card">
          <div class="empathy-avatar-stage" id="kids-avatar-stage">
            <img src="${kids.avatarSvg || 'assets/illustrations/nino-nina.png'}" alt="Sofi y Nico" class="empathy-avatar-img" />
          </div>

          <div class="character-speech-bubble">
            <span class="character-name-badge" style="background:#EDE9FE; color:#6D28D9;">👫 ${kids.name || 'Sofi y Nico'}</span>
            <h3 style="font-size:1.4rem; color:#6D28D9; margin:4px 0 10px 0;">¡Detectives de la Empatía!</h3>
            
            <p class="character-bubble-text">«${kids.greeting}»</p>
            <p class="character-instruction-note">${kids.explanation}</p>

            <!-- Acciones de Audio y Comenzar -->
            <div class="character-audio-actions" style="margin-top: 18px;">
              <button class="btn-cat-audio" id="btn-play-voice-action" style="background:#7C3AED;">
                <span id="voice-audio-icon">🔊</span>
                <span id="voice-audio-label">Escuchar a Sofi y Nico</span>
              </button>

              <div class="audio-file-indicator" title="Ubicación donde colocas tu audio grabado">
                📁 <code>assets/audio/nino-nina-nivel3.mp3</code>
              </div>
            </div>

            <div style="margin-top: 24px;">
              <button class="btn-empathy-advance" id="btn-start-empathy-game" style="font-size:1.1rem; padding:12px 32px;">
                ¡Comenzar el Reto de Empatía! 🚀
              </button>
            </div>

          </div>
        </section>

      </div>
    `;

    // Conectar eventos
    const btnBack = document.getElementById("btn-back-to-games");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    const btnAudio = document.getElementById("btn-play-voice-action");
    if (btnAudio) {
      btnAudio.addEventListener("click", () => {
        this.toggleCustomAudio(
          act.character.audioFile || "assets/audio/nino-nina-nivel3.mp3",
          act.character.audioTranscript || act.character.greeting,
          "kids-avatar-stage"
        );
      });
    }

    const btnStart = document.getElementById("btn-start-empathy-game");
    if (btnStart) {
      btnStart.addEventListener("click", () => {
        emoTIC_Sound.playSuccess();
        this.stopAudio();
        this.renderEmpathyQuestion(containerId);
      });
    }
  },

  // 2. Vista Gamificada de Preguntas por Misión
  renderEmpathyQuestion(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const mission = act.missions[this.empathyState.missionIndex] || act.missions[0];
    const currentQ = mission.questions[this.empathyState.qStepIndex] || mission.questions[0];
    this.empathyState.isQuestionLocked = false;

    container.innerHTML = `
      <div class="activity-viewport">
        
        <div class="activity-top-bar">
          <button class="btn-back-to-menu" id="btn-back-to-games">
            <span>←</span> Volver a los juegos
          </button>
          <div class="activity-title-group">
            <span class="activity-level-tag">Nivel 3 · Misión ${mission.number} de ${act.missions.length}</span>
            <h2 class="activity-game-heading">${mission.title}</h2>
          </div>
          <button class="btn-restart-game" id="btn-view-intro-again">👫 Guía</button>
        </div>

        <div class="empathy-mission-container">
          
          <!-- Tracker de Misiones -->
          <div class="empathy-mission-tracker">
            ${act.missions.map((m, idx) => `
              <span class="mission-chip ${this.empathyState.missionIndex === idx ? 'active' : (this.empathyState.missionIndex > idx ? 'done' : '')}">
                ${m.icon} Misión ${idx + 1}
              </span>
              ${idx < act.missions.length - 1 ? '<span style="color:#CBD5E1;">•</span>' : ''}
            `).join('')}
            <span style="font-size:0.85rem; font-weight:800; color:#7C3AED; background:#EDE9FE; padding:4px 10px; border-radius:999px;">
              Paso ${this.empathyState.qStepIndex + 1} de ${mission.questions.length}
            </span>
          </div>

          <!-- Tarjeta de la Situación Observada -->
          <div class="empathy-scenario-card">
            <div class="scenario-header-row">
              <span class="scenario-badge-icon">${mission.icon}</span>
              <h3 class="scenario-title">${mission.title}</h3>
            </div>
            <p class="scenario-story-text">«${mission.scenario}»</p>
          </div>

          <!-- Tarjeta de la Pregunta Actual -->
          <div class="empathy-question-card">
            <span class="question-step-badge">${currentQ.badge}</span>
            <h4 class="question-title">${currentQ.question}</h4>

            <!-- Opciones Interactivas -->
            <div class="empathy-options-grid" id="empathy-options-grid">
              ${currentQ.options.map((opt, idx) => `
                <button class="empathy-opt-btn" data-index="${idx}" data-correct="${opt.isCorrect}">
                  <span class="opt-radio-circle">${String.fromCharCode(65 + idx)}</span>
                  <span>${opt.text}</span>
                </button>
              `).join('')}
            </div>

            <div id="empathy-feedback-area"></div>
          </div>

        </div>

      </div>
    `;

    // Conectar eventos
    const btnBack = document.getElementById("btn-back-to-games");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    const btnIntro = document.getElementById("btn-view-intro-again");
    if (btnIntro) {
      btnIntro.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.renderEmpathyIntro(containerId);
      });
    }

    // Clic en las opciones de respuesta
    const optButtons = container.querySelectorAll(".empathy-opt-btn");
    optButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        if (this.empathyState.isQuestionLocked) return;
        const isCorrect = btn.getAttribute("data-correct") === "true";
        const optIndex = parseInt(btn.getAttribute("data-index"), 10);
        const optData = currentQ.options[optIndex];

        const feedbackArea = document.getElementById("empathy-feedback-area");

        if (isCorrect) {
          this.empathyState.isQuestionLocked = true;
          emoTIC_Sound.playSuccess();
          btn.classList.add("correct");

          optButtons.forEach(b => b.classList.add("locked"));

          const isLastQuestionOfMission = this.empathyState.qStepIndex >= mission.questions.length - 1;
          const isLastMission = this.empathyState.missionIndex >= act.missions.length - 1;

          feedbackArea.innerHTML = `
            <div class="empathy-feedback-banner success">
              <span style="font-size:1.2rem; display:block; margin-bottom:4px;">✨ ¡Excelente respuesta empática!</span>
              <p style="margin:0 0 12px 0;">${optData.feedback}</p>
              <button class="btn-empathy-advance" id="btn-next-step-advance">
                ${isLastQuestionOfMission ? (isLastMission ? '¡Completar Reto y Ganar Estrellas! ⭐⭐⭐' : '¡Siguiente Misión de Empatía! 🚀') : 'Siguiente Paso ▶'}
              </button>
            </div>
          `;

          emoTIC_Sound.speak(optData.feedback);

          document.getElementById("btn-next-step-advance").addEventListener("click", () => {
            emoTIC_Sound.playClick();
            if (isLastQuestionOfMission) {
              if (isLastMission) {
                this.handleEmpathyVictory();
              } else {
                this.empathyState.missionIndex++;
                this.empathyState.qStepIndex = 0;
                this.renderEmpathyQuestion(containerId);
              }
            } else {
              this.empathyState.qStepIndex++;
              this.renderEmpathyQuestion(containerId);
            }
          });

        } else {
          emoTIC_Sound.playGentleNotice();
          btn.classList.add("incorrect");
          feedbackArea.innerHTML = `
            <div class="empathy-feedback-banner try-again">
              <span>💡 Pista de Sofi y Nico:</span>
              <p style="margin:4px 0 0 0;">${optData.feedback} ¡Intenta con otra opción!</p>
            </div>
          `;
          emoTIC_Sound.speak(optData.feedback);
        }
      });
    });
  },

  // 3. Celebración de Victoria Nivel 3 (Sofi y Nico)
  async handleEmpathyVictory() {
    this.stopAudio();
    emoTIC_Sound.playSuccess();

    await emoTIC_DB.saveProgress({
      activityId: "act-3",
      title: "Descubriendo las emociones de los demás",
      stars: 3,
      badgeName: "Detective de la Empatía",
      badgeIcon: "🤝",
      completedAt: new Date().toISOString()
    });

    this.launchConfetti();

    const modal = document.createElement("div");
    modal.className = "victory-modal-overlay";
    modal.innerHTML = `
      <div class="victory-card-box">
        <div class="victory-cat-avatar" style="background: radial-gradient(circle, #EDE9FE 30%, #DDD6FE 100%); box-shadow: 0 8px 24px rgba(124, 58, 237, 0.3);">
          <img src="assets/illustrations/nino-nina.png" alt="Sofi y Nico" style="width: 85px; height: 85px; object-fit: contain;" />
        </div>
        <h3 class="victory-title" style="color:#6D28D9;">¡Misión de Empatía Conquistada!</h3>
        <div class="victory-stars-row">⭐⭐⭐</div>
        <p class="victory-message-text">
          ¡Felicitaciones! Completaste las 2 misiones de empatía mutua entre Sofi y Nico. Ahora eres un <strong>Detective de la Empatía</strong>: sabes reconocer las emociones de tus compañeros y ofrecer tu ayuda con cariño y respeto.
        </p>
        <div class="victory-actions-row">
          <button class="btn-victory-replay" id="btn-replay-empathy">Repetir Reto</button>
          <button class="btn-victory-menu" id="btn-victory-to-menu" style="background:#7C3AED;">Elegir otro juego</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("btn-replay-empathy").addEventListener("click", () => {
      modal.remove();
      this.launchEmpathyActivity(this.currentActivity);
    });

    document.getElementById("btn-victory-to-menu").addEventListener("click", () => {
      modal.remove();
      emoTIC_Navigation.showScreen("worlds-screen");
    });

    emoTIC_Sound.speak("¡Fantástico trabajo en equipo! Eres un verdadero Detective de la Empatía. ¡Ganaste tres estrellas!");
  },

  // =========================================================================
  // NIVEL 4: AMIGO QUE AYUDA (HÉROE Y HEROÍNA - SUPERHÉROES DE LA AYUDA)
  // =========================================================================
  launchHeroHelpActivity(activity, containerId = "activity-player-container") {
    this.heroState = {
      situationIndex: 0,
      stageStep: 1, // 1: acercarse, 2: elegir forma de ayudar, 3: se puso feliz y escala
      chosenScale: 2, // 1: Nunca, 2: A veces, 3: Siempre
      selectedChar: "heroina", // "heroina" o "heroe"
      isHeroAtFriend: false,
      isMusicPlaying: false,
      feedbackMessage: null
    };

    this.renderHeroIntro(containerId);
  },

  // 1. Presentación de Héroe y Heroína
  renderHeroIntro(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const heroChar = act.character || {};

    container.innerHTML = `
      <div class="activity-viewport">
        <div class="activity-top-bar">
          <button class="btn-back-to-menu" id="btn-back-to-games">
            <span>←</span> Volver a los juegos
          </button>
          <div class="activity-title-group">
            <span class="activity-level-tag">Nivel 4 · Conducta Prosocial y Solidaridad</span>
            <h2 class="activity-game-heading">${act.title}</h2>
          </div>
          <div style="width: 140px; text-align: right;">
            <span style="font-size: 0.88rem; font-weight: 800; color: #2563EB;">🦸 Héroe y Heroína</span>
          </div>
        </div>

        <section class="empathy-presentation-card">
          <div class="empathy-avatar-stage" id="hero-avatar-stage" style="background: radial-gradient(circle, #EFF6FF 30%, #DBEAFE 100%);">
            <img src="${heroChar.avatarSvg || 'assets/illustrations/heroe-heroina-duo.png'}" alt="Héroe y Heroína" class="empathy-avatar-img" />
          </div>

          <div class="character-speech-bubble">
            <span class="character-name-badge" style="background:#DBEAFE; color:#1E40AF;"><img src="assets/illustrations/hero-badge.png" alt="Hero" style="width:16px;height:16px;vertical-align:middle;margin-right:3px;display:inline-block;" /> ${heroChar.name || 'Héroe y Heroína'}</span>
            <h3 style="font-size:1.4rem; color:#1E40AF; margin:4px 0 10px 0;">¡Superhéroes de la Ayuda!</h3>
            
            <p class="character-bubble-text">«${heroChar.greeting}»</p>
            <p class="character-instruction-note">${heroChar.explanation}</p>

            <!-- Selección de Personaje -->
            <div style="margin: 16px 0; display:flex; align-items:center; justify-content:center; gap: 14px; flex-wrap:wrap;">
              <span style="font-weight:700; color:#1E293B; font-size:0.95rem;">¿Con quién deseas jugar?</span>
              <button class="hero-pill-btn ${this.heroState.selectedChar === 'heroina' ? 'active' : ''}" id="btn-choose-heroina">
                <span><img src="assets/illustrations/heroina-avatar.png" alt="Heroína" style="width:22px;height:22px;object-fit:contain;vertical-align:middle;margin-right:4px;" /> Heroína</span>
              </button>
              <button class="hero-pill-btn ${this.heroState.selectedChar === 'heroe' ? 'active' : ''}" id="btn-choose-heroe">
                <span><img src="assets/illustrations/heroe-avatar.png" alt="Héroe" style="width:22px;height:22px;object-fit:contain;vertical-align:middle;margin-right:4px;" /> Héroe</span>
              </button>
            </div>

            <!-- Acciones de Audio y Comenzar -->
            <div class="character-audio-actions" style="margin-top: 14px;">
              <button class="btn-cat-audio" id="btn-play-voice-action" style="background:#2563EB;">
                <span id="voice-audio-icon">🔊</span>
                <span id="voice-audio-label">Escuchar a Héroe y Heroína</span>
              </button>

              <div class="audio-file-indicator" title="Ubicación donde colocas tu audio grabado">
                📁 <code>assets/audio/heroe-heroina-nivel4.mp3</code>
              </div>
            </div>

            <div style="margin-top: 24px;">
              <button class="btn-empathy-advance" id="btn-start-hero-game" style="background:#2563EB; font-size:1.1rem; padding:12px 32px; box-shadow:0 4px 14px rgba(37,99,235,0.35);">
                ¡Comenzar Reto de Ayuda! 🚀
              </button>
            </div>
          </div>
        </section>
      </div>
    `;

    // Conectar eventos
    const btnBack = document.getElementById("btn-back-to-games");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    const btnHeroina = document.getElementById("btn-choose-heroina");
    const btnHeroe = document.getElementById("btn-choose-heroe");
    if (btnHeroina && btnHeroe) {
      btnHeroina.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.heroState.selectedChar = "heroina";
        btnHeroina.classList.add("active");
        btnHeroe.classList.remove("active");
      });
      btnHeroe.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.heroState.selectedChar = "heroe";
        btnHeroe.classList.add("active");
        btnHeroina.classList.remove("active");
      });
    }

    const btnAudio = document.getElementById("btn-play-voice-action");
    if (btnAudio) {
      btnAudio.addEventListener("click", () => {
        this.toggleCustomAudio(
          act.character.audioFile || "assets/audio/heroe-heroina-nivel4.mp3",
          act.character.audioTranscript || act.character.greeting,
          "hero-avatar-stage"
        );
      });
    }

    const btnStart = document.getElementById("btn-start-hero-game");
    if (btnStart) {
      btnStart.addEventListener("click", () => {
        emoTIC_Sound.playSuccess();
        this.stopAudio();
        this.heroState.situationIndex = 0;
        this.heroState.stageStep = 1;
        this.renderHeroSituation(containerId);
      });
    }
  },

  // 2. Renderizar Situación (Fiel a Fotos 1, 2, 3)
  renderHeroSituation(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const sit = act.situations[this.heroState.situationIndex] || act.situations[0];
    const step = this.heroState.stageStep; // 1, 2, 3
    const isHeroina = this.heroState.selectedChar === "heroina";
    const heroAvatarSrc = isHeroina 
      ? ((act.character && act.character.heroinaSvg) || "assets/illustrations/heroina-avatar.png") 
      : ((act.character && act.character.heroeSvg) || "assets/illustrations/heroe-avatar.png");

    const getHeartsText = (val) => {
      if (val === 1) return "🤍";
      if (val === 2) return "💖💖";
      return "💖💖💖";
    };

    container.innerHTML = `
      <div class="activity-viewport">
        <div class="hero-game-wrapper">
          
          <!-- Fila Superior de Botones Píldora (Casa, Escuchar, Música, Voz) -->
          <div class="hero-top-bar-row">
            <button class="hero-pill-btn" id="btn-hero-top-home" title="Volver al menú de juegos">
              <span>🏠</span>
            </button>
            <button class="hero-pill-btn" id="btn-hero-top-listen" title="Escuchar la voz de los personajes">
              <span>🔊</span> Escuchar
            </button>
            <button class="hero-pill-btn" id="btn-hero-top-music" title="Música de fondo">
              <span id="hero-music-icon">🔇</span> Música
            </button>
            <button class="hero-pill-btn" id="btn-hero-top-voice" title="Activar o desactivar voz narrada">
              <span id="hero-voice-icon">🗣️</span> <span id="hero-voice-label">${emoTIC_Sound.speechEnabled ? 'Voz sí' : 'Voz no'}</span>
            </button>
          </div>

          <!-- Banner Superior con Osito (Fiel a Fotos 1 y 3) -->
          <div class="hero-banner-pill">
            <span class="hero-bear-avatar">🐻</span>
            <h3 class="hero-banner-heading" id="hero-banner-heading">
              ${step === 3 ? sit.resolvedBanner : sit.bannerText}
            </h3>
          </div>

          <!-- Escenario Central (Gradiente celeste a amarillo crema) -->
          <div class="hero-stage-card">
            
            <!-- Iconos Superiores: 💭 🎲 ❓ -->
            <div class="hero-stage-top-icons">
              <span>💭</span>
              <span>🎲</span>
              <span>❓</span>
            </div>

            <!-- Contenido dinámico según el paso -->
            ${step === 1 ? `
              <!-- PASO 1: HÉROE A LA IZQUIERDA, COMPAÑERO A LA DERECHA -->
              <div class="hero-stage-interactive-area" id="hero-interactive-area">
                <div class="hero-character-box" id="hero-draggable-char" draggable="true" role="button" tabindex="0" title="¡Tócame o arrástrame para acercarte a tu amigo!">
                  <img src="${heroAvatarSrc}" alt="Héroe" class="hero-char-img" />
                </div>

                <div class="hero-peer-card" id="hero-target-peer" title="Compañero que necesita ayuda">
                  <span class="hero-peer-emoji">${sit.initialEmotionIcon}</span>
                </div>
              </div>

              <!-- Instrucción Inferior -->
              <div class="hero-stage-footer-instruction">
                <span class="hero-instruction-text">👆 ${sit.dragPrompt}</span>
                <span class="hero-footer-star">⭐</span>
              </div>
            ` : step === 2 ? `
              <!-- PASO 2: FORMAS DE AYUDAR A LA IZQUIERDA, COMPAÑERO A LA DERECHA -->
              <div class="hero-stage-interactive-area">
                <div class="hero-options-row" id="hero-action-options-group">
                  ${sit.options.map(opt => `
                    <button class="hero-opt-action-card" data-opt-id="${opt.id}" data-correct="${opt.isCorrect}">
                      <span class="hero-opt-icon">${opt.icon}</span>
                      <span class="hero-opt-text">${opt.text}</span>
                    </button>
                  `).join('')}
                </div>

                <div class="hero-peer-card" id="hero-target-peer">
                  <span class="hero-peer-emoji">${sit.initialEmotionIcon}</span>
                </div>
              </div>

              <div id="hero-feedback-spot"></div>

              <!-- Instrucción Inferior -->
              <div class="hero-stage-footer-instruction">
                <span class="hero-instruction-text">👆 ${sit.choosePrompt}</span>
                <span class="hero-footer-star">⭐</span>
              </div>
            ` : `
              <!-- PASO 3: REFLEXIÓN Y ESCALA DE CORAZONES (SIN BARRITA) -->
              <div class="hero-reflection-view">
                <div class="hero-peer-card happy-state" style="margin: 0 auto 6px;">
                  <span class="hero-peer-emoji">${sit.happyEmotionIcon}</span>
                </div>

                <h4 class="hero-reflection-title">${sit.reflectionQuestion}</h4>
                <p class="hero-reflection-subtitle">${sit.reflectionPrompt}</p>

                <!-- Fila de Corazones Dinámicos Superiores -->
                <div class="hero-hearts-display-row" id="hero-hearts-display">
                  ${getHeartsText(this.heroState.chosenScale)}
                </div>

                <!-- 3 Opciones de la Escala (Fiel al requerimiento: en vez de barrita) -->
                <div class="hero-scale-cards-row">
                  <button class="hero-scale-choice-btn ${this.heroState.chosenScale === 1 ? 'active' : ''}" data-scale="1">
                    <span class="hero-scale-badge-hearts">🤍</span>
                    <span>1 Nunca</span>
                  </button>
                  <button class="hero-scale-choice-btn ${this.heroState.chosenScale === 2 ? 'active' : ''}" data-scale="2">
                    <span class="hero-scale-badge-hearts">💖💖</span>
                    <span>2 A veces</span>
                  </button>
                  <button class="hero-scale-choice-btn ${this.heroState.chosenScale === 3 ? 'active' : ''}" data-scale="3">
                    <span class="hero-scale-badge-hearts">💖💖💖</span>
                    <span>3 Siempre</span>
                  </button>
                </div>

                <!-- Botón Morado con Checkmark Verde (Fiel a Foto 3) -->
                <button class="btn-hero-ready" id="btn-hero-ready-step">
                  <span class="hero-check-square">✓</span> Listo
                </button>

                <span class="hero-footer-star" style="margin-top:6px;">⭐</span>
              </div>
            `}

          </div>

        </div>
      </div>
    `;

    // Conectar eventos de la barra superior
    const btnHome = document.getElementById("btn-hero-top-home");
    if (btnHome) {
      btnHome.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    const btnListen = document.getElementById("btn-hero-top-listen");
    if (btnListen) {
      btnListen.addEventListener("click", () => {
        this.toggleCustomAudio(
          act.character.audioFile || "assets/audio/heroe-heroina-nivel4.mp3",
          sit.peerDesc || act.character.greeting,
          "hero-draggable-char"
        );
      });
    }

    const btnMusic = document.getElementById("btn-hero-top-music");
    const musicIcon = document.getElementById("hero-music-icon");
    if (btnMusic && musicIcon) {
      btnMusic.addEventListener("click", () => {
        this.heroState.isMusicPlaying = !this.heroState.isMusicPlaying;
        if (this.heroState.isMusicPlaying) {
          emoTIC_Sound.playSuccess();
          musicIcon.textContent = "🎵";
          btnMusic.classList.add("active");
        } else {
          musicIcon.textContent = "🔇";
          btnMusic.classList.remove("active");
        }
      });
    }

    const btnVoice = document.getElementById("btn-hero-top-voice");
    const voiceLabel = document.getElementById("hero-voice-label");
    if (btnVoice && voiceLabel) {
      btnVoice.addEventListener("click", () => {
        emoTIC_Sound.speechEnabled = !emoTIC_Sound.speechEnabled;
        emoTIC_Sound.soundEnabled = emoTIC_Sound.speechEnabled;
        voiceLabel.textContent = emoTIC_Sound.speechEnabled ? "Voz sí" : "Voz no";
        if (emoTIC_Sound.speechEnabled) emoTIC_Sound.playSuccess();
      });
    }

    // Lógica Paso 1: Acercar al Héroe (Arrastre o Clic)
    if (step === 1) {
      const heroCharEl = document.getElementById("hero-draggable-char");
      const targetPeerEl = document.getElementById("hero-target-peer");

      const advanceToHelpAction = () => {
        if (heroCharEl.classList.contains("hero-flying-target")) return;
        heroCharEl.classList.add("hero-flying-target");
        emoTIC_Sound.playSuccess();
        emoTIC_Sound.speak("¡Llegaste a acompañar a tu amigo! Ahora elige cómo puedes ayudarlo.");

        setTimeout(() => {
          this.heroState.stageStep = 2;
          this.renderHeroSituation(containerId);
        }, 650);
      };

      if (heroCharEl) {
        heroCharEl.addEventListener("click", advanceToHelpAction);

        heroCharEl.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", "hero");
          heroCharEl.classList.add("dragging");
        });

        heroCharEl.addEventListener("dragend", () => {
          heroCharEl.classList.remove("dragging");
        });
      }

      if (targetPeerEl) {
        targetPeerEl.addEventListener("dragover", (e) => {
          e.preventDefault();
        });

        targetPeerEl.addEventListener("drop", (e) => {
          e.preventDefault();
          advanceToHelpAction();
        });
      }
    }

    // Lógica Paso 2: Elegir Forma de Ayudar
    if (step === 2) {
      const optButtons = container.querySelectorAll(".hero-opt-action-card");
      const feedbackSpot = document.getElementById("hero-feedback-spot");

      optButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const isCorrect = btn.getAttribute("data-correct") === "true";
          const optId = btn.getAttribute("data-opt-id");
          const optData = sit.options.find(o => o.id === optId);

          if (isCorrect) {
            btn.classList.add("selected-correct");
            emoTIC_Sound.playSuccess();
            emoTIC_Sound.speak(optData.feedback);

            if (feedbackSpot) {
              feedbackSpot.innerHTML = `
                <div class="hero-feedback-bubble" style="background:#DCFCE7; border-color:#86EFAC; color:#166534;">
                  ✨ ${optData.feedback}
                </div>
              `;
            }

            setTimeout(() => {
              this.heroState.stageStep = 3;
              this.renderHeroSituation(containerId);
            }, 1200);

          } else {
            btn.classList.add("selected-wrong");
            emoTIC_Sound.playGentleNotice();
            emoTIC_Sound.speak(optData.feedback);

            if (feedbackSpot) {
              feedbackSpot.innerHTML = `
                <div class="hero-feedback-bubble">
                  💡 ${optData.feedback} ¡Intenta otra forma de ayudar!
                </div>
              `;
            }
          }
        });
      });
    }

    // Lógica Paso 3: Escala de Reflexión y Botón Listo
    if (step === 3) {
      const scaleBtns = container.querySelectorAll(".hero-scale-choice-btn");
      const heartsDisplay = document.getElementById("hero-hearts-display");
      const btnReady = document.getElementById("btn-hero-ready-step");

      scaleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          const val = parseInt(btn.getAttribute("data-scale"), 10);
          this.heroState.chosenScale = val;
          emoTIC_Sound.playClick();

          scaleBtns.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");

          if (heartsDisplay) {
            heartsDisplay.innerHTML = getHeartsText(val);
            heartsDisplay.style.transform = "scale(1.2)";
            setTimeout(() => heartsDisplay.style.transform = "scale(1)", 200);
          }
        });
      });

      if (btnReady) {
        btnReady.addEventListener("click", () => {
          emoTIC_Sound.playSuccess();

          if (this.heroState.situationIndex < act.situations.length - 1) {
            this.heroState.situationIndex++;
            this.heroState.stageStep = 1;
            this.heroState.chosenScale = 2;
            this.renderHeroSituation(containerId);
          } else {
            this.handleHeroVictory();
          }
        });
      }
    }
  },

  // 3. Celebración de Victoria Nivel 4 (Héroe y Heroína)
  async handleHeroVictory() {
    this.stopAudio();
    emoTIC_Sound.playSuccess();

    await emoTIC_DB.saveProgress({
      activityId: "act-4",
      title: "Amigo que ayuda",
      stars: 3,
      badgeName: "Superamigo que Ayuda",
      badgeIcon: "🦸",
      completedAt: new Date().toISOString()
    });

    this.launchConfetti();

    const modal = document.createElement("div");
    modal.className = "victory-modal-overlay";
    modal.innerHTML = `
      <div class="victory-card-box">
        <div class="victory-cat-avatar" style="background: radial-gradient(circle, #EFF6FF 30%, #DBEAFE 100%); box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);">
          <img src="assets/illustrations/heroe-heroina-duo.png" alt="Héroe y Heroína" style="width: 105px; height: 105px; object-fit: contain;" />
        </div>
        <h3 class="victory-title" style="color:#1E40AF;">¡Gran Superamigo de las Emociones!</h3>
        <div class="victory-stars-row">⭐⭐⭐</div>
        <p class="victory-message-text">
          ¡Felicitaciones! Has completado todas las situaciones. Demostraste que el verdadero superpoder es estar atento a los demás, acercarte con cariño y brindar tu ayuda para que todos vuelvan a sonreír.
        </p>
        <div class="victory-actions-row">
          <button class="btn-victory-replay" id="btn-replay-hero">Jugar de nuevo</button>
          <button class="btn-victory-menu" id="btn-victory-to-menu" style="background:#2563EB;">Elegir otro juego</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("btn-replay-hero").addEventListener("click", () => {
      modal.remove();
      this.launchHeroHelpActivity(this.currentActivity);
    });

    document.getElementById("btn-victory-to-menu").addEventListener("click", () => {
      modal.remove();
      emoTIC_Navigation.showScreen("worlds-screen");
    });

    emoTIC_Sound.speak("¡Increíble superhéroe! Demostraste el poder de la ayuda y la amistad. ¡Ganaste tres estrellas brillantes!");
  },

  // =========================================================================
  // NIVEL 5: EL BOSQUE DE LAS FAMILIAS (PERSONAJE: TIMO)
  // =========================================================================
  launchFamilyForestActivity(activity, containerId = "activity-player-container") {
    this.timoState = {
      activityIndex: 0,
      selectedAvatar: "explorador",
      vignetteSlots: [null, null, null],
      isAnswerLocked: false
    };

    this.renderTimoIntro(containerId);
  },

  // 1. Presentación de Timo y Elección de Avatar
  renderTimoIntro(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const timo = act.character || {};
    const avatars = act.avatars || [];

    container.innerHTML = `
      <div class="activity-viewport">
        <div class="activity-top-bar">
          <button class="btn-back-to-menu" id="btn-back-to-games">
            <span>←</span> Volver a los juegos
          </button>
          <div class="activity-title-group">
            <span class="activity-level-tag">Nivel 5 · El bosque de las familias</span>
            <h2 class="activity-game-heading">${act.title}</h2>
          </div>
          <div style="width: 140px; text-align: right;">
            <span style="font-size: 0.88rem; font-weight: 800; color: #059669;">🌳 Timo el Curioso</span>
          </div>
        </div>

        <section class="empathy-presentation-card">
          <div class="empathy-avatar-stage" id="timo-avatar-stage" style="background: radial-gradient(circle, #ECFDF5 30%, #D1FAE5 100%);">
            <img src="${timo.avatarSvg || 'assets/illustrations/timo.png'}" alt="Timo" class="empathy-avatar-img" />
          </div>

          <div class="character-speech-bubble">
            <span class="character-name-badge" style="background:#D1FAE5; color:#065F46;">🌳 ${timo.name || 'Timo'}</span>
            <h3 style="font-size:1.4rem; color:#065F46; margin:4px 0 8px 0;">¡El Bosque de las Familias!</h3>
            
            <p class="character-bubble-text">«${timo.greeting}»</p>
            <p class="character-instruction-note">${timo.explanation}</p>

            <!-- Frases características de Timo -->
            <div class="timo-phrases-row">
              ${(timo.phrases || []).map(p => `
                <span class="timo-phrase-pill">${p}</span>
              `).join('')}
            </div>

            <!-- Elección de Avatar por el Niño (Explorador, Exploradora, Animal Fantástico) -->
            <div class="timo-avatar-select-section">
              <h4 class="timo-avatar-select-title">✨ Elige tu avatar para esta aventura:</h4>
              <div class="timo-avatars-grid">
                ${avatars.map(av => `
                  <div class="timo-avatar-choice-card ${this.timoState.selectedAvatar === av.id ? 'selected' : ''}" data-avatar-id="${av.id}">
                    <img src="${av.svg}" alt="${av.name}" class="timo-avatar-choice-img" />
                    <span class="timo-avatar-choice-label">${av.icon} ${av.name}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Acciones de Audio y Comenzar -->
            <div class="character-audio-actions" style="margin-top: 14px;">
              <button class="btn-cat-audio" id="btn-play-voice-action" style="background:#059669;">
                <span id="voice-audio-icon">🔊</span>
                <span id="voice-audio-label">Escuchar a Timo</span>
              </button>

              <div class="audio-file-indicator" title="Ubicación donde colocas tu audio grabado">
                📁 <code>assets/audio/timo-nivel5.mp3</code>
              </div>
            </div>

            <div style="margin-top: 22px;">
              <button class="btn-timo-advance" id="btn-start-timo-game">
                ¡Entrar al Bosque de las Familias! 🌳
              </button>
            </div>
          </div>
        </section>
      </div>
    `;

    // Conectar eventos
    const btnBack = document.getElementById("btn-back-to-games");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    // Selección de Avatar
    const avatarCards = container.querySelectorAll(".timo-avatar-choice-card");
    avatarCards.forEach(card => {
      card.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.timoState.selectedAvatar = card.getAttribute("data-avatar-id");
        avatarCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
      });
    });

    const btnAudio = document.getElementById("btn-play-voice-action");
    if (btnAudio) {
      btnAudio.addEventListener("click", () => {
        this.toggleCustomAudio(
          act.character.audioFile || "assets/audio/timo-nivel5.mp3",
          act.character.audioTranscript || act.character.greeting,
          "timo-avatar-stage"
        );
      });
    }

    const btnStart = document.getElementById("btn-start-timo-game");
    if (btnStart) {
      btnStart.addEventListener("click", () => {
        emoTIC_Sound.playSuccess();
        this.stopAudio();
        this.timoState.activityIndex = 0;
        this.timoState.vignetteSlots = [null, null, null];
        this.renderTimoActivity(containerId);
      });
    }
  },

  // 2. Renderizar Actividad Actual (1, 2 o 3)
  renderTimoActivity(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const currentSubAct = act.activitiesList[this.timoState.activityIndex] || act.activitiesList[0];
    const userAvatarData = act.avatars.find(a => a.id === this.timoState.selectedAvatar) || act.avatars[0];
    this.timoState.isAnswerLocked = false;

    container.innerHTML = `
      <div class="activity-viewport">
        <div class="timo-forest-container">
          
          <!-- Barra superior de navegación -->
          <div class="activity-top-bar">
            <button class="btn-back-to-menu" id="btn-back-to-games">
              <span>←</span> Volver a los juegos
            </button>
            <div class="activity-title-group">
              <span class="activity-level-tag">Nivel 5 · ${currentSubAct.badge}</span>
              <h2 class="activity-game-heading">${currentSubAct.title}</h2>
            </div>
            <!-- Avatar del estudiante seleccionado y Timo -->
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size: 0.88rem; font-weight: 800; color: #065F46;">
                ${userAvatarData.icon} ${userAvatarData.name} + 🌳 Timo
              </span>
            </div>
          </div>

          <!-- Tracker de Actividades de Timo -->
          <div class="timo-tracker-row">
            <span class="timo-step-chip ${this.timoState.activityIndex === 0 ? 'active' : (this.timoState.activityIndex > 0 ? 'done' : '')}">
              🏠 1. Elegir actuar
            </span>
            <span style="color:#CBD5E1;">•</span>
            <span class="timo-step-chip ${this.timoState.activityIndex === 1 ? 'active' : (this.timoState.activityIndex > 1 ? 'done' : '')}">
              🐿️ 2. Ordenar viñetas
            </span>
            <span style="color:#CBD5E1;">•</span>
            <span class="timo-step-chip ${this.timoState.activityIndex === 2 ? 'active' : ''}">
              🦉 3. Completar diálogos
            </span>
          </div>

          <!-- Tarjeta Central de la Actividad -->
          <div class="timo-activity-card">
            
            <div class="timo-activity-header">
              <div class="timo-act-icon-badge">${currentSubAct.icon}</div>
              <div class="timo-act-heading-group">
                <h3>${currentSubAct.title}</h3>
                <span>${currentSubAct.badge}</span>
              </div>
            </div>

            <!-- Caja de Historia / Situación -->
            <div class="timo-story-box">
              ${currentSubAct.situationText}
            </div>

            <!-- CONTENIDO ESPECÍFICO SEGÚN EL TIPO DE ACTIVIDAD -->
            ${currentSubAct.type === "situation-choice" ? `
              <!-- ACTIVIDAD 1: ELEGIR CÓMO ACTUAR -->
              <h4 style="font-size:1.05rem; color:#065F46; margin:6px 0 0 0;">${currentSubAct.question}</h4>
              <div class="timo-options-grid" id="timo-options-group">
                ${currentSubAct.options.map((opt, idx) => `
                  <button class="timo-opt-btn" data-index="${idx}" data-correct="${opt.isCorrect}">
                    <span class="timo-opt-icon-circle">${opt.icon}</span>
                    <span>${opt.text}</span>
                  </button>
                `).join('')}
              </div>
              <div id="timo-feedback-area"></div>
            ` : currentSubAct.type === "vignette-order" ? `
              <!-- ACTIVIDAD 2: ORDENAR VIÑETAS DE LA HISTORIA -->
              <p class="vignettes-instruction-text">
                👇 Toca o arrastra cada viñeta para colocarla en el orden correcto (1. Inicio, 2. Desarrollo, 3. Desenlace):
              </p>

              <!-- Los 3 Espacios Ordenados -->
              <div class="vignette-slots-row" id="vignette-slots-container">
                ${[1, 2, 3].map(slotNum => {
                  const placedCard = this.timoState.vignetteSlots[slotNum - 1];
                  return `
                    <div class="vignette-target-slot ${placedCard ? 'filled' : ''}" data-slot="${slotNum}">
                      <span class="vignette-slot-badge">Paso ${slotNum}: ${slotNum === 1 ? 'Inicio' : (slotNum === 2 ? 'Desarrollo' : 'Desenlace')}</span>
                      ${placedCard ? `
                        <div class="vignette-piece-icon">${placedCard.icon}</div>
                        <p class="vignette-piece-text" style="margin:4px 0 0 0;">${placedCard.text}</p>
                        <button class="btn-remove-vignette" data-slot-remove="${slotNum}" style="background:none; border:none; color:#EF4444; font-size:0.75rem; font-weight:800; cursor:pointer; margin-top:6px;">Quitar ✕</button>
                      ` : `
                        <span class="vignette-slot-placeholder-text">Toca una viñeta para colocarla aquí</span>
                      `}
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Banco de Viñetas Disponibles -->
              <div class="vignette-cards-pool" id="vignette-pool-container">
                ${currentSubAct.cards.map(card => {
                  const isAlreadyPlaced = this.timoState.vignetteSlots.some(s => s && s.id === card.id);
                  return `
                    <div class="vignette-piece-card ${isAlreadyPlaced ? 'placed' : ''}" data-card-id="${card.id}" draggable="${!isAlreadyPlaced}">
                      <span class="vignette-piece-icon">${card.icon}</span>
                      <p class="vignette-piece-text">${card.text}</p>
                    </div>
                  `;
                }).join('')}
              </div>

              <div id="vignette-feedback-area"></div>
            ` : `
              <!-- ACTIVIDAD 3: COMPLETAR DIÁLOGO -->
              <div class="timo-dialogue-stage">
                <!-- Diálogo del Búho Sabio -->
                <div class="timo-character-bubble-row">
                  <div class="timo-speaker-avatar" title="Búho Sabio">🦉</div>
                  <div class="timo-dialogue-speech-box">
                    <strong>Tío Búho:</strong>
                    «Beni, veo que estás asustado y con las orejitas bajas. ¿Qué te gustaría decirme?»
                  </div>
                </div>

                <h4 style="font-size:1.05rem; color:#065F46; margin:8px 0 0 0;">
                  ${currentSubAct.question}
                </h4>

                <!-- Opciones de Diálogo de Beni -->
                <div class="timo-dialogue-choices-group" id="timo-dialogue-group">
                  ${currentSubAct.dialogueOptions.map((opt, idx) => `
                    <button class="timo-dialogue-btn" data-index="${idx}" data-correct="${opt.isCorrect}">
                      <span style="font-size:1.4rem;">${opt.icon}</span>
                      <span>${opt.bubbleText}</span>
                    </button>
                  `).join('')}
                </div>

                <div id="dialogue-feedback-area"></div>
              </div>
            `}

          </div>

        </div>
      </div>
    `;

    // Conectar botón volver al menú
    const btnBack = document.getElementById("btn-back-to-games");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    // =========================================================================
    // Lógica Actividad 1: Elegir cómo actuar
    // =========================================================================
    if (currentSubAct.type === "situation-choice") {
      const optButtons = container.querySelectorAll(".timo-opt-btn");
      const feedbackArea = document.getElementById("timo-feedback-area");

      optButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          if (this.timoState.isAnswerLocked) return;
          const isCorrect = btn.getAttribute("data-correct") === "true";
          const idx = parseInt(btn.getAttribute("data-index"), 10);
          const optData = currentSubAct.options[idx];

          if (isCorrect) {
            this.timoState.isAnswerLocked = true;
            btn.classList.add("correct");
            emoTIC_Sound.playSuccess();
            emoTIC_Sound.speak(optData.feedback);

            feedbackArea.innerHTML = `
              <div class="timo-learning-banner">
                <strong>✨ ¡Gran elección de confianza!</strong>
                <p style="margin:4px 0 10px 0;">${optData.feedback}</p>
                <div style="background:#FFFFFF; border-left:4px solid #059669; padding:8px 12px; border-radius:6px; font-size:0.9rem; margin-bottom:12px;">
                  💡 ${currentSubAct.learningNote}
                </div>
                <button class="btn-timo-advance" id="btn-next-timo-act">
                  ¡Siguiente Actividad: Ordenar Viñetas! 🐿️
                </button>
              </div>
            `;

            document.getElementById("btn-next-timo-act").addEventListener("click", () => {
              emoTIC_Sound.playClick();
              this.timoState.activityIndex = 1;
              this.timoState.vignetteSlots = [null, null, null];
              this.renderTimoActivity(containerId);
            });

          } else {
            btn.classList.add("incorrect");
            emoTIC_Sound.playGentleNotice();
            emoTIC_Sound.speak(optData.feedback);

            feedbackArea.innerHTML = `
              <div class="hero-feedback-bubble" style="background:#FEF3C7; border-color:#F59E0B; color:#92400E; margin-top:10px;">
                ${optData.feedback}
              </div>
            `;
          }
        });
      });
    }

    // =========================================================================
    // Lógica Actividad 2: Ordenar Viñetas
    // =========================================================================
    if (currentSubAct.type === "vignette-order") {
      const vignetteCards = container.querySelectorAll(".vignette-piece-card:not(.placed)");
      const feedbackArea = document.getElementById("vignette-feedback-area");

      const checkVignettesCompletion = () => {
        const slots = this.timoState.vignetteSlots;
        if (slots[0] && slots[1] && slots[2]) {
          // Verificar si el orden es correcto: paso 1, paso 2, paso 3
          const isCorrectOrder = slots[0].stepNumber === 1 && slots[1].stepNumber === 2 && slots[2].stepNumber === 3;

          if (isCorrectOrder) {
            emoTIC_Sound.playSuccess();
            emoTIC_Sound.speak(currentSubAct.successFeedback);

            feedbackArea.innerHTML = `
              <div class="timo-learning-banner">
                <strong>🌟 ¡Excelente! Ordenaste la historia a la perfección</strong>
                <p style="margin:4px 0 10px 0;">${currentSubAct.successFeedback}</p>
                <div style="background:#FFFFFF; border-left:4px solid #059669; padding:8px 12px; border-radius:6px; font-size:0.9rem; margin-bottom:12px;">
                  💡 ${currentSubAct.learningNote}
                </div>
                <button class="btn-timo-advance" id="btn-next-to-dialogues">
                  ¡Siguiente Actividad: Completar Diálogos! 🦉
                </button>
              </div>
            `;

            document.getElementById("btn-next-to-dialogues").addEventListener("click", () => {
              emoTIC_Sound.playClick();
              this.timoState.activityIndex = 2;
              this.renderTimoActivity(containerId);
            });

          } else {
            emoTIC_Sound.playGentleNotice();
            const hint = "Pista de Timo: Recuerda el orden natural: primero Nía llega enojada por lo que le pasó, luego su abuelita la escucha con calma, y al final resuelven el problema juntas. ¡Intenta de nuevo!";
            emoTIC_Sound.speak(hint);

            feedbackArea.innerHTML = `
              <div class="hero-feedback-bubble" style="background:#FEF3C7; border-color:#F59E0B; color:#92400E; margin-top:12px;">
                💡 ${hint}
                <div style="margin-top:10px;">
                  <button id="btn-reset-vignettes" style="background:#059669; color:#FFFFFF; border:none; padding:8px 18px; border-radius:999px; font-weight:800; cursor:pointer;">
                    🔄 Reordenar viñetas
                  </button>
                </div>
              </div>
            `;

            document.getElementById("btn-reset-vignettes").addEventListener("click", () => {
              emoTIC_Sound.playClick();
              this.timoState.vignetteSlots = [null, null, null];
              this.renderTimoActivity(containerId);
            });
          }
        }
      };

      // Colocar tarjeta en el siguiente slot libre al tocarla
      vignetteCards.forEach(card => {
        card.addEventListener("click", () => {
          const cardId = card.getAttribute("data-card-id");
          const cardData = currentSubAct.cards.find(c => c.id === cardId);
          if (!cardData) return;

          // Buscar primer slot vacío
          const emptySlotIndex = this.timoState.vignetteSlots.findIndex(s => s === null);
          if (emptySlotIndex !== -1) {
            emoTIC_Sound.playClick();
            this.timoState.vignetteSlots[emptySlotIndex] = cardData;
            this.renderTimoActivity(containerId);
            checkVignettesCompletion();
          }
        });
      });

      // Quitar tarjeta de un slot
      container.querySelectorAll(".btn-remove-vignette").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const slotNum = parseInt(btn.getAttribute("data-slot-remove"), 10);
          emoTIC_Sound.playClick();
          this.timoState.vignetteSlots[slotNum - 1] = null;
          this.renderTimoActivity(containerId);
        });
      });

      checkVignettesCompletion();
    }

    // =========================================================================
    // Lógica Actividad 3: Completar Diálogos
    // =========================================================================
    if (currentSubAct.type === "dialogue-completion") {
      const dialogueBtns = container.querySelectorAll(".timo-dialogue-btn");
      const feedbackArea = document.getElementById("dialogue-feedback-area");

      dialogueBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          if (this.timoState.isAnswerLocked) return;
          const isCorrect = btn.getAttribute("data-correct") === "true";
          const idx = parseInt(btn.getAttribute("data-index"), 10);
          const optData = currentSubAct.dialogueOptions[idx];

          if (isCorrect) {
            this.timoState.isAnswerLocked = true;
            btn.classList.add("correct");
            emoTIC_Sound.playSuccess();
            emoTIC_Sound.speak(optData.feedback);

            feedbackArea.innerHTML = `
              <div class="timo-learning-banner">
                <strong>🌟 ¡Diálogo de confianza completado con éxito!</strong>
                <p style="margin:4px 0 10px 0;">${optData.feedback}</p>
                <div style="background:#FFFFFF; border-left:4px solid #059669; padding:8px 12px; border-radius:6px; font-size:0.9rem; margin-bottom:12px;">
                  💡 ${currentSubAct.learningNote}
                </div>
                <button class="btn-timo-advance" id="btn-finish-timo-adventure" style="background:#059669; font-size:1.15rem; padding:12px 36px;">
                  ¡Completar Reto y Ganar Estrellas! ⭐⭐⭐
                </button>
              </div>
            `;

            document.getElementById("btn-finish-timo-adventure").addEventListener("click", () => {
              emoTIC_Sound.playClick();
              this.handleTimoVictory();
            });

          } else {
            btn.classList.add("incorrect");
            emoTIC_Sound.playGentleNotice();
            emoTIC_Sound.speak(optData.feedback);

            feedbackArea.innerHTML = `
              <div class="hero-feedback-bubble" style="background:#FEF3C7; border-color:#F59E0B; color:#92400E; margin-top:10px;">
                ${optData.feedback}
              </div>
            `;
          }
        });
      });
    }
  },

  // 3. Celebración de Victoria Nivel 5 (Timo y el Bosque de las Familias)
  async handleTimoVictory() {
    this.stopAudio();
    emoTIC_Sound.playSuccess();

    await emoTIC_DB.saveProgress({
      activityId: "act-5",
      title: "El bosque de las familias",
      stars: 3,
      badgeName: "Guardián de las Familias",
      badgeIcon: "🌳",
      completedAt: new Date().toISOString()
    });

    this.launchConfetti();

    const modal = document.createElement("div");
    modal.className = "victory-modal-overlay";
    modal.innerHTML = `
      <div class="victory-card-box">
        <div class="victory-cat-avatar" style="background: radial-gradient(circle, #ECFDF5 30%, #D1FAE5 100%); box-shadow: 0 8px 24px rgba(5, 150, 105, 0.3);">
          <img src="assets/illustrations/timo.png" alt="Timo Feliz" style="width: 85px; height: 85px; object-fit: contain;" />
        </div>
        <h3 class="victory-title" style="color:#065F46;">¡Guardián del Bosque de las Familias!</h3>
        <div class="victory-stars-row">⭐⭐⭐</div>
        <p class="victory-message-text">
          ¡Felicitaciones! Con la ayuda de <strong>Timo</strong> aprendiste que las familias nos enseñan diferentes maneras de expresar lo que sentimos, y que <strong>siempre es válido acudir a una persona de confianza</strong> para hablar y recibir apoyo.
        </p>
        <div class="victory-actions-row">
          <button class="btn-victory-replay" id="btn-replay-timo">Jugar de nuevo</button>
          <button class="btn-victory-menu" id="btn-victory-to-menu" style="background:#059669;">Elegir otro juego</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("btn-replay-timo").addEventListener("click", () => {
      modal.remove();
      this.launchFamilyForestActivity(this.currentActivity);
    });

    document.getElementById("btn-victory-to-menu").addEventListener("click", () => {
      modal.remove();
      emoTIC_Navigation.showScreen("worlds-screen");
    });

    emoTIC_Sound.speak("¡Felicitaciones, explorador! Eres un verdadero Guardián de las Familias. Recuerda siempre que todas las emociones merecen ser escuchadas.");
  },

  // =========================================================================
  // NIVEL 6: EMOCIONES Y SENTIMIENTOS (KORI EL CUY - CANASTAS Y VIDEO)
  // =========================================================================
  launchBasketsActivity(activity, containerId = "activity-player-container") {
    this.cuyState = {
      currentItemIndex: 0,
      emotionsCount: 0,
      feelingsCount: 0,
      classifiedItems: [],
      isActionLocked: false,
      selectedToken: null
    };

    this.renderCuyIntro(containerId);
  },

  // 1. Presentación de Kori el Cuy y Espacio para el Video Educativo
  renderCuyIntro(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const cuy = act.character || {};
    const videoData = act.video || {};

    container.innerHTML = `
      <div class="activity-viewport">
        <div class="cuy-game-viewport">
          
          <div class="activity-top-bar">
            <button class="btn-back-to-menu" id="btn-back-to-games">
              <span>←</span> Volver a los juegos
            </button>
            <div class="activity-title-group">
              <span class="activity-level-tag">Nivel 6 · Gran Reto Final</span>
              <h2 class="activity-game-heading">${act.title}</h2>
            </div>
            <div style="width: 140px; text-align: right;">
              <span style="font-size: 0.88rem; font-weight: 800; color: #D97706;">🐹 Kori el Cuy</span>
            </div>
          </div>

          <!-- Tarjeta de Presentación de Kori el Cuy -->
          <section class="empathy-presentation-card">
            <div class="empathy-avatar-stage" id="cuy-avatar-stage" style="background: radial-gradient(circle, #FEF3C7 30%, #FDE68A 100%);">
              <img src="${cuy.avatarSvg || 'assets/illustrations/cuy.png'}" alt="Kori el Cuy" class="empathy-avatar-img" />
            </div>

            <div class="character-speech-bubble">
              <span class="character-name-badge" style="background:#FEF3C7; color:#92400E;">🐹 ${cuy.name || 'Kori el Cuy'}</span>
              <h3 style="font-size:1.4rem; color:#92400E; margin:4px 0 8px 0;">¡Emociones y Sentimientos!</h3>
              
              <p class="character-bubble-text">«${cuy.greeting}»</p>
              <p class="character-instruction-note">${cuy.explanation}</p>

              <!-- Acciones de Audio y Comenzar -->
              <div class="character-audio-actions" style="margin-top: 14px;">
                <button class="btn-cat-audio" id="btn-play-voice-action" style="background:#F59E0B; color:#78350F; font-weight:900;">
                  <span id="voice-audio-icon">🔊</span>
                  <span id="voice-audio-label">Escuchar a Kori el Cuy</span>
                </button>

                <div class="audio-file-indicator" title="Ubicación donde colocas tu audio grabado">
                  📁 <code>assets/audio/cuy-nivel6.mp3</code>
                </div>
              </div>
            </div>
          </section>

          <!-- ESPACIO PARA EL VIDEO EDUCATIVO (Solución flexible para video local o enlace) -->
          <div class="cuy-video-card">
            <div class="cuy-video-header">
              <span class="cuy-video-badge">🎬 ${videoData.durationText || '3 min • Aprender juntos'}</span>
              <h3 style="font-size:1.15rem; color:#1E293B; margin:0;">${videoData.title}</h3>
            </div>

            <!-- Marco de Reproducción de Video -->
            <div class="cuy-video-player-frame" id="cuy-video-box">
              <div class="cuy-video-placeholder-content">
                <div class="cuy-play-btn-circle" id="btn-play-cuy-video" role="button" tabindex="0" title="Reproducir video educativo">
                  ▶
                </div>
                <strong style="font-size:1.1rem; letter-spacing:0.5px;">Reproducir Video Educativo</strong>
                <span style="font-size:0.85rem; color:#CBD5E1; max-width:380px;">
                  Espacio listo para reproducir tu video o enlace. ¡Toca para explorar!
                </span>
              </div>
            </div>

            <p class="cuy-video-desc-text">
              ${videoData.description}
            </p>

            <button class="btn-timo-advance" id="btn-start-baskets-game" style="background:#F59E0B; color:#78350F; font-size:1.15rem; padding:12px 38px; box-shadow:0 4px 16px rgba(245, 158, 11, 0.4);">
              ¡Comenzar el Juego de las Canastas! 🧺
            </button>
          </div>

        </div>
      </div>
    `;

    // Conectar eventos
    const btnBack = document.getElementById("btn-back-to-games");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    const btnAudio = document.getElementById("btn-play-voice-action");
    if (btnAudio) {
      btnAudio.addEventListener("click", () => {
        this.toggleCustomAudio(
          act.character.audioFile || "assets/audio/cuy-nivel6.mp3",
          act.character.audioTranscript || act.character.greeting,
          "cuy-avatar-stage"
        );
      });
    }

    const btnPlayVid = document.getElementById("btn-play-cuy-video");
    if (btnPlayVid) {
      btnPlayVid.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        // Verificar si existe el archivo de video local o enlace
        const videoBox = document.getElementById("cuy-video-box");
        if (videoBox) {
          videoBox.innerHTML = `
            <video controls autoplay style="width:100%; height:100%; object-fit:contain; border-radius:18px;">
              <source src="${videoData.placeholderUrl || 'assets/videos/emociones-sentimientos.mp4'}" type="video/mp4">
              Tu navegador no soporta video local HTML5.
            </video>
          `;
        }
      });
    }

    const btnStartGame = document.getElementById("btn-start-baskets-game");
    if (btnStartGame) {
      btnStartGame.addEventListener("click", () => {
        emoTIC_Sound.playSuccess();
        this.stopAudio();
        this.cuyState.currentItemIndex = 0;
        this.cuyState.emotionsCount = 0;
        this.cuyState.feelingsCount = 0;
        this.cuyState.classifiedItems = [];
        this.renderBasketsGame(containerId);
      });
    }
  },

  // 2. Juego de Clasificación en Dos Canastas
  renderBasketsGame(containerId = "activity-player-container") {
    const container = document.getElementById(containerId);
    if (!container || !this.currentActivity) return;

    const act = this.currentActivity;
    const items = act.itemsToClassify || [];
    const currentItem = items[this.cuyState.currentItemIndex];
    const totalItems = items.length;
    this.cuyState.isActionLocked = false;

    // Si ya completó todos los ítems, ir a la victoria
    if (!currentItem) {
      this.handleCuyVictory();
      return;
    }

    const emotionsBasket = act.baskets.emotionBasket;
    const feelingsBasket = act.baskets.feelingBasket;

    container.innerHTML = `
      <div class="activity-viewport">
        <div class="cuy-game-viewport">
          
          <!-- Barra superior -->
          <div class="activity-top-bar">
            <button class="btn-back-to-menu" id="btn-back-to-games">
              <span>←</span> Volver a los juegos
            </button>
            <div class="activity-title-group">
              <span class="activity-level-tag">Nivel 6 · Clasificación en Canastas</span>
              <h2 class="activity-game-heading">Ficha ${this.cuyState.currentItemIndex + 1} de ${totalItems}</h2>
            </div>
            <button class="btn-restart-game" id="btn-reread-cuy-intro">🐹 Video y Guía</button>
          </div>

          <div class="baskets-game-arena">
            
            <!-- Fila de las Dos Canastas -->
            <div class="baskets-two-columns-row">
              
              <!-- CANASTA 1: EMOCIONES (IZQUIERDA) -->
              <div class="cuy-basket-box basket-emotions-theme" id="drop-basket-emotions" data-target="emotion" role="region" aria-label="Canasta de Emociones">
                <span class="basket-badge-tag">${emotionsBasket.tag}</span>
                <h3 class="basket-title-name">${emotionsBasket.name}</h3>
                <div class="basket-visual-container">
                  <span class="basket-large-emoji">🧺</span>
                  <span class="basket-count-pill" id="badge-emotions-count">${this.cuyState.emotionsCount}</span>
                </div>
                <p class="basket-clue-desc">${emotionsBasket.description}</p>
                <!-- Fichas depositadas en esta canasta -->
                <div class="basket-collected-shelf" id="shelf-emotions">
                  ${this.cuyState.classifiedItems.filter(i => i.category === 'emotion').map(i => `
                    <span class="collected-token-badge">${i.icon} ${i.name}</span>
                  `).join('')}
                </div>
              </div>

              <!-- CANASTA 2: SENTIMIENTOS (DERECHA) -->
              <div class="cuy-basket-box basket-feelings-theme" id="drop-basket-feelings" data-target="feeling" role="region" aria-label="Canasta de Sentimientos">
                <span class="basket-badge-tag">${feelingsBasket.tag}</span>
                <h3 class="basket-title-name">${feelingsBasket.name}</h3>
                <div class="basket-visual-container">
                  <span class="basket-large-emoji">🧺</span>
                  <span class="basket-count-pill" id="badge-feelings-count">${this.cuyState.feelingsCount}</span>
                </div>
                <p class="basket-clue-desc">${feelingsBasket.description}</p>
                <!-- Fichas depositadas en esta canasta -->
                <div class="basket-collected-shelf" id="shelf-feelings">
                  ${this.cuyState.classifiedItems.filter(i => i.category === 'feeling').map(i => `
                    <span class="collected-token-badge">${i.icon} ${i.name}</span>
                  `).join('')}
                </div>
              </div>

            </div>

            <!-- FICHA ACTIVA PARA CLASIFICAR (EN EL CENTRO) -->
            <div class="cuy-tokens-stage">
              <h4 class="cuy-tokens-instruction-title">
                <span>👆</span> Arrastra o toca la canasta correcta para esta tarjeta:
              </h4>

              <div class="cuy-active-token-wrapper">
                <div class="token-draggable-card" id="active-token-card" draggable="true" tabindex="0" role="button" aria-grabbed="false">
                  <div class="token-icon-stage">${currentItem.icon}</div>
                  <div class="token-text-content">
                    <h4>${currentItem.name}</h4>
                    <p>${currentItem.shortDesc}</p>
                  </div>
                </div>
              </div>

              <!-- Botones rápidos directos para accesibilidad táctil -->
              <div style="display:flex; gap:12px; margin-top:4px; flex-wrap:wrap; justify-content:center;">
                <button class="hero-pill-btn" id="btn-quick-classify-emotion" style="border-color:#DC2626; color:#991B1B;">
                  🧺 Enviar a Emociones
                </button>
                <button class="hero-pill-btn" id="btn-quick-classify-feeling" style="border-color:#7C3AED; color:#5B21B6;">
                  🧺 Enviar a Sentimientos
                </button>
              </div>

            </div>

            <div id="cuy-feedback-display"></div>

          </div>

        </div>
      </div>
    `;

    // Conectar eventos de barra superior
    const btnBack = document.getElementById("btn-back-to-games");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.stopAudio();
        emoTIC_Navigation.showScreen("worlds-screen");
      });
    }

    const btnIntroAgain = document.getElementById("btn-reread-cuy-intro");
    if (btnIntroAgain) {
      btnIntroAgain.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        this.renderCuyIntro(containerId);
      });
    }

    // Lógica para procesar la clasificación
    const tokenCard = document.getElementById("active-token-card");
    const feedbackBox = document.getElementById("cuy-feedback-display");

    const processClassification = (chosenCategory) => {
      if (this.cuyState.isActionLocked) return;

      const isCorrect = chosenCategory === currentItem.category;

      if (isCorrect) {
        this.cuyState.isActionLocked = true;
        emoTIC_Sound.playSuccess();
        emoTIC_Sound.speak(currentItem.feedback);

        if (chosenCategory === 'emotion') {
          this.cuyState.emotionsCount++;
        } else {
          this.cuyState.feelingsCount++;
        }

        this.cuyState.classifiedItems.push(currentItem);

        // Mensaje de éxito
        if (feedbackBox) {
          feedbackBox.innerHTML = `
            <div class="cuy-feedback-bubble" style="background:#ECFDF5; border-color:#86EFAC;">
              <img src="assets/illustrations/cuy.png" alt="Kori" class="cuy-mini-avatar-img" />
              <p style="color:#065F46;">
                ✨ ¡Cui, cui, excelente! ${currentItem.feedback}
              </p>
            </div>
          `;
        }

        // Animar tarjeta al depositarse
        tokenCard.style.transform = "scale(0.8) translateY(-30px)";
        tokenCard.style.opacity = "0.5";

        setTimeout(() => {
          this.cuyState.currentItemIndex++;
          this.renderBasketsGame(containerId);
        }, 1100);

      } else {
        emoTIC_Sound.playGentleNotice();
        const hintText = chosenCategory === 'emotion'
          ? "Pista de Kori: Este no es un cambio repentino del cuerpo, sino un sentimiento profundo que dura en el corazón. ¡Prueba en la otra canasta!"
          : "Pista de Kori: Este ocurre rápido como una chispa en el cuerpo cuando pasa algo inesperado, es una emoción. ¡Prueba en la otra canasta!";

        emoTIC_Sound.speak(hintText);

        if (feedbackBox) {
          feedbackBox.innerHTML = `
            <div class="cuy-feedback-bubble">
              <img src="assets/illustrations/cuy.png" alt="Kori" class="cuy-mini-avatar-img" />
              <p>💡 ${hintText}</p>
            </div>
          `;
        }

        tokenCard.classList.add("selected-wrong");
        setTimeout(() => tokenCard.classList.remove("selected-wrong"), 400);
      }
    };

    // Botones rápidos táctiles
    const btnQuickEmotion = document.getElementById("btn-quick-classify-emotion");
    if (btnQuickEmotion) {
      btnQuickEmotion.addEventListener("click", () => processClassification("emotion"));
    }

    const btnQuickFeeling = document.getElementById("btn-quick-classify-feeling");
    if (btnQuickFeeling) {
      btnQuickFeeling.addEventListener("click", () => processClassification("feeling"));
    }

    // Clic directo en las canastas
    const basketEmotionBox = document.getElementById("drop-basket-emotions");
    const basketFeelingBox = document.getElementById("drop-basket-feelings");

    if (basketEmotionBox) {
      basketEmotionBox.addEventListener("click", () => processClassification("emotion"));
    }

    if (basketFeelingBox) {
      basketFeelingBox.addEventListener("click", () => processClassification("feeling"));
    }

    // Soporte Drag & Drop HTML5
    if (tokenCard) {
      tokenCard.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", currentItem.category);
        tokenCard.classList.add("dragging");
      });

      tokenCard.addEventListener("dragend", () => {
        tokenCard.classList.remove("dragging");
      });
    }

    [basketEmotionBox, basketFeelingBox].forEach(bBox => {
      if (!bBox) return;

      bBox.addEventListener("dragover", (e) => {
        e.preventDefault();
        bBox.classList.add("drag-over");
      });

      bBox.addEventListener("dragleave", () => {
        bBox.classList.remove("drag-over");
      });

      bBox.addEventListener("drop", (e) => {
        e.preventDefault();
        bBox.classList.remove("drag-over");
        const targetType = bBox.getAttribute("data-target");
        processClassification(targetType);
      });
    });
  },

  // 3. Celebración Final de Victoria: Gran Maestro Emocional (Nivel 6)
  async handleCuyVictory() {
    this.stopAudio();
    emoTIC_Sound.playSuccess();

    await emoTIC_DB.saveProgress({
      activityId: "act-6",
      title: "Emociones y sentimientos",
      stars: 3,
      badgeName: "Gran Maestro Emocional",
      badgeIcon: "🏆",
      completedAt: new Date().toISOString()
    });

    this.launchConfetti();

    const modal = document.createElement("div");
    modal.className = "victory-modal-overlay";
    modal.innerHTML = `
      <div class="victory-card-box">
        <div class="victory-cat-avatar" style="background: radial-gradient(circle, #FEF3C7 30%, #FDE68A 100%); box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);">
          <img src="assets/illustrations/cuy.png" alt="Kori el Cuy" style="width: 85px; height: 85px; object-fit: contain;" />
        </div>
        <h3 class="victory-title" style="color:#92400E;">¡Cui, cui, Misión Conquistada! 🏆</h3>
        <div class="victory-stars-row">⭐⭐⭐</div>
        <p class="victory-message-text">
          ¡Increíble logro! Has clasificado todas las emociones y sentimientos en sus canastas junto a <strong>Kori el Cuy</strong>.
          <br><br>
          🌟 <strong>¡Has completado los 6 niveles de la aventura emocional!</strong> Ahora eres un <strong>Gran Maestro Emocional</strong>: sabes reconocer tus emociones, calmarte con respiración, ponerte en los zapatos de los demás, ayudar como un superhéroe, convivir en familia y distinguir las emociones de los sentimientos.
        </p>
        <div class="victory-actions-row">
          <button class="btn-victory-replay" id="btn-replay-cuy">Jugar de nuevo</button>
          <button class="btn-victory-menu" id="btn-victory-to-menu" style="background:#F59E0B; color:#78350F; font-weight:900;">Ver todos los juegos</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("btn-replay-cuy").addEventListener("click", () => {
      modal.remove();
      this.launchBasketsActivity(this.currentActivity);
    });

    document.getElementById("btn-victory-to-menu").addEventListener("click", () => {
      modal.remove();
      emoTIC_Navigation.showScreen("worlds-screen");
    });

    emoTIC_Sound.speak("¡Cui, cui, felicitaciones! Eres un Gran Maestro Emocional. ¡Has completado todos los niveles de la aventura!");
  },

  // =========================================================================
  // SISTEMA DE AUDIO UNIVERSAL (AUDIO GRABADO CON FALLBACK A SÍNTESIS)
  // =========================================================================
  toggleCustomAudio(audioFilePath, fallbackText, avatarStageId) {
    const btnLabel = document.getElementById("voice-audio-label");
    const btnIcon = document.getElementById("voice-audio-icon");
    const btnAudio = document.getElementById("btn-play-voice-action");
    const avatarStage = document.getElementById(avatarStageId);

    if (this.isPlayingAudio) {
      this.stopAudio();
      return;
    }

    this.isPlayingAudio = true;
    if (btnLabel) btnLabel.textContent = "Pausar audio";
    if (btnIcon) btnIcon.textContent = "⏸️";
    if (btnAudio) btnAudio.classList.add("playing");
    if (avatarStage) avatarStage.classList.add("talking");

    this.audioPlayer = new Audio(audioFilePath);

    this.audioPlayer.play().then(() => {
      console.log("Reproduciendo audio grabado con éxito:", audioFilePath);
      this.audioPlayer.onended = () => {
        this.stopAudio();
      };
    }).catch((err) => {
      console.log("Audio personalizado no encontrado en", audioFilePath, "-> Usando voz del sistema como respaldo.");
      emoTIC_Sound.speak(fallbackText);

      const durationMs = Math.max(3500, fallbackText.length * 68);
      setTimeout(() => {
        if (this.isPlayingAudio) this.stopAudio();
      }, durationMs);
    });
  },

  stopAudio() {
    this.isPlayingAudio = false;
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer.currentTime = 0;
      this.audioPlayer = null;
    }
    emoTIC_Sound.stopSpeaking();

    const btnLabel = document.getElementById("voice-audio-label");
    const btnIcon = document.getElementById("voice-audio-icon");
    const btnAudio = document.getElementById("btn-play-voice-action");

    if (btnLabel) {
      if (this.currentActivity && this.currentActivity.id === "act-2") {
        btnLabel.textContent = "Escuchar el cuento de Globito";
      } else if (this.currentActivity && this.currentActivity.id === "act-3") {
        btnLabel.textContent = "Escuchar a Sofi y Nico";
      } else if (this.currentActivity && this.currentActivity.id === "act-4") {
        btnLabel.textContent = "Escuchar a Héroe y Heroína";
      } else if (this.currentActivity && this.currentActivity.id === "act-5") {
        btnLabel.textContent = "Escuchar a Timo";
      } else if (this.currentActivity && this.currentActivity.id === "act-6") {
        btnLabel.textContent = "Escuchar a Kori el Cuy";
      } else {
        btnLabel.textContent = "Escuchar la voz del Gato";
      }
    }
    if (btnIcon) btnIcon.textContent = "🔊";
    if (btnAudio) btnAudio.classList.remove("playing");

    const catStage = document.getElementById("cat-avatar-stage");
    const globitoStage = document.getElementById("globito-avatar-stage");
    const kidsStage = document.getElementById("kids-avatar-stage");
    const heroStage = document.getElementById("hero-avatar-stage");
    const heroChar = document.getElementById("hero-draggable-char");
    const timoStage = document.getElementById("timo-avatar-stage");
    const cuyStage = document.getElementById("cuy-avatar-stage");
    if (catStage) catStage.classList.remove("talking");
    if (globitoStage) globitoStage.classList.remove("talking");
    if (kidsStage) kidsStage.classList.remove("talking");
    if (heroStage) heroStage.classList.remove("talking");
    if (heroChar) heroChar.classList.remove("talking");
    if (timoStage) timoStage.classList.remove("talking");
    if (cuyStage) cuyStage.classList.remove("talking");
  },

  // Lanzar confeti de celebración
  launchConfetti() {
    const colors = ["#FFD700", "#FF4081", "#00E676", "#2979FF", "#FF9100", "#9C27B0", "#00BCD4"];
    for (let i = 0; i < 45; i++) {
      const piece = document.createElement("div");
      piece.style.cssText = `
        position: fixed;
        width: ${Math.random() * 9 + 6}px;
        height: ${Math.random() * 9 + 6}px;
        background-color: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -15px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
        z-index: 1005;
        pointer-events: none;
        transform: rotate(${Math.random() * 360}deg);
        transition: transform 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 2.2s ease-in;
      `;
      document.body.appendChild(piece);

      setTimeout(() => {
        piece.style.top = "105vh";
        piece.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 120 - 60}px)`;
      }, 20);

      setTimeout(() => piece.remove(), 2400);
    }
  }
};
