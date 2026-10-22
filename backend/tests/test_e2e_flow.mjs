import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

console.log('=== TEST INTEGRAL E2E: FLUJO COMPLETO EMOTIC ===\n');

const BASE_URL = 'http://127.0.0.1/emoTIC/backend/api';
const API_KEY = 'emotic_dev_api_key_892348a7b9c1d2e3f4a5';

// -------------------------------------------------------------
// Paso 1: Verificación estática de eliminación del reto matemático
// -------------------------------------------------------------
console.log('--- Paso 1: Verificación de código fuente (Eliminación de suma) ---');
const filesToCheck = [
  'index.html',
  'js/navigation.js',
  'js/app.js',
  'js/teacher.js'
];

for (const relPath of filesToCheck) {
  const content = fs.readFileSync(path.resolve(relPath), 'utf-8');
  assert(!content.includes('_homeMathAnswer'), `${relPath} no debe contener _homeMathAnswer`);
  assert(!content.includes('math-challenge-input'), `${relPath} no debe contener math-challenge-input`);
  assert(!content.includes('btn-confirm-math'), `${relPath} no debe contener btn-confirm-math`);
  console.log(`✓ ${relPath}: Verificado libre de retos matemáticos.`);
}

// -------------------------------------------------------------
// Paso 2: Simulación de partida de un estudiante (Juego completado)
// -------------------------------------------------------------
console.log('\n--- Paso 2: Simulación de intento de juego de estudiante ---');
const testAttemptUuid = 'e2e-attempt-' + Date.now();
const studentAttempt = {
  attempt_uuid: testAttemptUuid,
  gender: 'nina',
  grade_level: '1° Primaria',
  activity_id: 'act-1',
  activity_title: 'Emociones (El Gato)',
  stars: 3,
  score: 150,
  mistakes_count: 1,
  duration_seconds: 42,
  completed: 1,
  details: {
    totalPairs: 6,
    connectionsCount: 6,
    personaje: 'gato'
  },
  client_timestamp: new Date().toISOString()
};

const postAttemptRes = await fetch(`${BASE_URL}/attempts.php`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
  },
  body: JSON.stringify(studentAttempt)
});

assert.strictEqual(postAttemptRes.status, 201, 'El registro del intento debe retornar HTTP 201');
const postAttemptData = await postAttemptRes.json();
assert.strictEqual(postAttemptData.success, true);
assert.strictEqual(postAttemptData.attempt_uuid, testAttemptUuid);
console.log(`✓ Intento de juego persistido en MySQL (ID: ${postAttemptData.id}, UUID: ${testAttemptUuid})`);

// -------------------------------------------------------------
// Paso 3: Flujo de Autenticación Docente (Login)
// -------------------------------------------------------------
console.log('\n--- Paso 3: Autenticación de Docente en /login.php ---');

// 3.1 Intento con clave incorrecta
const failLoginRes = await fetch(`${BASE_URL}/auth/login.php`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'docente', password: 'clave_incorrecta_xyz' })
});
assert.strictEqual(failLoginRes.status, 401, 'Credenciales incorrectas deben retornar 401');
console.log('✓ Rechazo correcto ante credenciales erróneas (401)');

// 3.2 Login exitoso
const loginRes = await fetch(`${BASE_URL}/auth/login.php`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'docente', password: 'docente123*' })
});
assert.strictEqual(loginRes.status, 200, 'Login debe retornar 200 OK');
const loginData = await loginRes.json();
assert.strictEqual(loginData.success, true);
assert.ok(loginData.token, 'Debe devolver un token de sesión');
assert.strictEqual(loginData.teacher.username, 'docente');
console.log(`✓ Docente autenticado exitosamente: ${loginData.teacher.full_name}`);
const teacherToken = loginData.token;

// -------------------------------------------------------------
// Paso 4: Consulta y filtrado de intentos en Panel Docente
// -------------------------------------------------------------
console.log('\n--- Paso 4: Consulta y Filtrado de Intentos con Token Docente ---');

// 4.1 Consulta general
const getAttemptsRes = await fetch(`${BASE_URL}/attempts.php`, {
  headers: { 'Authorization': `Bearer ${teacherToken}` }
});
assert.strictEqual(getAttemptsRes.status, 200, 'Consulta de intentos debe retornar 200');
const getAttemptsData = await getAttemptsRes.json();
assert.strictEqual(getAttemptsData.success, true);
assert.ok(Array.isArray(getAttemptsData.data), 'data debe ser un arreglo');

const found = getAttemptsData.data.find(x => x.attempt_uuid === testAttemptUuid);
assert.ok(found, 'El intento del estudiante debe estar en los datos retornados por MySQL');
assert.strictEqual(found.gender, 'nina');
assert.strictEqual(found.grade_level, '1° Primaria');
assert.strictEqual(found.stars, 3);
assert.strictEqual(found.score, 150);
assert.strictEqual(found.mistakes_count, 1);
assert.strictEqual(found.duration_seconds, 42);
assert.deepStrictEqual(found.details, {
  totalPairs: 6,
  connectionsCount: 6,
  personaje: 'gato'
});
console.log(`✓ Intento consultado y verificado con todas sus métricas en MySQL:`);
console.log(`   - Actividad: ${found.activity_title}`);
console.log(`   - Estudiante: ${found.gender === 'nina' ? 'Niña' : 'Niño'} (${found.grade_level})`);
console.log(`   - Estrellas: ${found.stars}⭐ | Puntaje: ${found.score} | Errores: ${found.mistakes_count} | Duración: ${found.duration_seconds}s`);

// 4.2 Filtrado por género
const filterGenderRes = await fetch(`${BASE_URL}/attempts.php?gender=nina`, {
  headers: { 'Authorization': `Bearer ${teacherToken}` }
});
const filterGenderData = await filterGenderRes.json();
assert(filterGenderData.data.every(x => x.gender === 'nina'), 'Todos los resultados deben ser de niñas');
console.log(`✓ Filtro por género (niña) validado: ${filterGenderData.data.length} intentos coincidentes.`);

// -------------------------------------------------------------
// Paso 5: Idempotencia en MySQL (Evitar duplicación)
// -------------------------------------------------------------
console.log('\n--- Paso 5: Prueba de Idempotencia en Reenvío ---');
const retryRes = await fetch(`${BASE_URL}/attempts.php`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
  },
  body: JSON.stringify(studentAttempt)
});
assert.strictEqual(retryRes.status, 200, 'Reintento con mismo UUID debe responder 200 idempotente');
const retryData = await retryRes.json();
assert.strictEqual(retryData.success, true);
console.log(`✓ Reenvío idempotente reconocido sin duplicar registro.`);

console.log('\n======================================================');
console.log('✓ PRUEBA INTEGRAL E2E SUPERADA CON ÉXITO AL 100%');
console.log('======================================================\n');
