/**
 * emoTIC - Actividades Pedagógicas de Grado Cuarto (4º)
 * Nota Pedagógica: Estas actividades fueron diseñadas y adaptadas para la plataforma emoTIC
 * basadas estrictamente en la matriz oficial de objetivos de la Guía del Docente Emociones para la Vida (pág. 10).
 */

window.EMOTIC_ACTIVITIES_G4 = [
  // MUNDO 1: MI MUNDO EMOCIONAL (Grado 4)
  {
    id: "g4-w1-s1",
    grade: 4,
    worldId: "world-1",
    sessionNumber: 1,
    title: "El calor del 'oso': Reconozco cuándo siento vergüenza",
    competence: "Identificación de emociones",
    learningObjective: "Reconocer cuándo siento vergüenza («hacer el oso»), entender su origen social y aprender a superarla con humor y naturalidad.",
    characterName: "Lumi y el Espejo de la Vergüenza",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "shame-compass",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola, exploradores de Cuarto Grado! Soy Lumi. A esta edad nos importa mucho lo que piensen nuestros compañeros, y a veces aparece una emoción que nos hace arder las mejillas: la vergüenza o 'hacer el oso'. ¡Aprendamos a mirarla sin miedo!",
        audioText: "Bienvenido a Cuarto Grado. Hoy aprenderemos a reconocer cuándo sentimos vergüenza y cómo superarla sanamente."
      },
      explanation: {
        title: "La anatomía de la vergüenza",
        text: "La vergüenza es una emoción social que surge cuando sentimos que hemos cometido un error público o que no cumplimos lo que otros esperan. Se siente como calor repentino en las mejillas, ganas de esconderse bajo tierra y una voz interna que exagera diciendo: '¡Todos se burlarán de mí por siempre!'. Pero la verdad es que a todos nos pasa y la mayoría de personas lo olvidan en cinco minutos.",
        tips: ["Normalizar: Todos tropezamos o nos equivocamos alguna vez.", "Humor sano: Reírte de ti mismo desinfla la burla ajena."]
      },
      demonstration: {
        title: "El tropiezo de Camilo",
        text: "Camilo tropezó en el escenario durante la izada de bandera y se le cayó la gorra. Su rostro enrojeció de vergüenza. En lugar de huir llorando, recogió la gorra, hizo una reverencia divertida y sonrió. El salón aplaudió su espontaneidad. ¡Desactivó el 'oso' con naturalidad!",
        hint: "Aceptar el error con gracia te vuelve admirable."
      },
      guidedPractice: {
        prompt: "Al responder una pregunta en clase te trabas con una palabra y algunos se ríen. Sientes que la cara te arde de vergüenza. ¿Qué es lo mejor?",
        options: [
          "Sonreír, respirar hondo, decir '¡Uf, se me enredó la lengua!' y pronunciar la palabra con calma",
          "Ponerme a llorar y gritarle insultos al profesor",
          "No volver a hablar en todo el año escolar"
        ],
        correctIndex: 0,
        hint: "La naturalidad le quita todo el poder a la vergüenza."
      },
      autonomousGame: {
        type: "shame-scenario-solver",
        instruction: "Elige la respuesta que transforma la vergüenza en madurez y confianza:",
        cases: [
          {
            situation: "Se te manchó el pantalón con tempera verde y tienes que caminar por el pasillo central.",
            bestAction: "Caminar con la frente en alto y decir con humor: 'Hoy vengo camuflado estilo selva'.",
            options: [
              "Caminar con la frente en alto y decir con humor: 'Hoy vengo camuflado estilo selva'.",
              "Encerrarme en el baño hasta la noche",
              "Acusar a otros de mentirosos"
            ]
          }
        ]
      },
      feedback: {
        success: "¡Increíble maestría! Has domesticado al 'oso' de la vergüenza. Quien sabe reírse de sus pequeños tropiezos es libre e invencible.",
        support: "Muy bien reflexionado. La vergüenza nos recuerda que somos humanos imperfectos y bellos."
      },
      closing: {
        question: "¿Recuerdas algún momento en el que sentiste mucho 'oso'? ¿Cómo lo ves ahora con el paso del tiempo?",
        reflection: "La mayoría de los 'osos' del pasado hoy son anécdotas divertidas que nos hacen sonreír."
      },
      reward: {
        badgeId: "badge-g4-oso",
        badgeName: "Escudo Anti-Vergüenza",
        badgeIcon: "🦔",
        stars: 3,
        description: "¡Sabes reconocer la vergüenza y superarla con dignidad y buen humor!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 4° 'Reconocer cuándo siento vergüenza («oso»)'. Clave para la autoestima y el bienestar social en el paso a la preadolescencia."
  },

  {
    id: "g4-w1-s2",
    grade: 4,
    worldId: "world-1",
    sessionNumber: 2,
    title: "La brújula del bienestar: Sentir emociones que son buenas para mí",
    competence: "Manejo de emociones",
    learningObjective: "Cultivar activamente emociones positivas y constructivas (gratitud, entusiasmo, serenidad, esperanza) que nutran mi salud mental.",
    characterName: "Lumi y el Árbol de la Gratitud",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "positive-emotion-cultivator",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! A menudo pasamos horas rumiando lo que nos da rabia o tristeza. Pero ¿sabías que podemos 'sembrar' emociones que nos hacen bien, como la gratitud, la admiración y la esperanza? ¡Vamos al huerto del bienestar!",
        audioText: "Hoy aprenderemos a cultivar y sentir emociones que son buenas y saludables para nosotros."
      },
      explanation: {
        title: "Nutrir el jardín interior",
        text: "Las emociones constructivas ensanchan nuestra mente y fortalecen nuestras defensas. La GRATITUD nos hace valorar lo que tenemos; la SERENIDAD nos regala descanso; el ENTUSIASMO nos impulsa a crear; y la ESPERANZA nos sostiene en días nublados.",
        habits: ["Llevar un diario de gratitud", "Saborear los momentos bellos", "Hacer cosas amables por otros"]
      },
      demonstration: {
        title: "El diario de gratitud de Mariana",
        text: "Cada noche antes de dormir, Mariana anota tres cosas sencillas que agradece: 'El abrazo de mi abuela, la brisa de la tarde y haber entendido la división en matemáticas'. Ese pequeño hábito la hace despertar alegre y con energía positiva.",
        hint: "Agradecer entrena al cerebro para ver la luz en lo cotidiano."
      },
      guidedPractice: {
        prompt: "Has tenido un día con mucho frío y una prueba difícil. ¿Qué pensamiento te ayuda a cultivar una emoción buena para ti?",
        options: [
          "'Agradezco tener un abrigo caliente, llegar a casa y la oportunidad de descansar y mejorar mañana'",
          "'Mi vida es un desastre y el mundo entero está en mi contra'",
          "'Voy a pelear con mi hermano para desquitarme'"
        ],
        correctIndex: 0,
        hint: "La gratitud y la perspectiva positiva alivian el cansancio."
      },
      autonomousGame: {
        type: "gratitude-tree-builder",
        instruction: "Cuelga en el árbol del bienestar las emociones y prácticas que te hacen florecer:",
        fruits: [
          { name: "Gratitud sincera", isNutritive: true, reason: "Aumenta la satisfacción con la vida." },
          { name: "Rencor acumulado", isNutritive: false, reason: "Envenena el ánimo propio." },
          { name: "Entusiasmo por aprender", isNutritive: true, reason: "Nos llena de vitalidad." },
          { name: "Esperanza activa", isNutritive: true, reason: "Nos da resiliencia ante los retos." }
        ]
      },
      feedback: {
        success: "¡Qué árbol tan frondoso y luminoso has creado! Cuidar tu dieta emocional es el mejor regalo para tu mente.",
        support: "Muy bien elegido. Alimentar emociones buenas no significa ignorar las difíciles, sino tener un puerto seguro al cual volver."
      },
      closing: {
        question: "¿Qué tres cosas buenas ocurrieron en tu día de hoy por las que te sientas agradecido?",
        reflection: "La felicidad no es la ausencia de problemas, sino la presencia de gratitud y serenidad."
      },
      reward: {
        badgeId: "badge-g4-gratitud",
        badgeName: "Brote de la Gratitud Dorada",
        badgeIcon: "🌱",
        stars: 3,
        description: "¡Sabes cultivar y sentir emociones que nutren tu vida!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 4° 'Sentir emociones que son buenas para mí'. Basado en la psicología positiva y la ampliación de recursos cognitivos."
  },

  {
    id: "g4-w1-s3",
    grade: 4,
    worldId: "world-1",
    sessionNumber: 3,
    title: "El domador de estresores: Identifico mis estresores y los manejo",
    competence: "Manejo del estrés",
    learningObjective: "Identificar las causas específicas que me generan estrés (estresores) y aplicar estrategias concretas para administrarlos.",
    characterName: "Lumi y el Mapa de Estresores",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "stressor-management",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! Para vencer a un monstruo, primero hay que saber cómo se llama. El estrés no aparece por arte de magia: tiene 'estresores' (detonantes específicos). Hoy crearemos un mapa de tus estresores para aprender a desarmarlos uno a uno.",
        audioText: "Hoy aprenderemos a identificar nuestros estresores y a manejarlos de forma práctica."
      },
      explanation: {
        title: "¿Qué es un estresor?",
        text: "Un estresor es cualquier situación o evento que te exige esfuerzo extra o te genera tensión (por ejemplo: desorden en el tiempo, hablar en público, peleas familiares, ruido constante). Cuando identificas tu estresor exacto, puedes tomar medidas: organizar una agenda, pedir una tutoría o crear un espacio silencioso.",
        categories: ["Estresores de tiempo y tareas", "Estresores de convivencia", "Estresores del entorno"]
      },
      demonstration: {
        title: "El plan de acción de Samuel",
        text: "Estresor de Samuel: dejar las tareas para el domingo por la noche. Manejo eficaz: hacer un calendario visual y avanzar media hora cada tarde de viernes y sábado. ¡El domingo disfruta tranquilo sin estrés!",
        hint: "Organizar y planificar es el mejor antídoto contra el estrés escolar."
      },
      guidedPractice: {
        prompt: "Tu mayor estresor es que tu hermanito pequeño rompe tus hojas de trabajo cuando intentas dibujar en la sala. ¿Cómo manejas ese estresor de raíz?",
        options: [
          "Buscar un escritorio en un rincón tranquilo, guardar mis materiales en una caja con tapa y pedir apoyo a mis padres para acordar un horario",
          "Pelear a gritos todos los días y romper las cosas de mi hermano",
          "Dejar de hacer tareas para siempre"
        ],
        correctIndex: 0,
        hint: "Cambia las condiciones ambientales para resolver la causa."
      },
      autonomousGame: {
        type: "stressor-toolkit",
        instruction: "Empareja cada estresor común con su estrategia de manejo más efectiva:",
        pairs: [
          { stressor: "Demasiadas tareas acumuladas para el mismo día", solution: "Priorizar con una lista: empezar por la más urgente y tomar pausas de 5 minutos." },
          { stressor: "Miedo a olvidar la letra en una exposición oral", solution: "Practicar frente al espejo tres veces y llevar fichas con palabras clave." },
          { stressor: "Ruido excesivo que impide concentrarse", solution: "Usar tapones de oído o estudiar en la biblioteca escolar." }
        ]
      },
      feedback: {
        success: "¡Eres un estratega formidable! Desarmar los estresores con planes claros te da autonomía y paz mental.",
        support: "Excelente deducción. Manejar el estrés es una habilidad que te servirá toda tu vida adulta."
      },
      closing: {
        question: "¿Cuál es tu principal estresor esta semana y qué pequeña acción harás hoy para manejarlo?",
        reflection: "No podemos evitar todas las dificultades, pero sí podemos elegir cómo organizarnos ante ellas."
      },
      reward: {
        badgeId: "badge-g4-estresor",
        badgeName: "Brújula del Domador de Estresores",
        badgeIcon: "🧭",
        stars: 3,
        description: "¡Identificas tus estresores y aplicas estrategias concretas para resolverlos!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 4° 'Identificar mis estresores y manejarlos'. Enseña estrategias de afrontamiento centradas en el problema y en la emoción."
  },

  // MUNDO 2: EN LOS ZAPATOS DE LOS DEMÁS (Grado 4)
  {
    id: "g4-w2-s4",
    grade: 4,
    worldId: "world-2",
    sessionNumber: 4,
    title: "El detective curioso: Busco más información para entender al otro",
    competence: "Toma de perspectiva",
    learningObjective: "Aprender a buscar activamente información antes de juzgar apresuradamente el punto de vista o conducta de otra persona.",
    characterName: "Lumi y la Lente de Preguntas",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "info-seeker",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! Los juicios rápidos son como saltar a una piscina sin mirar si tiene agua. Hoy nos convertiremos en investigadores que hacen preguntas abiertas para entender a fondo la historia completa de los demás.",
        audioText: "Hoy aprenderemos a buscar más información para entender bien el punto de vista del otro."
      },
      explanation: {
        title: "Antes de juzgar, pregunta",
        text: "A menudo nos ofendemos porque asumimos lo que el otro pensó o sintió. Pero un buen pensador dice: 'Espera, me falta información'. Hacer preguntas curiosas y respetuosas como: '¿Qué quisiste decir cuando dijiste eso?' o '¿Qué te llevó a tomar esa decisión?' cambia todo el panorama.",
        cues: ["Evitar conclusiones automáticas", "Hacer preguntas aclaratorias", "Escuchar la versión completa"]
      },
      demonstration: {
        title: "El proyecto de arte de Sergio",
        text: "Sergio no llegó a la reunión de equipo el sábado. Sus compañeros estaban furiosos y querían sacarlo del grupo. Paula dijo: 'Esperemos al lunes y preguntémosle qué ocurrió antes de juzgar'. El lunes Sergio les contó que su mamá fue hospitalizada de urgencia. Todos comprendieron y se solidarizaron.",
        hint: "Buscar información evita injusticias dolorosas."
      },
      guidedPractice: {
        prompt: "Un amigo cercano no te respondió el saludo en la entrada del colegio y siguió derecho. ¿Qué es lo más prudente?",
        options: [
          "Acercarme después y preguntarle con amabilidad: 'Hola, te saludé en la mañana y te vi preocupado, ¿está todo bien?'",
          "Publicar en un grupo que es un traidor y que ya no somos amigos",
          "Hacerle una broma pesada en el recreo"
        ],
        correctIndex: 0,
        hint: "Pregunta antes de interpretar una ofensa donde tal vez solo hubo distracción o preocupación."
      },
      autonomousGame: {
        type: "investigation-tree",
        instruction: "Formula las preguntas adecuadas para descubrir la información faltante:",
        scenarios: [
          {
            situation: "Un compañero votó en contra de tu propuesta de juego en el comité de clase.",
            bestQuestion: "'Me gustaría entender tus razones: ¿qué aspectos de mi propuesta crees que se pueden mejorar?'",
            options: [
              "'Me gustaría entender tus razones: ¿qué aspectos de mi propuesta crees que se pueden mejorar?'",
              "'¿Por qué me tienes tanta envidia?'",
              "'¡Eres mi enemigo para siempre!'"
            ]
          }
        ]
      },
      feedback: {
        success: "¡Mente brillante y justa! Buscar datos y escuchar antes de juzgar te convierte en una persona madura y sabia.",
        support: "Excelente análisis. La curiosidad empática disuelve las guerras de orgullo."
      },
      closing: {
        question: "¿Alguna vez juzgaste a alguien sin saber la historia completa y luego cambiaste de opinión?",
        reflection: "La verdad rara vez es simple; buscar información es el camino de la justicia."
      },
      reward: {
        badgeId: "badge-g4-informacion",
        badgeName: "Lente del Juicio Justo",
        badgeIcon: "🔎",
        stars: 3,
        description: "¡Buscas información y escuchas antes de formar conclusiones sobre los demás!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 4° 'Buscar más información para entender bien el punto de vista del otro'."
  },

  {
    id: "g4-w2-s5",
    grade: 4,
    worldId: "world-2",
    sessionNumber: 5,
    title: "La red solidaria: Me pongo en el lugar del maltratado",
    competence: "Empatía",
    learningObjective: "Ponerme en el lugar de alguien que es maltratado o excluido por sus compañeros y actuar para defenderlo y acompañarlo.",
    characterName: "Lumi y la Capa Protectora",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "bystander-ally",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! En cuarto grado, la presión social puede ser muy fuerte. Algunos se unen a burlas para no ser atacados ellos mismos. Hoy encenderemos la empatía más profunda: sentir el dolor de quien es maltratado y convertirnos en sus aliados.",
        audioText: "Hoy aprenderemos a ponernos en el lugar de alguien que es maltratado por sus compañeros."
      },
      explanation: {
        title: "La herida invisible del acoso",
        text: "Cuando un grupo se ensaña contra una persona (burlándose de su ropa, su físico, su acento o excluyéndola), esa persona siente terror de ir a la escuela, soledad insoportable e impotencia. Imaginarte en sus zapatos te da la fuerza moral para decir: 'Yo no seré cómplice de esto'.",
        allySteps: ["No reírse de la burla", "Acercarse y acompañar a la víctima", "Informar a un docente con firmeza"]
      },
      demonstration: {
        title: "El almuerzo de David",
        text: "Un grupo de niños le escondía la mochila a David y se reían mientras él la buscaba angustiado. Valeria vio la cara de desespero de David. Se paró, les dijo con autoridad: 'Devuélvanle la maleta ya mismo', fue por el bolso y se sentó a almorzar con él. El grupo de burlones se desarmó.",
        hint: "Un solo aliado puede quebrar el círculo del acoso."
      },
      guidedPractice: {
        prompt: "En el salón crean un meme burlándose de un compañero tímido y todos lo comparten. ¿Qué haces tú?",
        options: [
          "No compartirlo, borrarlo, decirle al compañero en privado que cuenta conmigo y reportarlo al director de grupo",
          "Compartirlo con 5 amigos más para que todos se rían",
          "Festejar al que hizo el meme"
        ],
        correctIndex: 0,
        hint: "Rompe la cadena del ciberacoso con empatía activa."
      },
      autonomousGame: {
        type: "ally-simulator",
        instruction: "Decide cómo actuar como aliado solidario en estos dilemas sociales:",
        dilemmas: [
          {
            situation: "Ves que en el recreo no dejan entrar a un niño a la cancha porque 'juega mal' y le dicen palabras hirientes.",
            allyAction: "Proponer armar dos equipos equilibrados donde todos jueguen o invitarlo a jugar conmigo en otra cancha.",
            options: [
              "Proponer armar dos equipos equilibrados donde todos jueguen o invitarlo a jugar conmigo en otra cancha.",
              "Gritarle que se vaya a su casa",
              "Seguir jugando como si nada pasara"
            ]
          }
        ]
      },
      feedback: {
        success: "¡Qué inmensa valentía ética! Defender la dignidad de quien sufre requiere más fuerza que cualquier músculo.",
        support: "Excelente decisión moral. Ser un aliado solidario transforma vidas."
      },
      closing: {
        question: "¿Cómo crees que cambia la vida de un niño que sufre maltrato cuando encuentra aunque sea un solo amigo verdadero que lo apoya?",
        reflection: "Sé tú ese amigo que marca la diferencia en el mundo escolar."
      },
      reward: {
        badgeId: "badge-g4-aliado",
        badgeName: "Capa del Aliado Valiente",
        badgeIcon: "🛡️",
        stars: 3,
        description: "¡Te pones en el lugar del maltratado y defiendes la dignidad humana!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 4° 'Ponerme en el lugar de alguien que es maltratado por sus compañeros'. Prevención central contra el bullying."
  },

  {
    id: "g4-w2-s6",
    grade: 4,
    worldId: "world-2",
    sessionNumber: 6,
    title: "El arte de acompañar: Sé consolar a los demás",
    competence: "Comportamiento prosocial",
    learningObjective: "Desarrollar habilidades asertivas y afectuosas para consolar a otras personas en momentos de pérdida, tristeza o decepción.",
    characterName: "Lumi y la Llama del Consuelo",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "comforting-mastery",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! Todos enfrentamos tormentas en la vida. Consolar no es decir 'no pasa nada': es tener la madurez de decir 'sé que duele, pero no estás solo'. ¡Aprendamos el arte más bello del cuidado mutuo!",
        audioText: "Hoy aprenderemos a consolar a los demás con respeto, cariño y empatía."
      },
      explanation: {
        title: "Consolar con sabiduría",
        text: "Las mejores formas de consolar: 1. Escuchar sin apurar. 2. Acompañar en silencio respetuoso si no quieren hablar. 3. Validar: 'Tienes todo el derecho a sentirte triste'. 4. Ofrecer un gesto de cuidado: un vaso con agua, un abrazo si lo consienten, o caminar juntos.",
        phrases: ["'Estoy aquí contigo'", "'No tienes que fingir que estás bien si te sientes mal'", "'Cuenta conmigo'"]
      },
      demonstration: {
        title: "La desilusión de Clara",
        text: "Clara no fue seleccionada para el equipo de gimnasia y llora desconsolada en los camerinos. Andrea no le dice '¡ay, no exageres!', sino que se sienta a su lado, le pasa una servilleta y le dice: 'Entiendo tu desilusión. Entrenaste muy duro y duele. Si quieres llorar, desahógate, yo te acompaño'. Clara se sintió profundamente reconfortada.",
        hint: "Acompañar en el dolor sin juzgarlo es el verdadero consuelo."
      },
      guidedPractice: {
        prompt: "A un amigo se le perdió su mascota querida. ¿Cuál es la forma más respetuosa de consolarlo?",
        options: [
          "'Sé cuánto quieres a tu mascota y el dolor tan grande que debes sentir. Vamos a hacer carteles juntos y cuentas con todo mi apoyo'",
          "'Cómprate otro perro y ya, qué drama'",
          "'A mí me regalaron un perro nuevo más bonito'"
        ],
        correctIndex: 0,
        hint: "Reconoce el valor de su vínculo afectivo."
      },
      autonomousGame: {
        type: "consolation-compass",
        instruction: "Selecciona las frases y actitudes que brindan consuelo genuino:",
        bank: [
          { phrase: "'No estás solo en esto, aquí estoy contigo.'", isComfort: true },
          { phrase: "'¡Deja de llorar que ya eres grande!'", isComfort: false },
          { phrase: "'Tómate tu tiempo, respira y cuando quieras hablar te escucho.'", isComfort: true },
          { phrase: "'Eso no es nada comparado con lo mío.'", isComfort: false }
        ]
      },
      feedback: {
        success: "¡Eres una presencia sanadora y acogedora! El consuelo que sabes brindar ilumina las sombras de la vida.",
        support: "Excelente sensibilidad. Saber consolar te hace un amigo invaluable."
      },
      closing: {
        question: "¿Cómo puedes saber si una persona que está triste prefiere un abrazo, hablar o que la dejen tranquila un momento?",
        reflection: "La clave es siempre preguntar con delicadeza: '¿Cómo puedo acompañarte mejor ahora?'."
      },
      reward: {
        badgeId: "badge-g4-consuelo",
        badgeName: "Llama del Abrazo Solidario",
        badgeIcon: "🕯️",
        stars: 3,
        description: "¡Sabes consolar a los demás con empatía, respeto y generosidad!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 4° 'Consolar a los demás'. Desarrolla competencias afectivas avanzadas y soporte entre pares."
  },

  // MUNDO 3: COMUNICACIÓN Y CONFLICTOS (Grado 4)
  {
    id: "g4-w3-s7",
    grade: 4,
    worldId: "world-3",
    sessionNumber: 7,
    title: "El chequeo de señal: Verifico que entiendo lo que me quieren decir",
    competence: "Escucha activa",
    learningObjective: "Aprender a parafrasear y verificar lo que la otra persona me está diciendo antes de reaccionar.",
    characterName: "Lumi y el Eco Fiel",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "paraphrase-master",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! La mitad de los conflictos en el mundo nacen de un teléfono roto: 'Tú dijiste X', '¡No, yo quise decir Y!'. Hoy aprenderemos una técnica profesional de comunicación: ¡el parafraseo y la verificación!",
        audioText: "Hoy aprenderemos a verificar que entendemos lo que nos quieren decir antes de responder."
      },
      explanation: {
        title: "La técnica del Eco Sabio (Parafraseo)",
        text: "Parafrasear es decir con tus propias palabras lo que acabas de escuchar para confirmar que lo entendiste bien. Frases mágicas: 'A ver si te entendí bien: ¿lo que me estás diciendo es que...?', '¿Es correcto lo que entendí?'. Si hubo un malentendido, la persona lo aclara de inmediato antes de que haya una pelea.",
        benefits: ["Evita malentendidos gigantes", "Hace que el otro se sienta 100% comprendido", "Te da tiempo para pensar con calma"]
      },
      demonstration: {
        title: "La coordinación del recreo",
        text: "Felipe: 'Estoy cansado de que siempre escojamos los mismos juegos'. Reacción sin verificar: '¡Pues no juegues con nosotros!' (pelea). Reacción verificando: 'Felipe, ¿lo que me quieres decir es que te gustaría proponer un juego nuevo hoy?'. Felipe: '¡Exacto! Me gustaría jugar voleibol'. Resultado: ¡jugaron voleibol en paz!",
        hint: "Aclarar el significado exacto construye puentes de diálogo."
      },
      guidedPractice: {
        prompt: "Tu compañera te dice: 'No quiero que toques mis cosas cuando no estoy en el puesto'. ¿Cuál es el mejor parafraseo para verificar?",
        options: [
          "'Entiendo, me estás pidiendo que espere a que regreses para pedirte prestados los materiales, ¿es así?'",
          "'¡Me estás diciendo ladrona!'",
          "'Tus cosas son feas de todos modos'"
        ],
        correctIndex: 0,
        hint: "Resume la idea principal sin añadir acusaciones emocionales."
      },
      autonomousGame: {
        type: "paraphrase-builder-game",
        instruction: "Selecciona el parafraseo preciso que confirma el mensaje:",
        exercises: [
          {
            originalSpeech: "Me molesta que te rías cuando estoy practicando mi solo de flauta, me hace perder la concentración.",
            accurateCheck: "'O sea que cuando te ríes te desconcentras y sientes que no te estoy tomando en serio, ¿cierto?'",
            options: [
              "'O sea que cuando te ríes te desconcentras y sientes que no te estoy tomando en serio, ¿cierto?'",
              "'¡Dices que no puedo reírme nunca más en la vida!'",
              "'Dices que tocas la flauta horrible'"
            ]
          }
        ]
      },
      feedback: {
        success: "¡Extraordinario comunicador! Verificar el mensaje es la habilidad dorada de la inteligencia interpersonal.",
        support: "Muy bien deducido. Preguntar '¿es esto lo que me quisiste decir?' previene casi todos los malentendidos."
      },
      closing: {
        question: "¿En qué conversación con tus papás o amigos podrías aplicar hoy el parafraseo?",
        reflection: "Quien verifica antes de juzgar, dialoga con la verdad y la paz."
      },
      reward: {
        badgeId: "badge-g4-parafraseo",
        badgeName: "Sello del Eco Comunicativo",
        badgeIcon: "🔁",
        stars: 3,
        description: "¡Sabes verificar y parafrasear lo que te dicen con exactitud y empatía!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 4° 'Verificar que entiendo lo que me quieren decir'. Habilidad troncal de retroalimentación en la comunicación dialógica."
  },

  {
    id: "g4-w3-s8",
    grade: 4,
    worldId: "world-3",
    sessionNumber: 8,
    title: "La verdad sin veneno: Expreso lo que siento sin hacer daño",
    competence: "Asertividad",
    learningObjective: "Expresar mis opiniones, límites y emociones sinceras de forma constructiva, sin recurrir al sarcasmo ni dañar la autoestima de otros.",
    characterName: "Lumi y la Pluma de la Franqueza",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "non-toxic-truth",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! Algunas personas dicen: 'Yo soy sincero y digo las verdades en la cara sin filtro'. Pero a menudo usan la supuesta 'sinceridad' como un mazo para herir a los demás. Hoy aprenderemos a decir la verdad con claridad y cuidado.",
        audioText: "Hoy aprenderemos a expresar lo que pensamos y sentimos sin hacer daño a los demás."
      },
      explanation: {
        title: "La sinceridad constructiva",
        text: "La verdad no necesita espinas venenosas. Cuando tengas una crítica o molestia: 1. Habla en privado, no delante de todos para avergonzar. 2. Enfócate en la conducta, no en la persona ('esta acción no funcionó' en vez de 'eres un incompetente'). 3. Expresa tu emoción con respeto y propone una salida.",
        tips: ["Sinceridad sin empatía es crueldad.", "Firmeza con respeto es asertividad pura."]
      },
      demonstration: {
        title: "El dibujo en equipo",
        text: "La letra del cartel que hizo Santiago quedó torcida. Manera hiriente: '¡Qué asco de letra, la arruinaste toda, pareces un bebé!' (destruye a Santiago). Manera asertiva constructiva: 'Santiago, creo que las letras quedaron un poco juntas y difíciles de leer desde lejos. ¿Qué tal si trazamos unas líneas guía con regla y las repetimos con calma?'. Santiago: '¡Buena idea, ayúdame con la regla!'",
        hint: "Construye soluciones sin humillar."
      },
      guidedPractice: {
        prompt: "No te gusta el juego que propuso tu amigo para el recreo. ¿Cómo se lo dices sin herirlo?",
        options: [
          "'Agradezco tu propuesta, pero hoy tengo muchas ganas de correr y jugar fútbol. ¿Qué tal si jugamos a tu juego mañana y hoy al mío?'",
          "'¡Ese juego es para tontos y aburridos!'",
          "Decirle que sí a regañadientes y pasar todo el recreo con cara de enojo"
        ],
        correctIndex: 0,
        hint: "Expresa tu gusto personal sin descalificar el de tu amigo."
      },
      autonomousGame: {
        type: "clean-truth-transformer",
        instruction: "Transforma cada comentario hiriente o sarcástico en una expresión constructiva:",
        transformations: [
          {
            toxic: "¡Qué idea tan ridícula, a nadie le va a gustar!",
            constructive: "Veo tu punto, aunque me preocupa que no tengamos tiempo suficiente; ¿podríamos simplificarla?",
            options: [
              "Veo tu punto, aunque me preocupa que no tengamos tiempo suficiente; ¿podríamos simplificarla?",
              "¡Cállate que tú nunca piensas!",
              "Fingir que me gusta y luego no hacer nada"
            ]
          }
        ]
      },
      feedback: {
        success: "¡Qué gran elegancia y madurez verbal! Comunicarse con franqueza limpia y respetuosa es la marca de las personas sabias.",
        support: "Excelente transformación. Cuidar el impacto de tus palabras te hace un líder confiable."
      },
      closing: {
        question: "¿Cómo puedes decir lo que piensas sin que la otra persona sienta que la estás atacando?",
        reflection: "Las palabras tienen poder de construir o destruir; elige siempre construir."
      },
      reward: {
        badgeId: "badge-g4-franqueza",
        badgeName: "Pluma de la Palabra Limpia",
        badgeIcon: "🪶",
        stars: 3,
        description: "¡Expresas lo que sientes y piensas con franqueza, sin hacer daño a nadie!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 4° 'Expresar lo que pienso y siento sin hacer daño a otros'."
  },

  {
    id: "g4-w3-s9",
    grade: 4,
    worldId: "world-3",
    sessionNumber: 9,
    title: "El termostato de la paz: Manejo la 'temperatura' de un conflicto",
    competence: "Manejo de conflictos",
    learningObjective: "Aprender a enfriar la 'temperatura emocional' en una discusión grupal o interpersonal para evitar la escalada de agresión.",
    characterName: "Lumi y el Termostato de la Sabiduría",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "de-escalation-master",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡El Gran Desafío Cumbre de Cuarto Grado! En un conflicto, los ánimos pueden encenderse como un fósforo sobre gasolina: gritos, reproches pasados y amenazas suben la 'temperatura' hasta el hervor. Hoy aprenderás a ser el 'termostato de la paz' que baja el fuego y devuelve la calma.",
        audioText: "Bienvenido al desafío final de Cuarto Grado. Hoy aprenderemos a regular la temperatura de una situación conflictiva."
      },
      explanation: {
        title: "Subir vs Bajar la temperatura",
        text: "Suben la temperatura: gritar, señalar con el dedo, revivir peleas de hace meses, burlarse, insultar y meterse en el espacio físico. Bajan la temperatura: bajar el tono de voz, respirar hondo, sentarse, reconocer algo positivo, proponer un receso de 5 minutos ('tiempo fuera') y enfocarse solo en el problema actual.",
        coolingKeys: ["Voz serena y pausada", "Tiempo fuera para calmarse", "Postura física relajada y abierta"]
      },
      demonstration: {
        title: "La discusión por el balón",
        text: "Dos grupos peleaban por el turno de la cancha. Los capitanes estaban a punto de empujarse, rojos de furia. Gabriel intervino con voz tranquila: 'Oigan, amigos, la temperatura está en 100 grados y si seguimos así el profesor nos quitará el balón a todos. Sentémonos en el pasto, tomemos agua dos minutos y dividamos la cancha'. La temperatura bajó y todos pudieron jugar.",
        hint: "Bajar el tono de voz invita al otro a bajar el suyo."
      },
      guidedPractice: {
        prompt: "En un debate grupal, dos compañeros empiezan a gritarse descontrolados de pie. ¿Qué acción enfría la temperatura?",
        options: [
          "Decir con voz firme y suave: 'Hagamos una pausa de dos minutos, respiremos y volvamos a sentarnos para escucharnos'",
          "Empezar a cantar: '¡Pelea, pelea, que se den golpes!'",
          "Tirarle agua en la cara a uno de ellos"
        ],
        correctIndex: 0,
        hint: "Un llamado a la calma y una pausa física desescalan el conflicto."
      },
      autonomousGame: {
        type: "temperature-regulator",
        instruction: "Regula las acciones para bajar el termómetro del conflicto de Rojo (hirviendo) a Verde (paz):",
        moves: [
          { move: "Bajar el volumen y hablar en tono sereno", effect: "cools", degreesChange: -30 },
          { move: "Sacar a relucir una falta de hace dos semanas", effect: "heats", degreesChange: +30 },
          { move: "Proponer un descanso de 5 minutos para tomar agua", effect: "cools", degreesChange: -40 },
          { move: "Hacer muecas de burla mientras el otro habla", effect: "heats", degreesChange: +40 }
        ]
      },
      feedback: {
        success: "¡MAESTRÍA ABSOLUTA! Has culminado con éxito todo el programa de Cuarto Grado. Eres un mediador de paz, un pensador empático y un guardián de la convivencia sana en tu escuela y sociedad.",
        support: "Excelente discernimiento. Saber desescalar conflictos es la marca de los constructores de paz."
      },
      closing: {
        question: "¿Qué compromiso personal asumes para cuidar la temperatura emocional en tu aula de clase y en tu hogar?",
        reflection: "Tienes en tus manos el superpoder de sembrar paz, comprensión y dignidad en cada rincón donde vayas."
      },
      reward: {
        badgeId: "badge-g4-termostato",
        badgeName: "Laurel de Oro del Pacificador",
        badgeIcon: "🕊️",
        stars: 3,
        description: "¡Has completado todos los mundos de emoTIC dominando el arte de la paz y la convivencia socioemocional!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 4° 'Manejar la «temperatura» de una situación conflictiva'. Técnicas de desescalada y autorregulación colectiva."
  }
];
