/**
 * emoTIC - Mundos de las Emociones
 * Matriz Curricular Oficial y Fundamentación Pedagógica
 * Fuente base: Emociones para la Vida (Ministerio de Educación Nacional de Colombia / Secretaría de Educación de Bogotá / Banco Mundial)
 */

window.EMOTIC_CURRICULUM = {
  programName: "Emociones para la Vida",
  methodology: "FASE",
  methodologyDescription: {
    F: "Focalizado: Dedica tiempo estructurado específico para el aprendizaje socioemocional.",
    A: "Activo: Prioriza el aprendizaje experiencial, la simulación, el juego y la puesta en práctica.",
    S: "Secuenciado: Desarrolla las habilidades paso a paso, adaptadas a la madurez cognitiva de la edad.",
    E: "Explícito: Enseña con claridad las competencias, nombrándolas y mostrando cómo aplicarlas."
  },
  
  worlds: [
    {
      id: "world-1",
      number: 1,
      title: "Mi Mundo Emocional",
      themeColor: "#FF6D00",
      icon: "🌟",
      bgGradient: "linear-gradient(135deg, #FF9E80 0%, #FF6D00 55%, #FFB300 100%)",
      description: "Aprende a reconocer lo que sientes en tu cuerpo, calmarte cuando las emociones son gigantes y relajarte con tu imaginación.",
      character: "Globito el Pez & Gina la que imagina",
      competencies: ["Identificación de emociones", "Manejo de emociones", "Manejo del estrés"]
    },
    {
      id: "world-2",
      number: 2,
      title: "En los Zapatos de los Demás",
      themeColor: "#DE1578",
      icon: "🔍",
      bgGradient: "linear-gradient(135deg, #F48FB1 0%, #DE1578 55%, #AD1457 100%)",
      description: "Descubre que todos vemos el mundo desde lugares distintos, observa las caritas para sentir empatía y usa el Código de Ayuda.",
      character: "Jatrón el Mago & Felicio y Felicia",
      competencies: ["Toma de perspectiva", "Empatía", "Comportamiento prosocial"]
    },
    {
      id: "world-3",
      number: 3,
      title: "Comunicación y Conflictos",
      themeColor: "#00BCD4",
      icon: "🤝",
      bgGradient: "linear-gradient(135deg, #80DEEA 0%, #00BCD4 55%, #00838F 100%)",
      description: "Escucha sin interrumpir con el objeto de la palabra, aprende a decir NO con amabilidad y firmeza como DiNo, y resuélvelo por turnos con Lola y Lalo.",
      character: "DiNo el Dinosaurio, Ramón y Ramona, Lola y Lalo",
      competencies: ["Escucha activa", "Asertividad", "Manejo pacífico de conflictos"]
    }
  ],

  // Matriz comparativa oficial de objetivos por grado (Página 10 de la Guía del Docente)
  matrix: {
    "world-1": {
      competencies: [
        {
          name: "Identificación de emociones",
          objectives: {
            1: "Darme cuenta de cómo me siento (sensaciones corporales y emociones básicas).",
            2: "Darme cuenta cuando siento ansiedad.",
            3: "Distinguir dos emociones que siento a la vez.",
            4: "Reconocer cuándo siento vergüenza («oso»).",
            5: "Medir mi rabia y su intensidad."
          }
        },
        {
          name: "Manejo de emociones",
          objectives: {
            1: "Respirar profundo para calmarme (técnica de Globito).",
            2: "Parar mis pensamientos ansiosos.",
            3: "Sentir mis emociones en la intensidad adecuada.",
            4: "Sentir emociones que son buenas para mí.",
            5: "Manejar mi rabia de manera sana."
          }
        },
        {
          name: "Manejo del estrés",
          objectives: {
            1: "Usar mi imaginación para relajarme (estrategia de Gina).",
            2: "Pedir ayuda cuando me siento abrumado.",
            3: "Darme cuenta cuando estoy estresado.",
            4: "Identificar mis estresores y manejarlos.",
            5: "Cambiar mi forma de pensar, de negativa a realista."
          }
        }
      ]
    },
    "world-2": {
      competencies: [
        {
          name: "Toma de perspectiva",
          objectives: {
            1: "Ver a través de los ojos de los demás y aceptar gustos diferentes.",
            2: "Observar desde el punto de vista del otro para entender lo que ve.",
            3: "Entender lo que está detrás de las acciones de alguien.",
            4: "Buscar más información para entender bien el punto de vista del otro.",
            5: "Considerar cada punto de vista en una decisión grupal."
          }
        },
        {
          name: "Empatía",
          objectives: {
            1: "Observar la cara de alguien para saber cómo se siente (Jatrón el mago).",
            2: "Ponerme en el lugar del otro para entender cómo se siente.",
            3: "Entender lo que sienten los demás cuando les pasa algo malo.",
            4: "Ponerme en el lugar de alguien que es maltratado por sus compañeros.",
            5: "Ponerme en el lugar de las personas que tienen alguna discapacidad."
          }
        },
        {
          name: "Comportamiento prosocial",
          objectives: {
            1: "Darme cuenta cuando alguien necesita ayuda (Miro, Pregunto, Ayudo).",
            2: "Compartir lo que tengo.",
            3: "Incluir al que está solo.",
            4: "Consolar a los demás.",
            5: "Ayudar en lo que soy bueno."
          }
        }
      ]
    },
    "world-3": {
      competencies: [
        {
          name: "Escucha activa",
          objectives: {
            1: "Escuchar atentamente y sin interrumpir (el objeto de la palabra).",
            2: "Hacer que el otro sienta que le escucho y me importa.",
            3: "Mostrar interés sin usar palabras cuando escucho a los demás.",
            4: "Verificar que entiendo lo que me quieren decir.",
            5: "Preguntar y aclarar durante una conversación difícil."
          }
        },
        {
          name: "Asertividad",
          objectives: {
            1: "Decir que no con respeto y firmeza cuando algo no me gusta (DiNo).",
            2: "Pedirle a quien maltrata a otro, que pare.",
            3: "Responder con claridad y firmeza, pero sin agredir.",
            4: "Expresar lo que pienso y siento sin hacer daño a otros.",
            5: "Defenderme sin hacer daño a otros."
          }
        },
        {
          name: "Manejo de conflictos",
          objectives: {
            1: "Turnarme con mis amigos cuando queremos hacer cosas distintas (Lola y Lalo).",
            2: "Buscar soluciones gana - gana para resolver un conflicto.",
            3: "Pensar antes de actuar con rabia.",
            4: "Manejar la «temperatura» de una situación conflictiva.",
            5: "Evaluar el problema con calma y pensar en soluciones."
          }
        }
      ]
    }
  },

  // Pautas docentes oficiales de la Guía: Qué SÍ y Qué NO hacer
  guidelinesTeacher: {
    before: {
      yes: [
        "Revisar la guía con anticipación para comprender el objetivo y los momentos.",
        "Disponer de los materiales y preparar el espacio de manera acogedora.",
        "Conocer con claridad cómo intervenir con afecto y respeto ante emociones intensas."
      ],
      no: [
        "Facilitar la sesión sin conocer previamente la dinámica ni el propósito socioemocional.",
        "Buscar contenidos adicionales sin verificar su coherencia formativa.",
        "Improvisar explicaciones que etiqueten o juzguen a los estudiantes."
      ]
    },
    during: {
      yes: [
        "Utilizar un lenguaje sencillo, cercano y cálido.",
        "Practicar la escucha atenta, empática y validante.",
        "Respetar los ritmos y diferencias de cada niño; permitir no responder si no lo desean.",
        "Felicitar el esfuerzo, la perseverancia y la honestidad, no solo el resultado."
      ],
      no: [
        "Ejercer disciplina punitiva, represiva o violenta.",
        "Comparar a los niños o calificarlos con adjetivos ('eres impaciente', 'eres lento').",
        "Minimizar o invalidar emociones ('no llores por tonterías', 'eso no es nada').",
        "Cerrar con 'moralejas' impuestas en lugar de preguntas reflexivas abiertas."
      ]
    },
    after: {
      yes: [
        "Hacer seguimiento discreto y empático a quien haya manifestado malestar.",
        "Reforzar aprendizajes en momentos cotidianos del aula y el recreo.",
        "Autoevaluar el propio estilo vincular docente: escucha vs cátedra."
      ],
      no: [
        "Usar lo conversado en la sesión para sancionar o regañar posteriormente.",
        "Desentenderse de señales de angustia o situaciones de acoso escolar."
      ]
    }
  }
};
