/**
 * emoTIC - Biblioteca de Aventuras Socioemocionales
 * Cuentos interactivos locales, fichas imprimibles y recursos multimedia
 */

window.emoTIC_Library = {
  currentStory: null,
  currentSceneIdx: 0,

  renderLibrary(containerId = "library-content-container") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = window.EMOTIC_LIBRARY;

    container.innerHTML = `
      <div class="library-header-bar">
        <div>
          <button class="btn-back-nav" id="btn-exit-library">← Volver al Menú</button>
          <h2 class="library-main-title">📚 Biblioteca de Aventuras</h2>
          <p class="library-subtitle">Cuentos ilustrados, fichas imprimibles y recursos socioemocionales</p>
        </div>
      </div>

      <div class="library-tabs-nav">
        <button class="lib-tab active" data-tab="lib-stories">📖 Cuentos Animados Locales</button>
        <button class="lib-tab" data-tab="lib-printables">🖨️ Fichas Imprimibles</button>
        <button class="lib-tab" data-tab="lib-videos">🎬 Videos y Canciones Educativas</button>
      </div>

      <!-- SECCIÓN CUENTOS -->
      <div class="lib-pane active" id="lib-stories">
        <div class="stories-grid-catalog">
          ${data.stories.map(st => `
            <div class="story-catalog-card" data-id="${st.id}">
              <div class="story-card-top">
                <img src="${st.coverSvg}" alt="${st.title}" class="story-cover-thumb"/>
                <span class="offline-badge-tag">🟢 Disponible sin internet</span>
              </div>
              <div class="story-card-info">
                <span class="story-world-tag">${st.worldName}</span>
                <h3 class="story-card-title">${st.title}</h3>
                <p class="story-card-summary">${st.summary}</p>
                <button class="btn-primary btn-open-story" data-id="${st.id}">Leer y Escuchar Cuento →</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECCIÓN FICHAS IMPRIMIBLES -->
      <div class="lib-pane" id="lib-printables">
        <div class="printables-grid-catalog">
          ${data.printables.map(pr => `
            <div class="print-catalog-card">
              <div class="print-preview-box">
                <img src="${pr.svgTemplate}" alt="${pr.title}" class="print-thumb-img"/>
              </div>
              <div class="print-info-box">
                <span class="print-grade-tag">Grados: ${pr.grade}</span>
                <h3 class="print-card-title">${pr.title}</h3>
                <p class="print-card-desc">${pr.description}</p>
                <button class="btn-secondary btn-print-sheet" data-id="${pr.id}">🖨️ Ver e Imprimir Ficha</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECCIÓN VIDEOS Y CANCIONES -->
      <div class="lib-pane" id="lib-videos">
        <div class="videos-grid-catalog">
          ${data.videos.map(vd => `
            <div class="video-catalog-card">
              <div class="video-card-header">
                <span class="video-online-tag">🌐 Requiere Conexión a Internet</span>
                <span class="video-duration">⏱️ ${vd.duration}</span>
              </div>
              <h3 class="video-card-title">${vd.title}</h3>
              <p class="video-card-desc">${vd.desc}</p>
              <div class="video-offline-alternative">
                <strong>💡 Si no tienes internet:</strong>
                <p>${vd.offlineAlternative}</p>
              </div>
              <div class="video-action-row">
                <a href="${vd.externalUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">
                  ▶ Abrir Video en Línea
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Eventos
    document.getElementById("btn-exit-library").addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_Navigation.showScreen("welcome-screen");
    });

    // Pestañas
    const tabs = container.querySelectorAll(".lib-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        tabs.forEach(t => t.classList.remove("active"));
        container.querySelectorAll(".lib-pane").forEach(p => p.classList.remove("active"));

        tab.classList.add("active");
        const targetId = tab.getAttribute("data-tab");
        const pane = document.getElementById(targetId);
        if (pane) pane.classList.add("active");
      });
    });

    // Botones de abrir cuento
    container.querySelectorAll(".btn-open-story").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const story = data.stories.find(s => s.id === id);
        if (story) this.openStoryViewer(story);
      });
    });

    // Botones de imprimir ficha
    container.querySelectorAll(".btn-print-sheet").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const pr = data.printables.find(p => p.id === id);
        if (pr) this.openPrintableModal(pr);
      });
    });
  },

  // Visor interactivo de cuento con narración paso a paso
  openStoryViewer(story) {
    this.currentStory = story;
    this.currentSceneIdx = 0;

    let viewer = document.getElementById("story-viewer-modal");
    if (!viewer) {
      viewer = document.createElement("div");
      viewer.id = "story-viewer-modal";
      viewer.className = "lumi-modal-overlay";
      document.body.appendChild(viewer);
    }

    const renderScene = () => {
      const scene = story.scenes[this.currentSceneIdx];
      const isLast = this.currentSceneIdx === story.scenes.length - 1;

      viewer.innerHTML = `
        <div class="story-viewer-card">
          <div class="story-viewer-header">
            <h3>📖 ${story.title}</h3>
            <span class="scene-counter">Escena ${this.currentSceneIdx + 1} de ${story.scenes.length}</span>
            <button class="lumi-close-btn" id="btn-close-story">&times;</button>
          </div>
          <div class="story-viewer-body">
            <div class="story-scene-illustration">
              <img src="${story.coverSvg}" alt="${story.title}" class="story-scene-img"/>
            </div>
            <div class="story-scene-text-card">
              <p class="scene-paragraph">${scene.text}</p>
              <button class="btn-voice-read" id="btn-narrate-scene">🔊 Escuchar Narración</button>
            </div>
          </div>
          <div class="story-viewer-footer">
            <button class="btn-secondary" id="btn-prev-scene" ${this.currentSceneIdx === 0 ? 'disabled' : ''}>← Anterior</button>
            <button class="btn-primary" id="btn-next-scene">${isLast ? '¡Fin del Cuento! ✓' : 'Siguiente Escena →'}</button>
          </div>
        </div>
      `;

      viewer.style.display = "flex";

      document.getElementById("btn-close-story").addEventListener("click", () => {
        emoTIC_Sound.stopSpeaking();
        viewer.style.display = "none";
      });

      document.getElementById("btn-narrate-scene").addEventListener("click", () => {
        emoTIC_Sound.speak(scene.audioText || scene.text);
      });

      // Narración automática
      emoTIC_Sound.speak(scene.audioText || scene.text);

      const btnPrev = document.getElementById("btn-prev-scene");
      btnPrev.addEventListener("click", () => {
        if (this.currentSceneIdx > 0) {
          emoTIC_Sound.stopSpeaking();
          this.currentSceneIdx--;
          renderScene();
        }
      });

      const btnNext = document.getElementById("btn-next-scene");
      btnNext.addEventListener("click", () => {
        emoTIC_Sound.stopSpeaking();
        if (isLast) {
          emoTIC_Sound.playSuccess();
          viewer.style.display = "none";
        } else {
          this.currentSceneIdx++;
          renderScene();
        }
      });
    };

    renderScene();
  },

  // Modal para ver e imprimir ficha de trabajo
  openPrintableModal(pr) {
    const printWin = window.open("", "_blank");
    if (!printWin) {
      alert("Por favor permite ventanas emergentes para imprimir la ficha.");
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>${pr.title} - emoTIC</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 25px; text-align: center; color: #263238; }
          .sheet-box { border: 3px dashed #5C6BC0; border-radius: 16px; padding: 20px; max-width: 650px; margin: 0 auto; }
          h1 { color: #3949AB; font-size: 1.6rem; margin-bottom: 6px; }
          .tag { font-weight: bold; color: #E65100; margin-bottom: 14px; display: block; }
          .svg-wrapper { margin: 15px auto; max-width: 280px; }
          .instructions-box { background: #E8EAF6; padding: 12px; border-radius: 8px; text-align: left; margin-top: 15px; }
          .names-row { display: flex; justify-content: space-between; margin-top: 25px; border-top: 1px solid #B0BEC5; padding-top: 10px; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom:20px;">
          <button onclick="window.print()" style="padding:10px 24px; font-size:1.1rem; background:#43A047; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">🖨️ Imprimir Esta Ficha</button>
        </div>
        <div class="sheet-box">
          <h1>${pr.title}</h1>
          <span class="tag">emoTIC • Mundos de las Emociones • ${pr.grade}</span>
          <div class="svg-wrapper">
            <img src="${pr.svgTemplate}" alt="${pr.title}" style="max-width:100%; height:auto;"/>
          </div>
          <div class="instructions-box">
            <strong>Instrucciones para el estudiante:</strong>
            <p>${pr.instructions}</p>
          </div>
          <div class="names-row">
            <span>Nombre del estudiante: ___________________________</span>
            <span>Fecha: _______________</span>
          </div>
        </div>
      </body>
      </html>
    `;

    printWin.document.write(html);
    printWin.document.close();
  }
};
