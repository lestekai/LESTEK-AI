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
    'https://www.gifdotreino.com/Exercicios/Pernas/Cadeira%20extensora.gif',
    'https://www.gifdotreino.com/Exercicios/Pernas/Cadeira%20Abdutora.gif',
    'https://www.gifdotreino.com/Exercicios/Gluteos/Agachamento%20na%20M%C3%A1quina%20Abdutora.gif',
    'https://www.gifdotreino.com/Exercicios/Pernas/G%C3%AAmeos%20em%20p%C3%A9%20na%20m%C3%A1quina.gif',
    'https://www.gifdotreino.com/Exercicios/Panturrilhas/G%C3%AAmeos%20em%20P%C3%A9.gif',
    'https://www.gifdotreino.com/Exercicios/Abdomen/Abdominal%20supra%20na%20polia.gif',
    'https://www.gifdotreino.com/Exercicios/Pernas/Cadeira%20adutora.gif',
    'https://www.gifdotreino.com/wp-content/uploads/2021/11/Agachamento-Bulgaro.gif',
  ];
  for (const t of tests) {
    console.log(await checkUrl(t));
  }
}
run();
