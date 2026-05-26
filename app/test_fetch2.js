const https = require('https');

https.get('https://smartworkout.app/pt/exercicios', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const urls = data.match(/https:\/\/[^"'\s>]*smartworkout\.[^"'\s>]*/g);
    console.log(urls ? Array.from(new Set(urls)).slice(0, 30) : 'No urls');
  });
}).on('error', err => console.log('Error:', err.message));
