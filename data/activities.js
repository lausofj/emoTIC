/**
 * emoTIC - Catálogo Oficial de Juegos y Niveles Socioemocionales
 * Estructura actualizada según el diseño pedagógico con personajes acompañantes.
 */

window.EMOTIC_ACTIVITIES = [
  // =========================================================================
  // NIVEL 1: EMOCIONES (Personaje: El Gato)
  // =========================================================================
  {
    id: "act-1",
    levelNumber: 1,
    worldId: "world-1",
    title: "Emociones",
    subtitle: "Une cada emoción con su significado corto trazando una línea",
    stage: "Primero de primaria • Reconocimiento emocional",
    competence: "Identificación de emociones y comprensión de su significado",
    learningObjective: "Reconocer las 6 emociones básicas (alegría, tristeza, enojo, miedo, asco y sorpresa) y asociar cada una con su significado trazando líneas interactivas.",
    
    // Personaje que presenta y explica el juego
    character: {
      id: "gato",
      name: "El Gato de las Emociones",
      avatarSvg: "assets/illustrations/gato-alegria.png",
      audioFile: "assets/audio/gato-nivel1.mp3",
      greeting: "¡Hola! Soy tu amigo el Gato. Hoy aprenderemos sobre las Emociones: alegría, tristeza, enojo, miedo, asco y sorpresa.",
      explanation: "Primero puedes ver nuestro video educativo para conocer las 6 emociones básicas. Luego, ayúdame a unir cada emoción con su significado trazando una línea con el mouse o con un clic. ¡Miau, vamos a aprender!",
      audioTranscript: "¡Hola! Soy tu amigo el Gato de las Emociones. Aprenderemos sobre la alegría, la tristeza, el enojo, el miedo, el asco y la sorpresa. Mira el video explicativo y después une cada emoción con su significado trazando una línea con el mouse o tu dedo. ¡Miau, vamos a divertirnos y aprender juntos!"
    },

    // Espacio para video educativo del Nivel 1
    video: {
      title: "Video: Conociendo nuestras emociones",
      placeholderUrl: "assets/videos/emociones-video.mp4",
      description: "Aprende qué sentimos y cómo se refleja cada una de las 6 emociones básicas en nuestro rostro y cuerpo."
    },

    gameType: "matching-emotions",
    totalPairs: 6,

    // Las 6 emociones con los gatos originales exactos enviados por el usuario
    pairs: [
      {
        id: "pair-alegria",
        emotion: "Alegría",
        color: "#D97706",
        bgLight: "#FEF3C7",
        icon: "😄",
        img: "assets/illustrations/gato-alegria.png",
        shortMeaning: "Sentir dicha, sonrisas y ganas de jugar cuando algo bonito pasa.",
        catFeedback: "¡Miau! La alegría nos llena de energía bonita y ganas de compartir."
      },
      {
        id: "pair-tristeza",
        emotion: "Tristeza",
        color: "#2563EB",
        bgLight: "#DBEAFE",
        icon: "😢",
        img: "assets/illustrations/gato-tristeza.png",
        shortMeaning: "Sentir pena o desánimo y ganas de llorar cuando algo nos duele.",
        catFeedback: "Así es. Cuando estamos tristes, desahogarnos y recibir un abrazo nos ayuda a sanar."
      },
      {
        id: "pair-enojo",
        emotion: "Enojo",
        color: "#DC2626",
        bgLight: "#FEE2E2",
        icon: "😡",
        img: "assets/illustrations/gato-enojo.png",
        shortMeaning: "Sentir molestia y calor cuando algo nos parece injusto o nos da rabia.",
        catFeedback: "¡Exacto! El enojo nos avisa que algo nos disgusta, y respirar profundo nos calma."
      },
      {
        id: "pair-miedo",
        emotion: "Miedo",
        color: "#059669",
        bgLight: "#D1FAE5",
        icon: "😨",
        img: "assets/illustrations/gato-miedo.png",
        shortMeaning: "Sentir susto o temblor ante un posible peligro para protegernos.",
        catFeedback: "¡Muy bien! El miedo es un escudo natural que nos cuida y nos dice: ¡atención!"
      },
      {
        id: "pair-asco",
        emotion: "Asco",
        color: "#7C3AED",
        bgLight: "#EDE9FE",
        icon: "🤢",
        img: "assets/illustrations/gato-asco.png",
        shortMeaning: "Sentir desagrado y rechazo ante algo sucio o con mal olor.",
        catFeedback: "¡Excelente! El asco nos protege de comer o tocar cosas que nos harían daño."
      },
      {
        id: "pair-sorpresa",
        emotion: "Sorpresa",
        color: "#0284C7",
        bgLight: "#E0F2FE",
        icon: "😲",
        img: "assets/illustrations/gato-sorpresa.png",
        shortMeaning: "Sentir asombro con ojos abiertos ante algo nuevo o inesperado.",
        catFeedback: "¡Genial! La sorpresa despierta nuestra curiosidad para aprender cosas nuevas."
      }
    ],

    reward: {
      badgeId: "badge-memoria-emociones",
      badgeName: "Maestro de las Emociones",
      badgeIcon: "🐱",
      stars: 3,
      description: "¡Has unido las 6 emociones con su significado correcto junto al Gato!"
    }
  },

  // =========================================================================
  // NIVEL 2: APRENDER A REGULAR NUESTRAS EMOCIONES (Personaje: Globito el Pez)
  // =========================================================================
  {
    id: "act-2",
    levelNumber: 2,
    worldId: "world-1",
    title: "La historia de Globito: Regular nuestras emociones",
    subtitle: "Aprende a calmarte con Globito el pez ante situaciones cotidianas",
    stage: "Primero de primaria • Autorregulación emocional",
    competence: "Manejo y regulación de emociones (rabia y miedo)",
    learningObjective: "Aprender a calmarse ante situaciones difíciles quedándose quieto y respirando profundamente tocando a Globito el pez.",
    
    character: {
      id: "globito",
      name: "Globito el Pez Globo",
      avatarSvg: "assets/illustrations/globito.png",
      audioFile: "assets/audio/globito-cuento.mp3",
      greeting: "¡Hola! Soy Globito el pez globo. Hoy te contaré mi historia para aprender a calmarnos y no tratar mal a nuestros amigos.",
      storyText: "Globito es un pez globo que vive en el mar; tiene muchos amigos y le gusta jugar mucho con ellos. Globito estaba preocupado; sus amigos ya no querían estar con él porque se enojaba mucho, los trataba mal y a veces hasta les pegaba. Pero Globito encontró una solución: ¡aprendió a calmarse! Un día se dio cuenta de que, si respiraba profundamente hasta inflarse varias veces, se calmaba y ya no trataba mal a sus amigos y les podía decir calmadamente lo que quería. Ahora, cuando Globito siente rabia o miedo:\n1. Se queda quieto.\n2. Respira profundamente y despacito hasta inflarse varias veces.",
      rules: [
        "1. Se queda quieto.",
        "2. Respira profundamente y despacito hasta inflarse varias veces."
      ]
    },

    // Espacio para el video del cuento de Globito
    video: {
      title: "Video: La historia de Globito el Pez Globo",
      placeholderUrl: "assets/videos/globito-cuento.mp4",
      description: "Descubre cómo Globito aprendió a quedarse quieto y calmarse respirando profundamente antes de lastimar a sus amigos."
    },

    gameType: "globito-regulation",
    
    // Las 2 situaciones cotidianas adaptadas para niños de primaria
    situations: [
      {
        id: "sit-1",
        title: "Compañero enojado",
        icon: "😡",
        badge: "Situación 1 de 2",
        question: "Si un compañero se enoja conmigo, ¿le respondes también enojado?",
        options: [
          {
            id: "opt-1a",
            icon: "🐡",
            title: "¡No! Me quedo quieto y respiro como Globito",
            subtitle: "Respiro profundo para no pelear y le hablo con calma.",
            feedback: "¡Excelente decisión! Responder con enojo hace que la pelea crezca. Quedarte quieto y respirar como Globito ayuda a que la rabia baje y puedan hablar con tranquilidad."
          },
          {
            id: "opt-1b",
            icon: "💬",
            title: "No, le pregunto con calma qué le pasa",
            subtitle: "Escucho por qué está molesto para buscar una solución juntos.",
            feedback: "¡Muy bien! Escuchar con calma evita discusiones y demuestra que te importan los sentimientos de los demás."
          },
          {
            id: "opt-1c",
            icon: "⚡",
            title: "A veces sí me enojo y le respondo bravo",
            subtitle: "Siento rabia y me dan ganas de gritarle también.",
            feedback: "Es muy normal sentir molestia al principio, pero devolver la rabia empeora las cosas. ¡Por eso vamos a respirar con Globito para aprender a calmarnos!"
          }
        ],
        calmingPrompt: "¡Ahora toca a Globito dos veces para respirar profundo y recuperar la calma!",
        calmingSolution: "Al quedarte quieto y respirar 2 veces como Globito, tu rabia baja. Ya en calma, puedes hablar con tranquilidad y solucionar cualquier desacuerdo."
      },
      {
        id: "sit-2",
        title: "Cuando se burlan de mí",
        icon: "🛡️",
        badge: "Situación 2 de 2",
        question: "¿Cuando alguien se burla de tu forma de hablar, tu ropa o tus costumbres, te sientes triste o con rabia?",
        options: [
          {
            id: "opt-2a",
            icon: "😢",
            title: "Me siento triste",
            subtitle: "Siento pena en mi corazón o ganas de llorar.",
            feedback: "Es totalmente válido y natural sentir tristeza. Nadie debe burlarse de ti. Tu forma de hablar, tu ropa y tus costumbres son únicas y valiosas. Recuerda que siempre puedes acudir a tu profesor o a tu familia."
          },
          {
            id: "opt-2b",
            icon: "😡",
            title: "Siento mucha rabia",
            subtitle: "Me da furia y me dan ganas de defendederme o gritar.",
            feedback: "Sentir rabia ante una burla es una respuesta común. Lo importante es no reaccionar con violencia: respiramos con Globito para serenarnos y buscamos el apoyo de un adulto de confianza."
          },
          {
            id: "opt-2c",
            icon: "😢😡",
            title: "Siento ambas: tristeza y rabia a la vez",
            subtitle: "Siento una mezcla de dolor y molestia juntos.",
            feedback: "¡Es muy normal sentir varias emociones al mismo tiempo! Reconocer lo que sientes te ayuda a calmarte. Respira con Globito para serenar tu cuerpo y proteger tu paz."
          },
          {
            id: "opt-2d",
            icon: "🤝",
            title: "Intento no hacerle caso y pedir ayuda a mi profe",
            subtitle: "Recuerdo que soy valioso y busco a alguien de confianza.",
            feedback: "¡Gran madurez! Recordar tu propio valor y acudir a una persona de confianza es la mejor manera de cuidarte y frenar las burlas."
          }
        ],
        calmingPrompt: "¡Toca a Globito dos veces para respirar profundo y cuidar tus emociones!",
        calmingSolution: "¡Excelente! Has aprendido a identificar lo que sientes, respirar como Globito y recordar que tu forma de hablar, vestir y vivir merece todo el respeto del mundo."
      }
    ],

    reward: {
      badgeId: "badge-calma-globito",
      badgeName: "Maestro de la Calma",
      badgeIcon: "🐡",
      stars: 3,
      description: "¡Aprendiste a quedarte quieto y respirar tocando a Globito para calmarte ante cualquier situación!"
    }
  },
  // =========================================================================
  // NIVEL 3: DESCUBRIENDO LAS EMOCIONES DE LOS DEMÁS (Un Niño y una Niña: Sofi y Nico)
  // =========================================================================
  {
    id: "act-3",
    levelNumber: 3,
    worldId: "world-1",
    title: "Descubriendo las emociones de los demás",
    subtitle: "¿Qué sienten? ¿Cómo nos afecta? ¿Debemos ayudar?",
    stage: "Primero de primaria • Empatía y Toma de Perspectiva",
    competence: "Toma de perspectiva, empatía y conducta prosocial",
    learningObjective: "Reconocer las emociones en otras personas, reflexionar sobre cómo nos afecta lo que sienten y decidir si debemos ayudar y cómo hacerlo con respeto.",
    
    character: {
      id: "nino-nina",
      name: "Sofi y Nico",
      avatarSvg: "assets/illustrations/nino-nina.svg",
      audioFile: "assets/audio/nino-nina-nivel3.mp3",
      greeting: "¡Hola! Somos Sofi y Nico. Hoy vamos a convertirnos en detectives de la empatía para ponernos en los zapatos de los demás.",
      explanation: "En cada situación observarás lo que le pasa a un compañero y responderás 3 preguntas clave: 1. ¿Qué emoción tiene? 2. ¿Cómo nos afecta a nosotros? 3. ¿Debemos ayudar y qué podemos hacer? ¡Gana estrellas y tu medalla de la empatía!",
      audioTranscript: "¡Hola, amigos! Somos Sofi y Nico. Hoy jugaremos a Descubrir las Emociones de los Demás. A veces nuestros compañeros sienten tristeza, miedo o enojo. Aprenderemos a notar cómo se sienten, a darnos cuenta de cómo nos afecta a nosotros y a decidir cómo podemos ayudar con respeto. ¡Acompáñanos en esta gran misión!"
    },

    gameType: "empathy-detective",
    totalMissions: 3,

    // Las 3 misiones gamificadas con las 3 preguntas clave cada una
    missions: [
      {
        id: "mision-1",
        number: 1,
        title: "Lucas y sus lápices caídos",
        icon: "✏️",
        characterIllustration: "assets/illustrations/nino-nina.svg",
        scenario: "Lucas estaba dibujando muy concentrado, pero al levantarse tropezó con su silla, se le cayeron todos los colores por el suelo y se sentó cabizbajo con lágrimas en los ojos.",
        questions: [
          {
            qIndex: 1,
            badge: "Paso 1: La emoción del otro",
            question: "¿Qué emoción crees que está sintiendo Lucas?",
            options: [
              { text: "Tristeza o desánimo por lo ocurrido", isCorrect: true, feedback: "¡Exacto! Su cabeza agachada y sus lágrimas indican que siente tristeza." },
              { text: "Mucha alegría y ganas de celebrar", isCorrect: false, feedback: "Fíjate bien: tiene la cabeza agachada y no está sonriendo." },
              { text: "Mucho asco por la comida", isCorrect: false, feedback: "No hay comida en esta situación, fue un tropiezo con sus lápices." }
            ]
          },
          {
            qIndex: 2,
            badge: "Paso 2: ¿Cómo nos afecta a nosotros?",
            question: "¿Cómo te hace sentir o cómo te afecta ver a Lucas triste?",
            options: [
              { text: "Siento empatía y compasión; me conmueve y me preocupa ver a mi compañero triste", isCorrect: true, feedback: "¡Excelente! La empatía nos permite sentir en el corazón lo que le pasa a los demás." },
              { text: "Me da muchísima risa y me burlo en voz alta", isCorrect: false, feedback: "Burlarse lastima a los demás y no demuestra empatía." },
              { text: "Me da igual y me voy a mirar otra cosa", isCorrect: false, feedback: "Cuando un amigo está triste, es valioso prestar atención a lo que sucede." }
            ]
          },
          {
            qIndex: 3,
            badge: "Paso 3: ¿Debemos ayudar y cómo?",
            question: "¿Debemos ayudar a Lucas y cuál es la mejor forma de hacerlo?",
            options: [
              { text: "Sí, me acerco amablemente y le digo: '¿Quieres que te ayude a recoger tus lápices?'", isCorrect: true, feedback: "¡Maravilloso! Aplicaste el Código de Ayuda: Mirar, Preguntar con respeto y Ayudar." },
              { text: "No, le quito los lápices para quedármelos yo", isCorrect: false, feedback: "Eso aumentaría su tristeza y no sería un trato justo ni solidario." },
              { text: "Grito muy fuerte en el salón para que todos lo miren", isCorrect: false, feedback: "Gritar puede avergonzar a Lucas en lugar de hacerlo sentir mejor." }
            ]
          }
        ]
      },
      {
        id: "mision-2",
        number: 2,
        title: "Valentina frente al salón",
        icon: "🎤",
        characterIllustration: "assets/illustrations/nino-nina.svg",
        scenario: "Valentina tiene que recitar un poema frente a toda la clase. Sus manos tiemblan, se abraza a sí misma con los ojos muy abiertos y respira agitada.",
        questions: [
          {
            qIndex: 1,
            badge: "Paso 1: La emoción del otro",
            question: "¿Qué emoción está sintiendo Valentina en este momento?",
            options: [
              { text: "Miedo o nerviosismo ante el público", isCorrect: true, feedback: "¡Muy bien! Sus manos temblorosas y su mirada alerta muestran miedo o nervios." },
              { text: "Mucho aburrimiento y sueño", isCorrect: false, feedback: "No tiene sueño, su cuerpo está en tensión y alerta." },
              { text: "Mucha rabia con su profesora", isCorrect: false, feedback: "No tiene ceño fruncido de rabia, está asustada por hablar." }
            ]
          },
          {
            qIndex: 2,
            badge: "Paso 2: ¿Cómo nos afecta a nosotros?",
            question: "¿Cómo nos afecta ver a nuestra compañera con miedo o nervios?",
            options: [
              { text: "Entendemos que hablar en público puede dar miedo y deseamos que se sienta segura y tranquila", isCorrect: true, feedback: "¡Así es! Ponerse en sus zapatos nos hace entender su temor." },
              { text: "Nos enojamos con ella porque no empieza rápido", isCorrect: false, feedback: "Enojarse no ayuda a calmar su nerviosismo." },
              { text: "Hacemos ruidos para asustarla más", isCorrect: false, feedback: "Hacer ruidos aumentaría su miedo en lugar de apoyarla." }
            ]
          },
          {
            qIndex: 3,
            badge: "Paso 3: ¿Debemos ayudar y cómo?",
            question: "¿Debemos ayudar a Valentina y qué podemos hacer?",
            options: [
              { text: "Sí, la miramos con una sonrisa cálida y le hacemos un gesto de ánimo: '¡Tú puedes, respira hondo!'", isCorrect: true, feedback: "¡Brillante! El apoyo respetuoso de los compañeros da calma y confianza." },
              { text: "Nos reímos si se equivoca en una palabra", isCorrect: false, feedback: "Las burlas hacen que tenga más miedo la próxima vez." },
              { text: "Nos ponemos a hablar entre nosotros ignorándola", isCorrect: false, feedback: "Escuchar con respeto es una forma muy hermosa de cuidar a los demás." }
            ]
          }
        ]
      },
      {
        id: "mision-3",
        number: 3,
        title: "Mateo y el rompecabezas difícil",
        icon: "🧩",
        characterIllustration: "assets/illustrations/nino-nina.svg",
        scenario: "Mateo está tratando de armar un rompecabezas. Una pieza no encaja, frunce el ceño, su cara se pone roja de calor y golpea la mesa con el puño.",
        questions: [
          {
            qIndex: 1,
            badge: "Paso 1: La emoción del otro",
            question: "¿Qué emoción está sintiendo Mateo?",
            options: [
              { text: "Enojo o frustración porque la pieza no encaja", isCorrect: true, feedback: "¡Exacto! El ceño apretado, el calor y el golpe en la mesa son signos de rabia." },
              { text: "Una sorpresa agradable y divertida", isCorrect: false, feedback: "No está sorprendido gratamente, está molesto con el reto." },
              { text: "Mucha tranquilidad y serenidad", isCorrect: false, feedback: "Golpear la mesa no es señal de tranquilidad." }
            ]
          },
          {
            qIndex: 2,
            badge: "Paso 2: ¿Cómo nos afecta a nosotros?",
            question: "¿Cómo nos afecta ver a Mateo con tanta rabia?",
            options: [
              { text: "Comprendemos que está frustrado, y entendemos que su molestia es con el juego y no contra nosotros", isCorrect: true, feedback: "¡Gran madurez! Saber que su molestia no es contra nosotros evita que nos pongamos a pelear." },
              { text: "Nos ponemos bravos y le gritamos de vuelta", isCorrect: false, feedback: "Gritarle aumentaría el conflicto en lugar de resolverlo." },
              { text: "Nos asustamos y pensamos que no le agradamos", isCorrect: false, feedback: "A veces la gente se enoja por situaciones y no por las personas a su alrededor." }
            ]
          },
          {
            qIndex: 3,
            badge: "Paso 3: ¿Debemos ayudar y cuál es la mejor forma?",
            question: "¿Debemos ayudar a Mateo y cómo podemos ofrecer nuestra ayuda?",
            options: [
              { text: "Esperamos un segundo a que respire y le preguntamos con calma: '¿Quieres que busquemos la pieza juntos?'", isCorrect: true, feedback: "¡Perfecto! Dar un momento de calma y ofrecer ayuda en equipo es la mejor solución." },
              { text: "Le desbaratamos todo el rompecabezas para molestarlo", isCorrect: false, feedback: "Eso causaría una pelea mayor y lastimaría su confianza." },
              { text: "Le quitamos las piezas a la fuerza", isCorrect: false, feedback: "Quitar cosas a la fuerza no es respetuoso." }
            ]
          }
        ]
      }
    ],

    reward: {
      badgeId: "badge-detective-empatia",
      badgeName: "Detective de la Empatía",
      badgeIcon: "🤝",
      stars: 3,
      description: "¡Descubriste lo que sienten los demás, comprendiste cómo nos afecta y aprendiste a ayudar respetuosamente!"
    }
  },
  // =========================================================================
  // NIVEL 4: AMIGO QUE AYUDA (Personajes: Héroe y Heroína)
  // =========================================================================
  {
    id: "act-4",
    levelNumber: 4,
    worldId: "world-1",
    title: "Amigo que ayuda",
    subtitle: "Superhéroes de la ayuda: observa a tu compañero y acompáñalo con cariño",
    stage: "Primero de primaria • Conducta Prosocial y Solidaridad",
    competence: "Empatía en acción, prosocialidad y ayuda mutua",
    learningObjective: "Identificar cuándo un compañero necesita ayuda o compañía, elegir la acción de apoyo constructiva y reflexionar sobre la frecuencia con la que brindamos ayuda.",
    
    character: {
      id: "heroe-heroina",
      name: "Héroe y Heroína",
      avatarSvg: "assets/illustrations/heroe-heroina-duo.png",
      heroinaSvg: "assets/illustrations/heroina-avatar.png",
      heroeSvg: "assets/illustrations/heroe-avatar.png",
      badgeIcon: "assets/illustrations/hero-badge.png",
      audioFile: "assets/audio/heroe-heroina-nivel4.mp3",
      greeting: "¡Hola! Somos los Superhéroes de la Ayuda. ¡Nuestro mayor superpoder es el corazón para ayudar a los demás!",
      explanation: "Mira a tus compañeros: cuando alguien esté triste, solo o en apuros, acércate como un superhéroe y arrastra o elige la mejor forma de ayudar. Luego reflexiona con la escala de corazones. ¡Vamos!",
      audioTranscript: "¡Hola, superamigo! Somos Héroe y Heroína. Todos tenemos un gran superpoder: ayudar a quien lo necesita. En este reto, descubrirás cómo acercarte a tus compañeros cuando están tristes o solos, elegirás cómo brindarles tu apoyo para que se pongan felices y pensarás con cuánta frecuencia practicas la ayuda en tu vida. ¡A volar juntos!"
    },

    gameType: "hero-helping",
    totalSituations: 3,

    situations: [
      {
        id: "hero-sit-1",
        number: 1,
        title: "Compañero solo en el recreo",
        bannerText: "Ayuda a tu compañero 🧑‍🦱",
        peerName: "Lucas",
        peerDesc: "Lucas está sentado solito en un rincón del patio, mirando el piso con carita triste porque nadie lo ha invitado a jugar.",
        initialEmotionIcon: "😔",
        happyEmotionIcon: "😄",
        dragPrompt: "Arrastra al héroe hacia tu compañero o tócalo",
        choosePrompt: "Arrastra o selecciona la forma de ayudar",
        options: [
          {
            id: "opt-1",
            text: "Invitarlo a jugar",
            icon: "🤝",
            isCorrect: true,
            feedback: "¡Gran acto de superhéroe! Invitarlo a compartir un juego le devolvió la sonrisa."
          },
          {
            id: "opt-2",
            text: "Seguir de largo",
            icon: "🚶",
            isCorrect: false,
            feedback: "Si seguimos de largo, Lucas se queda solo y triste. Un superamigo se detiene a acompañar."
          },
          {
            id: "opt-3",
            text: "Jugar solo",
            icon: "🎈",
            isCorrect: false,
            feedback: "Jugar solo está bien a veces, pero invitar a un amigo que está triste alegra el recreo de todos."
          }
        ],
        resolvedBanner: "¡Se puso feliz! 🎉",
        reflectionQuestion: "¿Tú lo haces?",
        reflectionPrompt: "¿Invitas a jugar a quien ves solito en el recreo?",
        scale: [
          { value: 1, label: "1 Nunca", hearts: "🤍", count: 1 },
          { value: 2, label: "2 A veces", hearts: "💖💖", count: 2 },
          { value: 3, label: "3 Siempre", hearts: "💖💖💖", count: 3 }
        ]
      },
      {
        id: "hero-sit-2",
        number: 2,
        title: "Compañera con tarea difícil",
        bannerText: "Ayuda a tu compañera 👧",
        peerName: "Camila",
        peerDesc: "Camila no entiende la actividad de clase, tiene los lápices desordenados y su carita se ve muy preocupada y confundida.",
        initialEmotionIcon: "😟",
        happyEmotionIcon: "😄",
        dragPrompt: "Arrastra a la heroína hacia tu compañera o tócala",
        choosePrompt: "Arrastra o selecciona la forma de ayudar",
        options: [
          {
            id: "opt-1",
            text: "Explicarle con paciencia y compartir",
            icon: "✏️",
            isCorrect: true,
            feedback: "¡Poderoso! Explicarle con calma y prestarle tus materiales le dio tranquilidad y confianza."
          },
          {
            id: "opt-2",
            text: "Apurarse a terminar para ganarle",
            icon: "🏃",
            isCorrect: false,
            feedback: "La escuela no es una carrera de velocidad. Ayudar a quien tiene dudas es un verdadero triunfo de equipo."
          },
          {
            id: "opt-3",
            text: "Decirle que no es tu problema",
            icon: "🙈",
            isCorrect: false,
            feedback: "Todos necesitamos una mano amiga cuando algo nos resulta difícil. Practiquemos la solidaridad."
          }
        ],
        resolvedBanner: "¡Se puso feliz! 🎉",
        reflectionQuestion: "¿Tú lo haces?",
        reflectionPrompt: "¿Ayudas a tus compañeros cuando no entienden una actividad?",
        scale: [
          { value: 1, label: "1 Nunca", hearts: "🤍", count: 1 },
          { value: 2, label: "2 A veces", hearts: "💖💖", count: 2 },
          { value: 3, label: "3 Siempre", hearts: "💖💖💖", count: 3 }
        ]
      },
      {
        id: "hero-sit-3",
        number: 3,
        title: "Tropiezo con los útiles escolares",
        bannerText: "Ayuda a tu compañero 🎒",
        peerName: "Mateo",
        peerDesc: "Mateo tropezó en el corredor y sus cuadernos se esparcieron por todo el suelo. Está apenado y necesita auxilio.",
        initialEmotionIcon: "😣",
        happyEmotionIcon: "😄",
        dragPrompt: "Arrastra al héroe hacia tu compañero o tócalo",
        choosePrompt: "Arrastra o selecciona la forma de ayudar",
        options: [
          {
            id: "opt-1",
            text: "Ayudarle a levantarse y recoger",
            icon: "🤝",
            isCorrect: true,
            feedback: "¡Misión de superhéroe cumplida! Brindarle la mano y recoger los cuadernos lo hizo sentir seguro."
          },
          {
            id: "opt-2",
            text: "Reírse de su tropiezo",
            icon: "😂",
            isCorrect: false,
            feedback: "Burlarse de una caída lastima los sentimientos. Lo más valioso es tender una mano solidaria."
          },
          {
            id: "opt-3",
            text: "Pasar corriendo por encima",
            icon: "💨",
            isCorrect: false,
            feedback: "Pasar corriendo puede hacer que alguien más tropiece y no demuestra empatía."
          }
        ],
        resolvedBanner: "¡Se puso feliz! 🎉",
        reflectionQuestion: "¿Tú lo haces?",
        reflectionPrompt: "¿Ayudas a quien se cae o necesita auxilio en el colegio o en casa?",
        scale: [
          { value: 1, label: "1 Nunca", hearts: "🤍", count: 1 },
          { value: 2, label: "2 A veces", hearts: "💖💖", count: 2 },
          { value: 3, label: "3 Siempre", hearts: "💖💖💖", count: 3 }
        ]
      }
    ],

    reward: {
      badgeId: "badge-amigo-ayuda",
      badgeName: "Superamigo que Ayuda",
      badgeIcon: "🦸",
      stars: 3,
      description: "¡Demostraste tu superpoder de la ayuda, acercándote con respeto, devolviendo sonrisas y practicando la solidaridad!"
    }
  },
  // =========================================================================
  // NIVEL 5: EL BOSQUE DE LAS FAMILIAS (Personaje: Timo)
  // =========================================================================
  {
    id: "act-5",
    levelNumber: 5,
    worldId: "world-1",
    title: "El bosque de las familias",
    subtitle: "Comprender cómo las experiencias familiares influyen en nuestras emociones",
    stage: "Primero a Cuarto de primaria • Expresión emocional y Vínculos familiares",
    competence: "Conciencia socioemocional, comunicación asertiva y red de apoyo familiar",
    learningObjective: "Comprender que las familias enseñan diferentes maneras de expresar las emociones y reconocer que siempre es válido buscar y hablar con una persona de confianza.",
    
    character: {
      id: "timo",
      name: "Timo",
      avatarSvg: "assets/illustrations/timo.png",
      audioFile: "assets/audio/timo-nivel5.mp3",
      greeting: "¡Hola, explorador! Soy Timo, tu compañero alegre y curioso en el Bosque de las Familias. ¡Vamos a descubrir qué sentimos!",
      phrases: [
        "“¡Vamos a descubrir qué sentimos!”",
        "“Todas las emociones merecen ser escuchadas”.",
        "“Hay muchas maneras de expresar lo que sentimos”.",
        "“¡Equivocarse también es una oportunidad para aprender!”"
      ],
      explanation: "En este bosque mágico ayudaremos a sus habitantes a comprender cómo la familia influye en lo que sentimos. Superaremos 3 actividades: elegir cómo actuar ante una situación, ordenar las viñetas de una historia y completar diálogos de confianza. ¡Elige tu avatar y acompáñame!",
      audioTranscript: "¡Hola, explorador! Soy Timo, tu amigo en el Bosque de las Familias. ¡Vamos a descubrir qué sentimos! Cada familia es única y nos enseña formas diferentes de expresar lo que sentimos. Recuerda siempre: todas las emociones merecen ser escuchadas, hay muchas maneras de expresar lo que sentimos y ¡equivocarse también es una gran oportunidad para aprender! Elige tu avatar y adentrémonos juntos en el bosque."
    },

    avatars: [
      { id: "explorador", name: "Explorador", svg: "assets/illustrations/avatar-explorador.png", icon: "🧭" },
      { id: "exploradora", name: "Exploradora", svg: "assets/illustrations/avatar-exploradora.png", icon: "🎒" },
      { id: "fantastico", name: "Animal Fantástico", svg: "assets/illustrations/avatar-fantastico.png", icon: "🦊" }
    ],

    gameType: "family-forest",
    totalActivities: 3,

    activitiesList: [
      // Actividad 1: Elegir cómo actuar ante una situación
      {
        id: "fam-act-1",
        number: 1,
        type: "situation-choice",
        badge: "Actividad 1 · Elegir cómo actuar",
        title: "El día difícil de Mateo",
        icon: "🏠",
        protagonist: "Mateo",
        situationText: "A Mateo le enseñaron que puede hablar con su familia cuando está triste. Hoy en el colegio se le dañó un dibujo en el que trabajó toda la semana, y al llegar a casa se siente con el corazón bajito y desanimado.",
        question: "¿Qué podría hacer Mateo si tiene un mal día?",
        options: [
          {
            id: "opt-trust",
            text: "Hablar con alguien de confianza (mamá, papá, abuelos o un adulto cercano) para contarle cómo se siente y recibir un abrazo.",
            icon: "🗣️",
            isCorrect: true,
            feedback: "¡Excelente decisión! Hablar con alguien de confianza alivia el corazón y nos recuerda que en familia podemos apoyarnos con cariño."
          },
          {
            id: "opt-hide",
            text: "Guardar siempre sus sentimientos y quedarse callado en su cuarto, pensando que a nadie le importa.",
            icon: "🤐",
            isCorrect: false,
            feedback: "Pista de Timo: Guardar todo adentro hace que la tristeza se sienta más pesada. Recuerda: ¡todas las emociones merecen ser escuchadas!"
          },
          {
            id: "opt-fake",
            text: "Fingir que todo está bien y sonreír a la fuerza, ocultando lo que de verdad siente.",
            icon: "🎭",
            isCorrect: false,
            feedback: "Pista de Timo: No tenemos que esconder lo que sentimos ni sonreír a la fuerza. Es completamente natural sentirse triste a veces."
          }
        ],
        learningNote: "Aprendizaje: Las familias pueden enseñar diferentes maneras de expresar las emociones, y siempre es válido buscar a una persona de confianza."
      },

      // Actividad 2: Ordenar viñetas de una historia
      {
        id: "fam-act-2",
        number: 2,
        type: "vignette-order",
        badge: "Actividad 2 · Ordenar viñetas",
        title: "La historia de Nía la ardilla: Momentos en familia",
        icon: "🐿️",
        situationText: "En la familia de la ardillita Nía aprendieron que cuando alguien llega muy molesto o frustrado, hay un camino para escucharse y calmarse. Ordena las 3 viñetas para que la historia tenga el orden correcto (Inicio, Desarrollo y Desenlace):",
        cards: [
          {
            id: "card-b",
            stepNumber: 2,
            icon: "🥛",
            label: "Paso 2 (Desarrollo)",
            text: "Su abuela la recibe con amor, le ofrece un vaso de agua y Nía le explica calmadamente qué fue lo que pasó."
          },
          {
            id: "card-c",
            stepNumber: 3,
            icon: "🫂",
            label: "Paso 3 (Desenlace)",
            text: "Juntas buscan una solución con paciencia, se dan un abrazo y la familia disfruta una merienda en paz."
          },
          {
            id: "card-a",
            stepNumber: 1,
            icon: "🎒",
            label: "Paso 1 (Inicio)",
            text: "Nía llega del bosque con el ceño fruncido y tirando su morral porque se le cayó su bellota favorita."
          }
        ],
        successFeedback: "¡Maravilloso orden! En muchas familias se aprende a hacer una pausa, escuchar con ternura y encontrar soluciones juntos.",
        learningNote: "Aprendizaje: En familia aprendemos a gestionar la rabia o la frustración cuando nos damos tiempo para escuchar y acompañar."
      },

      // Actividad 3: Completar diálogos entre personajes
      {
        id: "fam-act-3",
        number: 3,
        type: "dialogue-completion",
        badge: "Actividad 3 · Completar diálogos",
        title: "Beni el osito y el búho sabio",
        icon: "🦉",
        situationText: "Beni rompió accidentalmente una vasija de miel familiar. Su corazón late fuerte por miedo a que se enojen. Su tío, el búho sabio, se acerca con una mirada tranquila y le dice: «Beni, veo que estás asustado y con las orejitas bajas. ¿Qué te gustaría decirme?»",
        question: "Elige la respuesta de Beni para completar un diálogo de confianza y honestidad:",
        dialogueOptions: [
          {
            id: "dia-honest",
            bubbleText: "«Tío, tengo miedo porque rompí la vasija sin querer, pero quiero decirte la verdad y ayudarte a limpiarla.»",
            icon: "💬",
            isCorrect: true,
            feedback: "¡Magnífica respuesta! Beni habló con sinceridad. El búho sabio sonríe y responde: «Gracias por tu honestidad, Beni. Los accidentes pasan; lo limpiaremos juntos y aprenderemos de ello»."
          },
          {
            id: "dia-blame",
            bubbleText: "«¡Yo no fui! Seguro fue el viento travieso que entró por la ventana.»",
            icon: "💨",
            isCorrect: false,
            feedback: "Pista de Timo: Culpar al viento no calma el miedo. Hablar con sinceridad nos hace sentir tranquilos y confiados."
          },
          {
            id: "dia-hide",
            bubbleText: "«¡No te diré nada y me esconderé debajo de las hojas para siempre!»",
            icon: "🙈",
            isCorrect: false,
            feedback: "Pista de Timo: Esconderse nos deja solos con el miedo. Recuerda: ¡equivocarse también es una oportunidad para aprender!"
          }
        ],
        learningNote: "Aprendizaje: Expresar la verdad con honestidad abre las puertas para que nuestra familia nos comprenda y nos ayude a reparar lo sucedido."
      }
    ],

    reward: {
      badgeId: "badge-guardian-familias",
      badgeName: "Guardián de las Familias",
      badgeIcon: "🌳",
      stars: 3,
      description: "¡Comprendiste cómo las experiencias familiares influyen en las emociones y aprendiste que siempre es válido buscar a una persona de confianza!"
    }
  },
  // =========================================================================
  // NIVEL 6: EMOCIONES Y SENTIMIENTOS (Personaje: Kori el Cuy)
  // =========================================================================
  {
    id: "act-6",
    levelNumber: 6,
    worldId: "world-1",
    title: "Emociones y sentimientos",
    subtitle: "Descubre la diferencia y clasifícalos en las canastas mágicas de Kori el Cuy",
    stage: "Primero de primaria • Conciencia y Discriminación Emocional",
    competence: "Identificación y diferenciación entre emociones básicas y sentimientos complejos",
    learningObjective: "Diferenciar entre emociones (reacciones corporales automáticas, rápidas e intensas) y sentimientos (estados afectivos duraderos que se construyen con el pensamiento en el corazón) mediante la clasificación en canastas interactivas.",
    
    character: {
      id: "cuy",
      name: "Kori el Cuy",
      avatarSvg: "assets/illustrations/cuy.png",
      audioFile: "assets/audio/cuy-nivel6.mp3",
      greeting: "¡Cui, cui, hola! Soy Kori el Cuy. ¿Ves la flor en mi cabeza y mi nariz de corazón? ¡Hoy aprenderemos a diferenciar las emociones de los sentimientos!",
      explanation: "Las emociones son como chispas rápidas de nuestro cuerpo: aparecen de repente cuando pasa algo. En cambio, los sentimientos duran más tiempo y se quedan a vivir en nuestro corazón. Puedes ver el video educativo y luego ayudarme a clasificar cada tarjeta en su canasta correspondiente. ¡Vamos a llenar las canastas!",
      audioTranscript: "¡Cui, cui, hola amigos! Soy Kori el Cuy de los sentimientos. ¿Sabías que las emociones y los sentimientos son distintos? Una emoción es rápida e intensa, como el susto al escuchar un trueno o la risa por una sorpresa. Un sentimiento es duradero y profundo, como el amor por tu familia o la gratitud con un amigo. Acompáñame a ver nuestro video y a clasificar cada uno en su canasta correspondiente. ¡Cui, cui, vamos juntos!"
    },

    video: {
      title: "Video: ¿En qué se diferencian las emociones y los sentimientos?",
      placeholderUrl: "assets/videos/emociones-sentimientos.mp4",
      description: "Espacio preparado para tu video educativo. Puedes colocar tu archivo de video o enlace cuando lo tengas listo.",
      durationText: "3 min • Aprender juntos"
    },

    gameType: "baskets-classification",

    baskets: {
      emotionBasket: {
        id: "basket-emotions",
        name: "Canasta de Emociones",
        icon: "🧺",
        tag: "Rápidas y breves ⚡",
        color: "#DC2626",
        bgColor: "#FEF2F2",
        description: "Reacciones inmediatas de nuestro cuerpo ante lo que ocurre en el momento."
      },
      feelingBasket: {
        id: "basket-feelings",
        name: "Canasta de Sentimientos",
        icon: "🧺",
        tag: "Duraderos del corazón ❤️",
        color: "#7C3AED",
        bgColor: "#F5F3FF",
        description: "Estados afectivos que duran más tiempo y se construyen con nuestros pensamientos y vivencias."
      }
    },

    itemsToClassify: [
      // 1. Emoción: Sorpresa repentina
      {
        id: "item-1",
        name: "Sorpresa repentina",
        icon: "😲",
        category: "emotion",
        shortDesc: "Reacción breve cuando ocurre algo inesperado",
        feedback: "¡Correcto! La sorpresa es una emoción rápida: aparece en un segundo y luego se transforma."
      },
      // 2. Sentimiento: Amor por la familia
      {
        id: "item-2",
        name: "Amor por la familia",
        icon: "❤️",
        category: "feeling",
        shortDesc: "Cariño profundo y duradero hacia quienes nos cuidan",
        feedback: "¡Muy bien! El amor es un sentimiento: no dura solo un segundo, permanece en nuestro corazón con el tiempo."
      },
      // 3. Emoción: Miedo ante un susto
      {
        id: "item-3",
        name: "Miedo ante un susto",
        icon: "😱",
        category: "emotion",
        shortDesc: "Alarma rápida del cuerpo para ponernos a salvo",
        feedback: "¡Exacto! El miedo inicial es una emoción automática que alerta a nuestro cuerpo para protegernos."
      },
      // 4. Sentimiento: Gratitud sincera
      {
        id: "item-4",
        name: "Gratitud sincera",
        icon: "🙏",
        category: "feeling",
        shortDesc: "Sentimiento duradero de agradecimiento con alguien",
        feedback: "¡Excelente! La gratitud es un sentimiento que cultivamos al valorar el apoyo de los demás."
      },
      // 5. Emoción: Rabia o enfado momentáneo
      {
        id: "item-5",
        name: "Rabia momentánea",
        icon: "😡",
        category: "emotion",
        shortDesc: "Chispa de enojo rápido cuando se nos cae algo",
        feedback: "¡Bien hecho! La rabia inicial es una emoción rápida que sentimos en el cuerpo y que podemos calmar respirando como Globito."
      },
      // 6. Sentimiento: Amistad y compañerismo
      {
        id: "item-6",
        name: "Amistad verdadera",
        icon: "🤝",
        category: "feeling",
        shortDesc: "Lazo de afecto y confianza construido día a día",
        feedback: "¡Brillante! La amistad es un sentimiento estable que construimos compartiendo momentos con amigos."
      },
      // 7. Emoción: Asco o desagrado
      {
        id: "item-7",
        name: "Asco inmediato",
        icon: "🤢",
        category: "emotion",
        shortDesc: "Rechazo rápido del cuerpo a algo que huele mal",
        feedback: "¡Muy bien! El asco es una emoción primaria que nos protege de comer o tocar cosas dañinas."
      },
      // 8. Sentimiento: Serenidad y paz
      {
        id: "item-8",
        name: "Serenidad y paz",
        icon: "🕊️",
        category: "feeling",
        shortDesc: "Tranquilidad profunda que permanece en nosotros",
        feedback: "¡Maravilloso! La serenidad es un sentimiento de calma que podemos cultivar en nuestro interior."
      }
    ],

    reward: {
      badgeId: "badge-gran-maestro-emocional",
      badgeName: "Gran Maestro Emocional",
      badgeIcon: "🏆",
      stars: 3,
      description: "¡Completaste los 6 niveles de la aventura! Ahora sabes reconocer, regular, empatizar, ayudar, convivir y diferenciar emociones de sentimientos."
    }
  }
];
