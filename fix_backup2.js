const fs = require('fs');
let code = fs.readFileSync('components/AuthProvider.tsx', 'utf8');

code = code.replace(
  /selectedProgressionWeek\n\s*\}\)\)\n\s*\}\)\;/,
  `selectedProgressionWeek
            }))
          }
        });`
);
fs.writeFileSync('components/AuthProvider.tsx', code);
