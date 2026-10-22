/**
 * emoTIC - Motor de Base de Datos Local y Sincronización Backend (MySQL + Offline-First)
 * Almacena el progreso del estudiante, configuraciones y contenidos creados por docentes.
 * Resiliente y offline-first: almacena en IndexedDB/LocalStorage y sincroniza intentos en segundo plano.
 */

const DB_NAME = "emotic_database";
const DB_VERSION = 2;

window.emoTIC_DB = {
  db: null,
  API_BASE: "backend/api",
  API_KEY: "emotic_dev_api_key_892348a7b9c1d2e3f4a5",
  isSyncing: false,

  async init() {
    return new Promise((resolve) => {
      // Registrar listener para sincronización automática al recuperar conexión
      if (typeof window !== "undefined") {
        window.addEventListener("online", () => {
          console.log("[emoTIC DB] Conexión recuperada. Sincronizando intentos pendientes...");
          this.syncPendingAttempts();
        });
      }

      if (!window.indexedDB) {
        console.warn("IndexedDB no disponible, usando LocalStorage.");
        if (navigator.onLine) {
          this.syncPendingAttempts();
        }
        resolve(false);
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        // Almacén de progreso: clave compuesta o id de sesión
        if (!db.objectStoreNames.contains("progress")) {
          db.createObjectStore("progress", { keyPath: "activityId" });
        }
        // Almacén de perfil y configuraciones
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings", { keyPath: "key" });
        }
        // Almacén de actividades añadidas por docentes
        if (!db.objectStoreNames.contains("custom_activities")) {
          db.createObjectStore("custom_activities", { keyPath: "id" });
        }
        // Almacén de recursos añadidos por docentes
        if (!db.objectStoreNames.contains("custom_resources")) {
          db.createObjectStore("custom_resources", { keyPath: "id" });
        }
        // Almacén de intentos pendientes de sincronización (Offline-First)
        if (!db.objectStoreNames.contains("pending_attempts")) {
          db.createObjectStore("pending_attempts", { keyPath: "attempt_uuid" });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        if (navigator.onLine) {
          this.syncPendingAttempts();
        }
        resolve(true);
      };

      request.onerror = (e) => {
        console.warn("Error abriendo IndexedDB, respaldo LocalStorage activo:", e);
        if (navigator.onLine) {
          this.syncPendingAttempts();
        }
        resolve(false);
      };
    });
  },

  // Generador universal de UUID v4 para idempotencia de intentos
  generateUUID() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  // Guardar progreso de una actividad y encolar intento para MySQL
  async saveProgress(record) {
    record.timestamp = record.timestamp || Date.now();
    record.completed = (record.completed !== undefined) ? record.completed : true;
    record.attempt_uuid = record.attempt_uuid || this.generateUUID();
    record.client_timestamp = record.client_timestamp || new Date(record.timestamp).toISOString();

    // Inyectar género y grado escolar por defecto si no vienen especificados
    if (!record.gender) {
      const avatar = await this.getSetting("homeAvatarSelected", "nina");
      record.gender = (avatar === "nino") ? "nino" : "nina";
    }
    if (!record.grade_level) {
      record.grade_level = await this.getSetting("studentGrade", "1° Primaria");
    }

    // 1. Guardar en almacén local de progreso (último estado por actividad)
    if (this.db) {
      try {
        const tx = this.db.transaction("progress", "readwrite");
        const store = tx.objectStore("progress");
        store.put(record);
      } catch (err) {
        console.warn("Fallo guardando en IndexedDB, guardando en LocalStorage", err);
      }
    }

    // Respaldo en LocalStorage siempre para máxima robustez
    try {
      const all = this.getAllProgressLocal();
      all[record.activityId] = record;
      localStorage.setItem("emotic_progress", JSON.stringify(all));
    } catch (e) {}

    // 2. Encolar intento en pending_attempts para sincronización con MySQL
    await this.enqueuePendingAttempt(record);

    // 3. Disparar sincronización si hay conexión a internet
    if (navigator.onLine) {
      this.syncPendingAttempts();
    }

    return record;
  },

  // Encolar un intento pendiente en IndexedDB y LocalStorage
  async enqueuePendingAttempt(attempt) {
    if (this.db) {
      try {
        const tx = this.db.transaction("pending_attempts", "readwrite");
        tx.objectStore("pending_attempts").put(attempt);
      } catch (e) {
        console.warn("No se pudo encolar en IndexedDB pending_attempts:", e);
      }
    }

    try {
      const list = this.getPendingAttemptsLocal();
      // Evitar duplicados por attempt_uuid
      const filtered = list.filter(item => item.attempt_uuid !== attempt.attempt_uuid);
      filtered.push(attempt);
      localStorage.setItem("emotic_pending_attempts", JSON.stringify(filtered));
    } catch (e) {}
  },

  // Desencolar un intento ya sincronizado
  async dequeuePendingAttempt(uuid) {
    if (this.db) {
      try {
        const tx = this.db.transaction("pending_attempts", "readwrite");
        tx.objectStore("pending_attempts").delete(uuid);
      } catch (e) {}
    }

    try {
      const list = this.getPendingAttemptsLocal();
      const updated = list.filter(item => item.attempt_uuid !== uuid);
      localStorage.setItem("emotic_pending_attempts", JSON.stringify(updated));
    } catch (e) {}
  },

  // Obtener todos los intentos pendientes de sincronización
  async getPendingAttempts() {
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction("pending_attempts", "readonly");
          const store = tx.objectStore("pending_attempts");
          const req = store.getAll();
          req.onsuccess = () => {
            const idbList = req.result || [];
            const localList = this.getPendingAttemptsLocal();
            // Unir sin duplicados
            const map = new Map();
            idbList.forEach(item => map.set(item.attempt_uuid, item));
            localList.forEach(item => map.set(item.attempt_uuid, item));
            resolve(Array.from(map.values()));
          };
          req.onerror = () => resolve(this.getPendingAttemptsLocal());
        } catch (e) {
          resolve(this.getPendingAttemptsLocal());
        }
      });
    }
    return this.getPendingAttemptsLocal();
  },

  getPendingAttemptsLocal() {
    try {
      const raw = localStorage.getItem("emotic_pending_attempts");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  // Rutina de sincronización en segundo plano con el backend PHP / MySQL
  async syncPendingAttempts() {
    if (this.isSyncing || !navigator.onLine) return;
    this.isSyncing = true;

    try {
      const pending = await this.getPendingAttempts();
      if (pending.length === 0) {
        this.isSyncing = false;
        return;
      }

      console.log(`[emoTIC Sync] Sincronizando ${pending.length} intento(s) pendiente(s)...`);

      for (const attempt of pending) {
        const payload = {
          attempt_uuid: attempt.attempt_uuid,
          gender: attempt.gender || "nino",
          grade_level: attempt.grade_level || "1° Primaria",
          activity_id: attempt.activityId || attempt.activity_id || "act-unknown",
          activity_title: attempt.title || attempt.activity_title || "Actividad emoTIC",
          stars: parseInt(attempt.stars || 0, 10),
          score: parseInt(attempt.score || 0, 10),
          mistakes_count: parseInt(attempt.mistakes || attempt.mistakes_count || 0, 10),
          duration_seconds: parseInt(attempt.duration || attempt.duration_seconds || 0, 10),
          completed: attempt.completed ? 1 : 0,
          details: attempt.details || null,
          client_timestamp: attempt.client_timestamp || new Date(attempt.timestamp || Date.now()).toISOString()
        };

        try {
          const res = await fetch(`${this.API_BASE}/attempts.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": this.API_KEY
            },
            body: JSON.stringify(payload)
          });

          if (res.status === 200 || res.status === 201) {
            await this.dequeuePendingAttempt(attempt.attempt_uuid);
            console.log(`[emoTIC Sync] Intento ${attempt.attempt_uuid} sincronizado exitosamente.`);
          } else {
            console.warn(`[emoTIC Sync] Respuesta no exitosa (${res.status}) para ${attempt.attempt_uuid}`);
          }
        } catch (fetchErr) {
          console.warn(`[emoTIC Sync] Error de red enviando intento ${attempt.attempt_uuid}:`, fetchErr);
          // Detener el bucle en caída de red y esperar al próximo evento online
          break;
        }
      }
    } catch (err) {
      console.warn("[emoTIC Sync] Error general en sincronización:", err);
    } finally {
      this.isSyncing = false;
    }
  },

  // Obtener progreso de una actividad
  async getProgress(activityId) {
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction("progress", "readonly");
          const store = tx.objectStore("progress");
          const req = store.get(activityId);
          req.onsuccess = () => resolve(req.result || this.getProgressLocal(activityId));
          req.onerror = () => resolve(this.getProgressLocal(activityId));
        } catch (e) {
          resolve(this.getProgressLocal(activityId));
        }
      });
    }
    return this.getProgressLocal(activityId);
  },

  // Obtener todo el progreso registrado
  async getAllProgress() {
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction("progress", "readonly");
          const store = tx.objectStore("progress");
          const req = store.getAll();
          req.onsuccess = () => {
            const list = req.result || [];
            const map = {};
            list.forEach(item => { map[item.activityId] = item; });
            // Fusionar con localstorage por si acaso
            const local = this.getAllProgressLocal();
            resolve(Object.assign({}, local, map));
          };
          req.onerror = () => resolve(this.getAllProgressLocal());
        } catch (e) {
          resolve(this.getAllProgressLocal());
        }
      });
    }
    return this.getAllProgressLocal();
  },

  // Métodos de respaldo síncronos en LocalStorage
  getProgressLocal(activityId) {
    try {
      const all = this.getAllProgressLocal();
      return all[activityId] || null;
    } catch (e) {
      return null;
    }
  },

  getAllProgressLocal() {
    try {
      const raw = localStorage.getItem("emotic_progress");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  },

  // Guardar configuración (Grado seleccionado, audio, accesibilidad)
  async saveSetting(key, value) {
    try {
      localStorage.setItem("emotic_setting_" + key, JSON.stringify(value));
    } catch (e) {}

    if (this.db) {
      try {
        const tx = this.db.transaction("settings", "readwrite");
        tx.objectStore("settings").put({ key, value });
      } catch (e) {}
    }
  },

  async getSetting(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem("emotic_setting_" + key);
      if (raw !== null) return JSON.parse(raw);
    } catch (e) {}
    return defaultValue;
  },

  // Reiniciar progreso con confirmación
  async resetAllProgress() {
    if (this.db) {
      try {
        const tx = this.db.transaction("progress", "readwrite");
        tx.objectStore("progress").clear();
      } catch (e) {}
    }
    try {
      localStorage.removeItem("emotic_progress");
    } catch (e) {}
    return true;
  },

  // Guardar actividad creada por docente
  async saveCustomActivity(act) {
    act.id = act.id || "custom-" + Date.now();
    act.isCustom = true;
    try {
      const list = await this.getCustomActivities();
      list.push(act);
      localStorage.setItem("emotic_custom_activities", JSON.stringify(list));
    } catch (e) {}
    return act;
  },

  async getCustomActivities() {
    try {
      const raw = localStorage.getItem("emotic_custom_activities");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
};
