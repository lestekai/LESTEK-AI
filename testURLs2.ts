import https from 'https';

async function checkUrl(urlStr: string) {
  return new Promise((resolve) => {
    https.get(urlStr, (res) => {
      resolve({url: urlStr, status: res.statusCode});
    }).on('error', () => resolve({url: urlStr, status: 'error'}));
  });
}

async function run() {
  const tests = [
    'https://www.gifdotreino.com/Exercicios/Pernas/Agachamento%20B%C3%BAlgaro%20com%20Halteres.gif',
    'https://www.gifdotreino.com/Exercicios/Pernas/Mesa%20flexora.gif',
    'https://www.gifdotreino.com/Exercicios/Gl%C3%BAteos/M%C3%A1quina%20de%20Abdu%C3%A7%C3%A3o%20de%20Quadril.gif',
    'https://www.gifdotreino.com/Exercicios/Pernas/M%C3%A1quina%20de%20Adu%C3%A7%C3%A3o%20de%20Quadril.gif',
    'https://www.gifdotreino.com/Exercicios/Panturrilhas/Eleva%C3%A7%C3%A3o%20de%20Panturrilha%20em%20M%C3%A1quina%20em%20p%C3%A9.gif',
    'https://www.gifdotreino.com/Exercicios/Panturrilhas/Eleva%C3%A7%C3%A3o%20de%20Panturrilhas%20no%20Hack.gif',
    'https://www.gifdotreino.com/Exercicios/Abdomen/Crunch.gif',
    'https://www.gifdotreino.com/Exercicios/Abdominais/Crunch.gif',
    'https://www.gifdotreino.com/Exercicios/Core/Crunch.gif'
  ];
  for (const t of tests) {
    console.log(await checkUrl(t));
  }
}
run();
