/**
 * emoTIC - Módulo del Docente y Adulto Responsable
 * Matriz curricular, pautas pedagógicas, gestor de contenidos, informe de progreso y seguimiento de intentos MySQL.
 */

window.emoTIC_Teacher = {
  activeTab: "curriculum",

  // Estado de autenticación
  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  },

  getToken() {
    return sessionStorage.getItem("emotic_teacher_token") || localStorage.getItem("emotic_teacher_token");
  },

  getTeacherInfo() {
    try {
      const raw = sessionStorage.getItem("emotic_teacher_info") || localStorage.getItem("emotic_teacher_info");
      return raw ? JSON.parse(raw) : { username: "docente", full_name: "Docente emoTIC" };
    } catch (e) {
      return { username: "docente", full_name: "Docente emoTIC" };
    }
  },

  logout() {
    sessionStorage.removeItem("emotic_teacher_token");
    sessionStorage.removeItem("emotic_teacher_info");
    localStorage.removeItem("emotic_teacher_token");
    localStorage.removeItem("emotic_teacher_info");
    emoTIC_Sound.playClick();
    emoTIC_Navigation.showScreen("welcome-screen");
  },

  // Modal de inicio de sesión docente con usuario y contraseña (reemplaza el reto de suma)
  checkAccess(onSuccess) {
    if (this.isAuthenticated()) {
      onSuccess();
      return;
    }

    const modal = document.createElement("div");
    modal.className = "lumi-modal-overlay";
    modal.id = "teacher-login-modal";
    modal.innerHTML = `
      <div class="lumi-modal-card" style="max-width:440px;">
        <div class="lumi-modal-header">
          <h2 class="lumi-title">🔒 Acceso al Área Docente</h2>
          <button class="lumi-close-btn" id="btn-close-login" aria-label="Cerrar modal">&times;</button>
        </div>
        <div class="lumi-modal-body" style="text-align:left;">
          <p style="color:#546E7A; font-size:0.95rem; margin-bottom:16px;">
            Ingresa tus credenciales de docente para consultar reportes pedagógicos, métricas de intentos y herramientas curriculares.
          </p>
          <form id="form-teacher-login" onsubmit="return false;">
            <div style="margin-bottom:12px;">
              <label for="login-username" style="display:block; font-weight:700; color:#37474F; margin-bottom:4px; font-size:0.9rem;">Usuario:</label>
              <input type="text" id="login-username" class="form-input" placeholder="Nombre de usuario (ej. docente)" required autocomplete="username" style="width:100%; padding:10px 12px; border:2px solid #E2E8F0; border-radius:8px; font-size:1rem; box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:14px;">
              <label for="login-password" style="display:block; font-weight:700; color:#37474F; margin-bottom:4px; font-size:0.9rem;">Contraseña:</label>
              <input type="password" id="login-password" class="form-input" placeholder="Contraseña..." required autocomplete="current-password" style="width:100%; padding:10px 12px; border:2px solid #E2E8F0; border-radius:8px; font-size:1rem; box-sizing:border-box;" />
            </div>
            <p id="login-err-msg" style="color:#D32F2F; margin-top:8px; font-size:0.9rem; display:none;"></p>
          </form>
        </div>
        <div class="lumi-modal-footer">
          <button class="btn-secondary" id="btn-cancel-login">Cancelar</button>
          <button class="btn-primary" id="btn-submit-login">Iniciar Sesión</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const close = () => modal.remove();
    document.getElementById("btn-close-login").addEventListener("click", close);
    document.getElementById("btn-cancel-login").addEventListener("click", close);

    const doLogin = async () => {
      const uInput = document.getElementById("login-username");
      const pInput = document.getElementById("login-password");
      const errEl = document.getElementById("login-err-msg");
      const btnSubmit = document.getElementById("btn-submit-login");

      const username = uInput ? uInput.value.trim() : "";
      const password = pInput ? pInput.value : "";

      if (!username || !password) {
        if (errEl) {
          errEl.textContent = "Por favor ingresa tu usuario y contraseña.";
          errEl.style.display = "block";
        }
        return;
      }

      btnSubmit.disabled = true;
      btnSubmit.textContent = "Verificando...";

      try {
        const res = await fetch("backend/api/auth/login.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (res.ok && data.success && data.token) {
          sessionStorage.setItem("emotic_teacher_token", data.token);
          sessionStorage.setItem("emotic_teacher_info", JSON.stringify(data.teacher || { username }));
          localStorage.setItem("emotic_teacher_token", data.token);
          localStorage.setItem("emotic_teacher_info", JSON.stringify(data.teacher || { username }));

          modal.remove();
          emoTIC_Sound.playSuccess();
          onSuccess();
        } else {
          emoTIC_Sound.playGentleNotice();
          if (errEl) {
            errEl.textContent = data.message || "Usuario o contraseña incorrectos.";
            errEl.style.display = "block";
          }
          btnSubmit.disabled = false;
          btnSubmit.textContent = "Iniciar Sesión";
          if (pInput) { pInput.value = ""; pInput.focus(); }
        }
      } catch (err) {
        emoTIC_Sound.playGentleNotice();
        if (errEl) {
          errEl.textContent = "No se pudo conectar con el servidor de autenticación.";
          errEl.style.display = "block";
        }
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Iniciar Sesión";
      }
    };

    document.getElementById("btn-submit-login").addEventListener("click", doLogin);
    modal.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      doLogin();
    });

    setTimeout(() => {
      const u = document.getElementById("login-username");
      if (u) u.focus();
    }, 50);
  },

  // Renderizar la pantalla completa del Modo Docente
  async renderTeacherDashboard(containerId = "teacher-dashboard-container") {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!this.isAuthenticated()) {
      this.checkAccess(() => this.renderTeacherDashboard(containerId));
      return;
    }

    const teacherInfo = this.getTeacherInfo();
    const allProgress = await emoTIC_DB.getAllProgress();
    const progressList = Object.values(allProgress);

    container.innerHTML = `
      <div class="teacher-header-bar">
        <div>
          <button class="btn-back-nav" id="btn-exit-teacher">← Volver al Menú Principal</button>
          <h2 class="teacher-main-title">👩‍🏫 Área Pedagógica para Docentes</h2>
          <p class="teacher-subtitle">Programa «Emociones para la Vida» • Secretaría de Educación de Bogotá / MEN / Banco Mundial</p>
        </div>
        <div class="teacher-header-actions" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <span style="font-size:0.9rem; color:#475569; background:#F1F5F9; padding:6px 12px; border-radius:20px;">
            Docente: <strong>${teacherInfo.full_name || teacherInfo.username}</strong>
          </span>
          <button class="btn-secondary" id="btn-export-report">📄 Exportar Informe</button>
          <button class="btn-danger-outline" id="btn-reset-data">⚠️ Reiniciar Local</button>
          <button class="btn-danger" id="btn-logout-teacher" style="padding:6px 14px; font-size:0.9rem;">🚪 Cerrar Sesión</button>
        </div>
      </div>

      <!-- Pestañas del Docente -->
      <nav class="teacher-tabs-nav" aria-label="Secciones docentes">
        <button class="t-tab ${this.activeTab === 'curriculum' ? 'active' : ''}" data-target="t-pane-curriculum">📋 Matriz Curricular</button>
        <button class="t-tab ${this.activeTab === 'guidelines' ? 'active' : ''}" data-target="t-pane-guidelines">📖 Pautas Pedagógicas Oficiales</button>
        <button class="t-tab ${this.activeTab === 'progress' ? 'active' : ''}" data-target="t-pane-progress">📊 Intentos en MySQL / Dispositivo</button>
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
                  <td>Sintonizarme con las emociones de los demás.</td>
                  <td>Demostrar comprensión y compasión genuina.</td>
                </tr>
                <tr>
                  <td><strong>Comunicación asertiva</strong></td>
                  <td>Expresar lo que siento sin herir a otros.</td>
                  <td>Usar el mensaje en primera persona ("Yo siento...").</td>
                  <td>Escuchar activamente antes de juzgar.</td>
                  <td>Resolver desacuerdos mediante el diálogo.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- PESTAÑA 2: PAUTAS PEDAGÓGICAS -->
        <div class="teacher-pane ${this.activeTab === 'guidelines' ? 'active' : ''}" id="t-pane-guidelines">
          <div class="guidelines-card-container">
            <div class="guide-box-yes">
              <h3>✅ QUÉ HACER (Recomendaciones de la Guía)</h3>
              <ul>
                <li><strong>Validar todas las emociones:</strong> Recordar a los estudiantes que no hay emociones "buenas" o "malas"; todas son mensajeras naturales.</li>
                <li><strong>Promover la respiración consciente:</strong> Usar la técnica de Globito antes de situaciones de evaluación o tensión.</li>
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

        <!-- PESTAÑA 3: PROGRESO E INTENTOS EN MYSQL -->
        <div class="teacher-pane ${this.activeTab === 'progress' ? 'active' : ''}" id="t-pane-progress">
          <div class="progress-summary-card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 style="margin:0;">📊 Historial Pedagógico de Intentos</h3>
              <p style="margin:4px 0 0 0; color:#546E7A;">Intentos registrados y sincronizados con la base de datos MySQL central.</p>
            </div>
            <div id="attempts-data-badge" style="background:#E0E7FF; color:#3730A3; padding:6px 14px; border-radius:20px; font-weight:700; font-size:0.85rem;">
              Cargando intentos...
            </div>
          </div>

          <!-- Filtros de búsqueda pedagógica -->
          <div class="attempts-filter-bar" style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:12px 16px; margin:16px 0; display:flex; gap:12px; flex-wrap:wrap; align-items:flex-end;">
            <div>
              <label for="filter-grade" style="display:block; font-size:0.85rem; font-weight:700; color:#475569; margin-bottom:4px;">Grado:</label>
              <select id="filter-grade" class="form-select" style="padding:6px 10px; border-radius:6px; border:1px solid #CBD5E1;">
                <option value="">Todos los grados</option>
                <option value="1° Primaria">1° Primaria</option>
                <option value="2° Primaria">2° Primaria</option>
                <option value="3° Primaria">3° Primaria</option>
                <option value="4° Primaria">4° Primaria</option>
                <option value="5° Primaria">5° Primaria</option>
              </select>
            </div>
            <div>
              <label for="filter-gender" style="display:block; font-size:0.85rem; font-weight:700; color:#475569; margin-bottom:4px;">Género:</label>
              <select id="filter-gender" class="form-select" style="padding:6px 10px; border-radius:6px; border:1px solid #CBD5E1;">
                <option value="">Todos</option>
                <option value="nino">Niño 👦</option>
                <option value="nina">Niña 👧</option>
              </select>
            </div>
            <div>
              <label for="filter-activity" style="display:block; font-size:0.85rem; font-weight:700; color:#475569; margin-bottom:4px;">Actividad:</label>
              <select id="filter-activity" class="form-select" style="padding:6px 10px; border-radius:6px; border:1px solid #CBD5E1;">
                <option value="">Todas las actividades</option>
                <option value="act-1">Nivel 1: Emociones (Gato)</option>
                <option value="act-2">Nivel 2: Historia de Globito</option>
                <option value="act-3">Nivel 3: Empatía</option>
                <option value="act-4">Nivel 4: Amigo que ayuda</option>
                <option value="act-5">Nivel 5: Bosque de las familias</option>
                <option value="act-6">Nivel 6: Emociones y sentimientos</option>
              </select>
            </div>
            <button class="btn-primary" id="btn-apply-attempts-filter" style="padding:8px 16px; font-size:0.9rem;">🔍 Filtrar</button>
            <button class="btn-secondary" id="btn-sync-attempts-now" style="padding:8px 16px; font-size:0.9rem;">🔄 Sincronizar Pendientes</button>
          </div>

          <div id="attempts-table-container">
            <!-- Renderizado dinámico de la tabla de intentos -->
          </div>
        </div>

        <!-- PESTAÑA 4: CREAR ACTIVIDAD / PREGUNTA -->
        <div class="teacher-pane ${this.activeTab === 'new-activity' ? 'active' : ''}" id="t-pane-new-activity">
          <div class="form-activity-creator">
            <h3>Crear Actividad / Pregunta Personalizada</h3>
            <p>Las actividades creadas se integran a la matriz y al mapa de mundos del dispositivo.</p>
            <form id="form-create-activity">
              <div class="form-row">
                <div class="form-group">
                  <label for="act-new-title">Título de la Actividad:</label>
                  <input type="text" id="act-new-title" class="form-input" required placeholder="Ej. El reto de la empatía en el recreo" />
                </div>
                <div class="form-group">
                  <label for="act-new-grade">Grado Escolar:</label>
                  <select id="act-new-grade" class="form-select">
                    <option value="1">1º de Primaria</option>
                    <option value="2">2º de Primaria</option>
                    <option value="3">3º de Primaria</option>
                    <option value="4">4º de Primaria</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="act-new-world">Mundo Asociado:</label>
                  <select id="act-new-world" class="form-select">
                    <option value="w1">Mundo 1: Mi mundo emocional</option>
                    <option value="w2">Mundo 2: En los zapatos del otro</option>
                    <option value="w3">Mundo 3: Mi bosque de la calma</option>
                    <option value="w4">Mundo 4: Construyendo acuerdos</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="act-new-comp">Competencia Socioemocional:</label>
                  <input type="text" id="act-new-comp" class="form-input" required placeholder="Ej. Escucha activa y asertividad" />
                </div>
              </div>

              <div class="form-group">
                <label for="act-new-prompt">Situación o Pregunta Reflexiva:</label>
                <textarea id="act-new-prompt" class="form-textarea" rows="3" required placeholder="Describe una situación cotidiana del aula o del hogar..."></textarea>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="act-new-opt-correct">Opción Recomendada / Asertiva:</label>
                  <input type="text" id="act-new-opt-correct" class="form-input" required placeholder="Ej. Hablo con mi compañero y le expreso cómo me siento." />
                </div>
                <div class="form-group">
                  <label for="act-new-opt-distract">Opción a Mejorar (Distractor):</label>
                  <input type="text" id="act-new-opt-distract" class="form-input" required placeholder="Ej. Me enojo y no le hablo en todo el día." />
                </div>
              </div>

              <div class="form-group">
                <label for="act-new-feedback">Retroalimentación Positiva:</label>
                <input type="text" id="act-new-feedback" class="form-input" required placeholder="¡Excelente decisión! Expresar lo que sentimos con respeto previene conflictos." />
              </div>

              <button type="submit" class="btn-primary" style="margin-top:16px;">💾 Guardar Actividad Personalizada</button>
            </form>
          </div>
        </div>

        <!-- PESTAÑA 5: DIAGNÓSTICO OFFLINE -->
        <div class="teacher-pane ${this.activeTab === 'offline-tool' ? 'active' : ''}" id="t-pane-offline-tool">
          <div class="offline-diagnostic-card">
            <h3>Estado de Conectividad y Almacenamiento Local</h3>
            <p>emoTIC está diseñado para operar con tolerancia total a caídas de red escolar (Offline-First).</p>
            <div class="diag-status-row">
              <span class="diag-label">Conexión a Internet:</span>
              <span class="diag-val" id="diag-net-status">${navigator.onLine ? "🟢 Conectado" : "🟠 Modo Fuera de Línea"}</span>
            </div>
            <div class="diag-status-row">
              <span class="diag-label">Motor de Base de Datos Local:</span>
              <span class="diag-val">🟢 IndexedDB Activo (Respaldo en LocalStorage)</span>
            </div>
            <div class="diag-status-row">
              <span class="diag-label">Base de Datos Central:</span>
              <span class="diag-val">🟢 MySQL (emotic_db) con cola resiliente</span>
            </div>
            <div class="diag-status-row">
              <span class="diag-label">Service Worker (PWA):</span>
              <span class="diag-val" id="diag-sw-status">Verificando...</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Interacción de pestañas
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
        if (this.activeTab === "progress") {
          this.loadAttemptsTable();
        }
      });
    });

    // Salir del modo docente
    document.getElementById("btn-exit-teacher").addEventListener("click", () => {
      emoTIC_Sound.playClick();
      emoTIC_Navigation.showScreen("welcome-screen");
    });

    // Cerrar sesión docente
    const btnLogout = document.getElementById("btn-logout-teacher");
    if (btnLogout) {
      btnLogout.addEventListener("click", () => this.logout());
    }

    // Exportar informe
    document.getElementById("btn-export-report").addEventListener("click", () => {
      this.exportReport(progressList);
    });

    // Reiniciar datos
    document.getElementById("btn-reset-data").addEventListener("click", async () => {
      if (confirm("¿Estás seguro de que deseas reiniciar todo el progreso local de este dispositivo? Esta acción no se puede deshacer.")) {
        await emoTIC_DB.resetAllProgress();
        emoTIC_Sound.playGentleNotice();
        alert("Los datos locales han sido reiniciados.");
        this.renderTeacherDashboard();
      }
    });

    // Filtros de intentos
    const btnFilter = document.getElementById("btn-apply-attempts-filter");
    if (btnFilter) {
      btnFilter.addEventListener("click", () => this.loadAttemptsTable());
    }

    const btnSync = document.getElementById("btn-sync-attempts-now");
    if (btnSync) {
      btnSync.addEventListener("click", async () => {
        btnSync.disabled = true;
        btnSync.textContent = "Sincronizando...";
        await emoTIC_DB.syncPendingAttempts();
        btnSync.disabled = false;
        btnSync.textContent = "🔄 Sincronizar Pendientes";
        this.loadAttemptsTable();
      });
    }

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

    // Cargar intentos inicialmente si está en la pestaña progreso
    if (this.activeTab === "progress") {
      this.loadAttemptsTable();
    }

    this.updateSWDiagnostic();
  },

  // Carga y renderizado dinámico de la tabla de intentos desde backend/api/attempts.php
  async loadAttemptsTable() {
    const container = document.getElementById("attempts-table-container");
    const badge = document.getElementById("attempts-data-badge");
    if (!container) return;

    const token = this.getToken();
    if (!token) {
      container.innerHTML = `<p style="color:#D32F2F;">Debes iniciar sesión para consultar los intentos.</p>`;
      return;
    }

    const grade = document.getElementById("filter-grade")?.value || "";
    const gender = document.getElementById("filter-gender")?.value || "";
    const activity = document.getElementById("filter-activity")?.value || "";

    const params = new URLSearchParams();
    if (grade) params.append("grade_level", grade);
    if (gender) params.append("gender", gender);
    if (activity) params.append("activity_id", activity);

    container.innerHTML = `<p style="color:#64748B; text-align:center; padding:20px;">Cargando registros desde la base de datos...</p>`;

    try {
      const res = await fetch(`backend/api/attempts.php?${params.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.status === 401) {
        this.logout();
        return;
      }

      const result = await res.json();

      if (res.ok && result.success && Array.isArray(result.data)) {
        const attempts = result.data;
        if (badge) {
          badge.textContent = `MySQL: ${attempts.length} intentos`;
          badge.style.background = "#DCFCE7";
          badge.style.color = "#166534";
        }

        if (attempts.length === 0) {
          container.innerHTML = `
            <div class="empty-state-notice" style="text-align:center; padding:30px; background:#F8FAFC; border-radius:12px; border:1px dashed #CBD5E1;">
              <span class="empty-icon" style="font-size:2.5rem;">🌱</span>
              <p style="color:#475569; font-weight:600; margin-top:8px;">No se encontraron intentos para los filtros seleccionados.</p>
              <p style="color:#94A3B8; font-size:0.9rem;">Cuando los estudiantes jueguen en los mundos, los intentos se registrarán automáticamente.</p>
            </div>
          `;
          return;
        }

        container.innerHTML = `
          <div class="table-responsive-wrapper">
            <table class="progress-data-table" style="width:100%; border-collapse:collapse; margin-top:8px;">
              <thead>
                <tr style="background:#EEF2F6; text-align:left;">
                  <th style="padding:10px;">Actividad</th>
                  <th style="padding:10px;">Estudiante</th>
                  <th style="padding:10px;">Grado</th>
                  <th style="padding:10px;">Estrellas</th>
                  <th style="padding:10px;">Puntaje</th>
                  <th style="padding:10px;">Errores</th>
                  <th style="padding:10px;">Duración</th>
                  <th style="padding:10px;">Fecha y Hora</th>
                </tr>
              </thead>
              <tbody>
                ${attempts.map(row => `
                  <tr style="border-bottom:1px solid #E2E8F0;">
                    <td style="padding:10px;"><strong>${row.activity_title}</strong></td>
                    <td style="padding:10px;">${row.gender === 'nina' ? '👧 Niña' : '👦 Niño'}</td>
                    <td style="padding:10px;">${row.grade_level}</td>
                    <td style="padding:10px; color:#F59E0B;">${'⭐'.repeat(row.stars || 1)}</td>
                    <td style="padding:10px;">${row.score} pts</td>
                    <td style="padding:10px;">${row.mistakes_count}</td>
                    <td style="padding:10px;">${row.duration_seconds}s</td>
                    <td style="padding:10px; font-size:0.85rem; color:#64748B;">${new Date(row.client_timestamp || row.created_at).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
        return;
      }
    } catch (netErr) {
      console.warn("Fallo consultando MySQL backend, recurriendo a LocalStorage:", netErr);
    }

    // Respaldo en datos locales si el backend no respondió
    if (badge) {
      badge.textContent = `Modo Local (Sin red)`;
      badge.style.background = "#FEF3C7";
      badge.style.color = "#92400E";
    }

    const allLocal = await emoTIC_DB.getAllProgress();
    const localList = Object.values(allLocal);

    if (localList.length === 0) {
      container.innerHTML = `
        <div class="empty-state-notice" style="text-align:center; padding:30px;">
          <span class="empty-icon">🌱</span>
          <p>No hay registros de progreso local ni conexión al servidor.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="table-responsive-wrapper">
        <table class="progress-data-table">
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Grado</th>
              <th>Estrellas</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            ${localList.map(item => `
              <tr>
                <td><strong>${item.title}</strong></td>
                <td>${item.grade_level || "1° Primaria"}</td>
                <td>${'⭐'.repeat(item.stars || 3)}</td>
                <td>${new Date(item.completedAt || item.timestamp || Date.now()).toLocaleDateString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  updateSWDiagnostic() {
    const swEl = document.getElementById("diag-sw-status");
    if (swEl) {
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        swEl.textContent = "🟢 Service Worker activo y controlando la página (Caché Offline)";
      } else {
        swEl.textContent = "🟡 Service Worker en registro o no soportado";
      }
    }
  },

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
        <h1>Informe de Aprendizaje Socioemocional - emoTIC</h1>
        <div class="meta">
          <p><strong>Plataforma:</strong> emoTIC «Mundos de las Emociones»</p>
          <p><strong>Programa Base:</strong> Emociones para la Vida (MEN / SED Bogotá / Banco Mundial)</p>
          <p><strong>Fecha del Reporte:</strong> ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
        </div>

        <h3>Actividades Registradas:</h3>
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Estudiante / Grado</th>
              <th>Insignia</th>
              <th>Estrellas</th>
              <th>Fecha de Registro</th>
            </tr>
          </thead>
          <tbody>
            ${progressList.length === 0 ? '<tr><td colspan="5" style="text-align:center;">No hay registros aún.</td></tr>' :
              progressList.map(item => `
                <tr>
                  <td><strong>${item.title}</strong></td>
                  <td>${item.gender === 'nina' ? 'Niña' : 'Niño'} - ${item.grade_level || item.grade || '1º Primaria'}</td>
                  <td>${item.badgeIcon || '🌟'} ${item.badgeName || 'Logro'}</td>
                  <td>${item.stars || 3} / 3</td>
                  <td>${new Date(item.completedAt || item.timestamp || Date.now()).toLocaleString()}</td>
                </tr>
              `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <p><em>Este informe refleja el progreso formativo registrado en emoTIC. Cumple con principios de privacidad y protección de datos de menores.</em></p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  }
};
