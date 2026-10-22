# Diseño Técnico: Rediseño Narrativo de Nivel 3 y Limpieza de Archivos Huérfanos

## Contexto

El Nivel 3 de emoTIC («Descubriendo las emociones de los demás») busca enseñar empatía, toma de perspectiva y apoyo respetuoso. Actualmente, la actividad contiene 3 situaciones desconectadas de personajes externos (Lucas, Valentina, Mateo) y 3 preguntas por situación, lo que alarga la experiencia e introduce preguntas redundantes.

Se refactoriza la estructura de datos en `data/activities.js` y el componente de renderizado en `js/games.js` para enfocar la narrativa en la empatía recíproca entre los personajes protagonistas: Sofi y Nico. Adicionalmente, se suprimen los archivos residuales de la antigua configuración PWA (`manifest.webmanifest` y `service-worker.js`).

Ver `proposal.md` para la motivación general.

## Metas / No-Metas

**Metas:**
- Configurar exactamente 2 misiones en el Nivel 3:
  1. Sofi comprende las emociones de Nico.
  2. Nico identifica y apoya las emociones de Sofi.
- Configurar exactamente 2 pasos por misión:
  1. Identificación de la emoción del compañero.
  2. Acción empática respetuosa.
- Dinamizar el tracker visual de misiones y pasos en `js/games.js`.
- Eliminar los archivos huérfanos `manifest.webmanifest` y `service-worker.js`.

**No-Metas:**
- Modificar los otros niveles de juego (Niveles 1, 2, 4, 5, 6).
- Alterar la lógica de puntuación de estrellas o guardado de progreso en IndexedDB.

## Decisiones Técnicas

### 1. Definición Narrativa y Estructura de Datos (`data/activities.js`)
- **Decisión**: Reemplazar el arreglo `missions` en `act-3` por 2 objetos enriquecidos:
  - **Misión 1 (`mision-1`)**: «Nico y su proyecto de bloques». Emoción: Frustración y tristeza. Acción empática: Ofrecer apoyo amable y reconstruir juntos.
  - **Misión 2 (`mision-2`)**: «Sofi frente al salón de clase». Emoción: Miedo y nerviosismo. Acción empática: Sonrisa cálida y gesto de aliento y calma.
- **Formato de pasos**: Cada misión contiene 2 preguntas con `qIndex: 1` («Paso 1: La emoción de mi compañero») y `qIndex: 2` («Paso 2: Acción empática»).

### 2. Dinamización del Tracker de Misiones en `js/games.js`
- **Decisión**: En lugar de tener etiquetas HTML fijas (`Misión 1`, `Misión 2`, `Misión 3`), renderizar los chips dinámicamente mediante `act.missions.map(...)`:
  ```javascript
  ${act.missions.map((m, idx) => `
    <span class="mission-chip ${this.empathyState.missionIndex === idx ? 'active' : (this.empathyState.missionIndex > idx ? 'done' : '')}">
      ${m.icon} Misión ${idx + 1}
    </span>
    ${idx < act.missions.length - 1 ? '<span style="color:#CBD5E1;">•</span>' : ''}
  `).join('')}
  ```
- **Contador de pasos**: Mostrar `Paso ${this.empathyState.qStepIndex + 1} de ${mission.questions.length}`.
- **Celebración de Victoria**: Actualizar el mensaje del modal final para destacar la culminación de las 2 misiones de empatía mutua.

### 3. Limpieza de Archivos Huérfanos
- **Decisión**: Dado que la aplicación opera como web tradicional sin Service Worker ni PWA, eliminar físicamente `manifest.webmanifest` y `service-worker.js` para mantener un repositorio limpio y evitar confusiones futuras.

## Riesgos y Mitigaciones

- **Riesgo**: Que la transición entre misiones falle al reducir la cantidad de preguntas de 3 a 2.
  - **Mitigación**: `js/games.js` ya evalúa `isLastQuestionOfMission` comparando con `mission.questions.length - 1`, por lo que el avance responde automáticamente a la longitud del arreglo.
