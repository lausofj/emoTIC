/**
 * emoTIC - Actividades Pedagógicas de Grado Segundo (2º)
 * Nota Pedagógica: Estas actividades fueron diseñadas y adaptadas para la plataforma emoTIC
 * basadas estrictamente en la matriz oficial de objetivos de la Guía del Docente Emociones para la Vida (pág. 10).
 */

window.EMOTIC_ACTIVITIES_G2 = [
  // MUNDO 1: MI MUNDO EMOCIONAL (Grado 2)
  {
    id: "g2-w1-s1",
    grade: 2,
    worldId: "world-1",
    sessionNumber: 1,
    title: "El radar de la ansiedad: Reconozco cuándo me siento inquieto",
    competence: "Identificación de emociones",
    learningObjective: "Darme cuenta cuando siento ansiedad y cómo se manifiesta en mi mente y mi cuerpo.",
    characterName: "Lumi y el Radar",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "emotion-detective",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola, intrépido de Segundo Grado! Soy Lumi. Hoy entrenaremos nuestro 'Radar Interior' para detectar una emoción muy particular: la ansiedad o nerviosismo ante situaciones nuevas.",
        audioText: "Bienvenido a Segundo Grado. Hoy aprenderemos a reconocer la ansiedad y cuándo nos sentimos inquietos."
      },
      explanation: {
        title: "¿Qué es la ansiedad?",
        text: "La ansiedad aparece cuando anticipamos algo que nos preocupa (un examen, hablar frente al salón, una visita médica). En el cuerpo se siente como cosquilleo en el estómago, manos sudorosas o corazón latiendo aprisa, y en la mente como pensamientos veloces que dicen '¿y si sale mal?'.",
        cues: ["Respiración rápida", "Inquietud en manos y pies", "Pensamientos repetitivos"]
      },
      demonstration: {
        title: "El caso de Mateo",
        text: "Mateo tiene mañana su primer recital de poesía escolar. Se mueve en su silla sin parar y piensa que olvidará la letra. Su cuerpo tiene el radar de la ansiedad encendido. ¡Reconocerlo es el primer paso para estar mejor!",
        hint: "La ansiedad nos avisa que algo nos importa mucho."
      },
      guidedPractice: {
        prompt: "Camila tiene que exponer su maqueta frente a toda la clase. Siente cosquillitas en la panza y las manos frías. ¿Qué emoción está experimentando?",
        options: ["Ansiedad o nerviosismo", "Rabia intensa", "Sueño profundo"],
        correctIndex: 0,
        hint: "Esa sensación previa a un momento importante es la ansiedad."
      },
      autonomousGame: {
        type: "anxiety-radar-game",
        instruction: "Ayuda a identificar qué situaciones despiertan ansiedad en la vida escolar:",
        items: [
          { scenario: "Hacer una prueba difícil sin haber repasado", isAnxiety: true, explain: "Causa inquietud y preocupación." },
          { scenario: "Comer tu postre favorito en el recreo", isAnxiety: false, explain: "Produce alegría y deleite." },
          { scenario: "Llegar a un colegio nuevo sin conocer a nadie el primer día", isAnxiety: true, explain: "Es natural sentir ansiedad ante lo desconocido." },
          { scenario: "Descansar en tu cama viendo tu cuento preferido", isAnxiety: false, explain: "Produce calma y serenidad." }
        ]
      },
      feedback: {
        success: "¡Excelente detección! Saber que sientes ansiedad te permite cuidarte antes de que se desborde.",
        support: "Muy bien explorado. La ansiedad se vuelve manejable cuando la reconocemos sin miedo."
      },
      closing: {
        question: "¿Qué situación de tu semana te produce a veces esa sensación de inquietud?",
        reflection: "Nombrar la ansiedad con palabras calma el cuerpo y nos ayuda a pedir un consejo."
      },
      reward: {
        badgeId: "badge-g2-radar",
        badgeName: "Radar de la Inquietud",
        badgeIcon: "🧭",
        stars: 3,
        description: "¡Has aprendido a reconocer cuándo sientes ansiedad!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 2° 'Darme cuenta cuando siento ansiedad'. Enseñar que la ansiedad es una respuesta adaptativa normal ante retos."
  },

  {
    id: "g2-w1-s2",
    grade: 2,
    worldId: "world-1",
    sessionNumber: 2,
    title: "Detén el tren: Paro mis pensamientos ansiosos",
    competence: "Manejo de emociones",
    learningObjective: "Aprender a parar pensamientos ansiosos y sustituirlos por ideas tranquilizadoras y realistas.",
    characterName: "Lumi y el Freno de Pensamientos",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "thought-stop",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! A veces la mente es como un tren desbocado que repite: 'No voy a poder', 'Todos se van a reír'. Hoy aprenderemos a presionar el botón '¡ALTO, TREN!' y transformar esas ideas en pensamientos constructivos.",
        audioText: "Hoy aprenderemos a detener los pensamientos ansiosos y reemplazarlos por ideas de confianza."
      },
      explanation: {
        title: "La técnica del 'Semáforo de Pensamientos'",
        text: "Cuando notes un pensamiento ansioso negativo: 1. Di mentalmente '¡STOP!'. 2. Respira hondo una vez. 3. Pregúntate: '¿Es verdad que no puedo? He practicado y lo intentaré con calma'.",
        steps: ["Identificar el pensamiento exagerado", "Decir ¡STOP!", "Cambiarlo por un pensamiento realista"]
      },
      demonstration: {
        title: "Transformando la mente",
        text: "Pensamiento ansioso: 'Si me equivoco al leer en voz alta, será el fin del mundo'. Pensamiento realista: 'Si me equivoco, respiro, me corrijo y continúo. Todos nos equivocamos al aprender'.",
        hint: "Cambiar las palabras que te dices a ti mismo cambia cómo te sientes."
      },
      guidedPractice: {
        prompt: "Si tu mente dice: 'No soy capaz de resolver este ejercicio de matemáticas', ¿cuál es el mejor pensamiento para sustituirlo?",
        options: [
          "'Voy a intentarlo paso a paso, y si no entiendo, le pediré una pista a mi profesora'",
          "'Es verdad, nunca aprenderé y no haré nada'",
          "'Voy a romper la hoja de rabia'"
        ],
        correctIndex: 0,
        hint: "Elige la idea que te dé valor y una solución real."
      },
      autonomousGame: {
        type: "thought-switcher",
        instruction: "Transforma cada pensamiento ansioso en un pensamiento realista y valiente:",
        swaps: [
          {
            anxious: "¡Nadie querrá jugar conmigo hoy!",
            realistic: "Puedo acercarme con una sonrisa y preguntar amablemente: ¿puedo jugar?",
            options: [
              "Puedo acercarme con una sonrisa y preguntar amablemente: ¿puedo jugar?",
              "Me quedaré en una esquina llorando todo el recreo",
              "Los empujaré a todos"
            ]
          },
          {
            anxious: "¡Se me va a olvidar todo en la exposición!",
            realistic: "Me preparé bien, tengo mis notas de apoyo y hablaré con calma.",
            options: [
              "Me preparé bien, tengo mis notas de apoyo y hablaré con calma.",
              "Voy a inventar que me duele la panza para escapar",
              "Gritaré en vez de hablar"
            ]
          }
        ]
      },
      feedback: {
        success: "¡Brillante! Pusiste freno al tren de los pensamientos ansiosos. Eres el conductor sabio de tu mente.",
        support: "Excelente esfuerzo. Cambiar pensamientos requiere práctica diaria."
      },
      closing: {
        question: "¿Qué pensamiento amable te gustaría repetirte cuando tengas un reto difícil?",
        reflection: "Háblate a ti mismo con el mismo cariño y paciencia con el que le hablarías a tu mejor amigo."
      },
      reward: {
        badgeId: "badge-g2-tren",
        badgeName: "Conductor de la Calma",
        badgeIcon: "🛑",
        stars: 3,
        description: "¡Sabes parar los pensamientos ansiosos y cambiarlos por ideas de confianza!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 2° 'Parar mis pensamientos ansiosos'. Introducción a la reestructuración cognitiva básica para niños."
  },

  {
    id: "g2-w1-s3",
    grade: 2,
    worldId: "world-1",
    sessionNumber: 3,
    title: "La señal de auxilio: Pido ayuda cuando me siento abrumado",
    competence: "Manejo del estrés",
    learningObjective: "Reconocer cuándo una situación supera mis fuerzas y aprender a pedir ayuda con confianza a un adulto.",
    characterName: "Lumi y la Antorcha",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "ask-for-help",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! A veces nos pasan tantas cosas a la vez que nos sentimos abrumados, como si tuviéramos una mochila con piedras gigantes. Hoy aprenderemos a levantar la mano y pedir ayuda a tiempo.",
        audioText: "Hoy aprenderemos a identificar cuándo nos sentimos abrumados y cómo pedir ayuda con confianza."
      },
      explanation: {
        title: "Pedir ayuda es de inteligentes y valientes",
        text: "Estar abrumado es cuando intentamos algo muchas veces, nos sentimos cansados, frustrados o con ganas de llorar. Nadie en el mundo sabe o puede hacerlo todo solo. Pedir ayuda a un adulto protector (profesor, mamá, papá) no es debilidad: ¡es la mejor estrategia para salir adelante!",
        steps: ["1. Darse cuenta del límite", "2. Elegir un adulto de confianza", "3. Decir claramente qué necesito"]
      },
      demonstration: {
        title: "Ejemplo: ¿Cómo pedir ayuda?",
        text: "En lugar de romper el cuaderno o quedarse sufriendo en silencio, decimos con calma: 'Profe, no entiendo esta instrucción y me siento frustrado, ¿me la puede explicar de otra forma?'",
        hint: "Los profesores y familiares aman ayudarte cuando pides apoyo con respeto."
      },
      guidedPractice: {
        prompt: "Lucía tiene que ordenar tres libros, terminar una tarea larga y dos compañeros no paran de moverle la mesa. Se siente a punto de llorar. ¿Qué es lo mejor?",
        options: [
          "Acercarse a la docente y decirle: 'Profe, me siento abrumada, ¿me ayuda a organizar mis tareas?'",
          "Gritar insultos a todos los del salón",
          "Tirarse al suelo a patalear"
        ],
        correctIndex: 0,
        hint: "Pedir ayuda a tiempo alivia el estrés de inmediato."
      },
      autonomousGame: {
        type: "help-network-builder",
        instruction: "Selecciona la forma correcta de pedir ayuda en cada situación:",
        challenges: [
          {
            situation: "Un niño más grande te quita la lonchera todos los días en el patio.",
            correctAction: "Acudir inmediatamente al docente de turno y contarle lo ocurrido con claridad.",
            options: [
              "Acudir inmediatamente al docente de turno y contarle lo ocurrido con claridad.",
              "Quedarse sin comer y no decirle nada a nadie",
              "Intentar pegarle al niño más grande a solas"
            ]
          },
          {
            situation: "No encuentras tu saco y ya es la hora de salida del colegio.",
            correctAction: "Pedirle a tu profesora: 'Profe, ¿me ayuda a revisar el baúl de objetos perdidos?'",
            options: [
              "Pedirle a tu profesora: 'Profe, ¿me ayuda a revisar el baúl de objetos perdidos?'",
              "Irte a casa con frío sin avisar",
              "Pelear con el portero"
            ]
          }
        ]
      },
      feedback: {
        success: "¡Sensacional! Aprendiste que encender tu antorcha de auxilio te conecta con quienes te protegen.",
        support: "Muy bien. Pedir ayuda es un puente hacia la solución."
      },
      closing: {
        question: "¿Quiénes son tus tres adultos de máxima confianza en tu escuela y en tu hogar?",
        reflection: "Saber a quién acudir te da seguridad y tranquilidad todos los días."
      },
      reward: {
        badgeId: "badge-g2-ayuda",
        badgeName: "Antorcha de la Confianza",
        badgeIcon: "🔥",
        stars: 3,
        description: "¡Sabes pedir ayuda a tiempo y sin temor cuando te sientes abrumado!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 2° 'Pedir ayuda cuando me siento abrumado'. Fortalece la red de apoyo y los vínculos seguros."
  },

  // MUNDO 2: EN LOS ZAPATOS DE LOS DEMÁS (Grado 2)
  {
    id: "g2-w2-s4",
    grade: 2,
    worldId: "world-2",
    sessionNumber: 4,
    title: "El mirador del otro: Entiendo lo que la otra persona ve",
    competence: "Toma de perspectiva",
    learningObjective: "Observar desde la posición física y emocional de la otra persona para comprender su punto de vista.",
    characterName: "Lumi y el Telescopio",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "perspective-3d",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola de nuevo! Si te paras frente a un número dibujado en el piso, tú puedes ver un 6 y tu amigo al frente puede ver un 9. ¡Los dos tienen razón desde su punto de vista! Hoy aprenderemos a mirar desde donde está el otro.",
        audioText: "Hoy aprenderemos a observar desde el punto de vista del otro para entender lo que ve."
      },
      explanation: {
        title: "Ver desde otra posición",
        text: "Cuando juzgamos rápido, pensamos que los demás están ciegos o equivocados. Pero cuando caminamos hacia su lugar, ¡entendemos por qué piensan o sienten así!",
        examples: ["Un obstáculo que tú no ves pero el otro sí", "Una experiencia pasada que el otro tiene y tú no"]
      },
      demonstration: {
        title: "El dibujo del cilindro",
        text: "Desde arriba parece un círculo, pero desde el lado parece un rectángulo. Si dos niños discuten qué figura es, ambos aciertan desde su perspectiva. Dialogar junta las dos verdades.",
        hint: "Cambia de lugar antes de empezar una discusión."
      },
      guidedPractice: {
        prompt: "David no quiere cruzar el puente de madera del parque porque desde su lado ve una tabla rota que tú no alcanzabas a ver. ¿Qué debes hacer?",
        options: [
          "Acercarme a su lado, mirar la tabla y decir: '¡Tienes razón, gracias por avisar!'",
          "Burlarme y decirle que es miedoso",
          "Empujarlo para que cruce a la fuerza"
        ],
        correctIndex: 0,
        hint: "Mira lo que David está viendo desde su ángulo."
      },
      autonomousGame: {
        type: "angle-observer",
        instruction: "Descubre qué ve cada personaje desde su perspectiva:",
        cases: [
          {
            situation: "En una fila para el cine, el niño de adelante ve la taquilla vacía, pero el de atrás solo ve cabezas altas.",
            question: "¿Por qué el niño de atrás pregunta con impaciencia si ya casi abren?",
            correctAnswer: "Porque su vista está tapada y no sabe lo que pasa al frente.",
            options: [
              "Porque su vista está tapada y no sabe lo que pasa al frente.",
              "Porque quiere molestar a propósito",
              "Porque odia las películas"
            ]
          }
        ]
      },
      feedback: {
        success: "¡Excelente mirada! Sabes colocarte en la posición física y mental del otro.",
        support: "Muy bien reflexionado. Observar desde el ángulo del otro previene discusiones absurdas."
      },
      closing: {
        question: "¿Alguna vez viste algo distinto a un amigo en una misma situación?",
        reflection: "Preguntar '¿qué estás viendo tú?' abre las puertas al entendimiento mutuo."
      },
      reward: {
        badgeId: "badge-g2-telescopio",
        badgeName: "Telescopio de la Doble Vista",
        badgeIcon: "🔭",
        stars: 3,
        description: "¡Entiendes lo que el otro ve desde su propio punto de vista!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 2° 'Observar desde el punto de vista del otro para entender lo que ve'."
  },

  {
    id: "g2-w2-s5",
    grade: 2,
    worldId: "world-2",
    sessionNumber: 5,
    title: "El puente del corazón: Me pongo en el lugar del otro",
    competence: "Empatía",
    learningObjective: "Ponerme en el lugar del otro para entender cómo se siente ante un suceso difícil.",
    characterName: "Lumi y el Puente Empático",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "empathy-simulation",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! La empatía no es solo adivinar una cara: es cruzar un puente con el corazón y preguntarme: ¿cómo me sentiría yo si estuviera en su pellejo?",
        audioText: "Hoy aprenderemos a ponernos en el lugar del otro para entender cómo se siente."
      },
      explanation: {
        title: "Sentir con el otro",
        text: "Cuando a un compañero se le cae su merienda favorita, o cuando olvida sus colores para un dibujo, podemos imaginarnos a nosotros mismos en esa misma situación. Eso enciende nuestras ganas de acompañar y cuidar.",
        tips: ["Imaginar mi reacción si me pasara a mí", "Tratar al otro como me gustaría que me trataran"]
      },
      demonstration: {
        title: "El zapato mojado de Julián",
        text: "Julián pisó un charco hondo y tiene el pie empapado y frío. Otros niños se ríen. Si yo pienso: 'Qué incómodo y triste se siente tener el pie helado en clase', en vez de reírme le prestaré una toalla de papel.",
        hint: "La burla aleja; la empatía une."
      },
      guidedPractice: {
        prompt: "A María se le rompió su juguete favorito sin querer. Si te pusieras en su lugar, ¿cómo te sentirías?",
        options: [
          "Triste y con dolor en el pecho por perder algo querido",
          "Completamente indiferente",
          "Con muchas ganas de burlarme"
        ],
        correctIndex: 0,
        hint: "Piensa en tu propio juguete más valioso."
      },
      autonomousGame: {
        type: "empathy-choice",
        instruction: "Elige la respuesta empática que construye puentes:",
        scenarios: [
          {
            situation: "Un niño nuevo tartamudea al decir su nombre por primera vez en el salón.",
            choiceA: "Esperar en silencio comprensivo, sonreírle con calidez y decirle: 'Bienvenido al curso'.",
            choiceB: "Rendirse a la risa e imitar su voz.",
            correctIsA: true,
            explain: "¡Exacto! Sentir su nerviosismo te llevó a darle acogida y tranquilidad."
          }
        ]
      },
      feedback: {
        success: "¡Hermosa conexión empática! Eres un constructor de puentes afectivos.",
        support: "Excelente sensibilidad. Tratar a los demás con empatía hace del aula un hogar."
      },
      closing: {
        question: "¿Cómo te gusta que te traten tus amigos cuando tienes un mal día?",
        reflection: "Ese mismo trato amable es el que puedes regalar tú a los demás hoy."
      },
      reward: {
        badgeId: "badge-g2-puente",
        badgeName: "Puente del Corazón",
        badgeIcon: "🌉",
        stars: 3,
        description: "¡Sabes ponerte en el lugar del otro para comprender lo que siente!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 2° 'Ponerme en el lugar del otro para entender cómo se siente'."
  },

  {
    id: "g2-w2-s6",
    grade: 2,
    worldId: "world-2",
    sessionNumber: 6,
    title: "La magia de compartir: Comparto lo que tengo",
    competence: "Comportamiento prosocial",
    learningObjective: "Experimentar la alegría de compartir recursos, tiempo y materiales con quienes los necesitan.",
    characterName: "Lumi y el Cofre Compartido",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "share-coop",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! ¿Sabías que cuando compartes algo bueno, no se divide, sino que ¡se multiplica!? Hoy abriremos el cofre de la generosidad.",
        audioText: "Hoy aprenderemos la importancia y la alegría de compartir lo que tenemos con los demás."
      },
      explanation: {
        title: "Compartir con alegría",
        text: "Compartir no es dar las sobras o lo que ya no sirve. Es compartir un lápiz de color que el otro no tiene, compartir el espacio de juego o compartir una fruta rica. Compartir crea amistades duraderas.",
        benefits: ["Amistades más fuertes", "Un salón donde nadie se queda sin pintar", "Alegría compartida"]
      },
      demonstration: {
        title: "El mural de colores",
        text: "En una mesa hay tres niños haciendo un dibujo gigante. Pedro tiene el color azul y Ana el amarillo. Si comparten sus lápices, ambos pueden pintar el mar y el sol. ¡Juntos crearon un paisaje hermoso!",
        hint: "Compartir materiales hace posibles proyectos más grandes."
      },
      guidedPractice: {
        prompt: "Tienes una caja de 24 crayolas y el compañero de al lado olvidó la suya en casa y no puede hacer la tarea. ¿Qué harías?",
        options: [
          "Poner la caja en el centro de la mesa y decirle: 'Usemos las crayolas juntos'",
          "Esconder mi caja debajo de la cartuchera",
          "Cobrarle dinero por prestarle una crayola"
        ],
        correctIndex: 0,
        hint: "Poner en común los materiales ayuda a todos a progresar."
      },
      autonomousGame: {
        type: "sharing-distribution",
        instruction: "Distribuye los recursos para que todos los niños de la mesa puedan completar su proyecto:",
        tableState: {
          itemsNeeded: ["Tijeras", "Pegante", "Papel lustre"],
          actions: [
            { item: "Tijeras", shareWith: "Sofía que está esperando", isGenerous: true },
            { item: "Pegante", shareWith: "Tomás que necesita pegar su hoja", isGenerous: true }
          ]
        }
      },
      feedback: {
        success: "¡Qué gran generosidad! Gracias a tu espíritu solidario, todos terminaron felices su obra de arte.",
        support: "Muy bien. Compartir es un acto que llena de luz el corazón."
      },
      closing: {
        question: "¿Qué cosa que tienes hoy (un juego, un juguete, una sonrisa) te gustaría compartir con alguien?",
        reflection: "La generosidad es la semilla de la verdadera felicidad en comunidad."
      },
      reward: {
        badgeId: "badge-g2-compartir",
        badgeName: "Cofre de la Generosidad",
        badgeIcon: "🎁",
        stars: 3,
        description: "¡Has aprendido la satisfacción de compartir lo que tienes!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 2° 'Compartir lo que tengo'. Promover refuerzo positivo del carácter prosocial."
  },

  // MUNDO 3: COMUNICACIÓN Y CONFLICTOS (Grado 2)
  {
    id: "g2-w3-s7",
    grade: 2,
    worldId: "world-3",
    sessionNumber: 7,
    title: "Te escucho y me importas: Muestro que pongo atención",
    competence: "Escucha activa",
    learningObjective: "Demostrar a la otra persona con mi mirada, postura y gestos que realmente le escucho y me importa lo que dice.",
    characterName: "Lumi y el Espejo de la Atención",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "listening-gestures",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! No basta con quedarse callado: hay que hacer sentir al otro que lo que nos cuenta es importante para nosotros. ¡Vamos a descubrir las señales de la escucha sincera!",
        audioText: "Hoy aprenderemos a hacer que el otro sienta que le escucho y que me importa."
      },
      explanation: {
        title: "Las señales de que me importas",
        text: "Cuando alguien te habla: 1. Mírale a los ojos con calidez. 2. Asiente suavemente con la cabeza. 3. Guarda tu juguete o celular. 4. Haz preguntas amables como '¿Y qué sentiste luego?'. ¡Eso hace sentir a la otra persona valiosa!",
        signals: ["Contacto visual", "Asentir con la cabeza", "Preguntar con interés"]
      },
      demonstration: {
        title: "El contraste de Santi",
        text: "Situación A: Santi mira el techo y bosteza mientras su amiga le habla. Su amiga se siente ignorada y triste. Situación B: Santi la mira de frente, asiente y dice: '¡Vaya! Cuéntame más'. Su amiga se siente escuchada y acompañada.",
        hint: "El cuerpo demuestra si realmente estás presente."
      },
      guidedPractice: {
        prompt: "Tu compañero te está contando que su perrito estuvo enfermo. ¿Qué gesto demuestra que te importa?",
        options: [
          "Mirarlo con cariño, decirle: 'Pobrecito, ¿ya se siente mejor?'",
          "Mirar por la ventana y empezar a tararear una canción",
          "Decirle: 'Qué aburrido, cállate ya'"
        ],
        correctIndex: 0,
        hint: "Muestra interés genuino por su emoción."
      },
      autonomousGame: {
        type: "listener-quiz",
        instruction: "Identifica las acciones que demuestran escucha activa y afectuosa:",
        optionsList: [
          { text: "Asentir con la cabeza para indicar que sigo la conversación", isGood: true },
          { text: "Interrumpir a cada segundo para hablar de mí", isGood: false },
          { text: "Guardar el juguete mientras la otra persona habla", isGood: true },
          { text: "Burlarme del tono de voz de mi amigo", isGood: false }
        ]
      },
      feedback: {
        success: "¡Qué excelente oyente eres! Hacer que los demás se sientan escuchados es un regalo de amistad invalorable.",
        support: "Muy bien reflexionado. Escuchar con atención cura muchas penas."
      },
      closing: {
        question: "¿Cómo sabes tú cuando una persona realmente te está prestando toda su atención?",
        reflection: "Regálale a tus amigos la misma atención que te gusta recibir a ti."
      },
      reward: {
        badgeId: "badge-g2-atencion",
        badgeName: "Sello de la Escucha Cálida",
        badgeIcon: "👂",
        stars: 3,
        description: "¡Haces que los demás sientan que los escuchas y te importan!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 2° 'Hacer que el otro sienta que le escucho y me importa'."
  },

  {
    id: "g2-w3-s8",
    grade: 2,
    worldId: "world-3",
    sessionNumber: 8,
    title: "El guardián del respeto: Pido que paren el maltrato",
    competence: "Asertividad",
    learningObjective: "Aprender a pedirle con firmeza y sin agredir a quien maltrata a otro, que se detenga.",
    characterName: "Lumi y el Escudo Valiente",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "bystander-action",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! A veces vemos que alguien empuja o se burla de un compañero indefenso. No debemos ser espectadores silenciosos: podemos ser defensores del respeto pidiendo con firmeza que paren.",
        audioText: "Hoy aprenderemos a pedirle a quien maltrata a otro, que pare, con respeto y valentía."
      },
      explanation: {
        title: "No te quedes callado ante el maltrato",
        text: "El maltrato crece cuando nadie dice nada o cuando se ríen de la burla. Si ves a alguien molestando a otro: 1. Acércate con calma y seguridad. 2. Di con voz clara: 'Para, eso no es gracioso y le hace daño'. 3. Si insiste, busca la ayuda de un profesor.",
        keys: ["Firmeza sin agresión", "Apoyar a la víctima", "Avisar a un adulto"]
      },
      demonstration: {
        title: "La defensa de Tomás",
        text: "Un niño le quitó la gorra a Tomás y se la tiraban entre varios. Andrea dio un paso al frente y dijo: 'Basta, devuélvanle la gorra a Tomás. No está bien quitar cosas ajenas'. Al escucharla firme, los niños devolvieron la gorra.",
        hint: "Una voz valiente puede frenar una injusticia."
      },
      guidedPractice: {
        prompt: "En el recreo, dos niños están empujando a un compañero pequeño contra la pared. ¿Qué es lo más asertivo?",
        options: [
          "Decirles con firmeza: '¡Paren de empujarlo! Déjenlo en paz', y llamar al profesor de turno",
          "Unirme a empujarlo para ser popular",
          "Reírme y grabar con un celular"
        ],
        correctIndex: 0,
        hint: "Defender al vulnerable con firmeza protege la paz de todos."
      },
      autonomousGame: {
        type: "bystander-decision-tree",
        instruction: "Decide la mejor ruta de acción para frenar el maltrato sin violencia:",
        steps: [
          { prompt: "¿Qué dices para detener la burla?", answer: "'Basta, deja de insultarlo, a nadie le gusta el maltrato.'", options: ["'Basta, deja de insultarlo, a nadie le gusta el maltrato.'", "'¡Peleemos a golpes!'"] },
          { prompt: "¿Cómo apoyas a quien fue atacado?", answer: "Invitarlo a venir conmigo y preguntarle cómo se siente.", options: ["Invitarlo a venir conmigo y preguntarle cómo se siente.", "Decirle que no sea llorón"] }
        ]
      },
      feedback: {
        success: "¡Eres un auténtico defensor de la convivencia! Tu voz firme y pacífica hace del colegio un lugar seguro.",
        support: "Muy bien reflexionado. No apoyar el maltrato nos hace grandes ciudadanos."
      },
      closing: {
        question: "¿Por qué crees que quedarse callado cuando maltratan a alguien empeora las cosas?",
        reflection: "La valentía consiste en usar nuestras palabras para proteger a quien lo necesita."
      },
      reward: {
        badgeId: "badge-g2-defensa",
        badgeName: "Escudo del Defensor Valiente",
        badgeIcon: "🛡️",
        stars: 3,
        description: "¡Sabes pedirle a quien maltrata a otro que pare, con respeto y determinación!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 2° 'Pedirle a quien maltrata a otro, que pare'. Fomenta el rol activo de los espectadores para prevenir el acoso escolar."
  },

  {
    id: "g2-w3-s9",
    grade: 2,
    worldId: "world-3",
    sessionNumber: 9,
    title: "La fórmula mágica: Soluciones gana - gana en un conflicto",
    competence: "Manejo de conflictos",
    learningObjective: "Aprender a buscar acuerdos donde ambas partes ganen y se sientan satisfechas al resolver un desacuerdo.",
    characterName: "Lumi y la Balanza Dorada",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "win-win-negotiation",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Gran Desafío Final de Segundo Grado! En los desacuerdos no tiene por qué haber un ganador y un perdedor amargado. ¡Podemos inventar soluciones gana-gana donde todos salgamos felices!",
        audioText: "Bienvenido al desafío final. Hoy aprenderemos a encontrar soluciones gana - gana para resolver conflictos."
      },
      explanation: {
        title: "¿Qué es una solución gana - gana?",
        text: "En una solución 'gana-pierde', uno impone su voluntad y el otro queda triste o resentido. En una solución 'pierde-pierde', ambos pelean y se quedan sin nada. Pero en una solución 'GANA-GANA', conversamos, pensamos creativamente y encontramos una salida que beneficie a los dos.",
        types: [
          { name: "Gana - Pierde", result: "Uno festeja, el otro se amarga" },
          { name: "Pierde - Pierde", result: "Pelean y el juego se rompe para los dos" },
          { name: "Gana - Gana", result: "¡Ambos quedan contentos y la amistad crece!" }
        ]
      },
      demonstration: {
        title: "La única pelota del salón",
        text: "Juan quiere jugar fútbol y Carlos quiere jugar a encestar en el aro de baloncesto con la misma pelota. Solución gana-gana: juegan 15 minutos fútbol con pases rápidos y 15 minutos encestando. ¡Los dos jugaron y aprendieron algo nuevo!",
        hint: "La creatividad convierte los choques en colaboración."
      },
      guidedPractice: {
        prompt: "Dos niñas quieren usar la misma mesa para pintar con témperas, pero hay pocas sillas. ¿Cuál es la solución gana-gana?",
        options: [
          "Juntar las hojas en el centro, compartir las pinturas y pintar de pie o compartir las sillas por rondas",
          "Empujar la mesa para que la otra se vaya llorando",
          "Botar las témperas a la basura para que ninguna pinte"
        ],
        correctIndex: 0,
        hint: "Busca que ambas puedan realizar su proyecto artístico."
      },
      autonomousGame: {
        type: "win-win-resolver",
        instruction: "Descubre la solución gana-gana para cada dilema:",
        dilemmas: [
          {
            conflict: "En la biblioteca solo queda un ejemplar del libro de dinosaurios que Pablo y Sofía necesitan para su tarea de ciencias.",
            bestWinWin: "Leer el libro juntos en la misma mesa, turnándose las páginas y tomando notas compartidas.",
            options: [
              "Leer el libro juntos en la misma mesa, turnándose las páginas y tomando notas compartidas.",
              "Halonear el libro hasta romperle las hojas",
              "Esconder el libro detrás de un mueble"
            ]
          }
        ]
      },
      feedback: {
        success: "¡FELICITACIONES! Has completado todas las aventuras de Segundo Grado con honores. Sabes reconocer la ansiedad, ver desde el ángulo del otro y crear acuerdos gana-gana.",
        support: "Excelente desempeño. Las soluciones gana-gana son el secreto de los grandes líderes de paz."
      },
      closing: {
        question: "¿Qué desacuerdo reciente en tu casa podrías transformar en una solución gana-gana hoy mismo?",
        reflection: "Cuando pensamos en el bien de todos, la convivencia se vuelve armoniosa y divertida."
      },
      reward: {
        badgeId: "badge-g2-ganagana",
        badgeName: "Balanza Dorada Gana-Gana",
        badgeIcon: "⚖️",
        stars: 3,
        description: "¡Has completado Segundo Grado dominando las soluciones gana - gana!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 2° 'Buscar soluciones gana - gana para resolver un conflicto'. Fomenta la negociación colaborativa."
  }
];
