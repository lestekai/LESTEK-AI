const https = require('https');

https.get('https://smartworkout.app/pt', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
     console.log('Status:', res.statusCode);
     if(res.statusCode >= 300) { console.log('headers', res.headers) }
     const content = data.substring(0, 1000);
     console.log(content);
  });
});
