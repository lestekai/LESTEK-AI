export interface ExerciseLibraryItem {
  id: string;
  name: string;
  targetMuscles: string[];
  equipment: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  description: string;
  instructions: string;
  commonErrors: string[];
  substitutions: string[];
  gifPlaceholder: string;
  gifUrl?: string; // URL for mini animation or placeholder (mp4)
}

export const EXERCISE_LIBRARY: ExerciseLibraryItem[] = [
  {
    "id": "cardio_esteira",
    "name": "Esteira (Corrida/Caminhada)",
    "targetMuscles": [
      "Cardio",
      "Pernas"
    ],
    "equipment": "Esteira",
    "difficulty": "Iniciante",
    "description": "Exercício cardiovascular na esteira.",
    "instructions": "Ajuste a velocidade e a inclinação da esteira de acordo com o seu nível de condicionamento. Mantenha uma postura ereta e os braços em movimento.",
    "commonErrors": [
      "Apoiar o peso do corpo nos braços da esteira.",
      "Olhar para baixo, prejudicando a postura."
    ],
    "substitutions": [
      "Bicicleta Ergométrica",
      "Elíptico"
    ],
    "gifPlaceholder": "Esteira"
  },
  {
    "id": "cardio_bicicleta",
    "name": "Bicicleta Ergométrica",
    "targetMuscles": [
      "Cardio",
      "Pernas"
    ],
    "equipment": "Máquina Multifuncional",
    "difficulty": "Iniciante",
    "description": "Exercício aeróbico de baixo impacto simulando ciclismo.",
    "instructions": "Ajuste o banco de forma que a perna fique levemente flexionada na parte mais baixa do pedal. Mantenha as costas retas e o core contraído.",
    "commonErrors": [
      "Banco muito baixo ou muito alto.",
      "Curvar demais as costas."
    ],
    "substitutions": [
      "Esteira",
      "Elíptico"
    ],
    "gifPlaceholder": "Bicicleta Ergométrica"
  },
  {
    "id": "cardio_eliptico",
    "name": "Elíptico",
    "targetMuscles": [
      "Cardio",
      "Pernas",
      "Braços"
    ],
    "equipment": "Máquina Multifuncional",
    "difficulty": "Iniciante",
    "description": "Exercício de corpo inteiro com baixo impacto nas articulações.",
    "instructions": "Posicione os pés nos pedais e as mãos nas hastes móveis. Realize o movimento de forma contínua, utilizando a força das pernas e dos braços simultaneamente.",
    "commonErrors": [
      "Fazer força apenas com os braços.",
      "Levantar os calcanhares dos pedais em excesso."
    ],
    "substitutions": [
      "Esteira",
      "Bicicleta Ergométrica"
    ],
    "gifPlaceholder": "Elíptico"
  },
  {
    "id": "cardio_pular_corda",
    "name": "Pular Corda",
    "targetMuscles": [
      "Cardio",
      "Panturrilhas"
    ],
    "equipment": "Nenhum",
    "difficulty": "Intermediário",
    "description": "Exercício aeróbico de alta intensidade que também trabalha coordenação.",
    "instructions": "Com a coluna ereta, pule apenas o suficiente para a corda passar sob seus pés. Mantenha os cotovelos próximos ao corpo e gire a corda com os pulsos.",
    "commonErrors": [
      "Pular muito alto.",
      "Girar a corda com os ombros em vez dos pulsos."
    ],
    "substitutions": [
      "Polichinelos"
    ],
    "gifPlaceholder": "Pular Corda"
  },
  {
    "id": "cardio_hiit_polichinelo",
    "name": "Polichinelos",
    "targetMuscles": [
      "Cardio",
      "Corpo Todo"
    ],
    "equipment": "Nenhum",
    "difficulty": "Iniciante",
    "description": "Exercício calistênico clássico para aumento da frequência cardíaca.",
    "instructions": "Salte afastando as pernas e elevando os braços acima da cabeça simultaneamente. Retorne à posição inicial saltando novamente.",
    "commonErrors": [
      "Não estender totalmente os braços.",
      "Pisar muito forte no chão, gerando impacto nas articulações."
    ],
    "substitutions": [
      "Pular Corda"
    ],
    "gifPlaceholder": "Polichinelos"
  },
  {
    "id": "supino_inclinado_com_barra",
    "name": "Supino Inclinado com Barra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Supino Inclinado com Barra é um exercício composto para a parte superior do corpo que tem como alvo principal a porção superior dos músculos peitora...",
    "instructions": "O Supino Inclinado com Barra é um exercício composto para a parte superior do corpo que tem como alvo principal a porção superior dos músculos peitorais, com ênfase secundária nos ombros e tríceps. É realizado em um banco inclinado ajustado em um ângulo de 15-30 graus, o que direciona mais foco para a parte superior do peito em comparação com o supino reto.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Barra",
    "gifUrl": "https://api.smartworkout.app/asset/video/d8c4f097-b27a-4178-ab88-ea69ae93ab97.mp4"
  },
  {
    "id": "flexao_de_punho_invertida",
    "name": "Flexão de Punho Invertida",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Reverse Wrist Push-Up é um exercício avançado de peso corporal que visa os antebraços, pulsos e flexores dos dedos. Envolve a execução de uma flexão...",
    "instructions": "O Reverse Wrist Push-Up é um exercício avançado de peso corporal que visa os antebraços, pulsos e flexores dos dedos. Envolve a execução de uma flexão com os pulsos em posição invertida, o que coloca um estresse significativo nas articulações dos pulsos e nos músculos do antebraço. Este exercício requer um alto nível de flexibilidade e força nos pulsos, tornando-o adequado apenas para indivíduos experientes.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Punho Invertida",
    "gifUrl": "https://api.smartworkout.app/asset/video/f5d0f893-be62-47b0-bef9-a87179120f8f.mp4"
  },
  {
    "id": "crucifixo_no_cabo_alto_baixo",
    "name": "Crucifixo no Cabo Alto-Baixo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O High Low Cable Chest Fly é um exercício de isolamento que foca nos músculos peitorais. Envolve o uso de uma máquina de cabos para realizar um movime...",
    "instructions": "O High Low Cable Chest Fly é um exercício de isolamento que foca nos músculos peitorais. Envolve o uso de uma máquina de cabos para realizar um movimento de fly, começando com os cabos posicionados acima dos ombros e puxando-os para baixo em um arco em direção à linha média do corpo. Este movimento enfatiza a parte inferior do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo no Cabo Alto-Baixo",
    "gifUrl": "https://api.smartworkout.app/asset/video/9514aef8-30ff-4652-9524-9cf4633346db.mp4"
  },
  {
    "id": "supino_em_pe_com_cabo",
    "name": "Supino em Pé com Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Standing Cable Chest Press é um exercício eficaz que visa os músculos peitorais, tríceps e deltoides anteriores. Envolve pressionar um cabo para a f...",
    "instructions": "O Standing Cable Chest Press é um exercício eficaz que visa os músculos peitorais, tríceps e deltoides anteriores. Envolve pressionar um cabo para a frente enquanto está em pé, envolvendo o core para estabilidade e equilíbrio.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino em Pé com Cabo",
    "gifUrl": "https://api.smartworkout.app/asset/video/ef96f9bc-745f-4096-a1c1-f5fdd71e94df.mp4"
  },
  {
    "id": "supino_com_barra_no_chao",
    "name": "Supino com Barra no Chão",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Barbell Floor Press é um exercício composto para a parte superior do corpo que trabalha o peito, tríceps e ombros. É realizado deitando-se no chão e...",
    "instructions": "O Barbell Floor Press é um exercício composto para a parte superior do corpo que trabalha o peito, tríceps e ombros. É realizado deitando-se no chão e pressionando uma barra do nível do peito até a extensão dos braços acima do torso. Este exercício minimiza a tensão nos ombros e enfatiza o envolvimento dos tríceps devido à amplitude de movimento limitada.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Barra no Chão",
    "gifUrl": "https://api.smartworkout.app/asset/video/8b18f8e1-e2d8-41b9-a5e5-692999b6c551.mp4"
  },
  {
    "id": "flexao_de_bracos_sobre_os_punhos",
    "name": "Flexão de Braços sobre os Punhos",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Flexões de Punho são uma variação da flexão tradicional realizada nos punhos em vez das palmas das mãos. Este exercício foca no peito, tríceps, ombros...",
    "instructions": "Flexões de Punho são uma variação da flexão tradicional realizada nos punhos em vez das palmas das mãos. Este exercício foca no peito, tríceps, ombros e core, enquanto também fortalece os pulsos e antebraços. É frequentemente usado no treinamento de artes marciais para melhorar a potência dos socos e a estabilidade dos pulsos.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços sobre os Punhos",
    "gifUrl": "https://api.smartworkout.app/asset/video/cee320e7-68cd-4b50-86f8-ab7dea36a6b6.mp4"
  },
  {
    "id": "supino_inclinado_com_cabo_em_pe",
    "name": "Supino Inclinado com Cabo em Pé",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Standing Cable Low Chest Press tem como alvo a parte inferior dos músculos peitorais. Este exercício é realizado usando uma máquina de cabos com as ...",
    "instructions": "O Standing Cable Low Chest Press tem como alvo a parte inferior dos músculos peitorais. Este exercício é realizado usando uma máquina de cabos com as polias ajustadas em uma posição baixa. Ele envolve o peito, os ombros e os tríceps, promovendo o crescimento muscular e a força na parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Cabo em Pé",
    "gifUrl": "https://api.smartworkout.app/asset/video/a6ab5a37-9332-4d22-95f0-f59cf333b5cd.mp4"
  },
  {
    "id": "flexao_de_bracos_superman",
    "name": "Flexão de Braços Superman",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Spider Push Up é uma variação dinâmica da flexão tradicional que envolve o core, peito, ombros, tríceps e oblíquos. Consiste em trazer um joelho em ...",
    "instructions": "O Spider Push Up é uma variação dinâmica da flexão tradicional que envolve o core, peito, ombros, tríceps e oblíquos. Consiste em trazer um joelho em direção ao cotovelo do mesmo lado enquanto você abaixa o corpo, adicionando um elemento de estabilização do core e mobilidade.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços Superman",
    "gifUrl": "https://api.smartworkout.app/asset/video/fcabbb3a-e431-48e8-a2b7-175fd1fe3a89.mp4"
  },
  {
    "id": "supino_inclinado_com_cabo_baixo",
    "name": "Supino Inclinado com Cabo Baixo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Low Cable Incline Bench Press é um exercício composto que visa os músculos do peito superior, especificamente a cabeça clavicular do peitoral maior....",
    "instructions": "O Low Cable Incline Bench Press é um exercício composto que visa os músculos do peito superior, especificamente a cabeça clavicular do peitoral maior. Este exercício também envolve os deltoides anteriores e tríceps. Ao usar cabos, proporciona tensão constante durante o movimento, aumentando a ativação e o crescimento muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Cabo Baixo",
    "gifUrl": "https://api.smartworkout.app/asset/video/2e44a1be-2421-4f9a-a706-ad09c60dc824.mp4"
  },
  {
    "id": "mergulho_coreano",
    "name": "Mergulho Coreano",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Korean Dip é um exercício avançado de peso corporal que trabalha os tríceps, ombros e peito. Ele envolve um padrão de movimento único que requer for...",
    "instructions": "O Korean Dip é um exercício avançado de peso corporal que trabalha os tríceps, ombros e peito. Ele envolve um padrão de movimento único que requer força significativa na parte superior do corpo e estabilidade. Este exercício é geralmente realizado em barras paralelas e é conhecido por sua transição dinâmica de um mergulho para uma sustentação horizontal.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Mergulho Coreano",
    "gifUrl": "https://api.smartworkout.app/asset/video/8882f5e4-8e0a-4d6a-8555-9614262afcac.mp4"
  },
  {
    "id": "boxe_com_saco_de_pancadas",
    "name": "Boxe com Saco de Pancadas",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Punching Bag Boxing é um exercício cardiovascular e de treinamento de força que envolve golpear um saco pesado com vários socos. Este exercício melh...",
    "instructions": "O Punching Bag Boxing é um exercício cardiovascular e de treinamento de força que envolve golpear um saco pesado com vários socos. Este exercício melhora a coordenação motora, fortalece a parte superior do corpo, aumenta a resistência cardiovascular e ajuda a aliviar o estresse. Ele envolve músculos nos ombros, braços, peito e core.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Boxe com Saco de Pancadas",
    "gifUrl": "https://api.smartworkout.app/asset/video/8d12dabe-ce8c-49d2-a0d9-5a0080e2aeee.mp4"
  },
  {
    "id": "cao_descendente_em_pe",
    "name": "Cão Descendente em Pé",
    "targetMuscles": [
      "Panturrilhas"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Standing Downward Dog é uma variação da tradicional pose de ioga Downward Dog, realizada em pé. Ele foca principalmente nos ombros, isquiotibiais, p...",
    "instructions": "O Standing Downward Dog é uma variação da tradicional pose de ioga Downward Dog, realizada em pé. Ele foca principalmente nos ombros, isquiotibiais, panturrilhas e músculos das costas, promovendo flexibilidade e força. Este exercício é benéfico para melhorar a postura e aliviar a tensão na parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Cão Descendente em Pé",
    "gifUrl": "https://api.smartworkout.app/asset/video/81311858-3f0b-48e7-a043-87855e01e7a9.mp4"
  },
  {
    "id": "mergulho_em_barra_reta",
    "name": "Mergulho em Barra Reta",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Os Straight Bar Dips são um exercício composto para a parte superior do corpo que tem como alvo principal os tríceps, peito e ombros. Este exercício e...",
    "instructions": "Os Straight Bar Dips são um exercício composto para a parte superior do corpo que tem como alvo principal os tríceps, peito e ombros. Este exercício envolve abaixar e levantar o corpo usando uma barra reta, envolvendo múltiplos grupos musculares para força e estabilidade.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Mergulho em Barra Reta",
    "gifUrl": "https://api.smartworkout.app/asset/video/f315f7c3-ca7c-4b39-b1a0-8ff9f64cab61.mp4"
  },
  {
    "id": "flexao_de_bracos_com_salto",
    "name": "Flexão de Braços com Salto",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Push Up Jack é um exercício dinâmico que combina a flexão tradicional com o movimento de um polichinelo. Ele trabalha os músculos do peito, ombros, ...",
    "instructions": "O Push Up Jack é um exercício dinâmico que combina a flexão tradicional com o movimento de um polichinelo. Ele trabalha os músculos do peito, ombros, tríceps e core, além de proporcionar benefícios cardiovasculares. Este exercício melhora a força da parte superior do corpo, a resistência e a coordenação.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Salto",
    "gifUrl": "https://api.smartworkout.app/asset/video/e95195f5-f331-4871-b0c2-eed87274e043.mp4"
  },
  {
    "id": "mergulhos_em_planche",
    "name": "Mergulhos em Planche",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Os Planche Dips são um exercício avançado de peso corporal que combina elementos da posição planche e do movimento de mergulho. Este exercício tem com...",
    "instructions": "Os Planche Dips são um exercício avançado de peso corporal que combina elementos da posição planche e do movimento de mergulho. Este exercício tem como alvo principal os músculos do peito, ombros, tríceps e core. Requer força significativa na parte superior do corpo, equilíbrio e coordenação.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Mergulhos em Planche",
    "gifUrl": "https://api.smartworkout.app/asset/video/c9e11a50-3f0a-4fce-a4cb-deb79ba7dec0.mp4"
  },
  {
    "id": "flexao_de_braco_unilateral",
    "name": "Flexão de Braço Unilateral",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Flexão com um Braço é um exercício avançado de peso corporal que trabalha os músculos do peito, ombros, tríceps e core. Requer força significativa, ...",
    "instructions": "O Flexão com um Braço é um exercício avançado de peso corporal que trabalha os músculos do peito, ombros, tríceps e core. Requer força significativa, equilíbrio e estabilidade, tornando-o uma progressão desafiadora em relação à flexão padrão.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braço Unilateral",
    "gifUrl": "https://api.smartworkout.app/asset/video/1ac58147-1cfd-40f2-9aa7-549d8b6e5365.mp4"
  },
  {
    "id": "flexao_profunda_em_barras_paralelas",
    "name": "Flexão Profunda em Barras Paralelas",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Deep Push Up On Parallel Bars é um exercício avançado para a parte superior do corpo que foca no peito, tríceps e ombros. Ao realizar este exercício...",
    "instructions": "O Deep Push Up On Parallel Bars é um exercício avançado para a parte superior do corpo que foca no peito, tríceps e ombros. Ao realizar este exercício em barras paralelas, você aumenta a amplitude de movimento em comparação com as flexões padrão, o que melhora o envolvimento muscular e o desenvolvimento da força.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão Profunda em Barras Paralelas",
    "gifUrl": "https://api.smartworkout.app/asset/video/7b5d548e-b3c8-4dc8-b120-94363928e4af.mp4"
  },
  {
    "id": "crucifixo_com_halteres_em_banco_inclinado_baixo",
    "name": "Crucifixo com Halteres em Banco Inclinado Baixo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Dumbbell Incline Low Fly é um exercício de isolamento que foca na parte superior dos músculos peitorais. É realizado em um banco inclinado, o que en...",
    "instructions": "O Dumbbell Incline Low Fly é um exercício de isolamento que foca na parte superior dos músculos peitorais. É realizado em um banco inclinado, o que enfatiza a cabeça clavicular do peitoral maior. Este exercício também envolve os deltoides anteriores e estabiliza a articulação do ombro.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com Halteres em Banco Inclinado Baixo",
    "gifUrl": "https://api.smartworkout.app/asset/video/168d5fa2-455a-4bf2-9b1e-9a6dbe85a820.mp4"
  },
  {
    "id": "crucifixo_em_crossover_ajoelhado_de_cima_para_baixo",
    "name": "Crucifixo em Crossover Ajoelhado de Cima para Baixo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Os crucifixos com cabos de joelhos visam os músculos do peito, especificamente o peitoral maior, enquanto também envolvem os ombros e tríceps. Este ex...",
    "instructions": "Os crucifixos com cabos de joelhos visam os músculos do peito, especificamente o peitoral maior, enquanto também envolvem os ombros e tríceps. Este exercício é realizado usando uma máquina de cabos com polias ajustadas em uma posição alta. Ficar de joelhos proporciona estabilidade e foca o movimento no peito, minimizando o envolvimento das pernas.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo em Crossover Ajoelhado de Cima para Baixo",
    "gifUrl": "https://api.smartworkout.app/asset/video/fe26e4e4-5024-47bf-b476-266eb81ee6d7.mp4"
  },
  {
    "id": "crucifixo_unilateral_na_polia",
    "name": "Crucifixo Unilateral na Polia",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O exercício de Fly com Cabo de Um Braço é um exercício de isolamento que foca nos músculos peitorais, especificamente o peito. Envolve o uso de uma má...",
    "instructions": "O exercício de Fly com Cabo de Um Braço é um exercício de isolamento que foca nos músculos peitorais, especificamente o peito. Envolve o uso de uma máquina de cabos para realizar um movimento de fly com um braço, permitindo um treino unilateral e melhorando a simetria muscular. Este exercício ajuda a melhorar a definição muscular e a força na área do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Unilateral na Polia",
    "gifUrl": "https://api.smartworkout.app/asset/video/d685bb1f-4c4d-42b7-bae9-52adb3ae6a13.mp4"
  },
  {
    "id": "supino_larsen_com_halteres",
    "name": "Supino Larsen com Halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Dumbbell Larsen Press é uma variação do supino que enfatiza a força e a estabilidade da parte superior do corpo. É realizado com halteres enquanto o...",
    "instructions": "O Dumbbell Larsen Press é uma variação do supino que enfatiza a força e a estabilidade da parte superior do corpo. É realizado com halteres enquanto os pés permanecem fora do chão, o que aumenta o envolvimento do core e reduz o impulso das pernas, focando mais no peito, ombros e tríceps.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Larsen com Halteres",
    "gifUrl": "https://api.smartworkout.app/asset/video/aa5076ef-fa6e-47bc-9e61-10a759bf9762.mp4"
  },
  {
    "id": "crucifixo_baixo_com_halter_unilateral",
    "name": "Crucifixo Baixo com Halter Unilateral",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Dumbbell One Arm Low Fly é um exercício de isolamento que visa os músculos peitorais, particularmente a parte inferior do peito. Envolve um moviment...",
    "instructions": "O Dumbbell One Arm Low Fly é um exercício de isolamento que visa os músculos peitorais, particularmente a parte inferior do peito. Envolve um movimento de um braço que ajuda a melhorar a simetria e o controle muscular. Este exercício também envolve os ombros e os músculos estabilizadores do core.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Baixo com Halter Unilateral",
    "gifUrl": "https://api.smartworkout.app/asset/video/f3e26a21-190d-409d-893a-298e58c857ee.mp4"
  },
  {
    "id": "crucifixo_no_cabo_para_peitoral_medio",
    "name": "Crucifixo no Cabo para Peitoral Médio",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Cable Middle Chest Fly é um exercício de isolamento que visa os músculos peitorais, especificamente a cabeça esternal do peitoral maior. É realizado...",
    "instructions": "O Cable Middle Chest Fly é um exercício de isolamento que visa os músculos peitorais, especificamente a cabeça esternal do peitoral maior. É realizado usando uma máquina de cabos com alças ajustadas na altura dos ombros, permitindo uma tensão controlada e consistente durante todo o movimento.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo no Cabo para Peitoral Médio",
    "gifUrl": "https://api.smartworkout.app/asset/video/44caa7ce-5e94-41e7-b0d0-5b3153a86b32.mp4"
  },
  {
    "id": "supino_com_halteres_em_pegada_fechada",
    "name": "Supino com Halteres em Pegada Fechada",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Close Grip Dumbbell Bench Press é um exercício composto que foca nos tríceps, peito e ombros. Envolve pressionar halteres a partir de uma posição su...",
    "instructions": "O Close Grip Dumbbell Bench Press é um exercício composto que foca nos tríceps, peito e ombros. Envolve pressionar halteres a partir de uma posição supina em um banco, com as mãos posicionadas mais próximas do que em um supino padrão. Este exercício enfatiza os tríceps enquanto também envolve os músculos peitorais e deltoides anteriores.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Halteres em Pegada Fechada",
    "gifUrl": "https://api.smartworkout.app/asset/video/8ee8d887-754d-42eb-8207-6f1dc5cae6c7.mp4"
  },
  {
    "id": "flexao_de_bracos_em_declinio",
    "name": "Flexão de Braços em Declínio",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Decline Push-Up é um exercício de peso corporal que foca no peito superior, ombros e tríceps, elevando os pés em uma superfície estável. Esta variaç...",
    "instructions": "O Decline Push-Up é um exercício de peso corporal que foca no peito superior, ombros e tríceps, elevando os pés em uma superfície estável. Esta variação aumenta a dificuldade em comparação com uma flexão padrão, transferindo mais peso para a parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços em Declínio",
    "gifUrl": "https://api.smartworkout.app/asset/video/a1aedffe-5731-4ede-815e-533668cc86c4.mp4"
  },
  {
    "id": "flexao_de_bracos_negativa",
    "name": "Flexão de Braços Negativa",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "As flexões negativas concentram-se na fase excêntrica da flexão, onde você abaixa o corpo lentamente até o chão. Este exercício ajuda a desenvolver fo...",
    "instructions": "As flexões negativas concentram-se na fase excêntrica da flexão, onde você abaixa o corpo lentamente até o chão. Este exercício ajuda a desenvolver força e controle, particularmente no peito, tríceps e ombros, ao enfatizar a tensão muscular durante a fase de descida.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços Negativa",
    "gifUrl": "https://api.smartworkout.app/asset/video/84d6fe54-f78f-421a-928c-3268917892ea.mp4"
  },
  {
    "id": "pressao_de_svend",
    "name": "Pressão de Svend",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Svend Press em pé é um exercício de isolamento que tem como alvo os músculos do peito, particularmente o peitoral maior. Envolve pressionar um disco...",
    "instructions": "O Svend Press em pé é um exercício de isolamento que tem como alvo os músculos do peito, particularmente o peitoral maior. Envolve pressionar um disco de peso enquanto mantém tensão constante no peito, promovendo o envolvimento e crescimento muscular. Este exercício é realizado em pé, o que também envolve o core para estabilidade.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Pressão de Svend",
    "gifUrl": "https://api.smartworkout.app/asset/video/70418929-f916-4a2f-822b-f2c9ba8d21d5.mp4"
  },
  {
    "id": "supino_no_smith",
    "name": "Supino no Smith",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Smith Bench Press é uma variação do supino tradicional realizada usando uma máquina Smith. Este exercício tem como alvo os músculos peitorais, tríce...",
    "instructions": "O Smith Bench Press é uma variação do supino tradicional realizada usando uma máquina Smith. Este exercício tem como alvo os músculos peitorais, tríceps e deltoides anteriores. A máquina Smith fornece um caminho guiado para a barra, o que pode ajudar a estabilizar o movimento e focar no engajamento muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino no Smith",
    "gifUrl": "https://api.smartworkout.app/asset/video/9c1188ad-87fa-402f-9c6c-5e1e1a6f6ba4.mp4"
  },
  {
    "id": "flexao_de_escapula",
    "name": "Flexão de Escápula",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Scapula Push-Up é um exercício que foca nos músculos ao redor da escápula, com ênfase principalmente no serrátil anterior. Ele melhora a estabilidad...",
    "instructions": "O Scapula Push-Up é um exercício que foca nos músculos ao redor da escápula, com ênfase principalmente no serrátil anterior. Ele melhora a estabilidade e a mobilidade dos ombros, sendo crucial para atletas e indivíduos que buscam melhorar a força da parte superior do corpo e a postura.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Escápula",
    "gifUrl": "https://api.smartworkout.app/asset/video/832436df-9b3d-4873-9d1f-b399f2ff003f.mp4"
  },
  {
    "id": "supino_com_halteres_no_chao",
    "name": "Supino com Halteres no Chão",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Floor Dumbbell Press é um exercício de treinamento de força que foca no peito, tríceps e ombros. É realizado deitado no chão, o que limita a amplitu...",
    "instructions": "O Floor Dumbbell Press é um exercício de treinamento de força que foca no peito, tríceps e ombros. É realizado deitado no chão, o que limita a amplitude de movimento e ajuda a proteger os ombros, permitindo um foco nos músculos de pressão. Este exercício é ideal para desenvolver a força e a massa muscular da parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Halteres no Chão",
    "gifUrl": "https://api.smartworkout.app/asset/video/d4d4942d-ab5e-4496-b15f-e55bcd5c99a9.mp4"
  },
  {
    "id": "supino_com_halteres_em_pegada_neutra",
    "name": "Supino com Halteres em Pegada Neutra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Hammer Grip Dumbbell Bench Press é um exercício de peito que trabalha os músculos peitorais, tríceps e deltoides anteriores. Envolve pressionar os h...",
    "instructions": "O Hammer Grip Dumbbell Bench Press é um exercício de peito que trabalha os músculos peitorais, tríceps e deltoides anteriores. Envolve pressionar os halteres para cima enquanto mantém uma pegada neutra, o que pode reduzir a tensão nos ombros e pulsos em comparação com as variações tradicionais de supino.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Halteres em Pegada Neutra",
    "gifUrl": "https://api.smartworkout.app/asset/video/4208805a-35b3-47da-a281-e3fcf76d3caa.mp4"
  },
  {
    "id": "pullover_com_barra",
    "name": "Pullover com Barra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O pullover com barra é um exercício composto que tem como alvo principal o peito e o latíssimo do dorso, enquanto também envolve os tríceps, ombros e ...",
    "instructions": "O pullover com barra é um exercício composto que tem como alvo principal o peito e o latíssimo do dorso, enquanto também envolve os tríceps, ombros e core. É realizado deitado em um banco com uma barra segurada acima do peito, em seguida, abaixando-a atrás da cabeça em um movimento em arco.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Pullover com Barra",
    "gifUrl": "https://api.smartworkout.app/asset/video/e5628a22-980d-4a2d-ba67-8923508ac2e2.mp4"
  },
  {
    "id": "flexao_de_bracos",
    "name": "Flexão de Braços",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "A flexão é um exercício de peso corporal que tem como alvo principal o peito, tríceps e ombros. Também envolve o core e os músculos estabilizadores, t...",
    "instructions": "A flexão é um exercício de peso corporal que tem como alvo principal o peito, tríceps e ombros. Também envolve o core e os músculos estabilizadores, tornando-se um treino abrangente para a parte superior do corpo. As flexões podem ser realizadas em qualquer lugar e são fundamentais para construir força e resistência.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços",
    "gifUrl": "https://api.smartworkout.app/asset/video/04e5def2-7ed5-4847-b027-ac66bdc658d7.mp4"
  },
  {
    "id": "crucifixo_no_pec_deck",
    "name": "Crucifixo no Pec Deck",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Pec Deck Chest Fly é um exercício de isolamento que visa os músculos peitorais, principalmente o peitoral maior. Envolve o uso de uma máquina pec de...",
    "instructions": "O Pec Deck Chest Fly é um exercício de isolamento que visa os músculos peitorais, principalmente o peitoral maior. Envolve o uso de uma máquina pec deck, onde o usuário se senta com as costas apoiadas em um encosto, braços estendidos para os lados e cotovelos ligeiramente dobrados. O movimento consiste em trazer os braços juntos à frente do peito, concentrando-se em contrair os músculos peitorais.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo no Pec Deck",
    "gifUrl": "https://api.smartworkout.app/asset/video/9515b29a-ad82-4b95-ae20-e8372579256d.mp4"
  },
  {
    "id": "supino_inclinado_com_halteres",
    "name": "Supino inclinado com halteres",
    "targetMuscles": [
      "Peito",
      "Tríceps"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Supino Inclinado com Halteres é um exercício composto que visa a parte superior dos músculos peitorais, bem como os deltoides anteriores e tríceps. ...",
    "instructions": "O Supino Inclinado com Halteres é um exercício composto que visa a parte superior dos músculos peitorais, bem como os deltoides anteriores e tríceps. Envolve pressionar halteres para cima enquanto se está deitado em um banco inclinado, o que enfatiza mais o peito superior do que o supino reto.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino inclinado com halteres",
    "gifUrl": "https://api.smartworkout.app/asset/video/5081d5c0-5262-45ba-a047-d3d652978d8a.mp4"
  },
  {
    "id": "crucifixo_sentado_na_polia",
    "name": "Crucifixo Sentado na Polia",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Seated Cable Fly é um exercício de isolamento que visa os músculos peitorais, especificamente a cabeça esternal do peitoral maior. Envolve o uso de ...",
    "instructions": "O Seated Cable Fly é um exercício de isolamento que visa os músculos peitorais, especificamente a cabeça esternal do peitoral maior. Envolve o uso de uma máquina de cabos para realizar um movimento de fly enquanto está sentado, o que ajuda a manter a estabilidade e a focar na contração muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Sentado na Polia",
    "gifUrl": "https://api.smartworkout.app/asset/video/9439b214-486d-4113-9609-7d3aadc864b7.mp4"
  },
  {
    "id": "supino_declinado_com_barra",
    "name": "Supino Declinado com Barra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Decline Barbell Bench Press é um exercício composto que visa a parte inferior dos músculos peitorais, tríceps e deltoides anteriores. É realizado em...",
    "instructions": "O Decline Barbell Bench Press é um exercício composto que visa a parte inferior dos músculos peitorais, tríceps e deltoides anteriores. É realizado em um banco declinado, que posiciona o corpo em um ângulo descendente, enfatizando a parte inferior do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Declinado com Barra",
    "gifUrl": "https://api.smartworkout.app/asset/video/3d084e3c-1133-40c6-a618-fb4a2bac4ebc.mp4"
  },
  {
    "id": "crucifixo_no_chao_com_halteres",
    "name": "Crucifixo no Chão com Halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Dumbbell Floor Chest Fly é um exercício de isolamento que tem como alvo os músculos peitorais. É realizado deitado no chão, o que limita a amplitude...",
    "instructions": "O Dumbbell Floor Chest Fly é um exercício de isolamento que tem como alvo os músculos peitorais. É realizado deitado no chão, o que limita a amplitude de movimento e oferece suporte, tornando-o uma alternativa mais segura ao bench fly para aqueles com preocupações nos ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo no Chão com Halteres",
    "gifUrl": "https://api.smartworkout.app/asset/video/4228f43a-ccb4-43cc-8009-948d658282b8.mp4"
  },
  {
    "id": "pressao_poliquin_com_halteres",
    "name": "Pressão Poliquin com Halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Dumbbell Poliquin Press é um exercício para os ombros que foca nos músculos deltóides, particularmente nas cabeças anterior e lateral. Ele combina e...",
    "instructions": "O Dumbbell Poliquin Press é um exercício para os ombros que foca nos músculos deltóides, particularmente nas cabeças anterior e lateral. Ele combina elementos de um tradicional desenvolvimento de ombros com um movimento rotacional único para melhorar a estabilidade e a força dos ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Pressão Poliquin com Halteres",
    "gifUrl": "https://api.smartworkout.app/asset/video/56b80804-b9ed-4524-a2d7-948c51e2358b.mp4"
  },
  {
    "id": "pressao_de_peito_com_faixa_no_banco",
    "name": "Pressão de Peito com Faixa no Banco",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Band Bench Chest Press é um exercício de resistência que foca nos músculos peitorais, utilizando faixas de resistência para fornecer tensão variável...",
    "instructions": "O Band Bench Chest Press é um exercício de resistência que foca nos músculos peitorais, utilizando faixas de resistência para fornecer tensão variável durante o movimento. Ele envolve principalmente o peito, tríceps e ombros, oferecendo uma alternativa versátil ao supino tradicional.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Pressão de Peito com Faixa no Banco",
    "gifUrl": "https://api.smartworkout.app/asset/video/d563db4f-f311-485c-bcf7-c115e22a12ca.mp4"
  },
  {
    "id": "supino_declinado_no_cabo",
    "name": "Supino Declinado no Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Decline Cable Chest Press é um exercício de isolamento que foca na parte inferior dos músculos peitorais. Ele envolve o uso de uma máquina de cabos ...",
    "instructions": "O Decline Cable Chest Press é um exercício de isolamento que foca na parte inferior dos músculos peitorais. Ele envolve o uso de uma máquina de cabos com um banco declinado para pressionar as alças para frente, simulando o movimento de um supino declinado. Este exercício ajuda a desenvolver a parte inferior do peito e a melhorar a definição geral do tórax.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Declinado no Cabo",
    "gifUrl": "https://api.smartworkout.app/asset/video/c63817d5-8f9b-4d93-80c6-0639a56f2064.mp4"
  },
  {
    "id": "aquecimento_com_faixa_elastica",
    "name": "Aquecimento com Faixa Elástica",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O alongamento dinâmico de ombros com banda elástica é projetado para aumentar a mobilidade e flexibilidade dos ombros, preparando os músculos e articu...",
    "instructions": "O alongamento dinâmico de ombros com banda elástica é projetado para aumentar a mobilidade e flexibilidade dos ombros, preparando os músculos e articulações para atividades físicas mais intensas. Este exercício utiliza uma banda de resistência para facilitar o alongamento dinâmico, direcionando-se aos deltoides, músculos do manguito rotador e tecidos conjuntivos circundantes.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Aquecimento com Faixa Elástica",
    "gifUrl": "https://api.smartworkout.app/asset/video/fb552ef7-a0e9-44d5-bed1-d0192234d886.mp4"
  },
  {
    "id": "alongamento_de_rotacao_das_costas_em_posicao_de_joelhos",
    "name": "Alongamento de Rotação das Costas em Posição de Joelhos",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O alongamento de rotação de costas ajoelhado é um exercício de mobilidade projetado para melhorar a rotação da coluna torácica e aumentar a flexibilid...",
    "instructions": "O alongamento de rotação de costas ajoelhado é um exercício de mobilidade projetado para melhorar a rotação da coluna torácica e aumentar a flexibilidade na parte superior das costas. É particularmente benéfico para indivíduos que buscam aumentar a amplitude de movimento e reduzir a rigidez nas costas, ombros e pescoço.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Rotação das Costas em Posição de Joelhos",
    "gifUrl": "https://api.smartworkout.app/asset/video/2ca62145-0acb-4a6f-8de5-657f9a538d72.mp4"
  },
  {
    "id": "supino_inclinado_com_halteres_em_pegada_neutra",
    "name": "Supino Inclinado com Halteres em Pegada Neutra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Incline Neutral Grip Dumbbell Press foca na parte superior dos músculos peitorais, deltoides anteriores e tríceps. Este exercício é realizado em um ...",
    "instructions": "O Incline Neutral Grip Dumbbell Press foca na parte superior dos músculos peitorais, deltoides anteriores e tríceps. Este exercício é realizado em um banco inclinado com halteres segurados em uma pegada neutra, ou seja, palmas das mãos voltadas uma para a outra. Ele enfatiza o peito superior e reduz a tensão nos ombros em comparação com outros movimentos de pressão.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Halteres em Pegada Neutra",
    "gifUrl": "https://api.smartworkout.app/asset/video/fe0fca73-f9f4-4627-9aae-c236916d2320.mp4"
  },
  {
    "id": "crucifixo_em_suspensao",
    "name": "Crucifixo em Suspensão",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Suspension Chest Fly é um exercício para a parte superior do corpo que tem como alvo os músculos peitorais, utilizando tiras de suspensão para envol...",
    "instructions": "O Suspension Chest Fly é um exercício para a parte superior do corpo que tem como alvo os músculos peitorais, utilizando tiras de suspensão para envolver os músculos estabilizadores e melhorar a força do core. Este exercício é eficaz para desenvolver a definição do peito e melhorar a estabilidade dos ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo em Suspensão",
    "gifUrl": "https://api.smartworkout.app/asset/video/104f1fe6-5018-41bd-aea9-423736a98cb7.mp4"
  },
  {
    "id": "crucifixo_com_faixa_elastica",
    "name": "Crucifixo com Faixa Elástica",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Band Chest Fly é um exercício de isolamento que foca nos músculos peitorais utilizando bandas de resistência. Ele imita o movimento do tradicional f...",
    "instructions": "O Band Chest Fly é um exercício de isolamento que foca nos músculos peitorais utilizando bandas de resistência. Ele imita o movimento do tradicional fly com halteres, mas oferece resistência variável ao longo do movimento. Este exercício é eficaz para aumentar a força do peito e melhorar a definição muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com Faixa Elástica",
    "gifUrl": "https://api.smartworkout.app/asset/video/7d8a4a20-e873-4831-a6b4-a6a0b28a6cae.mp4"
  },
  {
    "id": "supino_inclinado_com_halter_unilateral",
    "name": "Supino Inclinado com Halter Unilateral",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Supino Inclinado com Halter Unilateral é um exercício unilateral que visa principalmente os músculos peitorais, especificamente a parte superior do ...",
    "instructions": "O Supino Inclinado com Halter Unilateral é um exercício unilateral que visa principalmente os músculos peitorais, especificamente a parte superior do peito, enquanto também envolve os tríceps e os ombros. Realizar este exercício em um banco inclinado ajuda a enfatizar a parte superior do peito, proporcionando um desenvolvimento equilibrado dos músculos peitorais.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Halter Unilateral",
    "gifUrl": "https://api.smartworkout.app/asset/video/d0516cca-9186-4551-b164-994f0cacc5a1.mp4"
  },
  {
    "id": "supino_com_barra_e_correntes",
    "name": "Supino com Barra e Correntes",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Supino com Barra e Correntes é uma variação do supino tradicional que incorpora correntes para adicionar resistência variável. À medida que a barra ...",
    "instructions": "O Supino com Barra e Correntes é uma variação do supino tradicional que incorpora correntes para adicionar resistência variável. À medida que a barra é levantada, mais elos de corrente são erguidos do chão, aumentando a carga. Este exercício foca nos músculos peitorais, tríceps e ombros, e ajuda a melhorar a força e a potência ao acomodar a resistência ao longo de toda a amplitude de movimento.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Barra e Correntes",
    "gifUrl": "https://api.smartworkout.app/asset/video/04001bdc-c78d-4d5b-9e7d-c53983b9087a.mp4"
  },
  {
    "id": "flexao_de_bracos_com_palmas",
    "name": "Flexão de Braços com Palmas",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Clap Push-Up é um exercício pliométrico avançado que melhora a força da parte superior do corpo, a explosão e a coordenação. Ele foca principalmente...",
    "instructions": "O Clap Push-Up é um exercício pliométrico avançado que melhora a força da parte superior do corpo, a explosão e a coordenação. Ele foca principalmente no peito, tríceps e ombros, enquanto também envolve o core para estabilidade.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Palmas",
    "gifUrl": "https://api.smartworkout.app/asset/video/3eee6526-9f25-4102-be30-39d783599365.mp4"
  },
  {
    "id": "supino_declinado",
    "name": "Supino Declinado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Decline Chest Press é um exercício composto que foca na parte inferior dos músculos peitorais. Envolve empurrar um peso para longe do corpo enquanto...",
    "instructions": "O Decline Chest Press é um exercício composto que foca na parte inferior dos músculos peitorais. Envolve empurrar um peso para longe do corpo enquanto se está deitado em um banco declinado, envolvendo o peito, tríceps e ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Declinado",
    "gifUrl": "https://api.smartworkout.app/asset/video/a814e9e3-9f7a-4785-8a83-ff0cee912f9b.mp4"
  },
  {
    "id": "crucifixo_inclinado_com_halteres",
    "name": "Crucifixo Inclinado com Halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Fly com Halteres em Inclinação é um exercício de isolamento que foca nos músculos peitorais, especificamente na parte superior do peito. Envolve dei...",
    "instructions": "O Fly com Halteres em Inclinação é um exercício de isolamento que foca nos músculos peitorais, especificamente na parte superior do peito. Envolve deitar-se em um banco inclinado e mover os halteres em um arco amplo para engajar efetivamente os músculos do peito. Este exercício ajuda a desenvolver a porção superior do peitoral maior, melhorando a definição e a força do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Inclinado com Halteres",
    "gifUrl": "https://api.smartworkout.app/asset/video/aec5c2b6-b5cb-44c9-bcaf-3e201a824590.mp4"
  },
  {
    "id": "supino_larsen_com_barra",
    "name": "Supino Larsen com Barra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Barbell Larsen Press é uma variação do supino projetada para melhorar a força e estabilidade da parte superior do corpo. Ele enfatiza o peito, os om...",
    "instructions": "O Barbell Larsen Press é uma variação do supino projetada para melhorar a força e estabilidade da parte superior do corpo. Ele enfatiza o peito, os ombros e os tríceps, minimizando o impulso das pernas ao manter os pés elevados do chão.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Larsen com Barra",
    "gifUrl": "https://api.smartworkout.app/asset/video/1c76c330-7f85-4b5e-a464-1d8bd9ac863e.mp4"
  },
  {
    "id": "press_de_peito_na_maquina",
    "name": "Press de Peito na Máquina",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O exercício de máquina de supino é um exercício de resistência que foca nos músculos peitorais, tríceps e deltoides anteriores. Ele oferece um caminho...",
    "instructions": "O exercício de máquina de supino é um exercício de resistência que foca nos músculos peitorais, tríceps e deltoides anteriores. Ele oferece um caminho de movimento controlado, tornando-o ideal para iniciantes e para aqueles que se concentram na isolação muscular. A máquina permite ajustar os níveis de resistência para acomodar diferentes níveis de força.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Press de Peito na Máquina",
    "gifUrl": "https://api.smartworkout.app/asset/video/1ce6db8f-0aec-4a97-b43c-4ee15e506486.mp4"
  },
  {
    "id": "crucifixo_unilateral_no_cabo_de_cima_para_baixo",
    "name": "Crucifixo Unilateral no Cabo de Cima para Baixo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O exercício One-Arm High-to-Low Cable Fly é um exercício de isolamento que foca nos músculos peitorais, especificamente na parte inferior do peito. En...",
    "instructions": "O exercício One-Arm High-to-Low Cable Fly é um exercício de isolamento que foca nos músculos peitorais, especificamente na parte inferior do peito. Envolve puxar um cabo de uma posição alta para uma posição baixa através do corpo, envolvendo o peito, ombros e tríceps. Este exercício ajuda a desenvolver a simetria muscular e melhorar a força unilateral.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Unilateral no Cabo de Cima para Baixo",
    "gifUrl": "https://api.smartworkout.app/asset/video/db9e7f28-0642-4cab-91c4-1ad6dde557a2.mp4"
  },
  {
    "id": "flexao_de_bracos_com_faixa_de_resistencia",
    "name": "Flexão de Braços com Faixa de Resistência",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Flexão com Faixa de Resistência é uma variação da flexão tradicional que incorpora uma faixa de resistência para aumentar a intensidade e envolver o...",
    "instructions": "O Flexão com Faixa de Resistência é uma variação da flexão tradicional que incorpora uma faixa de resistência para aumentar a intensidade e envolver o peito, tríceps e ombros de forma mais eficaz. Este exercício melhora a força e a estabilidade da parte superior do corpo ao adicionar resistência variável durante o movimento.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Faixa de Resistência",
    "gifUrl": "https://api.smartworkout.app/asset/video/3ebf60e2-f818-4d32-9655-b07f780684cf.mp4"
  },
  {
    "id": "alongamento_completo_global",
    "name": "Alongamento Completo Global",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O World's Greatest Stretch é um exercício dinâmico que atinge múltiplos grupos musculares, melhorando a flexibilidade, a mobilidade e o movimento func...",
    "instructions": "O World's Greatest Stretch é um exercício dinâmico que atinge múltiplos grupos musculares, melhorando a flexibilidade, a mobilidade e o movimento funcional geral. É particularmente eficaz para aquecer o corpo antes de um treino, com foco nos quadris, isquiotibiais, coluna torácica e ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Alongamento Completo Global",
    "gifUrl": "https://api.smartworkout.app/asset/video/a9fe5358-5acd-41be-888f-08c2d4787f8c.mp4"
  },
  {
    "id": "crucifixo_no_cabo_deitado",
    "name": "Crucifixo no Cabo deitado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Lying Cable Fly é um exercício de isolamento que tem como alvo os músculos peitorais. Ele envolve deitar-se em um banco plano e usar cabos para real...",
    "instructions": "O Lying Cable Fly é um exercício de isolamento que tem como alvo os músculos peitorais. Ele envolve deitar-se em um banco plano e usar cabos para realizar um movimento de fly, o que ajuda a desenvolver o peito, focando nas porções interna e externa dos peitorais. Este exercício também envolve os ombros e tríceps como músculos secundários.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo no Cabo deitado",
    "gifUrl": "https://api.smartworkout.app/asset/video/9efa8ada-44a1-4cc6-a808-6c71704992ab.mp4"
  },
  {
    "id": "press_militar_com_rotacao_em_pe",
    "name": "Press Militar com Rotação em Pé",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Standing Press Around é um exercício dinâmico para os ombros que trabalha os deltoides, trapézio e parte superior do peito. Envolve um movimento cir...",
    "instructions": "O Standing Press Around é um exercício dinâmico para os ombros que trabalha os deltoides, trapézio e parte superior do peito. Envolve um movimento circular com peso, engajando múltiplos grupos musculares para melhorar a estabilidade e força dos ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Press Militar com Rotação em Pé",
    "gifUrl": "https://api.smartworkout.app/asset/video/b24e432c-7165-4c1f-a89a-ab5e71c05f14.mp4"
  },
  {
    "id": "alongamento_de_peitoral_com_cotovelos_abertos",
    "name": "Alongamento de Peitoral com Cotovelos Abertos",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O alongamento de peito com cotovelos para fora é um alongamento estático que tem como alvo os músculos peitorais, especificamente projetado para melho...",
    "instructions": "O alongamento de peito com cotovelos para fora é um alongamento estático que tem como alvo os músculos peitorais, especificamente projetado para melhorar a flexibilidade e a amplitude de movimento no peito e nos ombros. Este exercício é benéfico para indivíduos que desejam melhorar sua postura e aliviar a tensão na parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Peitoral com Cotovelos Abertos",
    "gifUrl": "https://api.smartworkout.app/asset/video/e6d86856-f18f-466b-8cdc-b3a48c9644f5.mp4"
  },
  {
    "id": "flexao_de_braco_com_arqueiro",
    "name": "Flexão de Braço com Arqueiro",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Archer Push-Up é um exercício avançado de peso corporal que trabalha o peito, tríceps e ombros, enquanto também envolve o core e os músculos estabil...",
    "instructions": "O Archer Push-Up é um exercício avançado de peso corporal que trabalha o peito, tríceps e ombros, enquanto também envolve o core e os músculos estabilizadores. Ele envolve um posicionamento mais amplo das mãos e o deslocamento do peso corporal de um lado para o outro, imitando o movimento de puxar um arco.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braço com Arqueiro",
    "gifUrl": "https://api.smartworkout.app/asset/video/d6d078a4-e818-46f9-a1a2-33ce24b4ad6e.mp4"
  },
  {
    "id": "alongamento_de_peitoral_na_porta",
    "name": "Alongamento de Peitoral na Porta",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O alongamento de peito na porta é um exercício de alongamento estático projetado para melhorar a flexibilidade e a mobilidade no peito, ombros e parte...",
    "instructions": "O alongamento de peito na porta é um exercício de alongamento estático projetado para melhorar a flexibilidade e a mobilidade no peito, ombros e parte superior das costas. É realizado usando uma porta como suporte, permitindo um alongamento profundo dos músculos peitorais e deltoides anteriores.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Peitoral na Porta",
    "gifUrl": "https://api.smartworkout.app/asset/video/c32386c7-01a4-4a0a-b7af-d58e3cb05805.mp4"
  },
  {
    "id": "supino_reto_deitado",
    "name": "Supino Reto deitado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Hammer Bench Press é uma variação do supino tradicional realizada usando uma máquina de força hammer. Este exercício foca nos músculos peitorais, tr...",
    "instructions": "O Hammer Bench Press é uma variação do supino tradicional realizada usando uma máquina de força hammer. Este exercício foca nos músculos peitorais, tríceps e deltoides anteriores. Ele oferece um caminho de movimento guiado, o que pode ser benéfico para manter a forma adequada e reduzir o risco de lesões.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Reto deitado",
    "gifUrl": "https://api.smartworkout.app/asset/video/b5d8e176-d465-4f57-97ec-912fdcf2b000.mp4"
  },
  {
    "id": "press_de_forca_unilateral_cruzado",
    "name": "Press de Força Unilateral Cruzado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Cross Body One-Arm Strength Press é um exercício unilateral que tem como alvo os ombros, peito e tríceps. Envolve pressionar um haltere através do c...",
    "instructions": "O Cross Body One-Arm Strength Press é um exercício unilateral que tem como alvo os ombros, peito e tríceps. Envolve pressionar um haltere através do corpo, engajando a estabilidade do core e melhorando a mobilidade dos ombros. Este exercício é benéfico para melhorar o equilíbrio muscular e a coordenação.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Press de Força Unilateral Cruzado",
    "gifUrl": "https://api.smartworkout.app/asset/video/db536c51-9fb9-4d9c-9eb7-5fdbfb52b7b1.mp4"
  },
  {
    "id": "supino_no_chao_com_kettlebell_com_um_braco",
    "name": "Supino no Chão com Kettlebell com um Braço",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Kettlebell One Arm Floor Press é um exercício de força que foca no peito, tríceps e ombros. Envolve pressionar um kettlebell a partir de uma posição...",
    "instructions": "O Kettlebell One Arm Floor Press é um exercício de força que foca no peito, tríceps e ombros. Envolve pressionar um kettlebell a partir de uma posição deitado no chão, concentrando-se na força unilateral e estabilidade.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino no Chão com Kettlebell com um Braço",
    "gifUrl": "https://api.smartworkout.app/asset/video/2b488d23-3813-4729-b1bd-cab6f1053f8a.mp4"
  },
  {
    "id": "planche_inclinado",
    "name": "Planche Inclinado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Lean Planche é um exercício avançado de peso corporal que trabalha os ombros, o peito e o core. Requer força e equilíbrio significativos, pois envol...",
    "instructions": "O Lean Planche é um exercício avançado de peso corporal que trabalha os ombros, o peito e o core. Requer força e equilíbrio significativos, pois envolve manter o corpo paralelo ao chão com apenas as mãos tocando o solo. Este exercício é uma progressão em direção ao planche completo, enfatizando a força dos ombros e a estabilidade do core.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Planche Inclinado",
    "gifUrl": "https://api.smartworkout.app/asset/video/c67d256e-815d-4bb4-89df-a6eff0632d35.mp4"
  },
  {
    "id": "supino_com_halteres",
    "name": "Supino com Halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Supino com Halteres é um exercício composto que tem como alvo principal os músculos peitorais, com ativação secundária dos tríceps e deltoides anter...",
    "instructions": "O Supino com Halteres é um exercício composto que tem como alvo principal os músculos peitorais, com ativação secundária dos tríceps e deltoides anteriores. É realizado deitando-se em um banco plano e pressionando os halteres para cima a partir do nível do peito até que os braços estejam totalmente estendidos.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Halteres",
    "gifUrl": "https://api.smartworkout.app/asset/video/bb4a469e-f8bb-4667-8f65-2c4b4b2bba0d.mp4"
  },
  {
    "id": "mergulho_de_peito",
    "name": "Mergulho de Peito",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Os mergulhos em barras paralelas visam o peito, tríceps e ombros. Este exercício composto enfatiza a parte inferior dos músculos peitorais e ajuda a d...",
    "instructions": "Os mergulhos em barras paralelas visam o peito, tríceps e ombros. Este exercício composto enfatiza a parte inferior dos músculos peitorais e ajuda a desenvolver força e massa na parte superior do corpo. A forma adequada é crucial para maximizar a eficácia e prevenir lesões.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Mergulho de Peito",
    "gifUrl": "https://api.smartworkout.app/asset/video/fbf1e1b8-2f58-4847-b28b-7b6f387bb0d4.mp4"
  },
  {
    "id": "supino_com_pino",
    "name": "Supino com Pino",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Pin Bench Press é uma variação do supino tradicional onde a barra é pressionada a partir de uma parada completa sobre pinos de segurança ajustados a...",
    "instructions": "O Pin Bench Press é uma variação do supino tradicional onde a barra é pressionada a partir de uma parada completa sobre pinos de segurança ajustados a uma altura específica. Este exercício foca no peito, tríceps e ombros, e é particularmente útil para melhorar a força de bloqueio e superar pontos de estagnação no supino.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Pino",
    "gifUrl": "https://api.smartworkout.app/asset/video/75a3fb07-2034-4dd8-8f1e-acb45105d12b.mp4"
  },
  {
    "id": "supino_com_halter_unilateral",
    "name": "Supino com Halter Unilateral",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O One-Arm Dumbbell Bench Press é um exercício unilateral para o peito que trabalha os músculos peitorais, tríceps e deltoides. Este exercício melhora ...",
    "instructions": "O One-Arm Dumbbell Bench Press é um exercício unilateral para o peito que trabalha os músculos peitorais, tríceps e deltoides. Este exercício melhora a simetria muscular, a estabilidade do core e a força geral, envolvendo os músculos estabilizadores para manter o equilíbrio.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Halter Unilateral",
    "gifUrl": "https://api.smartworkout.app/asset/video/5ad0fcdc-a1cd-4d26-a219-d451352dc27f.mp4"
  },
  {
    "id": "flexao_de_bracos_em_barras_paralelas",
    "name": "Flexão de Braços em Barras Paralelas",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O push-up em barras paralelas é um exercício composto para a parte superior do corpo que tem como alvo principal o peito, tríceps e ombros. Envolve su...",
    "instructions": "O push-up em barras paralelas é um exercício composto para a parte superior do corpo que tem como alvo principal o peito, tríceps e ombros. Envolve sustentar o peso do corpo em barras paralelas e abaixar o peito em direção às barras antes de empurrar de volta para a posição inicial. Este exercício melhora a força da parte superior do corpo, a estabilidade e a resistência muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços em Barras Paralelas",
    "gifUrl": "https://api.smartworkout.app/asset/video/f1e128ff-2642-44cd-b553-6a73c59dda9b.mp4"
  },
  {
    "id": "supino_inclinado_com_halteres_em_declinio",
    "name": "Supino Inclinado com Halteres em Declínio",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Decline Dumbbell Bench Press é um exercício composto que foca na parte inferior dos músculos peitorais, enquanto também envolve os tríceps e os delt...",
    "instructions": "O Decline Dumbbell Bench Press é um exercício composto que foca na parte inferior dos músculos peitorais, enquanto também envolve os tríceps e os deltoides anteriores. Este exercício é realizado em um banco declinado, o que permite uma maior ênfase na parte inferior do peito em comparação com as variações planas ou inclinadas.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Halteres em Declínio",
    "gifUrl": "https://api.smartworkout.app/asset/video/c640c2f1-f5fe-4837-ab55-6ad404110306.mp4"
  },
  {
    "id": "toque_de_ombro",
    "name": "Toque de Ombro",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Shoulder Tap é um exercício de peso corporal que visa o core, os ombros e os músculos estabilizadores. Envolve toques alternados no ombro oposto enq...",
    "instructions": "O Shoulder Tap é um exercício de peso corporal que visa o core, os ombros e os músculos estabilizadores. Envolve toques alternados no ombro oposto enquanto se mantém em posição de prancha, promovendo equilíbrio e coordenação.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Toque de Ombro",
    "gifUrl": "https://api.smartworkout.app/asset/video/6f080c8e-fe03-4783-bb2b-d816956111eb.mp4"
  },
  {
    "id": "supino_com_faixa_de_resistencia",
    "name": "Supino com Faixa de Resistência",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Bench Press Com Faixa de Resistência é uma variação do exercício tradicional de supino que incorpora faixas de resistência para aumentar a tensão ao...",
    "instructions": "O Bench Press Com Faixa de Resistência é uma variação do exercício tradicional de supino que incorpora faixas de resistência para aumentar a tensão ao longo do movimento. Este exercício tem como alvo os músculos peitorais, tríceps e deltoides anteriores, melhorando a força e a estabilidade na parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Faixa de Resistência",
    "gifUrl": "https://api.smartworkout.app/asset/video/ffb47556-bbe3-4055-ab01-a5c1dd93cf2c.mp4"
  },
  {
    "id": "flexao_de_bracos_ajoelhada_com_pegada_ampla",
    "name": "Flexão de Braços Ajoelhada com Pegada Ampla",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Push-Up de Mãos Largas Ajoelhado é um exercício com o peso do corpo que foca no peito, ombros e tríceps. Ao realizar este exercício de joelhos com u...",
    "instructions": "O Push-Up de Mãos Largas Ajoelhado é um exercício com o peso do corpo que foca no peito, ombros e tríceps. Ao realizar este exercício de joelhos com uma colocação ampla das mãos, reduz-se a carga em comparação com um push-up padrão, tornando-o adequado para iniciantes ou como aquecimento para atletas mais avançados.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços Ajoelhada com Pegada Ampla",
    "gifUrl": "https://api.smartworkout.app/asset/video/4d768221-a68a-489d-8422-a8db511d94bb.mp4"
  },
  {
    "id": "flexao_de_bracos_com_maos_afastadas",
    "name": "Flexão de Braços com Mãos Afastadas",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Wide Hand Push Up é um exercício com peso corporal que tem como alvo o peito, os ombros e os tríceps. Ao posicionar as mãos mais afastadas do que a ...",
    "instructions": "O Wide Hand Push Up é um exercício com peso corporal que tem como alvo o peito, os ombros e os tríceps. Ao posicionar as mãos mais afastadas do que a largura dos ombros, ele enfatiza a parte externa dos músculos peitorais e aumenta o envolvimento dos deltoides anteriores.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Mãos Afastadas",
    "gifUrl": "https://api.smartworkout.app/asset/video/1799afbc-3a7a-4035-ae34-b9fe9889daa6.mp4"
  },
  {
    "id": "flexao_de_bracos_em_aneis",
    "name": "Flexão de Braços em Anéis",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Ring Push-Up é um exercício avançado para a parte superior do corpo que trabalha o peito, os ombros e os tríceps, enquanto envolve o core para estab...",
    "instructions": "O Ring Push-Up é um exercício avançado para a parte superior do corpo que trabalha o peito, os ombros e os tríceps, enquanto envolve o core para estabilidade. Ele consiste em realizar flexões usando anéis de ginástica, o que adiciona um elemento de instabilidade, exigindo maior ativação e controle muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços em Anéis",
    "gifUrl": "https://api.smartworkout.app/asset/video/dad1b2b1-cb9f-4b6f-9725-2548443f1872.mp4"
  },
  {
    "id": "supino_sentado_no_cabo",
    "name": "Supino Sentado no Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Seated Cable Chest Press é um exercício composto que visa os músculos peitorais, tríceps e deltoides anteriores. Ele envolve empurrar um peso para f...",
    "instructions": "O Seated Cable Chest Press é um exercício composto que visa os músculos peitorais, tríceps e deltoides anteriores. Ele envolve empurrar um peso para frente usando uma máquina de cabos enquanto está sentado, proporcionando tensão constante durante o movimento.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Sentado no Cabo",
    "gifUrl": "https://api.smartworkout.app/asset/video/094a5e9b-b0e4-41fd-b1f4-9f8d02469a97.mp4"
  },
  {
    "id": "supino_declinado_na_smith_machine",
    "name": "Supino Declinado na Smith Machine",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Decline Smith Bench Press é um exercício composto que foca na parte inferior dos músculos peitorais, com envolvimento secundário dos tríceps e delto...",
    "instructions": "O Decline Smith Bench Press é um exercício composto que foca na parte inferior dos músculos peitorais, com envolvimento secundário dos tríceps e deltoides anteriores. Utilizar a máquina Smith proporciona estabilidade e controle, permitindo uma contração focada dos músculos do peito enquanto minimiza o risco de lesões. Este exercício é realizado em um banco declinado ajustado em um ângulo, o que direciona a ênfase para a parte inferior do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Declinado na Smith Machine",
    "gifUrl": "https://api.smartworkout.app/asset/video/9ade43c0-728d-462c-8845-d0080e8cf37d.mp4"
  },
  {
    "id": "crucifixo_em_cabo_unilateral_baixo_para_alto",
    "name": "Crucifixo em Cabo Unilateral Baixo para Alto",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O exercício de Crucifixo com Cabo de Baixo para Cima com um Braço é um exercício de isolamento que foca nos músculos peitorais, especialmente na parte...",
    "instructions": "O exercício de Crucifixo com Cabo de Baixo para Cima com um Braço é um exercício de isolamento que foca nos músculos peitorais, especialmente na parte superior do peito. Envolve puxar um cabo de uma posição baixa para uma posição alta através do corpo, envolvendo o peito, os ombros e o core para estabilização. Este exercício ajuda a desenvolver a simetria do peito e a melhorar a definição muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo em Cabo Unilateral Baixo para Alto",
    "gifUrl": "https://api.smartworkout.app/asset/video/ed8f531d-acde-4cc8-acc4-9796e34f42a3.mp4"
  },
  {
    "id": "clam_shell_peitoral_sentado",
    "name": "Clam Shell Peitoral Sentado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Seated Chest Clam é um exercício de isolamento que tem como alvo os músculos peitorais, especificamente a parte interna do peito. Ele envolve aperta...",
    "instructions": "O Seated Chest Clam é um exercício de isolamento que tem como alvo os músculos peitorais, especificamente a parte interna do peito. Ele envolve apertar os músculos do peito juntos enquanto se mantém em uma posição sentada, geralmente usando uma máquina projetada para esse fim.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Clam Shell Peitoral Sentado",
    "gifUrl": "https://api.smartworkout.app/asset/video/1ee153d8-7136-4ded-aa79-416a16b00aa1.mp4"
  },
  {
    "id": "pressao_de_peito_na_maquina",
    "name": "Pressão de Peito na Máquina",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Machine Chest Press é um exercício de resistência que tem como alvo os músculos peitorais, principalmente o peitoral maior, com ativação secundária ...",
    "instructions": "O Machine Chest Press é um exercício de resistência que tem como alvo os músculos peitorais, principalmente o peitoral maior, com ativação secundária dos tríceps e deltoides anteriores. É realizado utilizando uma máquina sentada que proporciona um movimento guiado, permitindo uma execução controlada e segura, especialmente benéfica para iniciantes ou aqueles que focam na isolação muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Pressão de Peito na Máquina",
    "gifUrl": "https://api.smartworkout.app/asset/video/c77a416b-3951-4ebb-b04a-ecad6c09923e.mp4"
  },
  {
    "id": "crucifixo_na_maquina",
    "name": "Crucifixo na Máquina",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O exercício de fly peitoral na máquina é um exercício de isolamento que tem como alvo os músculos peitorais. Ele envolve o uso de uma máquina de fly p...",
    "instructions": "O exercício de fly peitoral na máquina é um exercício de isolamento que tem como alvo os músculos peitorais. Ele envolve o uso de uma máquina de fly peitoral para realizar um movimento controlado que estica e contrai os músculos do peito, aprimorando a definição e a força muscular. Este exercício é ideal para focar no peito sem envolver significativamente outros grupos musculares.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo na Máquina",
    "gifUrl": "https://api.smartworkout.app/asset/video/cbacfcac-1e0c-45f5-8003-463e2e92af4a.mp4"
  },
  {
    "id": "crucifixo_com_halteres_de_baixo_para_cima",
    "name": "Crucifixo com Halteres de Baixo para Cima",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Dumbbell Low to High Fly é um exercício de isolamento que foca nos músculos do peito, particularmente nos peitorais superiores. Ele envolve mover um...",
    "instructions": "O Dumbbell Low to High Fly é um exercício de isolamento que foca nos músculos do peito, particularmente nos peitorais superiores. Ele envolve mover um par de halteres em um arco de uma posição baixa perto dos quadris para uma posição alta acima do nível dos ombros, envolvendo o peito, os ombros e o core para estabilidade.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com Halteres de Baixo para Cima",
    "gifUrl": "https://api.smartworkout.app/asset/video/dcee9b22-f83b-4dd3-8246-e99d543042cc.mp4"
  },
  {
    "id": "pressao_de_peito_na_maquina_com_pegada_martelo",
    "name": "Pressão de Peito na Máquina com Pegada Martelo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Machine Chest Press Hammer Grip é um exercício de resistência que foca nos músculos peitorais, especificamente na cabeça esternal do peitoral maior....",
    "instructions": "O Machine Chest Press Hammer Grip é um exercício de resistência que foca nos músculos peitorais, especificamente na cabeça esternal do peitoral maior. Ele também envolve os tríceps e deltoides anteriores. A posição de pegada em martelo permite um alinhamento neutro do punho, reduzindo a tensão nos punhos e ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Pressão de Peito na Máquina com Pegada Martelo",
    "gifUrl": "https://api.smartworkout.app/asset/video/3244b1e1-06ca-4632-8c38-9c325835ba9d.mp4"
  },
  {
    "id": "supino_barra",
    "name": "Supino Barra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Supino com Barra é um exercício composto que trabalha o peito, tríceps e ombros. É realizado deitado em um banco plano enquanto se pressiona uma bar...",
    "instructions": "O Supino com Barra é um exercício composto que trabalha o peito, tríceps e ombros. É realizado deitado em um banco plano enquanto se pressiona uma barra para cima a partir do nível do peito até que os braços estejam totalmente estendidos.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Barra",
    "gifUrl": "https://api.smartworkout.app/asset/video/30f3160a-3a57-426a-a3b9-4eed573310f8.mp4"
  },
  {
    "id": "alongamento_de_peito_com_braco_fletido",
    "name": "Alongamento de Peito com Braço Fletido",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "exercise_detail.primary_muscle:",
    "instructions": "exercise_detail.primary_muscle:",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Peito com Braço Fletido",
    "gifUrl": "https://api.smartworkout.app/asset/video/82dd6c00-4236-4d7a-98fb-a140411f1ddc.mp4"
  },
  {
    "id": "abertura_de_peito_em_pe",
    "name": "Abertura de Peito em Pé",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Alongamento de Peito em Pé é um exercício de alongamento projetado para melhorar a flexibilidade e a mobilidade do peito, ombros e parte superior da...",
    "instructions": "O Alongamento de Peito em Pé é um exercício de alongamento projetado para melhorar a flexibilidade e a mobilidade do peito, ombros e parte superior das costas. Ele ajuda a contrariar os efeitos da má postura e do tempo prolongado sentado, abrindo o peito e promovendo um melhor alinhamento.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Abertura de Peito em Pé",
    "gifUrl": "https://api.smartworkout.app/asset/video/0edd8e70-9491-4019-b263-f7a5a14f6b96.mp4"
  },
  {
    "id": "crucifixo_no_cabo_baixo_alto",
    "name": "Crucifixo no Cabo Baixo-Alto",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Low High Cable Chest Fly é um exercício de isolamento que visa os músculos peitorais. Ele envolve o uso de uma máquina de cabos para realizar um mov...",
    "instructions": "O Low High Cable Chest Fly é um exercício de isolamento que visa os músculos peitorais. Ele envolve o uso de uma máquina de cabos para realizar um movimento de fly de um ângulo baixo para um ângulo alto, enfatizando a parte superior do peito. Este exercício ajuda a desenvolver a definição e a força do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo no Cabo Baixo-Alto",
    "gifUrl": "https://api.smartworkout.app/asset/video/3a7504dc-28f2-49ca-85c2-fb808c2e1607.mp4"
  },
  {
    "id": "flexao_de_bracos_com_apoio_nos_dedos",
    "name": "Flexão de Braços com Apoio nos Dedos",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Finger Push-Up é um exercício avançado de peso corporal que foca na parte superior do corpo, especialmente no peito, ombros, tríceps e antebraços. R...",
    "instructions": "O Finger Push-Up é um exercício avançado de peso corporal que foca na parte superior do corpo, especialmente no peito, ombros, tríceps e antebraços. Requer força e estabilidade significativas nos dedos, tornando-o adequado para atletas experientes que buscam melhorar a força de pegada e a resistência geral da parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Apoio nos Dedos",
    "gifUrl": "https://api.smartworkout.app/asset/video/8fad7bad-4464-4e8f-8cce-4e2cc2e0f778.mp4"
  },
  {
    "id": "supino_inclinado_na_maquina_smith",
    "name": "Supino Inclinado na Máquina Smith",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Smith Incline Chest Press é um exercício composto que foca na parte superior dos músculos peitorais, utilizando a máquina Smith para um movimento gu...",
    "instructions": "O Smith Incline Chest Press é um exercício composto que foca na parte superior dos músculos peitorais, utilizando a máquina Smith para um movimento guiado. Este exercício permite um levantamento controlado com estabilidade adicional, tornando-o adequado tanto para iniciantes quanto para levantadores avançados que buscam aprimorar o desenvolvimento do peito superior.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado na Máquina Smith",
    "gifUrl": "https://api.smartworkout.app/asset/video/e576a629-7546-4b4d-98a3-51f73340c6dc.mp4"
  },
  {
    "id": "flexao_de_bracos_com_apoio_dos_joelhos",
    "name": "Flexão de Braços com Apoio dos Joelhos",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Flexões de joelhos, também conhecidas como flexões modificadas, são um exercício amigável para iniciantes que trabalha o peito, os ombros e os tríceps...",
    "instructions": "Flexões de joelhos, também conhecidas como flexões modificadas, são um exercício amigável para iniciantes que trabalha o peito, os ombros e os tríceps. Esta variação reduz a carga sobre a parte superior do corpo ao permitir que os joelhos permaneçam no chão, tornando-a uma excelente escolha para desenvolver força e resistência para aqueles que são novos nas flexões ou estão retornando de uma lesão.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Apoio dos Joelhos",
    "gifUrl": "https://api.smartworkout.app/asset/video/fff998bd-23b3-4735-ab7d-00a59df0e026.mp4"
  },
  {
    "id": "supino_com_cabo",
    "name": "Supino com Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Cable Bench Press é uma variação do supino tradicional que utiliza uma máquina de cabos para fornecer tensão constante durante o movimento. Este exe...",
    "instructions": "O Cable Bench Press é uma variação do supino tradicional que utiliza uma máquina de cabos para fornecer tensão constante durante o movimento. Este exercício foca nos músculos peitorais, tríceps e deltoides anteriores. É realizado em um banco plano com cabos presos a um sistema de polias baixas, permitindo uma amplitude de movimento controlada e suave.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Cabo",
    "gifUrl": "https://api.smartworkout.app/asset/video/f3454e00-4dac-4f89-84e8-af80e8386e86.mp4"
  },
  {
    "id": "aberturas_poliquin",
    "name": "Aberturas Poliquin",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Poliquin flys, também conhecidos como Poliquin dumbbell flys, são uma variação do exercício tradicional de fly com halteres. Este movimento foca nos m...",
    "instructions": "Poliquin flys, também conhecidos como Poliquin dumbbell flys, são uma variação do exercício tradicional de fly com halteres. Este movimento foca nos músculos peitorais com um ângulo e amplitude de movimento únicos, enfatizando as fases de alongamento e contração. É realizado em um banco inclinado para aumentar a ativação das fibras do peito superior.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Aberturas Poliquin",
    "gifUrl": "https://api.smartworkout.app/asset/video/3f9de872-5fd1-44cb-a0f9-99ee1faa226c.mp4"
  },
  {
    "id": "crucifixo_com_halteres_em_banco_declinado",
    "name": "Crucifixo com Halteres em Banco Declinado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Decline Dumbbell Fly é um exercício de isolamento que foca nos músculos peitorais, especialmente na parte inferior do peito. Envolve deitar-se em um...",
    "instructions": "O Decline Dumbbell Fly é um exercício de isolamento que foca nos músculos peitorais, especialmente na parte inferior do peito. Envolve deitar-se em um banco declinado e realizar um movimento de fly com halteres, o que ajuda a melhorar a definição e a força do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com Halteres em Banco Declinado",
    "gifUrl": "https://api.smartworkout.app/asset/video/1805d036-6125-4455-a2f1-d7e789457916.mp4"
  },
  {
    "id": "flexao_de_bracos_com_peso_adicional",
    "name": "Flexão de Braços com Peso Adicional",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Push-Up com Peso é um exercício composto para a parte superior do corpo que foca no peito, ombros e tríceps. Ao adicionar peso, essa variação aument...",
    "instructions": "O Push-Up com Peso é um exercício composto para a parte superior do corpo que foca no peito, ombros e tríceps. Ao adicionar peso, essa variação aumenta a resistência, melhorando a força muscular e a resistência. Requer forma adequada para garantir segurança e eficácia.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Peso Adicional",
    "gifUrl": "https://api.smartworkout.app/asset/video/44442a7f-b7c0-4ae4-afba-96adf71f1c22.mp4"
  }
];

export function findExerciseInLibrary(nameOrId: string): ExerciseLibraryItem | undefined {
  if (!nameOrId) return undefined;
  const cleanStr = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9áéíóúâêôãõç]/g, '');
  const cleanedQuery = cleanStr(nameOrId);
  
  let bestMatch: ExerciseLibraryItem | undefined = undefined;
  let bestScore = -1;

  for (const ex of EXERCISE_LIBRARY) {
    const exClean = cleanStr(ex.name);
    let score = 0;

    // Highest priority: Exact match on ID or cleaned name
    if (exClean === cleanedQuery || ex.id === nameOrId) {
      return ex; // Return immediately for exact match
    }

    // Medium priority: Fully contained strings
    if (cleanedQuery.includes(exClean) || exClean.includes(cleanedQuery)) {
      // Score based on how close the length is
      score = 100 - Math.abs(exClean.length - cleanedQuery.length);
    } else {
      // Lowest priority: Keyword overlap
      const keywords = nameOrId.toLowerCase().split(' ').filter(k => k.length > 3);
      for (const k of keywords) {
        if (exClean.includes(cleanStr(k))) {
          score += 10;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = ex;
    }
  }

  // Only return if it actually matched something decent
  if (bestScore > 0) return bestMatch;
  return undefined;
}

export function searchExercises(query: string, muscles?: string[]): ExerciseLibraryItem[] {
  let result = EXERCISE_LIBRARY;
  if (query) {
    result = result.filter(ex => 
      ex.name.toLowerCase().includes(query.toLowerCase()) || 
      ex.targetMuscles.some(m => m.toLowerCase().includes(query.toLowerCase()))
    );
  }
  if (muscles && muscles.length > 0) {
    result = result.filter(ex => ex.targetMuscles.some(m => muscles.includes(m)));
  }
  return result;
}
