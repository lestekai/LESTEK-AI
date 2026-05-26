const https = require('https');
https.get('https://smartworkout.app/media/exercises/esteira-corrida-caminhada.gif', res => console.log('Esteira:', res.statusCode));
https.get('https://smartworkout.app/images/exercises/bench-press.gif', res => console.log('Bench press:', res.statusCode));
