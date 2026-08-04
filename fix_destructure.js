const fs = require('fs');
let code = fs.readFileSync('components/AuthProvider.tsx', 'utf8');

code = code.replace(
  /selectedProgressionWeek\s*\}\)\)\s*\} = useWorkoutStore\(\);/,
  `selectedProgressionWeek\n   } = useWorkoutStore();`
);
fs.writeFileSync('components/AuthProvider.tsx', code);
