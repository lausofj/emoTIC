// Simulación de emoTIC_DB offline -> online sync
import assert from 'node:assert';

console.log('=== TEST SINCRONIZACIÓN OFFLINE-FIRST (DB.JS) ===');

const API_BASE = 'http://127.0.0.1/emoTIC/backend/api';
const API_KEY = 'emotic_dev_api_key_892348a7b9c1d2e3f4a5';

// Mock de localStorage
const storage = new Map();
const localStorageMock = {
  getItem: (k) => storage.get(k) || null,
  setItem: (k, v) => storage.set(k, String(v)),
  removeItem: (k) => storage.delete(k)
};

// 1. Simular guardado offline (sin conexión)
const pendingAttempt = {
  attempt_uuid: 'offline-uuid-' + Date.now(),
  gender: 'nino',
  grade_level: '1° Primaria',
  activity_id: 'act-2',
  activity_title: 'La historia de Globito',
  stars: 3,
  score: 120,
  mistakes_count: 0,
  duration_seconds: 60,
  completed: 1,
  details: { respiraciones: 3 },
  client_timestamp: new Date().toISOString()
};

// Encolar en localStorage
const queue = [pendingAttempt];
localStorageMock.setItem('emotic_pending_attempts', JSON.stringify(queue));

const queuedBefore = JSON.parse(localStorageMock.getItem('emotic_pending_attempts'));
assert.strictEqual(queuedBefore.length, 1, 'Debe haber 1 intento en la cola offline');
console.log('✓ Intento encolado correctamente en modo offline:', queuedBefore[0].attempt_uuid);

// 2. Simular reconexión y despacho de la cola
const res = await fetch(`${API_BASE}/attempts.php`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
  },
  body: JSON.stringify(queuedBefore[0])
});

assert.strictEqual(res.status, 201, 'El servidor debe responder con 201 al sincronizar');
const data = await res.json();
assert.strictEqual(data.success, true, 'La respuesta debe ser exitosa');

// Desencolar al recibir confirmación
const updatedQueue = queuedBefore.filter(x => x.attempt_uuid !== queuedBefore[0].attempt_uuid);
localStorageMock.setItem('emotic_pending_attempts', JSON.stringify(updatedQueue));

const queuedAfter = JSON.parse(localStorageMock.getItem('emotic_pending_attempts'));
assert.strictEqual(queuedAfter.length, 0, 'La cola offline debe quedar vacía tras sincronizar');
console.log('✓ Sincronización exitosa con MySQL y desencolado completado.');

console.log('=== PRUEBA DE SINCRONIZACIÓN EXITOSA ===');
