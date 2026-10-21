# emoTIC: Mundos de las Emociones 🌟
### Plataforma Web Educativa Interactiva de Aprendizaje Socioemocional (PWA)
**Grados 1º a 4º de Primaria (4 a 9 años)**  
*Basada oficialmente en el programa «Emociones para la Vida» (Ministerio de Educación Nacional de Colombia / Secretaría de Educación del Distrito de Bogotá / Banco Mundial)*

---

## 1. Resumen del Proyecto y Objetivo Pedagógico

**emoTIC** es una aplicación web progresiva (PWA) interactiva, accesible y autónoma, desarrollada para transformar la educación socioemocional en una aventura lúdica en la escuela y el hogar. 

La plataforma toma como base estructural y pedagógica los dos documentos suministrados:
1. *Cuaderno de Trabajo Emociones para la Vida, grado primero.*
2. *Guía del Docente Emociones para la Vida, grado primero.*

La plataforma articula el modelo metodológico **FASE** (Focalizado, Activo, Secuenciado y Explícito) para promover habilidades como el reconocimiento de sensaciones corporales, la autorregulación emocional, la toma de perspectiva (Teoría de la Mente), la empatía, el comportamiento prosocial y la resolución pacífica de conflictos sin violencia.

---

## 2. Tecnologías y Arquitectura

* **Estructura y Semántica:** HTML5 accesible (WAI-ARIA, roles interactivos, soporte táctil y teclado).
* **Diseño y Adaptabilidad:** CSS3 con variables CSS nativas, animaciones fluidas, modos de accesibilidad (alto contraste, tipografía escalable, reducción de movimiento).
* **Lógica e Interactividad:** JavaScript moderno ES6+ modular, sin dependencias de frameworks externos pesados ni librerías de pago.
* **Audio y Voz Local:** **Web Audio API** para síntesis procedural de efectos sonoros y **Web Speech API** para narración oral en español con subtítulos visuales sincronizados.
* **Almacenamiento Local Privado:** **IndexedDB** como motor de persistencia de progreso, medallas y actividades docentes, con respaldo automático en **LocalStorage**. No recopila datos personales ni requiere correos.
* **PWA y Modo Offline Real:** **Service Worker** con estrategia *Cache-First* para recursos educativos esenciales, manifest PWA para instalación como app nativa en Android, iOS, Windows, Mac y Linux.

---

## 3. Estructura del Proyecto

```text
e:\Downloads\emoTIC\
├── index.html                  # Estructura principal y orquestación de pantallas
├── manifest.webmanifest        # Manifiesto PWA para instalación en celulares y PC
├── service-worker.js           # Caché local y soporte 100% sin internet
├── README.md                   # Documentación técnica, pedagógica y guía de uso
├── css/
│   ├── main.css                # Estilos base, colores, encabezado y personaje guía
│   ├── worlds.css              # Mapa interactivo de mundos y nodos de niveles
│   ├── games.css               # Estilos del flujo pedagógico de 8 fases y 12 arenas de juego
│   ├── teacher.css             # Panel docente, matriz curricular y formularios
│   └── accessibility.css       # Alto contraste, texto grande y responsive design
├── js/
│   ├── app.js                  # Inicializador y eventos globales de la aplicación
│   ├── db.js                   # Motor IndexedDB con respaldo en LocalStorage
│   ├── sound.js                # Síntesis Web Audio API y narración Web Speech API
│   ├── guide.js                # Personaje guía "Lumi" (10 puntos formativos)
│   ├── games.js                # Motor de 12 mecánicas de juego y 8 fases pedagógicas
│   ├── teacher.js              # Área docente, seguridad matemática e informes
│   ├── library.js              # Biblioteca de cuentos interactivos y fichas imprimibles
│   └── pwa.js                  # Control de instalación y monitor de conexión
├── data/
│   ├── curriculum.js           # Matriz curricular y principios pedagógicos oficiales
│   ├── activities-g1.js        # 9 sesiones oficiales de 1º grado de las guías
│   ├── activities-g2.js        # Actividades adaptadas para 2º grado según matriz oficial
│   ├── activities-g3.js        # Actividades adaptadas para 3º grado según matriz oficial
│   ├── activities-g4.js        # Actividades adaptadas para 4º grado según matriz oficial
│   └── library-data.js         # Cuentos, imprimibles y catálogo de recursos
└── assets/
    ├── icons/                  # Iconos PWA vectoriales (192x192 y 512x512)
    └── illustrations/          # Personajes SVG (Lumi, Globito, Gina, Jatrón, DiNo, etc.)
```

---

## 4. Personaje Guía: «Lumi»

Para acompañar permanentemente a los estudiantes, se creó a **Lumi**, un amigable explorador de las emociones con un botón de ayuda flotante siempre accesible. Lumi explica con calidez:
1. Qué mundo está visitando el estudiante.
2. Qué va a aprender en cada sesión.
3. Qué debe hacer en cada fase del nivel.
4. Cómo se juega de manera táctil o con ratón/teclado.
5. Qué significan los botones (`Continuar`, `Pista`, `Narrar`, `Volver`).
6. Cuándo debe seleccionar, relacionar, escuchar u observar.
7. Qué ocurre al responder constructivamente (explicación del aprendizaje socioemocional, estrellas e insignias).
8. Qué hacer si se equivoca (pistas amables, sin castigo, frustración ni etiquetas negativas).
9. Cómo repetir la actividad para reforzar el aprendizaje.
10. Qué aprendió al concluir el nivel y cómo aplicarlo en el recreo o en casa.

---

## 5. Los Tres Mundos Educativos

### Mundo 1: Mi Mundo Emocional (Color Coral / Naranja)
* **Objetivo:** Conciencia emocional, identificación de sensaciones corporales y autorregulación del estrés.
* **Personajes:** Globito el Pez Globo (técnica de quedarse quieto e inflarse respirando lento para calmar la rabia o el miedo) y Gina la que Imagina (uso de la imaginación sensorial y pedir ayuda a un adulto).
* **Niveles de 1º:**
  - Sesión 1/9: *Se siente en mi cuerpo: Reconozco mis emociones* (Alegría, Tristeza, Rabia, Miedo, Ansiedad).
  - Sesión 2/9: *Globito el pez: Respiro profundo para calmarme* (Simulador de respiración diafragmática).
  - Sesión 3/9: *Gina la que imagina: Uso mi imaginación para relajarme* (Refugio sensorial).

### Mundo 2: En los Zapatos de los Demás (Color Azul Cielo)
* **Objetivo:** Toma de perspectiva cognitiva y afectiva, empatía y comportamiento prosocial.
* **Personajes:** Jatrón el Mago (reconocimiento de expresiones faciales y aclaración de intenciones) y Felicio y Felicia (Las tres claves del Código de Ayuda).
* **Niveles de 1º:**
  - Sesión 4/9: *¿Qué pasó aquí? Veo a través de los ojos de los demás* (Gustos diferentes y situaciones misteriosas: libro de Antonio y pintura de Saray).
  - Sesión 5/9: *Jatrón el mago: Observo la cara de alguien para saber cómo se siente* (Rostros de sorpresa, rabia, miedo y alegría).
  - Sesión 6/9: *Miro, Pregunto, Ayudo: Me doy cuenta cuando alguien necesita ayuda* (Código de Ayuda).

### Mundo 3: Comunicación y Conflictos (Color Verde Esmeralda)
* **Objetivo:** Escucha activa sin interrupciones, asertividad respetuosa y negociación pacífica por turnos.
* **Personajes:** DiNo el Dinosaurio (la táctica de decir NO amable y expresar lo que se siente), Ramón y Ramona (el objeto de la palabra) y Lola y Lalo (turnarse para correr superhéroes y resolver laberintos).
* **Niveles de 1º:**
  - Sesión 7/9: *Tu turno, te escucho: Escuchar atentamente y sin interrumpir* (Experimento del ruido vs silencio).
  - Sesión 8/9: *DiNo el dinosaurio: Digo que no con respeto y firmeza cuando algo no me gusta* (Asertividad ante abusos cotidianos).
  - Sesión 9/9: *Si no nos ponemos de acuerdo: Turnarme con mis amigos cuando queremos hacer cosas distintas* (Soluciones gana-gana y gran desafío integrador).

---

## 6. Progresión por Grados (1º a 4º de Primaria)

La plataforma permite elegir entre cuatro grados escolares con rutas de aprendizaje adaptadas:
* **Grado 1º (4-6 años):** Actividades directas del Cuaderno y Guía Oficial. Enfoque visual, auditivo, concreto y lúdico.
* **Grado 2º (6-7 años):** Adaptación basada en la matriz oficial: detección de la ansiedad, parar pensamientos ansiosos, pedir ayuda al sentirse abrumado, empatía, compartir y acuerdos gana-gana.
* **Grado 3º (7-8 años):** Adaptación basada en la matriz oficial: distinguir dos emociones simultáneas, modulación de intensidad emocional, causas profundas de las acciones, inclusión activa de compañeros aislados y pensar antes de actuar con rabia.
* **Grado 4º (8-9 años):** Adaptación basada en la matriz oficial: manejo de la vergüenza («hacer el oso»), cultivo de emociones nutritivas (gratitud), búsqueda de información antes de juzgar, rol de aliado contra el acoso escolar, parafraseo y desescalar la temperatura del conflicto.

---

## 7. Flujo Pedagógico de 8 Fases en Cada Nivel

Cada actividad sigue una secuencia de aprendizaje activo:
1. **Fase 1. Bienvenida:** Presentación del personaje y motivación de la aventura.
2. **Fase 2. Explicación:** Conceptos claros con apoyos visuales y sensoriales.
3. **Fase 3. Demostración:** Modelamiento del comportamiento o técnica con ejemplos interactivos.
4. **Fase 4. Práctica Guiada:** Ejercicio con pistas disponibles sin penalización.
5. **Fase 5. Juego Autónomo:** Práctica activa con mecánicas interactivas adaptadas a móviles y PC.
6. **Fase 6. Retroalimentación Formativa:** Explicación de las consecuencias de las respuestas elegidas.
7. **Fase 7. Cierre:** Pregunta abierta para transferir el aprendizaje a la vida escolar y familiar.
8. **Fase 8. Recompensa:** Insignia, estrellas y reconocimiento explícito al esfuerzo personal.

---

## 8. Modos Especiales: Biblioteca y Modo Docente

### Biblioteca de Aventuras
* **Cuentos Interactivos:** Cuentos ilustrados locales con narración paso a paso de Globito, Jatrón y DiNo (disponibles 100% sin internet).
* **Fichas Imprimibles:** Fichas de colorear y guías para el aula con botón de impresión directa `@media print`.
* **Videos Educativos:** Enlaces a contenidos en línea con etiqueta explícita *«Requiere conexión a internet»* y alternativa local garantizada para cuando se está desconectado.

### Modo Docente (Protegido con Desafío Matemático)
* Acceso protegido para evitar modificaciones accidentales de los estudiantes.
* **Matriz Curricular Completa:** Grados 1º a 5º con competencias generales y específicas.
* **Pautas Pedagógicas Oficiales:** Lista de verificación «Qué SÍ y qué NO hacer» y principios CASEL.
* **Monitor de Progreso Local:** Registro detallado de actividades completadas, estrellas e insignias.
* **Exportar Informe:** Generación de reporte imprimible o en PDF del avance local.
* **Creador de Nuevas Actividades:** Formulario interactivo para que docentes añadan preguntas o casos personalizados que se guardan en IndexedDB.
* **Herramienta de Diagnóstico Offline:** Comprobación del estado del Service Worker y precarga de caché.

---

## 9. Instrucciones de Ejecución y Publicación

### A. Ejecución Local en Computador
Debido a que las aplicaciones web progresivas (PWA) y los Service Workers requieren un contexto seguro (`http://localhost` o `https://`), se recomienda utilizar un servidor web local sencillo:

* **Opción 1: Con Node.js (npx serve):**
  ```powershell
  npx serve e:\Downloads\emoTIC -p 3000
  ```
  Luego abrir `http://localhost:3000` en Chrome, Edge o Firefox.

* **Opción 2: Extensión Live Server de VS Code:**
  Abrir la carpeta `emoTIC` en Visual Studio Code y presionar "Go Live".

* **Opción 3: Servidor Web de PowerShell o IIS:**
  Publicar la carpeta en IIS o cualquier servidor HTTP local.

### B. Preparación y Uso Sin Conexión (Offline)
1. Abrir la plataforma por primera vez conectado a internet o desde el servidor local.
2. Hacer clic en el botón verde **«Instalar App»** en la barra superior o en el menú del navegador (*"Instalar emoTIC"*).
3. Ir al **Área Docente** -> pestaña **«Diagnóstico y Modo Sin Internet»** y presionar **«Preparar y Guardar Todo para Modo Sin Internet»**.
4. ¡Listo! Puedes desconectar el WiFi o usar el dispositivo en zonas rurales sin señal. Todos los juegos, sonidos, ilustraciones vectoriales y guardado de progreso funcionarán al 100%.

---

## 10. Informe de Pruebas y Validación

| Elemento Verificado | Estado | Observaciones |
| :--- | :---: | :--- |
| Carga inicial de interfaz y tipografías | ✅ Verificado | Estructura responsiva en escritorio, tabletas y móviles. |
| Selección de grados 1º a 4º | ✅ Verificado | Rutas curriculares independientes y persistidas localmente. |
| Navegación por los 3 Mundos | ✅ Verificado | Apertura de niveles, indicadores de avance y flechas de retorno. |
| 12 Mecánicas de Juego Interactivo | ✅ Verificado | Emparejamiento por toques, simulación de respiración, decisiones y diálogos asertivos. |
| Botón de Ayuda Permanente (Lumi) | ✅ Verificado | Modal interactivo con los 10 puntos de acompañamiento y narración por voz. |
| Efectos Sonoros (Web Audio API) | ✅ Verificado | Acordes mayores de éxito, campanilla amable de pista y sonidos de respiración sin archivos externos. |
| Narración y Subtítulos (Web Speech API) | ✅ Verificado | Síntesis en español con barra accesible flotante de subtítulos. |
| Persistencia en IndexedDB / LocalStorage | ✅ Verificado | Guardado automático de insignias, estrellas y estado de niveles. |
| Service Worker y Manifiesto PWA | ✅ Verificado | Configuración Cache-First, precarga de recursos y aviso de instalación. |
| Identificación de recursos online vs offline | ✅ Verificado | Videos externos claramente rotulados con alternativa local disponible. |
| Área Docente con Reto Matemático | ✅ Verificado | Filtro de acceso adulto, matriz curricular, informe imprimible y editor de actividades. |
| Accesibilidad (Alto Contraste y Texto Grande) | ✅ Verificado | Alternadores funcionales con contraste cromático y tipografía aumentada. |

---

## 11. Cómo Añadir Nuevas Actividades y Contenidos

Para ampliar los contenidos de la plataforma existen dos caminos:

1. **A través de la Interfaz (Modo Docente):**
   * Ingresar al Modo Docente resolviendo el reto matemático.
   * Ir a la pestaña **«➕ Crear Actividad / Pregunta»**.
   * Completar el formulario con título, grado, mundo, competencia, situación reflexiva y retroalimentación formativa. La actividad quedará guardada de inmediato en IndexedDB para los estudiantes de ese dispositivo.

2. **A través del Código Modular (`data/activities-gX.js`):**
   * Añadir nuevos objetos JSON a los archivos `data/activities-g2.js`, `activities-g3.js` o `activities-g4.js`.
   * Mantener la estructura de las 8 fases pedagógicas (`welcome`, `explanation`, `demonstration`, `guidedPractice`, `autonomousGame`, `feedback`, `closing`, `reward`) para garantizar la calidad y coherencia formativa del programa *Emociones para la Vida*.

---
*emoTIC: Construyendo aulas y hogares de paz, empatía y comprensión mutua.*
