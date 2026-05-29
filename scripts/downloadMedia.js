const https = require('https');

async function testUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve({ url, status: res.statusCode, contentType: res.headers['content-type'] });
    });
    req.on('error', (err) => resolve({ url, status: 0, error: err.message }));
    req.setTimeout(3000, () => {
      req.abort();
      resolve({ url, status: 0, error: 'TIMEOUT' });
    });
  });
}

async function main() {
  const urls = [
    'https://www.gifdotreino.com/gifs/agachamento-com-barra.gif',
    'https://www.gifdotreino.com/gifs/agachamento.gif',
    'https://www.gifdotreino.com/gifs/leg-press-45-graus.gif',
    'https://www.gifdotreino.com/gifs/stiff.gif',
    'https://www.gifdotreino.com/gifs/deadlift.gif'
  ];
  for (const u of urls) {
     console.log(await testUrl(u));
  }
}
main();
