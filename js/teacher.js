/**
 * emoTIC - Módulo del Docente y Adulto Responsable
 * Matriz curricular, pautas pedagógicas, gestor de contenidos, informe de progreso y diagnóstico offline.
 */

window.emoTIC_Teacher = {
  activeTab: "curriculum",

  // Reto de acceso seguro para adultos
  checkAccess(onSuccess) {
    const n1 = Math.floor(Math.random() * 8) + 6; // 6 a 13
    const n2 = Math.floor(Math.random() * 8) + 5; // 5 a 12
    const ans = n1 + n2;

    const modal = document.createElement("div");
    modal.className = "lumi-modal-overlay";
    modal.innerHTML = `
      <div class="lumi-modal-card" style="max-width:440px;">
        <div class="lumi-modal-header">
          <h2 class="lumi-title">🔒 Acceso al Área Docente</h2>
          <button class="lumi-close-btn" id="btn-close-math">&times;</button>
        </div>
        <div class="lumi-modal-body" style="text-align:center;">
          <p>Para proteger la navegación de los niños, resuelve esta sencilla operación matemática:</p>
          <div style="font-size:1.8rem; font-weight:900; color:#5C6BC0; margin:16px 0;">
            ¿Cuánto es ${n1} + ${n2}?
          </div>
          <input type="number" id="math-challenge-input" class="form-input-number" placeholder="Tu respuesta..." autofocus style="font-size:1.4rem; text-align:center; padding:10px; width:140px; margin:0 auto;"/>
          <p id="math-err-msg" style="color:#D32F2F; margin-top:10px; display:none;">Respuesta incorrecta. Inténtalo de nuevo.</p>
        </div>
        <div class="lumi-modal-footer">
          <button class="btn-secondary" id="btn-cancel-math">Cancelar</button>
          <button class="btn-primary" id="btn-confirm-math">Verificar e Ingresar</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const close = () => modal.remove();
    document.getElementById("btn-close-math").addEventListener("click", close);
    document.getElementById("btn-cancel-math").addEventListener("click", close);

    document.getElementById("btn-confirm-math").addEventListener("click", () => {
      const input = document.getElementById("math-challenge-input");
      if (parseInt(input.value, 10) === ans) {
        modal.remove();
        emoTIC_Sound.playSuccess();
        onSuccess();
      } else {
        emoTIC_Sound.playGentleNotice();
        const err = document.getElementById("math-err-msg");
        if (err) err.style.display = "block";
        input.value = "";
        input.focus();
      }
    });
  },

  // Renderizar la pantalla completa del Modo Docente
  async renderTeacherDashboard(containerId = "teacher-dashboard-container") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const allProgress = await emoTIC_DB.getAllProgress();
    const progressList = Object.values(allProgress);

    container.innerHTML = `
      <div class="teacher-header-bar">
        <div>
          <button class="btn-back-nav" id="btn-exit-teacher">← Volver al Menú Principal</button>
          <h2 class="teacher-main-title">👩‍🏫 Área Pedagógica para Docentes y Familias</h2>
          <p class="teacher-subtitle">Programa «Emociones para la Vida» • Secretaría de Educación de Bogotá / MEN / Banco Mundial</p>
        </div>
        <div class="teacher-header-actions">
          <button class="btn-secondary" id="btn-export-report">📄 Exportar Informe de Progreso</button>
          <button class="btn-danger-outline" id="btn-reset-data">⚠️ Reiniciar Datos</button>
        </div>
      </div>

      <!-- Pestañas del Docente -->
      <nav class="teacher-tabs-nav" aria-label="Secciones docentes">
        <button class="t-tab ${this.activeTab === 'curriculum' ? 'active' : ''}" data-target="t-pane-curriculum">📋 Matriz Curricular</button>
        <button class="t-tab ${this.activeTab === 'guidelines' ? 'active' : ''}" data-target="t-pane-guidelines">📖 Pautas Pedagógicas Oficiales</button>
        <button class="t-tab ${this.activeTab === 'progress' ? 'active' : ''}" data-target="t-pane-progress">📊 Progreso en el Dispositivo (${progressList.length})</button>
        <button class="t-tab ${this.activeTab === 'new-activity' ? 'active' : ''}" data-target="t-pane-new-activity">➕ Crear Actividad / Pregunta</button>
        <button class="t-tab ${this.activeTab === 'offline-tool' ? 'active' : ''}" data-target="t-pane-offline-tool">💾 Diagnóstico y Modo Sin Internet</button>
      </nav>

      <div class="teacher-body-container">
        <!-- PESTAÑA 1: MATRIZ CURRICULAR -->
        <div class="teacher-pane ${this.activeTab === 'curriculum' ? 'active' : ''}" id="t-pane-curriculum">
          <div class="curriculum-intro-card">
            <h3>Principios Pedagógicos FASE</h3>
            <div class="fase-grid">
              <div class="fase-item"><strong>F</strong>ocalizado: Horario semanal explícito de educación socioemocional.</div>
              <div class="fase-item"><strong>A</strong>ctivo: Práctica vivencial, juego de roles y resolución activa.</div>
              <div class="fase-item"><strong>S</strong>ecuenciado: Desarrollo paso a paso acorde a la madurez cognitiva.</div>
              <div class="fase-item"><strong>E</strong>xplícito: Nombramiento directo de cada competencia y habilidad.</div>
            </div>
          </div>

          <h3 class="section-title">Matriz Oficial de Objetivos por Grado (Pág. 10 de la Guía)</h3>
          <div class="table-responsive-wrapper">
            <table class="curriculum-table">
              <thead>
                <tr>
                  <th>Mundo / Secuencia</th>
                  <th>Competencia</th>
                  <th>1º Grado (Oficial Guía)</th>
                  <th>2º Grado</th>
                  <th>3º Grado</th>
                  <th>4º Grado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowspan="3" class="td-world-w1">Mundo 1: Mi mundo emocional</td>
                  <td><strong>Identificación de emociones</strong></td>
                  <td>Darme cuenta de cómo me siento.</td>
                  <td>Darme cuenta cuando siento ansiedad.</td>
                  <td>Distinguir dos emociones que siento a la vez.</td>
                  <td>Reconocer cuándo siento vergüenza («oso»).</td>
                </tr>
                <tr>
                  <td><strong>Manejo de emociones</strong></td>
                  <td>Respirar profundo para calmarme (Globito).</td>
                  <td>Parar mis pensamientos ansiosos.</td>
                  <td>Sentir mis emociones en la intensidad adecuada.</td>
                  <td>Sentir emociones que son buenas para mí.</td>
                </tr>
                <tr>
                  <td><strong>Manejo del estrés</strong></td>
                  <td>Usar mi imaginación para relajarme (Gina).</td>
                  <td>Pedir ayuda cuando me siento abrumado.</td>
                  <td>Darme cuenta cuando estoy estresado.</td>
                  <td>Identificar mis estresores y manejarlos.</td>
                </tr>
                <tr>
                  <td rowspan="3" class="td-world-w2">Mundo 2: En los zapatos de los demás</td>
                  <td><strong>Toma de perspectiva</strong></td>
                  <td>Ver a través de los ojos de los demás.</td>
                  <td>Observar desde el punto de vista del otro.</td>
                  <td>Entender lo que está detrás de las acciones.</td>
                  <td>Buscar más información para entender el punto de vista.</td>
                </tr>
                <tr>
                  <td><strong>Empatía</strong></td>
                  <td>Observar la cara de alguien para saber cómo se siente (Jatrón).</td>
                  <td>Ponerme en el lugar del otro para entender cómo se siente.</td>
                  <td>Entender lo que sienten los demás cuando les pasa algo malo.</td>
                  <td>Ponerme en el lugar de alguien que es maltratado.</td>
                </tr>
                <tr>
                  <td><strong>Comportamiento prosocial</strong></td>
                  <td>Darme cuenta cuando alguien necesita ayuda (Código de Ayuda).</td>
                  <td>Compartir lo que tengo.</td>
                  <td>Incluir al que está solo.</td>
                  <td>Consolar a los demás.</td>
                </tr>
                <tr>
                  <td rowspan="3" class="td-world-w3">Mundo 3: Comunicación y conflictos</td>
                  <td><strong>Escucha activa</strong></td>
                  <td>Escuchar atentamente y sin interrumpir (Objeto de la palabra).</td>
                  <td>Hacer que el otro sienta que le escucho y me importa.</td>
                  <td>Mostrar interés sin usar palabras.</td>
                  <td>Verificar que entiendo lo que me quieren decir.</td>
                </tr>
                <tr>
                  <td><strong>Asertividad</strong></td>
                  <td>Decir que no con respeto y firmeza (DiNo).</td>
                  <td>Pedirle a quien maltrata a otro, que pare.</td>
                  <td>Responder con claridad y firmeza, pero sin agredir.</td>
                  <td>Expresar lo que pienso y siento sin hacer daño a otros.</td>
                </tr>
                <tr>
                  <td><strong>Manejo de conflictos</strong></td>
                  <td>Turnarme con mis amigos (Lola y Lalo).</td>
                  <td>Buscar soluciones gana - gana.</td>
                  <td>Pensar antes de actuar con rabia.</td>
                  <td>Manejar la «temperatura» de una situación conflictiva.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pedagogical-legal-note">
            📌 <em>Nota de rigor metodológico:</em> Grado 1º implementa las 9 sesiones detalladas directamente de los documentos originales de <em>Emociones para la Vida</em>. Grados 2º, 3º y 4º son adaptaciones pedagógicas originales desarrolladas para emoTIC fundamentadas estrictamente en la matriz de objetivos de la Guía Oficial.
          </div>
        </div>

        <!-- PESTAÑA 2: PAUTAS PEDAGÓGICAS OFICIALES -->
        <div class="teacher-pane ${this.activeTab === 'guidelines' ? 'active' : ''}" id="t-pane-guidelines">
          <div class="guidelines-dual-grid">
            <div class="guide-box-yes">
              <h3>✅ QUÉ SÍ HACER (Recomendaciones de la Guía)</h3>
              <ul>
                <li><strong>Priorizar la escucha:</strong> Dar la palabra a los niños; el aprendizaje socioemocional no se aprende con sermones ni discursos.</li>
                <li><strong>Validar las emociones:</strong> Recordar que no existen emociones buenas ni malas; todas tienen una función informativa.</li>
                <li><strong>Felicitar el esfuerzo:</strong> Reconocer la perseverancia, la honestidad y el trato respetuoso, no solo la respuesta correcta.</li>
                <li><strong>Modelar con el ejemplo:</strong> Mantener la calma, la asertividad y la empatía en el trato cotidiano en el aula.</li>
                <li><strong>Respetar el silencio:</strong> Permitir que los estudiantes decidan no responder si no se sienten cómodos compartiendo una vivencia personal.</li>
              </ul>
            </div>
            <div class="guide-box-no">
              <h3>❌ QUÉ NO HACER (Advertencias de la Guía)</h3>
              <ul>
                <li><strong>No ejercer disciplina punitiva o violenta:</strong> Los gritos y castigos contradicen el aprendizaje de la autorregulación.</li>
                <li><strong>No cerrar con moralejas:</strong> Estimular el pensamiento divergente con preguntas del tipo "¿Qué piensas?" en vez de imponer una lección rígida.</li>
                <li><strong>No calificar con adjetivos:</strong> Evitar etiquetas como "eres perezoso", "eres caprichoso" o "eres torpe".</li>
                <li><strong>No comparar a los estudiantes:</strong> Cada niño tiene su propio ritmo madurativo y socioafectivo.</li>
                <li><strong>No usar las actividades para diagnosticar:</strong> emoTIC es una herramienta de aprendizaje, no una prueba clínica ni un evaluador psicológico.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- PESTAÑA 3: PROGRESO EN EL DISPOSITIVO -->
        <div class="teacher-pane ${this.activeTab === 'progress' ? 'active' : ''}" id="t-pane-progress">
          <div class="progress-summary-card">
            <h3>Registro de Avance en este Navegador</h3>
            <p>Se han completado <strong>${progressList.length}</strong> actividades en este dispositivo.</p>
          </div>
          ${progressList.length === 0 ? `
            <div class="empty-state-notice">
              <span class="empty-icon">🌱</span>
              <p>Aún no hay actividades completadas en este dispositivo. Cuando los estudiantes jueguen en los mundos, aquí se mostrarán sus insignias, reflexiones y fechas.</p>
            </div>
          ` : `
            <div class="table-responsive-wrapper">
              <table class="progress-data-table">
                <thead>
                  <tr>
                    <th>Actividad</th>
                    <th>Grado</th>
                    <th>Competencia</th>
                    <th>Insignia Obtenida</th>
                    <th>Estrellas</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  ${progressList.map(item => `
                    <tr>
                      <td><strong>${item.title}</strong></td>
                      <td>Grado ${item.grade}º</td>
                      <td>${item.competence}</td>
                      <td>${item.badgeIcon || '🌟'} ${item.badgeName}</td>
                      <td>${'⭐'.repeat(item.stars || 3)}</td>
                      <td>${new Date(item.completedAt).toLocaleDateString()}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- PESTAÑA 4: CREAR ACTIVIDAD / PREGUNTA -->
        <div class="teacher-pane ${this.activeTab === 'new-activity' ? 'active' : ''}" id="t-pane-new-activity">
          <div class="form-activity-creator">
            <h3>➕ Añadir Nueva Actividad o Situación Pedagógica</h3>
            <p>Puedes incorporar nuevos casos o preguntas personalizadas que se guardarán localmente en el dispositivo para tus estudiantes:</p>
            <form id="form-create-activity">
              <div class="form-row">
                <div class="form-col">
                  <label>Título de la Actividad:</label>
                  <input type="text" id="act-new-title" class="form-input" required placeholder="Ej: La lonchera compartida"/>
                </div>
                <div class="form-col">
                  <label>Grado Escolar:</label>
                  <select id="act-new-grade" class="form-select">
                    <option value="1">1º de Primaria</option>
                    <option value="2">2º de Primaria</option>
                    <option value="3">3º de Primaria</option>
                    <option value="4">4º de Primaria</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-col">
                  <label>Mundo / Territorio:</label>
                  <select id="act-new-world" class="form-select">
                    <option value="world-1">Mundo 1: Mi mundo emocional</option>
                    <option value="world-2">Mundo 2: En los zapatos de los demás</option>
                    <option value="world-3">Mundo 3: Comunicación y conflictos</option>
                  </select>
                </div>
                <div class="form-col">
                  <label>Competencia Socioemocional:</label>
                  <input type="text" id="act-new-comp" class="form-input" required placeholder="Ej: Empatía / Asertividad"/>
                </div>
              </div>

              <div class="form-group">
                <label>Situación o Pregunta para el Estudiante:</label>
                <textarea id="act-new-prompt" class="form-textarea" rows="3" required placeholder="Describe la situación cotidiana..."></textarea>
              </div>

              <div class="form-group">
                <label>Opción Adecuada (Respuesta Constructiva):</label>
                <input type="text" id="act-new-opt-correct" class="form-input" required placeholder="Acción constructiva o empática"/>
              </div>

              <div class="form-group">
                <label>Opción a Reflexionar (Distractor Formativo):</label>
                <input type="text" id="act-new-opt-distract" class="form-input" required placeholder="Reacción impulsiva o inadecuada"/>
              </div>

              <div class="form-group">
                <label>Retroalimentación Formativa:</label>
                <input type="text" id="act-new-feedback" class="form-input" required placeholder="Explicación amable de por qué la opción constructiva fomenta la paz"/>
              </div>

              <button type="submit" class="btn-primary-large">💾 Guardar Actividad en el Dispositivo</button>
            </form>
          </div>
        </div>

        <!-- PESTAÑA 5: DIAGNÓSTICO OFFLINE -->
        <div class="teacher-pane ${this.activeTab === 'offline-tool' ? 'active' : ''}" id="t-pane-offline-tool">
          <div class="offline-diagnostic-card">
            <h3>📶 Estado de Conectividad y Caché Local</h3>
            <div class="status-grid-check">
              <div class="check-item">
                <span>Conexión a Internet actual:</span>
                <strong id="diag-online-status">${navigator.onLine ? '🟢 En Línea' : '🟠 Sin Conexión (Offline)'}</strong>
              </div>
              <div class="check-item">
                <span>Modo de Ejecución:</span>
                <strong id="diag-sw-status">Web Estándar (Sin Service Worker)</strong>
              </div>
              <div class="check-item">
                <span>Almacenamiento Local (IndexedDB):</span>
                <strong id="diag-idb-status">Activo y Operativo</strong>
              </div>
            </div>

            <div class="cache-actions-box">
              <h4>Estado de la Plataforma</h4>
              <p>La plataforma se ejecuta de forma directa y optimizada en el navegador web, registrando de manera automática el progreso educativo y las actividades en la base de datos local IndexedDB.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Eventos de pestañas
    const tabs = container.querySelectorAll(".t-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        emoTIC_Sound.playClick();
        tabs.forEach(t => t.classList.remove("active"));
        container.querySelectorAll(".teacher-pane").forEach(p => p.classList.remove("active"));

        tab.classList.add("active");
        const targetId = tab.getAttribute("data-target");
        this.activeTab = targetId.replace("t-pane-", "");
        const pane = document.getElementById(targetId);
        if (pane) pane.classList.add("active");
      });
    });

    // Salir del modo docente
    document.getElementById("btn-exit-teacher").addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_Navigation.showScreen("welcome-screen");
    });

    // Exportar informe
    document.getElementById("btn-export-report").addEventListener("click", () => {
      this.exportReport(progressList);
    });

    // Reiniciar datos
    document.getElementById("btn-reset-data").addEventListener("click", async () => {
      if (confirm("¿Estás seguro de que deseas reiniciar todo el progreso de este dispositivo? Esta acción no se puede deshacer.")) {
        await emoTIC_DB.resetAllProgress();
        emoTIC_Sound.playGentleNotice();
        alert("Los datos han sido reiniciados.");
        this.renderTeacherDashboard();
      }
    });

    // Guardar nueva actividad
    const form = document.getElementById("form-create-activity");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const newAct = {
          title: document.getElementById("act-new-title").value,
          grade: parseInt(document.getElementById("act-new-grade").value, 10),
          worldId: document.getElementById("act-new-world").value,
          competence: document.getElementById("act-new-comp").value,
          learningObjective: document.getElementById("act-new-prompt").value,
          isOfficial: false,
          pedagogicalPhases: {
            welcome: { text: "¡Misión creada por tu docente! Vamos a reflexionar juntos." },
            explanation: { title: "Reflexión del caso", text: document.getElementById("act-new-prompt").value },
            demonstration: { title: "Ejemplo", text: "Piensa en el bienestar mutuo antes de decidir.", hint: "Usa la empatía." },
            guidedPractice: {
              prompt: document.getElementById("act-new-prompt").value,
              options: [document.getElementById("act-new-opt-correct").value, document.getElementById("act-new-opt-distract").value],
              correctIndex: 0,
              hint: "Busca la opción pacífica."
            },
            autonomousGame: {
              instruction: "Analiza el caso y responde con sabiduría:",
              items: [{ scenario: document.getElementById("act-new-prompt").value, options: [document.getElementById("act-new-opt-correct").value, document.getElementById("act-new-opt-distract").value] }]
            },
            feedback: { success: document.getElementById("act-new-feedback").value, support: "Sigue practicando." },
            closing: { question: "¿Cómo aplicarías esto hoy en tu recreo?", reflection: "El diálogo y el respeto construyen la paz." },
            reward: { badgeName: "Misión Docente Cumplida", badgeIcon: "🏅", stars: 3, description: "¡Completaste un reto personalizado!" }
          }
        };

        await emoTIC_DB.saveCustomActivity(newAct);
        emoTIC_Sound.playBadge();
        alert("¡Actividad guardada exitosamente! Estará disponible en el mundo correspondiente.");
        form.reset();
      });
    }

    // Comprobación de estado
    this.updateSWDiagnostic();
  },

  updateSWDiagnostic() {
    const swEl = document.getElementById("diag-sw-status");
    if (swEl) {
      swEl.textContent = "🟢 Web Estándar (Sin Service Worker)";
      swEl.style.color = "#2E7D32";
    }
  },


  // Exportar informe de progreso en formato HTML imprimible y JSON
  exportReport(progressList) {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Por favor habilita las ventanas emergentes para generar el informe imprimible.");
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Informe de Progreso Socioemocional - emoTIC</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; color: #263238; }
          h1 { color: #5C6BC0; margin-bottom: 4px; }
          .meta { color: #546E7A; font-size: 0.95rem; margin-bottom: 24px; border-bottom: 2px solid #ECEFF1; padding-bottom: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th, td { border: 1px solid #CFD8DC; padding: 10px; text-align: left; }
          th { background: #E8EAF6; color: #283593; }
          tr:nth-child(even) { background: #FAFAFA; }
          .footer { margin-top: 40px; font-size: 0.85rem; color: #78909C; text-align: center; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom:20px;">
          <button onclick="window.print()" style="padding:10px 20px; font-size:1rem; background:#5C6BC0; color:#fff; border:none; border-radius:6px; cursor:pointer;">🖨️ Imprimir / Guardar en PDF</button>
        </div>
        <h1>Informe Local de Aprendizaje Socioemocional - emoTIC</h1>
        <div class="meta">
          <p><strong>Plataforma:</strong> emoTIC «Mundos de las Emociones»</p>
          <p><strong>Programa Base:</strong> Emociones para la Vida (MEN / SED Bogotá / Banco Mundial)</p>
          <p><strong>Fecha del Reporte:</strong> ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
        </div>

        <h3>Actividades Completadas en este Dispositivo:</h3>
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Grado</th>
              <th>Competencia</th>
              <th>Insignia</th>
              <th>Estrellas</th>
              <th>Fecha de Registro</th>
            </tr>
          </thead>
          <tbody>
            ${progressList.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No hay registros de progreso aún.</td></tr>' :
              progressList.map(item => `
                <tr>
                  <td><strong>${item.title}</strong></td>
                  <td>${item.grade}º de Primaria</td>
                  <td>${item.competence}</td>
                  <td>${item.badgeIcon || '🌟'} ${item.badgeName}</td>
                  <td>${item.stars || 3} / 3</td>
                  <td>${new Date(item.completedAt).toLocaleString()}</td>
                </tr>
              `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <p><em>Este informe refleja el progreso formativo local en el dispositivo. No recopila datos personales sensibles.</em></p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  }
};
