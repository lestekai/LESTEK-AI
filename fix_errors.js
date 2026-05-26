const fs = require('fs');

const files = [
  'app/workouts/page.tsx',
  'app/workouts/library/page.tsx',
  'app/workouts/active/page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/onError=\{\(e\) => \{[\s\S]*?innerHTML = ['"][\s\S]*?\}\s*\}\s*\}\s*\}/g, `onError={(e) => {
    (e.target as HTMLElement).style.opacity = '0';
  }}`);
  
  // Try another variation
  content = content.replace(/onError=\{\(e\) => \{[\s\S]*?innerHTML = ['"][\s\S]*?\}\}/g, `onError={(e) => {
    (e.target as HTMLElement).style.opacity = '0';
  }}`);
  fs.writeFileSync(file, content);
});
console.log('Fixed errors again again');
