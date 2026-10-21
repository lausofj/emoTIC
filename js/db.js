/**
 * emoTIC - Motor de Base de Datos Local (IndexedDB con respaldo en LocalStorage)
 * Almacena el progreso del estudiante, configuraciones y contenidos creados por docentes.
 * No requiere cuentas, correos ni servidores externos. 100% privado y offline.
 */

const DB_NAME = "emotic_database";
const DB_VERSION = 1;

window.emoTIC_DB = {
  db: null,

  async init() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        console.warn("IndexedDB no disponible, usando LocalStorage.");
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
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(true);
      };

      request.onerror = (e) => {
        console.warn("Error abriendo IndexedDB, respaldo LocalStorage activo:", e);
        resolve(false);
      };
    });
  },

  // Guardar progreso de una actividad
  async saveProgress(record) {
    record.timestamp = Date.now();
    record.completed = true;

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

    return record;
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
