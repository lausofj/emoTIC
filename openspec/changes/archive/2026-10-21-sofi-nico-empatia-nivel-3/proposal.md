# Propuesta: Rediseño Narrativo de Empatía en Nivel 3 (Sofi y Nico) y Limpieza de Archivos Huérfanos

## Por qué

Actualmente, el Nivel 3 («Descubriendo las emociones de los demás») utiliza 3 situaciones con personajes externos genéricos (Lucas, Valentina y Mateo) y 3 pasos de preguntas por situación, lo que dispersa la conexión emocional de los estudiantes con los personajes guía. Transformar las dinámicas para que traten directamente sobre la empatía mutua entre Sofi y Nico (Sofi comprendiendo a Nico, y Nico identificando las emociones de Sofi) refuerza la identificación pedagógica y agiliza la experiencia al enfocarla en 2 situaciones y 2 pasos esenciales (Identificación de la emoción y Acción empática). Además, se aprovecha esta intervención para eliminar archivos y código huérfanos que ya no prestan servicio en la web.

## Qué Cambia

- **Reestructuración de Situaciones en Nivel 3 (`data/activities.js`)**:
  - Reducción de 3 a 2 situaciones gamificadas:
    - **Misión 1**: Sofi comprende la frustración y tristeza de Nico tras desarmarse su proyecto, decidiendo apoyarlo con amabilidad.
    - **Misión 2**: Nico identifica el miedo o nerviosismo de Sofi antes de hablar frente a la clase, ofreciéndole aliento y calma.
  - Simplificación del flujo de cada misión a 2 pasos:
    - **Paso 1**: Identificar la emoción del compañero.
    - **Paso 2**: Acción empática y apoyo respetuoso.
- **Ajustes en la Mecánica y Visualización (`js/games.js`)**:
  - Actualización del tracker de pasos (`Paso X de 2`) y renderizado dinámico de chips de misiones según la cantidad de retos.
  - Ajuste del mensaje de victoria final reconociendo las 2 misiones de empatía mutua completadas.
- **Limpieza de Archivos Huérfanos**:
  - Eliminación de archivos residuales de la antigua infraestructura PWA (`manifest.webmanifest` y `service-worker.js`) y referencias obsoletas.

## Capacidades

### Nuevas Capacidades
- `empathy-activity-ui`: Define los requisitos pedagógicos y la experiencia interactiva del Nivel 3 protagonizada por Sofi y Nico, estructurada en 2 misiones con 2 pasos de resolución cada una.

### Capacidades Modificadas
- `app-navigation`: Refleja la exclusión y eliminación física de los archivos huérfanos residuales (`manifest.webmanifest` y `service-worker.js`).

## Impacto

- **Código Afectado**:
  - `data/activities.js`: configuración del Nivel 3 (`act-3`), número total de misiones y preguntas de cada paso.
  - `js/games.js`: tracker de misiones y texto de celebración de victoria.
- **Archivos Eliminados**:
  - `manifest.webmanifest`, `service-worker.js`.
