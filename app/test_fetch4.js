const https = require('https');

https.get('https://smartworkout.app/pt/exercicios', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
     const media = data.match(/https:\/\/[^"']*\.(gif|mp4|png|webm)/g);
     const relative = data.match(/\/(_next|media|images|exercises)\/[^"']*\.(gif|mp4|png|webm)/g);
     console.log('Media:', media ? Array.from(new Set(media)).slice(0, 5) : 'None');
     console.log('Relative:', relative ? Array.from(new Set(relative)).slice(0, 5) : 'None');
  });
});
