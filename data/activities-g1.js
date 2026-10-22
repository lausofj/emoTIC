/**
 * emoTIC - Actividades Oficiales de Grado Primero (1º)
 * Fuente directa: Cuaderno de Trabajo y Guía del Docente Emociones para la Vida (Grado 1°)
 */

window.EMOTIC_ACTIVITIES_G1 = [
  // ==========================================
  // MUNDO 1: MI MUNDO EMOCIONAL (Sesiones 1, 2, 3)
  // ==========================================
  {
    id: "g1-w1-s1",
    grade: 1,
    worldId: "world-1",
    sessionNumber: 1,
    officialCode: "Sesión 1/9",
    title: "Se siente en mi cuerpo: Reconozco mis emociones",
    competence: "Identificación de emociones",
    learningObjective: "Darme cuenta de cómo me siento y reconocer las sensaciones de mi cuerpo ante cada emoción.",
    characterName: "Lumi y las Caritas Curiosas",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "emotion-detective", // Detective de emociones y sensaciones
    offlineReady: true,
    isOfficial: true,

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola, pequeño explorador! Soy Lumi. Hoy iniciamos nuestro viaje en el Mundo Emocional. ¿Sabías que nuestras emociones no solo viven en la mente, sino que nuestro cuerpo entero las siente? ¡Vamos a descubrirlas juntos!",
        audioText: "Hola, pequeño explorador. Soy Lumi. Hoy aprenderemos a reconocer nuestras emociones y cómo se sienten en nuestro cuerpo."
      },
      explanation: {
        title: "Las emociones y nuestro cuerpo",
        text: "Una emoción es lo que sentimos cuando pasan cosas. Cuando sentimos alegría nuestro corazón late rápido y sonreímos; con tristeza los brazos pesan y caen lágrimas; con rabia la cara se calienta y apretamos los puños; con miedo abrimos los ojos grandes; y con ansiedad sentimos cosquillas o nudos en la pancita.",
        emotions: [
          { name: "Alegría", cue: "Sonrisa abierta, energía para saltar y cantar", emoji: "😄", color: "#FFCA28" },
          { name: "Tristeza", cue: "Ojos caídos, pocas ganas de moverse, llanto", emoji: "😢", color: "#42A5F5" },
          { name: "Rabia", cue: "Ceño fruncido, calor en la cara, puños apretados", emoji: "😡", color: "#EF5350" },
          { name: "Miedo", cue: "Ojos muy abiertos, boca temblorosa, pasos hacia atrás", emoji: "😨", color: "#AB47BC" },
          { name: "Ansiedad", cue: "Nervios, cosquillitas en la pancita, inquietud", emoji: "😰", color: "#26A69A" }
        ]
      },
      demonstration: {
        title: "Demostración: ¿Qué siente el cuerpo?",
        text: "Mira este ejemplo: Cuando a Nico le regalan su juego favorito, salta y sonríe. Su cuerpo expresa ¡Alegría! En cambio, si se le pierde su juguete regalón, sus hombros caen y siente tristeza.",
        hint: "Observa las cejas, la boca y la energía de la postura corporal."
      },
      guidedPractice: {
        prompt: "Observa la carita: tiene los ojos achinados, la boca en una gran curva hacia arriba y mejillas rojas. ¿Qué emoción está sintiendo?",
        options: ["Alegría", "Rabia", "Miedo"],
        correctIndex: 0,
        hint: "¡Fíjate en esa gran sonrisa brillante!"
      },
      autonomousGame: {
        type: "pair-matching",
        instruction: "Une cada emoción con la carita y sensación corporal correspondiente en el recuadro:",
        pairs: [
          { id: "p1", emotion: "Alegría", icon: "😄", matchDesc: "Sonrisa grande y saltos de felicidad" },
          { id: "p2", emotion: "Tristeza", icon: "😢", matchDesc: "Brazos caídos y ganas de llorar" },
          { id: "p3", emotion: "Rabia", icon: "😡", matchDesc: "Ceño apretado y calor en las mejillas" },
          { id: "p4", emotion: "Miedo", icon: "😨", matchDesc: "Ojos muy abiertos y corazón acelerado" },
          { id: "p5", emotion: "Ansiedad", icon: "😰", matchDesc: "Inquietud y mariposas en la panza" }
        ]
      },
      feedback: {
        success: "¡Maravilloso trabajo! Reconociste todas las emociones. Escuchar lo que siente tu cuerpo es el primer superpoder para cuidarte y convivir en paz.",
        support: "Vas muy bien. Recuerda que no hay emociones malas: todas nos dan información valiosa de cómo nos sentimos."
      },
      closing: {
        question: "¿Cómo se siente tu cuerpo en este momento? ¿Sientes tranquilidad, alegría o curiosidad?",
        reflection: "Cada vez que sientas algo muy intenso, haz una pausa, pon tu mano en el pecho y pregúntate: ¿qué me está diciendo mi cuerpo hoy?"
      },
      reward: {
        badgeId: "badge-sensaciones",
        badgeName: "Detective del Cuerpo",
        badgeIcon: "🌟",
        stars: 3,
        description: "¡Has aprendido a reconocer tus emociones y a escuchar lo que dice tu cuerpo!"
      }
    },
    teacherNote: "Guía docente p. 19-25: Estimular que los niños identifiquen temperatura corporal (frío/calor), tensión muscular y ritmo cardíaco. Validar toda emoción sin juzgarla."
  },

  {
    id: "g1-w1-s2",
    grade: 1,
    worldId: "world-1",
    sessionNumber: 2,
    officialCode: "Sesión 2/9",
    title: "Globito el pez: Respiro profundo para calmarme",
    competence: "Manejo de emociones",
    learningObjective: "Aprender y practicar la técnica de respiración de Globito para calmarme cuando siento rabia o miedo.",
    characterName: "Globito el Pez Globo",
    characterSvg: "assets/illustrations/globito.svg",
    gameType: "step-order", // Ordenar pasos de la técnica + ejercicio interactivo de respiración
    offlineReady: true,
    isOfficial: true,

    pedagogicalPhases: {
      welcome: {
        text: "¡Burbujas de bienvenida! Soy Globito, el pez globo. A veces cuando siento rabia o miedo, siento ganas de estallar y puedo tratar mal a mis amigos. Pero descubrí un truco mágico: respirar profundo y despacio.",
        audioText: "Soy Globito el pez globo. Hoy te enseñaré mi técnica para calmarte respirando como un globo."
      },
      explanation: {
        title: "La historia de Globito el pez",
        text: "Globito estaba preocupado porque cuando se enojaba o tenía miedo, trataba mal a sus amigos y nadie quería jugar con él. Pero un día aprendió: 1. Quedarse quieto como una estatua marina. 2. Respirar profundo y despacito inflando la pancita como un globo, sostener el aire y botarlo muy lento. ¡Así la rabia se desinfla y vuelve la calma!",
        steps: [
          { num: "1", title: "Quédate quieto", desc: "Para lo que estés haciendo y no muevas las manos ni los pies." },
          { num: "2", title: "Respira despacito", desc: "Toma aire por la nariz hasta inflar la pancita como un pez globo." },
          { num: "3", title: "Bota el aire suave", desc: "Suelta el aire despacito por la boca hasta desinflarte en calma." }
        ]
      },
      demonstration: {
        title: "Practica con Globito",
        text: "Mira la animación de Globito. Cuando Globito se infla, tomamos aire por la nariz: 1... 2... 3... Cuando Globito se desinfla, soltamos el aire suave por la boca: 1... 2... 3...",
        hint: "Imagina que eres un pez globo en el agua tranquila."
      },
      guidedPractice: {
        prompt: "Si estás coloreando y se te derrama el vaso de jugo encima de tu dibujo favorito, ¿qué es lo primero que debes hacer según Globito?",
        options: [
          "Quedarme quieto y no gritar ni empujar a nadie",
          "Tirar todos los lápices al suelo con rabia",
          "Salir corriendo del salón sin avisar"
        ],
        correctIndex: 0,
        hint: "Recuerda el Paso 1 de Globito: detener el cuerpo para no lastimar."
      },
      autonomousGame: {
        type: "interactive-breathing-order",
        instruction: "Ordena los pasos de la técnica de Globito para calmar la rabia o el miedo:",
        stepsToOrder: [
          { id: "s1", text: "1. PRIMERO: Quédate quieto en tu sitio sin agredir.", order: 1 },
          { id: "s2", text: "2. SEGUNDO: Toma aire profundamente por la nariz inflándote como Globito.", order: 2 },
          { id: "s3", text: "3. TERCERO: Bota el aire despacito por la boca varias veces.", order: 3 },
          { id: "s4", text: "4. FINALMENTE: Di calmadamente lo que sientes y necesitas.", order: 4 }
        ],
        interactiveMode: "breathing-circle" // Permite simular el ciclo de respiración guiada de 3 repeticiones
      },
      feedback: {
        success: "¡Excelente! Has dominado la técnica de Globito. Cuando sientas que la rabia te quiere hacer explotar, ¡recuerda inflarte y respirar!",
        support: "Tómate tu tiempo. Respira con calma y verás cómo tu cuerpo vuelve a sentirse en paz."
      },
      closing: {
        question: "¿En qué momento del colegio o de tu casa podrías imitar a Globito para calmarte?",
        reflection: "Recuerda: la rabia no es mala, pero respirar nos ayuda a no tratar mal a quienes queremos."
      },
      reward: {
        badgeId: "badge-globito",
        badgeName: "Maestro de la Calma",
        badgeIcon: "🐡",
        stars: 3,
        description: "¡Sabes quedarte quieto y respirar como Globito para recuperar la paz!"
      }
    },
    teacherNote: "Guía docente p. 24-30: Enfatizar que no se castigue la emoción, sino que se acompañe al niño a respirar 3 veces antes de dialogar."
  },

  {
    id: "g1-w1-s3",
    grade: 1,
    worldId: "world-1",
    sessionNumber: 3,
    officialCode: "Sesión 3/9",
    title: "Gina la que imagina: Uso mi imaginación para relajarme",
    competence: "Manejo del estrés",
    learningObjective: "Aprender a usar mi imaginación para relajarme ante situaciones que me ponen nervioso o intranquilo, y pedir ayuda a un adulto.",
    characterName: "Gina la que Imagina",
    characterSvg: "assets/illustrations/gina.svg",
    gameType: "interactive-story", // Historia interactiva de relajación
    offlineReady: true,
    isOfficial: true,

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! Soy Gina y tengo 6 años. A mí no me gusta cuando las personas discuten o hay mucho ruido en casa; eso me pone nerviosa e intranquila. ¿Sabes qué hago? Cierro mis ojos y viajo con mi imaginación a mi lugar favorito.",
        audioText: "Soy Gina la que imagina. Hoy descubriremos cómo nuestra imaginación nos ayuda a relajarnos y cuándo pedir ayuda a un adulto."
      },
      explanation: {
        title: "El poder de la imaginación y la ayuda",
        text: "Cuando sentimos estrés (como nervios por una prueba o intranquilidad por una discusión), podemos cerrar los ojos e imaginar con todos los sentidos nuestro lugar feliz: los rayos del sol, el cantar de los pajaritos, el columpio y un helado refrescante. Y si la situación es muy difícil, siempre podemos acudir a un adulto de confianza y decirle: 'Necesito ayuda'.",
        keys: [
          "Detalles sensoriales: ¿Qué ves? ¿Qué hueles? ¿Qué escuchas?",
          "Lugar de paz: Un parque, una playa, la cama con una cobija suave.",
          "Pedir apoyo: Acercarse a mamá, papá o la maestra y pedir un abrazo o consejo."
        ]
      },
      demonstration: {
        title: "El paseo imaginario de Gina",
        text: "Gina cierra los ojos: siente la brisa fresca en su carita, escucha el suave balanceo del columpio y saborea su helado favorito. Poco a poco, su respiración se hace tranquila y su cuerpo se relaja.",
        hint: "Puedes crear tu propio lugar especial en cualquier momento."
      },
      guidedPractice: {
        prompt: "Gina está asustada porque en la noche hay truenos fuertes. ¿Cuál de estas acciones le ayuda a sentirse mejor?",
        options: [
          "Cerrar los ojos, imaginar que está en su playa favorita y abrazar a un adulto de confianza",
          "Morderse las uñas y ponerse a gritar debajo de la cama sola",
          "Pelear con sus hermanos"
        ],
        correctIndex: 0,
        hint: "La imaginación y la cercanía de un ser querido traen serenidad."
      },
      autonomousGame: {
        type: "imagination-builder",
        instruction: "Construye tu propio refugio de calma eligiendo elementos agradables:",
        categories: [
          {
            name: "Lugar Favorito",
            options: [
              { label: "Un parque soleado con flores", icon: "🌳", sound: "birds" },
              { label: "La playa con olas suaves", icon: "🏖️", sound: "waves" },
              { label: "Un bosque encantado de luciérnagas", icon: "✨", sound: "wind" }
            ]
          },
          {
            name: "Sonido Relajante",
            options: [
              { label: "Pajaritos cantando felizmente", icon: "🐦" },
              { label: "Lluvia suave cayendo en el techo", icon: "🌧️" },
              { label: "Música tranquila de campanas", icon: "🎶" }
            ]
          },
          {
            name: "Adulto de Confianza para pedir ayuda",
            options: [
              { label: "Mi maestra o profesor", icon: "👩‍🏫" },
              { label: "Mi mamá, papá o abuelos", icon: "👨‍👩‍👧" },
              { label: "Un familiar que me cuida con amor", icon: "❤️" }
            ]
          }
        ]
      },
      feedback: {
        success: "¡Hermoso refugio imaginario! Recuerda que tu imaginación siempre viaja contigo y que pedir ayuda es de valientes.",
        support: "Excelente exploración. Todos sentimos nervios alguna vez; lo valioso es saber cómo encontrar tranquilidad."
      },
      closing: {
        question: "¿A qué persona de tu colegio o familia le pedirías un abrazo o ayuda cuando te sientas muy preocupado?",
        reflection: "Hablar de lo que nos preocupa con alguien que nos quiere hace que los problemas se vuelvan más pequeños."
      },
      reward: {
        badgeId: "badge-gina",
        badgeName: "Jardín de la Imaginación",
        badgeIcon: "🌺",
        stars: 3,
        description: "¡Has descubierto cómo imaginar un lugar de paz y pedir ayuda con confianza!"
      }
    },
    teacherNote: "Guía docente p. 31-35: Validar que pedir apoyo a un adulto protector es una competencia de afrontamiento clave en la infancia temprana."
  },

  // ==========================================
  // MUNDO 2: EN LOS ZAPATOS DE LOS DEMÁS (Sesiones 4, 5, 6)
  // ==========================================
  {
    id: "g1-w2-s4",
    grade: 1,
    worldId: "world-2",
    sessionNumber: 4,
    officialCode: "Sesión 4/9",
    title: "¿Qué pasó aquí? Veo a través de los ojos de los demás",
    competence: "Toma de perspectiva",
    learningObjective: "Entender que las demás personas pueden pensar, sentir y ver las cosas de forma diferente a mí, y resolver situaciones misteriosas.",
    characterName: "Lumi y los Lentes Mágicos",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "mystery-investigator", // Situaciones misteriosas (Antonio y Saray)
    offlineReady: true,
    isOfficial: true,

    pedagogicalPhases: {
      welcome: {
        text: "¡Llegamos al Mundo 2! Soy Lumi. Hoy nos pondremos los 'Lentes Mágicos' para ver el mundo con los ojos de nuestros compañeros. ¿Sabías que lo que a ti te parece aburrido a otro le puede encantar?",
        audioText: "Bienvenido al Mundo 2. Hoy aprenderemos a ver las cosas desde el punto de vista de los demás y resolveremos misterios divertidos."
      },
      explanation: {
        title: "Gustos diferentes y situaciones misteriosas",
        text: "A Federico le gusta el helado de chocolate porque es alérgico a la vainilla. A Jenny le gusta el agua tibia porque tiene tos. ¡A todos nos gustan cosas diferentes y eso está muy bien! Además, a veces ocurren cosas que parecen malas, pero cuando investigamos descubrimos que fueron accidentes o confusiones.",
        mysteriesInfo: [
          { title: "Misterio 1: ¿Dónde está mi libro?", desc: "Antonio dejó su libro en la mesa y fue a beber agua. Su mamá lo guardó en la repisa para ordenarlo. Antonio pensó que se había perdido." },
          { title: "Misterio 2: ¿Cómo se ensució mi dibujo?", desc: "Saray hizo un arcoíris hermoso. Liliana tropezó sin querer y manchó con pintura negra, pero de inmediato intentó limpiarlo con pena." }
        ]
      },
      demonstration: {
        title: "Descifrando el misterio de Antonio",
        text: "Si Antonio busca su libro en la mesa y no lo ve, ¿cómo se siente? ¡Confundido y asustado! Pero su mamá no quería molestarlo: solo quería ordenar la sala. Ver los dos lados evita peleas.",
        hint: "Pregúntate siempre: ¿qué sabía la mamá? ¿qué sabía Antonio?"
      },
      guidedPractice: {
        prompt: "Felipe trabaja todo el día empacando galletas en una fábrica. Al llegar a casa le ofrecen galletas o zanahorias crujientes. ¿Qué crees que preferirá comer Felipe?",
        options: [
          "Probablemente zanahorias, porque está cansado de ver y oler galletas todo el día",
          "Obligatoriamente galletas porque a todos los niños les gustan",
          "Nada, se irá sin comer"
        ],
        correctIndex: 0,
        hint: "Ponte en el lugar de Felipe: después de ver millones de galletas, ¡un vegetal fresco es un manjar!"
      },
      autonomousGame: {
        type: "perspective-mystery",
        instruction: "Resuelve el misterio del arcoíris de Saray eligiendo la explicación empática:",
        scenario: "Saray regresa a su puesto y ve pintura negra en su dibujo y a Liliana con un trapo. ¿Qué ocurrió en realidad y qué debe hacer Saray?",
        questions: [
          {
            q: "¿Liliana manchó el dibujo a propósito para arruinarlo?",
            answers: [
              { text: "No, fue un accidente: se tropezó y asustada intentó limpiarlo", correct: true, explain: "¡Exacto! No hubo mala intención, solo un tropiezo accidental." },
              { text: "Sí, Liliana es mala y quería pelear", correct: false, explain: "Cuidado: no asumamos que los demás quieren hacernos daño sin preguntar primero." }
            ]
          },
          {
            q: "¿Qué pasaría si Saray grita e insulta a Liliana sin escucharla?",
            answers: [
              { text: "Se crearía una pelea innecesaria y ambas se sentirían muy tristes", correct: true, explain: "¡Muy bien! Los malentendidos empeoran si gritamos." },
              { text: "El dibujo se arreglaría mágicamente", correct: false, explain: "Gritar nunca repara las cosas." }
            ]
          }
        ]
      },
      feedback: {
        success: "¡Excelente detective de perspectivas! Descubriste que mirando con los ojos del otro entendemos la verdad y evitamos peleas.",
        support: "Muy bien pensado. Ponerse las gafas de los demás nos hace más sabios y compresivos."
      },
      closing: {
        question: "¿Alguna vez pensaste que un compañero te hizo algo a propósito y luego descubriste que fue un accidente?",
        reflection: "La próxima vez que algo te disguste, haz una pausa y pregunta: '¿Qué pasó?' antes de enfadarte."
      },
      reward: {
        badgeId: "badge-lentes",
        badgeName: "Lentes Mágicos de la Empatía",
        badgeIcon: "👓",
        stars: 3,
        description: "¡Sabes ver a través de los ojos de los demás y aclarar malentendidos!"
      }
    },
    teacherNote: "Guía docente p. 37-46: El ejercicio de 'Misterios' trabaja la Teoría de la Mente en 1° grado, distinguiendo la intención del resultado accidental."
  },

  {
    id: "g1-w2-s5",
    grade: 1,
    worldId: "world-2",
    sessionNumber: 5,
    officialCode: "Sesión 5/9",
    title: "Jatrón el mago: Observo la cara de alguien para saber cómo se siente",
    competence: "Empatía",
    learningObjective: "Observar las expresiones del rostro de los demás para saber qué sienten y comprender sus reacciones.",
    characterName: "Jatrón el Mago",
    characterSvg: "assets/illustrations/jatron.svg",
    gameType: "face-observation", // Observación de caritas y emociones
    offlineReady: true,
    isOfficial: true,

    pedagogicalPhases: {
      welcome: {
        text: "¡Abracadabra! Soy Jatrón, el mago aprendiz. Quería impresionar a mi familia con mis trucos, pero al principio casi provoco un desastre porque no me fijé en las caritas de mi público. ¡Ven y te cuento lo que aprendí!",
        audioText: "Soy Jatrón el mago. Hoy aprenderemos a observar los rostros para saber qué sienten las personas que nos rodean."
      },
      explanation: {
        title: "La historia del show de magia de Jatrón",
        text: "Jatrón hizo desaparecer la moneda de su hermano Toti y Toti lloró de rabia pensando que se la habían quitado. Luego sacó un pájaro sorpresa y su hermanito Roco gritó de susto. Y su abuelito se quedó dormido porque estaba cansado. La mamá reunió a todos para dialogar: Jatrón explicó su truco, devolvió la moneda, pidió disculpas a Roco por asustarlo y comprendió al abuelito. ¡Un verdadero mago observa a su público!",
        faces: [
          { emotion: "Sorpresa", cue: "Boca redondita abierta, cejas levantadas", emoji: "😲" },
          { emotion: "Enojo / Rabia", cue: "Cejas inclinadas hacia adentro, labios tensos", emoji: "😠" },
          { emotion: "Miedo / Susto", cue: "Ojos asustados, boca abierta temblando", emoji: "😨" },
          { emotion: "Alegría", cue: "Sonrisa amplia, ojos chispeantes", emoji: "😁" },
          { emotion: "Cansancio / Sueño", cue: "Párpados caídos, bostezo", emoji: "😴" }
        ]
      },
      demonstration: {
        title: "Observando el rostro de Toti y Roco",
        text: "Cuando Toti frunció el ceño y cerró los puños, su cara decía: ¡Rabia! Si Jatrón hubiera mirado su cara a tiempo, le habría dicho enseguida: '¡Tranquilo, la moneda está aquí!'",
        hint: "Los ojos y la boca nos dicen el mensaje antes de que la persona hable."
      },
      guidedPractice: {
        prompt: "Mira al hermanito Roco: tiene los ojos muy abiertos, tiembla y se abraza a su mamá. ¿Cómo se sintió con el truco del pájaro?",
        options: [
          "Asustado, porque no esperaba que saliera un animal de repente",
          "Aburrido con muchas ganas de dormir",
          "Súper alegre y divertido"
        ],
        correctIndex: 0,
        hint: "A veces las sorpresas grandes pueden dar susto a los más pequeños."
      },
      autonomousGame: {
        type: "emotion-face-match",
        instruction: "Ayuda a Jatrón a identificar qué emoción tiene cada miembro de su familia:",
        cases: [
          { person: "Toti (hermano mayor)", situation: "Su moneda desapareció del sombrero", targetEmotion: "Rabia / Enojo", options: ["Rabia / Enojo", "Alegría", "Sueño"] },
          { person: "Roco (hermanito pequeño)", situation: "Un pajarito voló directo hacia él", targetEmotion: "Miedo / Susto", options: ["Miedo / Susto", "Tranquilidad", "Hambre"] },
          { person: "El Abuelito", situation: "No durmió en la noche y cerró los ojos en el sillón", targetEmotion: "Cansancio / Sueño", options: ["Cansancio / Sueño", "Enojo", "Terror"] },
          { person: "Toda la familia al final", situation: "Jatrón explicó el truco y devolvió la moneda", targetEmotion: "Alegría y alivio", options: ["Alegría y alivio", "Rabia", "Miedo"] }
        ]
      },
      feedback: {
        success: "¡Impresionante! Tienes ojos de verdadero mago empático. Ahora sabes reconocer cómo se sienten los demás mirando sus expresiones.",
        support: "Muy bien observado. Mirar la cara de un amigo es la mejor pista para saber si necesita consuelo o si está feliz."
      },
      closing: {
        question: "Cuando ves a un compañero con la carita triste en el recreo, ¿qué podrías preguntarle?",
        reflection: "Un mago de verdad no solo hace trucos: ¡sabe cuidar los corazones de su público!"
      },
      reward: {
        badgeId: "badge-jatron",
        badgeName: "Varita de la Empatía",
        badgeIcon: "🎩",
        stars: 3,
        description: "¡Has descubierto cómo leer las expresiones del rostro para comprender a los demás!"
      }
    },
    teacherNote: "Guía docente p. 47-52: Trabajar que la intención positiva del emisor (Jatrón quería divertir) puede tener un impacto no deseado en el receptor si no se lee su emoción."
  },

  {
    id: "g1-w2-s6",
    grade: 1,
    worldId: "world-2",
    sessionNumber: 6,
    officialCode: "Sesión 6/9",
    title: "Miro, Pregunto, Ayudo: Me doy cuenta cuando alguien necesita ayuda",
    competence: "Comportamiento prosocial",
    learningObjective: "Aprender y aplicar las tres claves del Código de Ayuda para apoyar a otros respetando si quieren o no recibir ayuda.",
    characterName: "Felicio y Felicia",
    characterSvg: "assets/illustrations/ayuda.svg",
    gameType: "drag-drop-sequence", // Secuencia del Código de Ayuda y decisiones amables
    offlineReady: true,
    isOfficial: true,

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola, amigos! Somos Felicio y Felicia. Nos encanta ayudarnos, pero aprendimos un secreto importantísimo: no todas las personas necesitan ayuda en todo momento. Por eso inventamos el ¡Código de Ayuda!",
        audioText: "Somos Felicio y Felicia. Hoy aprenderás las tres claves del Código de Ayuda: Miro, Pregunto y Ayudo."
      },
      explanation: {
        title: "Las tres claves del Código de Ayuda",
        text: "1. MIRO: Con mis binoculares atentos detecto si alguien tiene dificultades (se le cayeron los lápices, no encuentra algo o está confundido). 2. PREGUNTO: Me acerco amablemente y pregunto: '¿Necesitas ayuda? ¿Cómo te puedo ayudar?'. 3. AYUDO: Si responde 'SÍ', ¡manos a la obra! Si responde 'NO', respeto su decisión con una sonrisa.",
        keys: [
          { step: "1. Miro", detail: "Observo con atención antes de actuar." },
          { step: "2. Pregunto", detail: "'¿Te puedo dar una mano?' '¿Quieres que te ayude?'" },
          { step: "3. Ayudo", detail: "Si dice Sí: actúo con cariño. Si dice No: ¡respeto su autonomía!" }
        ]
      },
      demonstration: {
        title: "La historia de la media y el dibujo",
        text: "Caso 1: Felicia buscaba angustiada su media para ir a la escuela. Felicio le preguntó: '¿Te ayudo a buscarla?'. Felicia dijo '¡Sí, por favor!'. Y la encontraron juntos. Caso 2: Felicia pintaba un dibujo para su mamá. Felicio quiso quitarle los colores para pintar él. Felicia dijo 'No, gracias, quiero hacerlo yo solita'. Felicio respetó y dijo: '¡Qué lindo te está quedando!'",
        hint: "Preguntar primero demuestra mucho respeto."
      },
      guidedPractice: {
        prompt: "Ves a un compañero en el salón cargando una torre muy alta de cuadernos que se tambalea. ¿Qué debes hacer?",
        options: [
          "Acercarme y preguntarle: '¿Quieres que te ayude a llevar la mitad?'",
          "Quitarle los cuadernos de un jalón sin decirle nada",
          "Burlarme si se le caen al suelo"
        ],
        correctIndex: 0,
        hint: "Usa la clave 2 del Código: ¡Pregunta amablemente!"
      },
      autonomousGame: {
        type: "prosocial-decision",
        instruction: "Aplica el Código de Ayuda en estas situaciones escolares:",
        situations: [
          {
            title: "Situación A: En el patio de juegos",
            desc: "Martín se tropezó corriendo y se raspó la rodilla. Está sentado en el suelo sobándose.",
            options: [
              { text: "Acercarme, preguntarle si le duele y acompañarlo donde la profesora", correct: true, feedback: "¡Exacto! Miraste, preguntaste y le diste tu apoyo solidario." },
              { text: "Seguir corriendo ignorándolo", correct: false, feedback: "Cuando alguien sufre un golpe, una mirada amable y una pregunta oportuna marcan la diferencia." }
            ]
          },
          {
            title: "Situación B: En la mesa de plastilina",
            desc: "Sofía está haciendo una figura concentrada. Tú quieres ponerle ojos de plastilina a su figura.",
            options: [
              { text: "Preguntarle: '¿Quieres que te ayude con los ojitos o prefieres hacerlos tú?'", correct: true, feedback: "¡Perfecto! Respetas su proyecto y ofreces tu ayuda sin invadirla." },
              { text: "Ponerle los ojos sin pedir permiso", correct: false, feedback: "Recuerda que a veces queremos hacer las cosas nosotros solos para aprender." }
            ]
          }
        ]
      },
      feedback: {
        success: "¡Extraordinario! Ahora eres miembro oficial del Escuadrón del Código de Ayuda. Sabes mirar, preguntar y colaborar con respeto.",
        support: "Excelente práctica. Ayudar hace sentir bien a quien recibe la ayuda y a quien la brinda con el corazón."
      },
      closing: {
        question: "¿Por qué es tan importante preguntar antes de ayudar a alguien?",
        reflection: "Porque preguntar demuestra que respetamos el espacio y las decisiones de nuestros amigos."
      },
      reward: {
        badgeId: "badge-ayuda",
        badgeName: "Escudo de la Solidaridad",
        badgeIcon: "🤝",
        stars: 3,
        description: "¡Miras, preguntas y ayudas con respeto y generosidad!"
      }
    },
    teacherNote: "Guía docente p. 53-58: Destacar la prosocialidad como una conducta voluntaria que beneficia al otro y fortalece el clima seguro del aula."
  },

  // ==========================================
  // MUNDO 3: COMUNICACIÓN Y CONFLICTOS (Sesiones 7, 8, 9)
  // ==========================================
  {
    id: "g1-w3-s7",
    grade: 1,
    worldId: "world-3",
    sessionNumber: 7,
    officialCode: "Sesión 7/9",
    title: "Tu turno, te escucho: Escuchar atentamente y sin interrumpir",
    competence: "Escucha activa",
    learningObjective: "Aprender a escuchar a los demás con atención, sin interrumpir, utilizando la regla del objeto de la palabra.",
    characterName: "Ramón y Ramona",
    characterSvg: "assets/illustrations/lumi.png",
    gameType: "active-listening", // Simulación de conversación y respeto de turnos
    offlineReady: true,
    isOfficial: true,

    pedagogicalPhases: {
      welcome: {
        text: "¡Bienvenidos al Mundo 3! Soy Lumi junto a los títeres Ramón y Ramona. Ellos vivieron una aventura divertidísima en el parque, pero casi no logran contarla porque hablaban los dos a la vez. ¡Vamos a ver qué pasó!",
        audioText: "Bienvenido al Mundo 3 de Comunicación y Conflictos. Hoy aprenderemos a escuchar sin interrumpir usando el objeto de la palabra."
      },
      explanation: {
        title: "El experimento del ruido y la magia de escuchar",
        text: "Cuando todos gritamos el nombre de nuestra fruta favorita a la vez, solo hay ruido confuso y nadie entiende nada. Pero cuando uno habla y los demás guardan silencio respetuoso, ¡las historias cobran vida! Ramón quería contar que vio un perrito y Ramona quería contar que vio un gatito. Al interrumpirse ninguno se escuchó. Para solucionarlo, crearon la regla: 'Solo habla quien tiene el objeto de la palabra en la mano'.",
        rules: [
          "Quien tiene el objeto en la mano: Habla con voz clara y tranquila.",
          "Quien NO tiene el objeto: Mira a los ojos, escucha en silencio y no interrumpe.",
          "Al decir ¡CAMBIO!: El objeto pasa al compañero y se intercambian los roles."
        ]
      },
      demonstration: {
        title: "Ramón y Ramona se escuchan por turnos",
        text: "Ramón toma la pelota de la palabra: 'Ayer vi un perrito saltarín que corría tras una mariposa'. Ramona escucha atenta con una sonrisa. Luego Ramón le pasa la pelota: '¡Cambio!'. Ramona dice: '¡Y yo vi un gatito blanco subido en un árbol!'. ¡Ahora los dos conocen la historia del otro y están felices!",
        hint: "Escuchar demuestra que la otra persona nos importa de verdad."
      },
      guidedPractice: {
        prompt: "Tu mejor amigo te está contando muy emocionado cómo celebró su cumpleaños. A ti se te ocurre una idea de tus juguetes. ¿Qué debes hacer?",
        options: [
          "Esperar con paciencia a que termine de hablar, mirarlo a los ojos y luego contarle mi idea",
          "Interrumpirlo de inmediato gritando más fuerte para que me escuche a mí",
          "Darme la vuelta e irme a jugar a otro lado"
        ],
        correctIndex: 0,
        hint: "Espera a que tu amigo termine su turno para que se sienta valorado."
      },
      autonomousGame: {
        type: "listening-challenge",
        instruction: "Demuestra tus habilidades de escucha activa en estos retos:",
        challenges: [
          {
            speaker: "Ramón dice:",
            dialogue: "En el parque me encontré un perrito café que tenía una manchita blanca en la cola.",
            question: "¿De qué color era la manchita en la cola del perrito de Ramón?",
            answers: ["Blanca", "Negra", "Azul"],
            correctIndex: 0,
            feedback: "¡Genial! Estabas prestando toda tu atención a las palabras de Ramón."
          },
          {
            speaker: "Ramona dice:",
            dialogue: "A mí me gusta mucho comer fresas con leche condensada en los domingos soleados.",
            question: "¿Qué fruta le gusta comer a Ramona los domingos?",
            answers: ["Fresas", "Plátanos", "Sandía"],
            correctIndex: 0,
            feedback: "¡Exacto! Has demostrado una excelente escucha activa."
          }
        ]
      },
      feedback: {
        success: "¡Magnífico! Tienes oídos de detective respetuoso. Escuchar con atención es un regalo hermoso que le das a tus amigos.",
        support: "Muy bien hecho. Guardar el turno de la palabra hace que jugar y aprender juntos sea una fiesta."
      },
      closing: {
        question: "¿Cómo te sientes tú cuando quieres contar algo importante y nadie te interrumpe y todos te escuchan?",
        reflection: "Sentirse escuchado nos hace sentir queridos y respetados. Hagamos que nuestros amigos sientan lo mismo."
      },
      reward: {
        badgeId: "badge-escucha",
        badgeName: "Micrófono de Oro del Respeto",
        badgeIcon: "🎙️",
        stars: 3,
        description: "¡Sabes escuchar con el corazón y respetar los turnos de la palabra!"
      }
    },
    teacherNote: "Guía docente p. 59-65: El objeto de la palabra es un instrumento pedagógico concreto que regula la impulsividad verbal en 1° grado."
  },

  {
    id: "g1-w3-s8",
    grade: 1,
    worldId: "world-3",
    sessionNumber: 8,
    officialCode: "Sesión 8/9",
    title: "DiNo el dinosaurio: Digo que no con respeto y firmeza cuando algo no me gusta",
    competence: "Asertividad",
    learningObjective: "Aprender a decir que no con amabilidad y firmeza cuando algo me molesta, expresando lo que siento sin agredir.",
    characterName: "DiNo el Dinosaurio",
    characterSvg: "assets/illustrations/dino.svg",
    gameType: "assertive-dialogue", // Simulación de diálogo asertivo
    offlineReady: true,
    isOfficial: true,

    pedagogicalPhases: {
      welcome: {
        text: "¡ROOOAR amistoso! Soy DiNo, el dinosaurio más pacífico de la selva. Antes, cuando alguien me molestaba, yo gritaba y empujaba, pero la pelea se hacía más grande. Luego descubrí mi táctica infalible: ¡Decir NO con respeto y firmeza!",
        audioText: "Soy DiNo el dinosaurio. Hoy aprenderemos a decir que no con amabilidad y firmeza cuando algo no nos gusta."
      },
      explanation: {
        title: "La Táctica de DiNo el dinosaurio",
        text: "Rosa estaba triste porque peleaba con sus amigos. Cuando Clara le movía la mesa, Rosa le decía '¡Bruta!'. DiNo le enseñó su secreto de dos pasos: PASO 1: Di 'NO' de manera amable pero firme. PASO 2: Di lo que estás sintiendo y lo que necesitas. Por ejemplo: 'No, no me gusta que me empujes. Me molesta y por favor no lo hagas más'.",
        steps: [
          { num: "1", title: "Paso 1: Di 'NO' amable", text: "Usa un tono firme, mirando a los ojos, sin insultar ni pegar." },
          { num: "2", title: "Paso 2: Di lo que sientes", text: "'Eso me molesta', 'me da rabia que me digas así', 'por favor para'." }
        ]
      },
      demonstration: {
        title: "La táctica en acción",
        text: "Mira la diferencia: Si Pacho te saca de la fila en la tienda: Reacción agresiva: Empujar a Pacho y decirle un apodo feo (provoca pelea). Reacción pasiva: Quedarse callado llorando (Pacho seguirá empujando). Táctica de DiNo: 'Pacho, no me empujes. Me molesta que me saques de la fila. Por favor respeta mi turno'.",
        hint: "La firmeza respetuosa desarma la agresión."
      },
      guidedPractice: {
        prompt: "Estás coloreando con mucho esmero y Lucy te mueve la mano con la que pintas y se ríe. ¿Cómo responderías con la táctica de DiNo?",
        options: [
          "'No hagas eso, Lucy. Me molesta mucho que dañes mi dibujo. Por favor para'",
          "'¡Lucy, eres la peor y te voy a rayar la cara!'",
          "Ponerme a llorar sin decirle nada a Lucy"
        ],
        correctIndex: 0,
        hint: "Recuerda: di NO claramente y explica qué sientes sin agredir."
      },
      autonomousGame: {
        type: "assertive-builder",
        instruction: "Construye la respuesta asertiva de DiNo para cada situación cotidiana:",
        situations: [
          {
            situationTitle: "Situación 1: Apodos en el patio",
            desc: "Kevin te dice 'tonto' delante de los otros niños.",
            correctParts: [
              "No me digas así, Kevin.",
              "Me disgusta mucho que me llames así.",
              "Por favor llámame por mi nombre."
            ],
            distractors: ["¡Tonto tú!", "Me quedo callado mirando el suelo", "Le tiro tierra"]
          },
          {
            situationTitle: "Situación 2: El juego de la pelota",
            desc: "Marta te dice que ella manda en el juego y no quiere que juegues con ellos.",
            correctParts: [
              "Marta, no me hables así.",
              "Me da rabia y tristeza cuando intentas sacarme del juego.",
              "Podemos compartir la pelota entre todos."
            ],
            distractors: ["¡Te voy a pinchar el balón!", "Me voy triste a un rincón solo", "La empujo"]
          }
        ]
      },
      feedback: {
        success: "¡Rugido de victoria! Usaste la táctica de DiNo con maestría: clara, firme y sin violencia. Así se defienden los derechos con dignidad.",
        support: "Muy bien intentado. Decir NO con educación requiere práctica, ¡y cada vez lo harás mejor!"
      },
      closing: {
        question: "¿En qué situación de tu vida puedes usar la táctica de DiNo para poner un límite sano?",
        reflection: "Nadie tiene derecho a lastimarte, y tú tienes el poder de decir NO con serenidad y valentía."
      },
      reward: {
        badgeId: "badge-dino",
        badgeName: "Coraza Asertiva de DiNo",
        badgeIcon: "🦕",
        stars: 3,
        description: "¡Dices que NO con firmeza, amabilidad y respeto mutuo!"
      }
    },
    teacherNote: "Guía docente p. 66-71: Diferenciar entre pasividad, agresividad y asertividad. Ante casos de acoso sistemático (bullying), el docente debe intervenir de inmediato."
  },

  {
    id: "g1-w3-s9",
    grade: 1,
    worldId: "world-3",
    sessionNumber: 9,
    officialCode: "Sesión 9/9",
    title: "Si no nos ponemos de acuerdo: Turnarme con mis amigos cuando queremos hacer cosas distintas",
    competence: "Manejo de conflictos",
    learningObjective: "Aprender a buscar acuerdos y turnarme con mis amigos cuando queremos hacer actividades diferentes.",
    characterName: "Lola y Lalo",
    characterSvg: "assets/illustrations/lola-lalo.svg",
    gameType: "turn-negotiation", // Juego de turnos y cooperación
    offlineReady: true,
    isOfficial: true,

    pedagogicalPhases: {
      welcome: {
        text: "¡Hola! Somos Lola y Lalo, dos amigos inseparables. A veces queremos hacer cosas distintas al mismo tiempo y casi nos peleamos. Pero descubrimos el poder de ¡TURNARNOS! Hoy te invitamos a nuestro gran reto final.",
        audioText: "Somos Lola y Lalo. Hoy aprenderemos a turnarnos para que todos podamos disfrutar lo que nos gusta y resolver desacuerdos."
      },
      explanation: {
        title: "La historia de Lola y Lalo",
        text: "Lola quería jugar a los superhéroes y correr veloces por el patio. Lalo estaba cansado y quería resolver un libro nuevo de laberintos. Como no se ponían de acuerdo, empezaron a decirse: '¡Aburrido tú!', '¡Mandona tú!'. Pero recordaron respirar hondo como Globito y propusieron: '¡Juguemos a las dos cosas por turnos! Primero corremos a los superhéroes y luego nos sentamos con el libro'. ¡Y la pasaron genial!",
        steps: [
          "1. Reconocer el desacuerdo sin gritar.",
          "2. Proponer turnos: 'Primero hacemos tu juego y luego el mío'.",
          "3. Cumplir el acuerdo con alegría."
        ]
      },
      demonstration: {
        title: "Cooperar en el laberinto",
        text: "Cuando abrieron el libro, los dos querían rayar a la vez y chocaban las manos. Lola dijo: '¡Hagamos turnos en el libro también! Primero tú haces un laberinto y yo te ayudo a buscar el camino, y luego yo uno los puntos'. ¡Y descubrieron un león fantástico!",
        hint: "Turnarse permite que nadie se quede por fuera."
      },
      guidedPractice: {
        prompt: "En el recreo solo hay un columpio libre. Tanto tú como tu compañero Camilo quieren montarse en él. ¿Cuál es la mejor solución?",
        options: [
          "Proponer: 'Montémonos 5 minutos cada uno. Mientras tú te columpias, yo te empujo, y luego cambiamos'",
          "Empujar a Camilo para subirme yo primero",
          "Ponerse a llorar y no jugar a nada"
        ],
        correctIndex: 0,
        hint: "Turnarse es una solución donde los dos ganan."
      },
      autonomousGame: {
        type: "coop-turn-maze",
        instruction: "Ayuda a Lola y Lalo a turnarse para resolver el laberinto de la amistad:",
        mazeTurns: [
          { turn: "Turno 1: Lola elije la ruta del puente", prompt: "¿Hacia dónde debe avanzar Lola?", choice: "Hacia el puente de madera", options: ["Hacia el puente de madera", "Quedarse quieta en la esquina"] },
          { turn: "Turno 2: Lalo toma el control", prompt: "¿Cómo colabora Lola mientras le toca a Lalo?", choice: "Le indica el camino con entusiasmo y paciencia", options: ["Le quita el lápiz", "Le indica el camino con entusiasmo y paciencia"] },
          { turn: "Turno 3: ¡Meta compartida!", prompt: "Llegan juntos a la meta del león. ¿Qué hacen?", choice: "Chocan las manos y celebran haber jugado ambos", options: ["Chocan las manos y celebran haber jugado ambos", "Discutir quién llegó primero"] }
        ]
      },
      feedback: {
        success: "¡INCREÍBLE! Has completado el Gran Desafío Final de 1º Grado. Aprendiste a reconocer tus emociones, a ver por los ojos de otros, a pedir ayuda y a turnarte en paz.",
        support: "Excelente esfuerzo. Cuando sabemos turnarnos, los amigos duran para toda la vida."
      },
      closing: {
        question: "¿A qué juego te gustaría turnarte mañana con tus amigos en el colegio?",
        reflection: "Los conflictos son oportunidades para pensar juntos en soluciones donde todos ganemos."
      },
      reward: {
        badgeId: "badge-lola-lalo",
        badgeName: "Copa Dorada del Acuerdo y la Amistad",
        badgeIcon: "🏆",
        stars: 3,
        description: "¡Has completado todas las aventuras de Primero de Primaria en los Mundos de las Emociones!"
      }
    },
    teacherNote: "Guía docente p. 72-77: Los turnos y las soluciones 'gana-gana' enseñan negociación inicial y disminuyen conductas impulsivas de apropiación de recursos."
  }
];
