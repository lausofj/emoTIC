/**
 * emoTIC - Actividades Pedagógicas de Grado Tercero (3º)
 * Nota Pedagógica: Estas actividades fueron diseñadas y adaptadas para la plataforma emoTIC
 * basadas estrictamente en la matriz oficial de objetivos de la Guía del Docente Emociones para la Vida (pág. 10).
 */

window.EMOTIC_ACTIVITIES_G3 = [
  // MUNDO 1: MI MUNDO EMOCIONAL (Grado 3)
  {
    id: "g3-w1-s1",
    grade: 3,
    worldId: "world-1",
    sessionNumber: 1,
    title: "La mezcla de sentimientos: Dos emociones al mismo tiempo",
    competence: "Identificación de emociones",
    learningObjective: "Distinguir dos emociones que experimento simultáneamente ante una misma situación.",
    characterName: "Lumi y el Prisma Emocional",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "dual-emotion-mixer",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola, exploradores de Tercer Grado! Soy Lumi. A medida que crecemos, nuestro corazón se vuelve más complejo. ¿Sabías que es completamente normal sentir alegría y miedo a la misma vez? ¡Descubramos las emociones combinadas!",
        audioText: "Bienvenido a Tercer Grado. Hoy aprenderemos a distinguir dos emociones que podemos sentir a la vez."
      },
      explanation: {
        title: "Emociones simultáneas",
        text: "Cuando te vas de campamento escolar por primera vez, puedes sentir gran ALEGRÍA por irte de aventura y a la vez MIEDO por estar lejos de casa. O cuando tu mejor amigo gana el concurso que tú también querías ganar, sientes FELICIDAD por él y TRISTEZA por no haber ganado tú. Reconocer ambas emociones nos ayuda a entendernos sin sentir culpa.",
        examples: ["Alegría + Miedo", "Orgullo + Nostalgia", "Entusiasmo + Nerviosismo"]
      },
      demonstration: {
        title: "El caso de Valentina",
        text: "Valentina se muda a una casa con jardín propio. Siente ALEGRÍA por tener más espacio para jugar con su perro, pero TRISTEZA por despedirse de los vecinos de su cuadra. ¡Las dos emociones son válidas!",
        hint: "El corazón humano puede albergar varios sentimientos a la vez."
      },
      guidedPractice: {
        prompt: "David va a pasar a la montaña rusa más alta del parque de diversiones. ¿Cuáles dos emociones es más probable que sienta a la vez?",
        options: [
          "Entusiasmo/Alegría por la diversión y Miedo/Nervios por la gran altura",
          "Aburrimiento absoluto y sueño",
          "Rabia con todos sus amigos"
        ],
        correctIndex: 0,
        hint: "La adrenalina combina la emoción divertida con la incertidumbre."
      },
      autonomousGame: {
        type: "dual-emotion-matcher",
        instruction: "Empareja cada situación con el par de emociones simultáneas que despierta:",
        scenarios: [
          {
            situation: "Graduarte de primaria y despedirte de tu maestra favorita para pasar a bachillerato.",
            pair: "Orgullo por el logro + Tristeza por la despedida",
            options: [
              "Orgullo por el logro + Tristeza por la despedida",
              "Rabia destructiva + Hambre",
              "Vergüenza + Asco"
            ]
          },
          {
            situation: "Aprender a montar en bicicleta sin rueditas por primera vez.",
            pair: "Emoción por la libertad + Miedo a caerse",
            options: [
              "Emoción por la libertad + Miedo a caerse",
              "Sueño pesado + Indiferencia",
              "Rabia con la bicicleta"
            ]
          }
        ]
      },
      feedback: {
        success: "¡Excelente capacidad de introspección! Comprender que podemos sentir dos cosas a la vez nos hace personas maduras y conscientes.",
        support: "Muy bien reflexionado. No te sientas culpable si sientes emociones opuestas; acógelas con serenidad."
      },
      closing: {
        question: "¿Alguna vez has sentido dos emociones al mismo tiempo? ¿Cuáles eran?",
        reflection: "Nombrar la mezcla emocional aclara la mente y nos devuelve la serenidad."
      },
      reward: {
        badgeId: "badge-g3-prisma",
        badgeName: "Prisma de Emociones Combinadas",
        badgeIcon: "💎",
        stars: 3,
        description: "¡Sabes distinguir dos emociones que sientes al mismo tiempo!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 3° 'Distinguir dos emociones que siento a la vez'. Hito clave del desarrollo socioemocional entre los 8 y 9 años."
  },

  {
    id: "g3-w1-s2",
    grade: 3,
    worldId: "world-1",
    sessionNumber: 2,
    title: "El regulador de volumen: Siento mis emociones en la intensidad adecuada",
    competence: "Manejo de emociones",
    learningObjective: "Aprender a regular la intensidad de mis emociones para que no se desborden ni me dañen a mí o a otros.",
    characterName: "Lumi y el Termómetro Emocional",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "intensity-slider",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! Las emociones son como la música: si el volumen está en 2, casi no se oye; si está en 5, suena perfecta; pero si se sube a 10, ¡hace doler los oídos y rompe las ventanas! Hoy aprenderemos a regular el volumen de nuestras emociones.",
        audioText: "Hoy aprenderemos a sentir nuestras emociones en la intensidad adecuada mediante el regulador interior."
      },
      explanation: {
        title: "La escala de intensidad emocional (1 al 10)",
        text: "Una molestia leve (nivel 2) por perder un lápiz no requiere una explosión volcánica (nivel 10) de gritos y patadas. Cuando regulamos la intensidad, podemos responder de manera proporcional a lo que ocurre sin exagerar ni reprimir lo que sentimos.",
        scale: [
          { level: "1-3: Leve", desc: "Molestia, agrado o pequeña sorpresa manejable." },
          { level: "4-6: Moderada", desc: "Sentimiento claro que podemos expresar con palabras firmes." },
          { level: "7-10: Intensa", desc: "Alerta de desborde: ¡hora de pausar, respirar y buscar apoyo!" }
        ]
      },
      demonstration: {
        title: "Ajustando el termómetro",
        text: "Si se cae tu torre de bloques: Nivel 10 desbordado: patear la pared y herirte el pie. Nivel 5 regulado: decir '¡Uf, qué frustrante!', respirar hondo y volver a empezar con una base más sólida.",
        hint: "Regular la intensidad te mantiene en control de tus decisiones."
      },
      guidedPractice: {
        prompt: "Estás jugando un partido amistoso en el patio y tu equipo recibe un gol. ¿Cuál es la intensidad de rabia o frustración más adecuada?",
        options: [
          "Nivel 4 (frustración moderada que te motiva a animar a tu equipo para seguir jugando)",
          "Nivel 10 (tirarse al suelo a llorar e insultar al árbitro y abandonar el colegio)",
          "Nivel 0 (fingir que no te importa nada en la vida)"
        ],
        correctIndex: 0,
        hint: "Una intensidad moderada nos ayuda a canalizar energía positiva."
      },
      autonomousGame: {
        type: "emotion-volume-slider",
        instruction: "Gradúa el nivel de intensidad emocional constructivo para cada evento escolar:",
        events: [
          {
            event: "Se manchó la última hoja de tu cuaderno de tareas con una gotita de agua.",
            idealRange: "2 - 4 (Leve/Moderada)",
            bestAction: "Dejar secar la hoja y continuar con prolijidad sin desesperarse.",
            options: ["Dejar secar la hoja y continuar con prolijidad sin desesperarse.", "Romper el cuaderno entero", "Gritarle a los compañeros"]
          },
          {
            event: "Sacaste la máxima nota en una prueba que estudiaste toda la semana.",
            idealRange: "7 - 8 (Alegría alta y celebratoria sin humillar a otros)",
            bestAction: "Celebrar con tus amigos y agradecer el esfuerzo propio.",
            options: ["Celebrar con tus amigos y agradecer el esfuerzo propio.", "Burlarte de quienes sacaron menos", "No sonreír"]
          }
        ]
      },
      feedback: {
        success: "¡Eres un maestro de la autorregulación! Mantener tus emociones en la intensidad justa te permite disfrutar y resolver con sabiduría.",
        support: "Excelente ajuste. Recuerda que respirar y reflexionar son tus mejores perillas de control."
      },
      closing: {
        question: "¿En qué situaciones sientes que tu emoción sube a nivel 9 o 10 rápidamente? ¿Cómo puedes bajarla a 5?",
        reflection: "El poder de regular tu intensidad emocional es tu mayor armadura para la vida."
      },
      reward: {
        badgeId: "badge-g3-regulador",
        badgeName: "Control Maestro de Intensidad",
        badgeIcon: "🎚️",
        stars: 3,
        description: "¡Sabes sentir tus emociones en la intensidad adecuada!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 3° 'Sentir mis emociones en la intensidad adecuada'. Trabaja el concepto de modulación afectiva sin represión."
  },

  {
    id: "g3-w1-s3",
    grade: 3,
    worldId: "world-1",
    sessionNumber: 3,
    title: "El mapa del estrés: Me doy cuenta cuando estoy estresado",
    competence: "Manejo del estrés",
    learningObjective: "Identificar los signos tempranos de estrés en mi mente y cuerpo antes de llegar al agotamiento.",
    characterName: "Lumi y el Escáner de Estrés",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "stress-scanner",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! A veces nos llenamos de deberes, ruidos y prisas, y sin darnos cuenta nuestro cuerpo se pone duro como una roca. Hoy aprenderemos a escanear los signos del estrés para actuar a tiempo.",
        audioText: "Hoy aprenderemos a darnos cuenta cuando estamos estresados reconociendo las alertas del cuerpo."
      },
      explanation: {
        title: "Las señales del estrés",
        text: "El estrés es la respuesta de nuestro organismo cuando siente que las exigencias superan nuestras fuerzas. Signos físicos: tensión en el cuello, dolor de cabeza o estómago, morderse los labios. Signos mentales: irritabilidad fácil, olvidos frecuentes, sensación de prisa constante.",
        signalsList: ["Dolor de cuello o mandíbula apretada", "Irritabilidad con los hermanos", "Dificultad para concentrarse"]
      },
      demonstration: {
        title: "El escáner de Lucas",
        text: "Lucas tiene que entregar tres trabajos escolares, practicar flauta y ordenar su cuarto todo en una tarde. Se da cuenta de que le duele la cabeza y le contesta mal a su mamá. Al escanearse dice: '¡Estoy estresado! Necesito hacer una pausa de 10 minutos y priorizar'.",
        hint: "Detectar el estrés temprano evita que explotes."
      },
      guidedPractice: {
        prompt: "Llevas dos horas frente a un libro sin entender y sientes la espalda rígida y mal humor. ¿Qué te está avisando tu cuerpo?",
        options: [
          "Que estoy estresado y necesito estirarme, tomar agua y pedir una explicación",
          "Que soy malo para el estudio y debo renunciar a la escuela",
          "Que tengo superpoderes infinitos"
        ],
        correctIndex: 0,
        hint: "Las molestias físicas son alarmas saludables que piden descanso."
      },
      autonomousGame: {
        type: "stress-indicator-quiz",
        instruction: "Señala cuáles de estas reacciones son señales claras de estrés:",
        items: [
          { symptom: "Mandíbula apretada y dolor en la nuca al estudiar", isStress: true },
          { symptom: "Reírte a carcajadas con tus amigos jugando en el parque", isStress: false },
          { symptom: "Sentir que cualquier cosita pequeña te hace llorar o gritar", isStress: true },
          { symptom: "Dormir plácidamente y despertar descansado", isStress: false }
        ]
      },
      feedback: {
        success: "¡Gran detección! Reconocer el estrés a tiempo es el secreto para cuidar tu bienestar y salud integral.",
        support: "Muy bien explorado. Escucha las alarmas de tu cuerpo para recargar energía a tiempo."
      },
      closing: {
        question: "¿Qué parte de tu cuerpo se tensa primero cuando te sientes muy cargado de tareas o presiones?",
        reflection: "Hacer pausas conscientes y respirar es como darle agua fresca a una plantita."
      },
      reward: {
        badgeId: "badge-g3-estres",
        badgeName: "Escáner del Bienestar",
        badgeIcon: "🧘",
        stars: 3,
        description: "¡Reconoces cuándo estás estresado y sabes tomar pausas reparadoras!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 3° 'Darme cuenta cuando estoy estresado'."
  },

  // MUNDO 2: EN LOS ZAPATOS DE LOS DEMÁS (Grado 3)
  {
    id: "g3-w2-s4",
    grade: 3,
    worldId: "world-2",
    sessionNumber: 4,
    title: "Detrás de la máscara: Entiendo lo que motiva las acciones de alguien",
    competence: "Toma de perspectiva",
    learningObjective: "Comprender las razones, vivencias o emociones profundas que están detrás del comportamiento de las personas.",
    characterName: "Lumi y la Lupa de Motivos",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "motive-detective",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! Cuando alguien actúa de forma extraña, antipática o callada, solemos pensar '¡Qué pesado!'. Pero casi siempre hay una historia detrás que no vemos a simple vista. ¡Hoy seremos detectives de los motivos profundos!",
        audioText: "Hoy aprenderemos a entender lo que está detrás de las acciones de alguien."
      },
      explanation: {
        title: "El iceberg de la conducta",
        text: "Lo que una persona hace es solo la punta del iceberg que asoma en el agua. Debajo de la superficie hay cansancio, problemas en casa, miedos o tristezas no expresadas. Comprender lo que está detrás nos permite actuar con bondad en vez de juzgar con dureza.",
        concept: "Detrás de una mala contestación a menudo hay dolor o agotamiento, no maldad."
      },
      demonstration: {
        title: "El caso de Julieta",
        text: "Julieta llegó al salón y tiró la maleta contra el pupitre sin saludar a nadie. Parecía enojada. Pero su perrita de 10 años falleció esa madrugada. Lo que estaba detrás no era rabia hacia sus compañeros: ¡era una profunda pena!",
        hint: "No te tomes las reacciones ajenas como ataques personales."
      },
      guidedPractice: {
        prompt: "Sebastián empujó la mesa y no quiso compartir sus colores hoy. Ayer supiste que no pudo desayunar y casi no durmió por ruidos en su barrio. ¿Qué explica su conducta?",
        options: [
          "Está física y emocionalmente agotado y con hambre, lo que reduce su paciencia",
          "Sebastián nació siendo una persona mala para siempre",
          "Quiere destruir el salón por capricho"
        ],
        correctIndex: 0,
        hint: "Las necesidades básicas insatisfechas alteran nuestro humor."
      },
      autonomousGame: {
        type: "iceberg-revealer",
        instruction: "Descubre qué motivación o emoción se esconde bajo la superficie:",
        cases: [
          {
            visibleAction: "Marcos presume todo el tiempo y dice que sus juguetes son los más caros del mundo.",
            underlyingCause: "Siente mucha inseguridad y cree que solo lo querrán si tiene cosas caras.",
            options: [
              "Siente mucha inseguridad y cree que solo lo querrán si tiene cosas caras.",
              "Es un superhéroe galáctico",
              "Odia los juguetes"
            ]
          }
        ]
      },
      feedback: {
        success: "¡Qué sabiduría tan grande! Mirar más allá de las apariencias te convierte en un ser humano compasivo e inteligente.",
        support: "Muy bien analizado. Preguntarse '¿qué le habrá pasado?' en vez de '¡qué pesado!' transforma tus relaciones."
      },
      closing: {
        question: "Cuando tú estás irritable o respondiente, ¿qué suele estar pasando debajo de tu superficie?",
        reflection: "Comprender nuestros propios motivos nos ayuda a comprender los de los demás."
      },
      reward: {
        badgeId: "badge-g3-iceberg",
        badgeName: "Lupa de los Motivos Ocultos",
        badgeIcon: "🔎",
        stars: 3,
        description: "¡Sabes entender lo que está detrás de las acciones de los demás!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 3° 'Entender lo que está detrás de las acciones de alguien'. Promueve la atribución benigna contra el sesgo hostil."
  },

  {
    id: "g3-w2-s5",
    grade: 3,
    worldId: "world-2",
    sessionNumber: 5,
    title: "El manto protector: Entiendo lo que sienten cuando les pasa algo malo",
    competence: "Empatía",
    learningObjective: "Conectarme afectivamente con el dolor o la desilusión de otros y ofrecer consuelo oportuno.",
    characterName: "Lumi y el Manto Caliente",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "comforting-actions",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! Cuando a alguien le pasa algo triste, a veces no sabemos qué decir o sentimos pena y nos alejamos. Pero la empatía nos enseña a acercarnos con delicadeza para arropar con afecto.",
        audioText: "Hoy aprenderemos a entender lo que sienten los demás cuando les pasa algo malo y cómo brindar consuelo."
      },
      explanation: {
        title: "Estar presente en los momentos difíciles",
        text: "No necesitamos tener todas las respuestas ni solucionar mágicamente el problema. A veces, simplemente decir 'Siento mucho lo que te pasó, aquí estoy si quieres compañía o un abrazo' es el mayor alivio del mundo.",
        dosAndDonts: [
          "SÍ: Escuchar, ofrecer un pañuelo, respetar su silencio.",
          "NO: Decir 'no llores que eso es una tontería' o cambiar de tema de inmediato."
        ]
      },
      demonstration: {
        title: "El examen reprobado de Laura",
        text: "Laura estudió con esfuerzo pero reprobó su examen de música y está llorando en una banca. Andrés se acerca, se sienta a su lado en silencio y le dice suavemente: 'Sé cuánto te esforzaste y lo triste que se siente. Si quieres, repasamos juntos la próxima vez'.",
        hint: "Validar la tristeza ajena es el verdadero consuelo."
      },
      guidedPractice: {
        prompt: "A un compañero se le cayó su perro de una altura y tuvo que llevarlo de urgencias al veterinario. Llega con ojos llorosos. ¿Qué le dices?",
        options: [
          "'Lamento mucho lo de tu perrito. Espero de corazón que se recupere pronto, ¿quieres que nos sentemos juntos?'",
          "'Ay, qué bobo, los perros no importan'",
          "'A mí me regalaron una bicicleta nueva ayer'"
        ],
        correctIndex: 0,
        hint: "Sintoniza con su dolor antes de hablar de ti."
      },
      autonomousGame: {
        type: "comforting-response-matcher",
        instruction: "Empareja cada situación dolorosa con la respuesta de consuelo más cálida y empática:",
        pairs: [
          { situation: "Perdió la final del torneo deportivo de la escuela.", comfort: "Jugaste con mucho corazón, siéntete orgulloso de tu entrega." },
          { situation: "Su mejor amigo se cambió de colegio a otra ciudad.", comfort: "Comprendo el vacío que se siente; puedes escribirle cartas y aquí tienes nuevos amigos." }
        ]
      },
      feedback: {
        success: "¡Qué corazón tan noble tienes! Saber acompañar en el dolor es una de las virtudes más hermosas de la humanidad.",
        support: "Muy bien reflexionado. Tu presencia empática es un bálsamo para quienes sufren."
      },
      closing: {
        question: "¿Qué palabras o gestos de alguien te han hecho sentir consolado cuando tuviste un mal momento?",
        reflection: "La empatía en momentos difíciles construye amistades inquebrantables."
      },
      reward: {
        badgeId: "badge-g3-consuelo",
        badgeName: "Manto de la Compasión",
        badgeIcon: "🧣",
        stars: 3,
        description: "¡Sabes acompañar y entender el dolor ajeno con calidez!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 3° 'Entender lo que sienten los demás cuando les pasa algo malo'."
  },

  {
    id: "g3-w2-s6",
    grade: 3,
    worldId: "world-2",
    sessionNumber: 6,
    title: "El círculo abierto: Incluyo al que está solo",
    competence: "Comportamiento prosocial",
    learningObjective: "Detectar a quienes están aislados o excluidos e incluirlos activamente en los grupos y juegos.",
    characterName: "Lumi y el Círculo de la Amistad",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "inclusion-quest",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! En todos los colegios hay niños que comen solos en el recreo o miran de lejos cómo otros juegan. Hoy romperemos las barreras y abriremos el círculo para que nadie se quede por fuera.",
        audioText: "Hoy aprenderemos a incluir al que está solo y construir un aula acogedora para todos."
      },
      explanation: {
        title: "La soledad y el poder de la inclusión",
        text: "Sentirse excluido duele en el cerebro igual que un golpe físico. A veces no juegan porque son tímidos, nuevos o tienen miedo al rechazo. Cuando tú te acercas y dices '¿Quieres unirte a nuestro equipo?', le estás transformando el día entero.",
        steps: ["1. Mirar a los bordes del patio", "2. Abrir un espacio físico en el círculo", "3. Invitar con sencillez"]
      },
      demonstration: {
        title: "El juego de la cuerda",
        text: "Había cuatro niños jugando a saltar la cuerda y Felipe miraba detrás de un árbol. Sara detuvo la cuerda y gritó con alegría: '¡Felipe, ven, tú puedes saltar en el siguiente turno o ayudarnos a batir!'. Felipe sonrió y corrió hacia ellos.",
        hint: "Un círculo de amigos nunca debe ser una muralla cerrada."
      },
      guidedPractice: {
        prompt: "En la biblioteca están armando grupos de trabajo para ciencias y ves a una niña nueva sentada sola en una mesa del fondo. ¿Qué haces?",
        options: [
          "Ir hacia ella y decirle: 'Hola, ¿quieres trabajar con nuestro grupo? Tenemos un puesto libre'",
          "Susurrar burlas sobre su peinado",
          "Asegurarme de que nadie se le acerque"
        ],
        correctIndex: 0,
        hint: "La inclusión activa toma la iniciativa de invitar."
      },
      autonomousGame: {
        type: "inclusion-simulator",
        instruction: "Resuelve los retos de inclusión en el recreo escolar:",
        challenges: [
          {
            situation: "Están jugando a la lleva y un niño con muletas observa nostálgico desde la banca.",
            bestOption: "Proponer un juego de adivinanzas o juego de mesa en las bancas donde todos puedan competir por igual.",
            options: [
              "Proponer un juego de adivinanzas o juego de mesa en las bancas donde todos puedan competir por igual.",
              "Ignorarlo y correr más rápido",
              "Decirle que no sirve para jugar"
            ]
          }
        ]
      },
      feedback: {
        success: "¡Eres un campeón de la inclusión! Tu corazón abierto hace que tu salón sea un lugar donde todos caben y brillan.",
        support: "Excelente sensibilidad. Nadie merece sentirse invisible."
      },
      closing: {
        question: "¿A quién podrías invitar a jugar o conversar mañana durante el descanso?",
        reflection: "Un pequeño gesto de inclusión puede encender la luz en la vida de un compañero."
      },
      reward: {
        badgeId: "badge-g3-inclusion",
        badgeName: "Llave del Círculo Abierto",
        badgeIcon: "🔑",
        stars: 3,
        description: "¡Sabes incluir al que está solo y combatir la exclusión!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 3° 'Incluir al que está solo'. Prevención primaria de la marginación y fortalecimiento de la cohesión grupal."
  },

  // MUNDO 3: COMUNICACIÓN Y CONFLICTOS (Grado 3)
  {
    id: "g3-w3-s7",
    grade: 3,
    worldId: "world-3",
    sessionNumber: 7,
    title: "El idioma silencioso: Muestro interés sin usar palabras",
    competence: "Escucha activa",
    learningObjective: "Aprender a manifestar escucha activa profunda a través del lenguaje corporal, la mirada y los gestos sin interrumpir con palabras.",
    characterName: "Lumi y la Sombra Parlante",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "non-verbal-listener",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! ¿Sabías que más de la mitad de lo que comunicamos no sale de nuestra boca, sino de nuestros ojos, manos y postura? Hoy seremos expertos en escuchar con el cuerpo en silencio.",
        audioText: "Hoy aprenderemos a mostrar interés sin usar palabras cuando escuchamos a los demás."
      },
      explanation: {
        title: "El lenguaje no verbal de la escucha",
        text: "A veces, al intentar decir 'sí, claro, ajá' interrumpimos el flujo del pensamiento del que habla. Podemos demostrar una atención total asintiendo suavemente, inclinando el cuerpo hacia adelante, manteniendo la mirada con calidez y cambiando la expresión según lo que escuchamos.",
        gestures: ["Asentir con la cabeza", "Mirada atenta y cejas empáticas", "Cuerpo orientado hacia el emisor"]
      },
      demonstration: {
        title: "La narración de Miguel",
        text: "Miguel cuenta una historia emocionante. Carlos no dice ni una sola palabra durante dos minutos, pero sus ojos se abren con asombro, sonríe en los momentos divertidos y asiente. Al terminar, Miguel dice: '¡Fue genial contarte esto, se notaba que estabas fascinado!'",
        hint: "Tu rostro puede ser el mejor espejo de lo que el otro siente."
      },
      guidedPractice: {
        prompt: "Un amigo te confiesa que tiene miedo de no pasar el año. ¿Qué respuesta corporal no verbal es la adecuada?",
        options: [
          "Mirarlo con expresión comprensiva, inclinarte hacia él y poner una mano suave en su hombro en silencio",
          "Mirar la hora en el reloj cada tres segundos y tamborilear los dedos",
          "Ponerte los audífonos"
        ],
        correctIndex: 0,
        hint: "La cercanía corporal y la serenidad reconfortan sin palabras."
      },
      autonomousGame: {
        type: "body-language-matching",
        instruction: "Clasifica cada gesto según muestre 'Interés profundo' o 'Desinterés':",
        gesturesList: [
          { gesture: "Inclinarse hacia adelante y mirar a los ojos con atención", showsInterest: true },
          { gesture: "Bostezar tapándose la boca a medias y mirar el techo", showsInterest: false },
          { gesture: "Asentir con la cabeza en los momentos clave", showsInterest: true },
          { gesture: "Girar el torso en dirección contraria y cruzar los brazos con fastidio", showsInterest: false }
        ]
      },
      feedback: {
        success: "¡Extraordinario dominio del silencio activo! Tu cuerpo sabe decir 'estoy aquí para ti' sin necesidad de ruidos.",
        support: "Muy bien aprendido. El silencio atento es la base de las mejores conversaciones."
      },
      closing: {
        question: "¿Cómo te sientes cuando alguien te mira a los ojos con total atención mientras hablas?",
        reflection: "Escuchar en silencio atento es un acto de amor y respeto puro."
      },
      reward: {
        badgeId: "badge-g3-silencio",
        badgeName: "Espejo del Silencio Atento",
        badgeIcon: "🧏",
        stars: 3,
        description: "¡Muestras interés genuino sin usar palabras al escuchar a los demás!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 3° 'Mostrar interés sin usar palabras cuando escucho a los demás'."
  },

  {
    id: "g3-w3-s8",
    grade: 3,
    worldId: "world-3",
    sessionNumber: 8,
    title: "La espada de cristal: Claridad y firmeza sin agredir",
    competence: "Asertividad",
    learningObjective: "Responder con firmeza y claridad defendiendo mi postura sin caer en ofensas, sarcasmos ni agresiones.",
    characterName: "Lumi y la Espada Transparente",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "assertive-dialogue-advanced",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! Para defendernos no necesitamos gritar insultos ni amenazar con golpes. La verdadera firmeza es como una espada de cristal: transparente, recta y limpia.",
        audioText: "Hoy aprenderemos a responder con claridad y firmeza, pero sin agredir."
      },
      explanation: {
        title: "Firmeza versus Agresión",
        text: "Agredir es insultar, burlarse, gritar o lastimar físicamente (eso genera más violencia). La firmeza asertiva consiste en pararse derecho, mirar de frente y usar oraciones claras que expresen el límite: 'No estoy de acuerdo con esto y te pido que respetes mi turno'.",
        formula: ["Hecho objetivo: 'Cuando haces X'", "Sentimiento: 'Me siento Y'", "Límite: 'Te pido que Z'"]
      },
      demonstration: {
        title: "El reclamo de Daniel",
        text: "A Daniel le rompieron una cartulina de su trabajo escolar. Respuesta agresiva: '¡Eres un torpe inútil, te voy a romper la tuya!' (genera pelea inmediata). Respuesta asertiva y firme: 'Me tomó dos horas hacer esta cartulina y me da mucha rabia que no hayas tenido cuidado. Te pido que me ayudes a repararla ahora mismo'.",
        hint: "La firmeza exige responsabilidad sin degradar al otro."
      },
      guidedPractice: {
        prompt: "Un compañero se burla de tus zapatos nuevos delante de otros en el pasillo. ¿Cómo respondes con firmeza sin agredir?",
        options: [
          "'A mí me gustan mis zapatos y me parece una falta de respeto tu comentario. Te pido que dejes de opinar sobre lo que me pongo'",
          "'¡Tus zapatos son más asquerosos que la basura!'",
          "Irte a llorar al baño sin decirle nada"
        ],
        correctIndex: 0,
        hint: "Ponte firme en tus derechos sin atacar su dignidad."
      },
      autonomousGame: {
        type: "assertive-builder-g3",
        instruction: "Construye la respuesta firme no agresiva para cada dilema:",
        challenges: [
          {
            situation: "Un compañero de equipo no hizo su parte del trabajo y quiere que tú lo pongas en la portada.",
            correctResponse: "No es justo que aparezcas si no colaboraste. Puedes hacer la conclusión ahora mismo y con gusto te incluimos.",
            options: [
              "No es justo que aparezcas si no colaboraste. Puedes hacer la conclusión ahora mismo y con gusto te incluimos.",
              "¡Te voy a acusar y ojalá te echen del colegio!",
              "Bueno, pon tu nombre y yo hago todo solo"
            ]
          }
        ]
      },
      feedback: {
        success: "¡Qué temple tan admirable! Hablaste con rectitud, claridad y serenidad. Así es como se ganan los debates con respeto.",
        support: "Muy bien reflexionado. No hace falta rebajarse al insulto cuando tienes la verdad y la calma de tu lado."
      },
      closing: {
        question: "¿Cuál es la diferencia entre ser firme y ser agresivo?",
        reflection: "Ser firme es defenderte; agredir es atacar al otro. La paz necesita gente firme."
      },
      reward: {
        badgeId: "badge-g3-firmeza",
        badgeName: "Espada de Cristal Asertiva",
        badgeIcon: "⚔️",
        stars: 3,
        description: "¡Respondes con claridad y firmeza sin agredir a nadie!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 3° 'Responder con claridad y firmeza, pero sin agredir'."
  },

  {
    id: "g3-w3-s9",
    grade: 3,
    worldId: "world-3",
    sessionNumber: 9,
    title: "El freno de emergencia: Pensar antes de actuar con rabia",
    competence: "Manejo de conflictos",
    learningObjective: "Aprender a activar una pausa reflexiva antes de actuar bajo el efecto de la ira intensa.",
    characterName: "Lumi y el Ancla de la Sabiduría",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "pause-before-rage",
    offlineReady: true,
    isOfficial: false,
    pedagogicalNotice: "Adaptación pedagógica basada en los objetivos oficiales del programa Emociones para la Vida.",

    pedagogicalPhases: {
      welcome: {
        text: "¡Gran Desafío Final de Tercer Grado! La rabia ciega es como un rayo: si cae sin control, quema todo a su paso. Hoy aprenderemos a instalar un pararrayos en el cerebro: ¡pensar antes de actuar!",
        audioText: "Bienvenido al desafío final de Tercero. Hoy aprenderemos a pensar antes de actuar cuando sentimos rabia."
      },
      explanation: {
        title: "La regla de los 10 segundos",
        text: "Cuando la rabia sube, la parte pensante del cerebro se apaga por unos momentos. Si actuamos en ese instante, decimos cosas que lastiman y que luego lamentamos. La solución es poner el 'Ancla': contar mentalmente hasta 10, respirar hondo y preguntarse: '¿Qué consecuencias tendrá lo que voy a hacer?'",
        steps: ["1. Sentir el calor de la rabia", "2. Detener manos y boca (Contar del 1 al 10)", "3. Pensar en las consecuencias"]
      },
      demonstration: {
        title: "El balón en el charco",
        text: "Nicolás pateó el balón y cayó en un lodazal manchando el pantalón de Esteban. Esteban sintió furia y levantó el puño para golpear a Nicolás. Pero activó el ancla: frenó el puño, respiró y pensó: 'Si le pego, me suspenden y no juego la semifinal. Mejor le digo que me ayude a limpiar'.",
        hint: "Pensar antes de actuar te salva de grandes problemas."
      },
      guidedPractice: {
        prompt: "Alguien te gana en un videojuego escolar y se burla en tu cara. Sientes ganas de arrojar el control al televisor. ¿Qué debes hacer?",
        options: [
          "Poner el control en la mesa, respirar profundo, contar hasta 10 y decir: 'Bien jugado, la próxima te gano yo'",
          "Estrellar el control contra la pantalla",
          "Darle un empujón al compañero"
        ],
        correctIndex: 0,
        hint: "Arrojar cosas solo rompe aparatos y amistades."
      },
      autonomousGame: {
        type: "consequence-simulator",
        instruction: "Evalúa las consecuencias de actuar con rabia vs actuar con pausa reflexiva:",
        scenarios: [
          {
            rageImpulse: "Gritar un secreto vergonzoso de tu amigo porque no te prestó su bicicleta.",
            consequenceRage: "Pierdes su amistad para siempre, todos desconfían de ti y te sientes avergonzado.",
            consequencePause: "Te calmas, le dices que te molestó que no te prestara la bicicleta y mantienen su amistad intacta.",
            chooseBest: "consequencePause"
          }
        ]
      },
      feedback: {
        success: "¡VICTORIA TOTAL! Has superado con maestría todas las misiones de Tercer Grado. Sabes pausar la rabia, distinguir emociones combinadas y defenderte con justicia y dignidad.",
        support: "Excelente perseverancia. El autocontrol es la fuerza más poderosa del mundo interior."
      },
      closing: {
        question: "¿Qué frase o truco usarás la próxima vez que sientas ganas de explotar de ira?",
        reflection: "Dueño de tus emociones, dueño de tu destino. ¡Felicitaciones por crecer tan bien!"
      },
      reward: {
        badgeId: "badge-g3-ancla",
        badgeName: "Ancla Dorada del Autocontrol",
        badgeIcon: "⚓",
        stars: 3,
        description: "¡Has completado Tercer Grado dominando el arte de pensar antes de actuar!"
      }
    },
    teacherNote: "Guía docente p. 10: Objetivo de 3° 'Pensar antes de actuar con rabia'. Enseña control inhibitorio y evaluación anticipada de consecuencias."
  }
];
