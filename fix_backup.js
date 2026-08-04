const fs = require('fs');
let code = fs.readFileSync('components/AuthProvider.tsx', 'utf8');

code = code.replace(
  /_backup: JSON\.parse\(JSON\.stringify\(\{[\s\S]*?\}\)\)\n\s*\}\n\s*\}/,
  `_backup: JSON.parse(JSON.stringify({
              tasks, 
              goals,
              transactions,
              workoutPlan: currentPlan,
              workoutHistory,
              questionnaire,
              userTemplates,
              activeFreeWorkout,
              settings,
              selectedProgressionWeek
            }))`
);
fs.writeFileSync('components/AuthProvider.tsx', code);
