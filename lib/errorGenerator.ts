export function getCommonErrorsForExercise(name: string, muscles: string[]): string[] {
  const n = name.toLowerCase();
  
  if (n.includes('supino') || n.includes('press')) {
    return [
      "Descer a barra/peso muito rápido, perdendo a tensão muscular na fase excêntrica.",
      "Não manter as escápulas retraídas, o que transfere a carga do peito para os ombros e aumenta o risco de lesão.",
      "Projetar os cotovelos muito para fora (ângulo de 90 graus); ideal é manter cerca de 45 a 60 graus em relação ao tronco."
    ];
  }
  
  if (n.includes('flexão') || n.includes('push-up') || n.includes('push_up')) {
    return [
      "Deixar o quadril cair ou levantar demais, quebrando a linha reta do corpo.",
      "Posicionar as mãos muito à frente da linha dos ombros.",
      "Não descer o suficiente para ativar completamente o peitoral."
    ];
  }
  
  if (n.includes('crucifixo') || n.includes('fly')) {
    return [
      "Dobrar ou esticar demais os cotovelos durante o movimento (o ângulo deve ser mantido fixo).",
      "Usar muito peso e acabar transformando o movimento em um supino.",
      "Permitir que os ombros girem para a frente na fase concêntrica."
    ];
  }
  
  if (n.includes('agachamento') || n.includes('squat')) {
    return [
      "Permitir que os joelhos entrem em valgo (fechem para dentro) ao subir ou descer.",
      "Tirar os calcanhares do chão, transferindo o peso para a ponta dos pés.",
      "Curvar a região lombar (butt wink) no final da descida."
    ];
  }
  
  if (n.includes('terra') || n.includes('deadlift')) {
    return [
      "Arredondar a coluna (perda da curvatura neutra) ao levantar a carga.",
      "Puxar a barra longe das pernas, o que aumenta drasticamente a tensão na lombar.",
      "Estender os joelhos antes de estender o quadril (movimento desconectado)."
    ];
  }

  if (n.includes('puxada') || n.includes('pulldown') || n.includes('barra fixa') || n.includes('pull-up')) {
    return [
      "Puxar o peso usando apenas os braços em vez de iniciar o movimento retraindo as escápulas.",
      "Balançar o corpo para ganhar impulso (roubar).",
      "Levar a barra atrás da nuca de forma forçada, podendo gerar lesão no ombro."
    ];
  }

  if (n.includes('remada') || n.includes('row')) {
    return [
      "Puxar o peso na direção do peito em vez de na direção do umbigo/quadril limitando o trabalho da dorsal.",
      "Arredondar as costas, especialmente em remadas curvadas.",
      "Usar muito impulso do tronco em vez de isolar o movimento dos braços e costas."
    ];
  }

  if (n.includes('desenvolvimento') || n.includes('press militar') || n.includes('shoulder')) {
    return [
      "Curvar demais a lombar para trás para ajudar a levantar o peso.",
      "Descer o peso muito pouco, limitando a amplitude do ombro.",
      "Travar os cotovelos com força no topo do movimento, estressando as articulações."
    ];
  }
  
  if (n.includes('rosca') || n.includes('curl')) {
    return [
      "Balançar o corpo para trás e para frente ganhando impulso.",
      "Mover os cotovelos para frente durante a subida, tirando o foco do bíceps.",
      "Deixar o peso cair rapidamente na descida."
    ];
  }
  
  if (n.includes('tríceps') || n.includes('triceps') || n.includes('pulley')) {
    return [
      "Afastar os cotovelos da lateral do corpo durante o movimento.",
      "Subir muito a barra/corda, perdendo a tensão no tríceps.",
      "Usar os ombros e o peso do corpo para empurrar a barra para baixo."
    ];
  }

  if (n.includes('leg press')) {
    return [
      "Descer o peso de forma que a lombar saia do encosto do banco.",
      "Travar completamente os joelhos ao empurrar o peso no topo (hiperextensão).",
      "Posicionar os pés muito baixos ou muito juntos se o objetivo não for específico para quadríceps ou adutores."
    ];
  }

  if (n.includes('elevação') || n.includes('raise')) {
    return [
      "Usar muito peso e balançar o corpo para iniciar o movimento.",
      "Levar os braços muito acima da linha dos ombros (quando não é o objetivo).",
      "Encolher os ombros (trapezio) em vez de focar no deltoide."
    ];
  }
  
  // Generic Fallbacks based on target muscle
  if (muscles.includes('Costas')) {
    return [
      "Fazer o movimento puxando apenas com os braços, sem ativar as escápulas.",
      "Encurtar a amplitude não alongando o músculo por completo na fase excêntrica.",
      "Balançar o tronco excessivamente para gerar impulso."
    ];
  }
  
  if (muscles.includes('Pernas') || muscles.includes('Glúteos')) {
    return [
      "Não manter a estabilidade no calcanhar, focando o peso nas pontas dos pés.",
      "Permitir que os joelhos caiam para dentro (valgo dinâmico).",
      "Fazer o exercício com amplitude reduzida, comprometendo a ativação muscular."
    ];
  }

  if (muscles.includes('Ombros')) {
    return [
      "Utilizar carga excessiva e roubar no movimento balançando o corpo.",
      "Negligenciar a descida, deixando a gravidade puxar o peso.",
      "Posicionar os ombros em protrusão, diminuindo a eficiência mecânica."
    ];
  }

  return [
    "Executar as repetições muito rapidamente, ignorando o tempo sob tensão.",
    "Realizar o movimento com amplitude incompleta (meia repetição).",
    "Falta de conexão mente-músculo e respiração inadequada (prender o fôlego)."
  ];
}
