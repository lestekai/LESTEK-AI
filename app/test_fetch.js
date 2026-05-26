const https = require('https');

https.get('https://smartworkout.app/pt/exercicios', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const gifs = data.match(/https:\/\/[^"']*\.gif/g);
    console.log(gifs ? gifs.slice(0, 10) : 'No gifs found');
  });
}).on('error', err => console.log('Error:', err.message));
