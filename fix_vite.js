const fs = require('fs');
let code = fs.readFileSync('vite.config.ts', 'utf8');

code = code.replace(
  /const apiKey = \(typeof customHeaderKey === 'string' && customHeaderKey\.trim\(\) !== ''\)[\s\S]*?\?\s*customHeaderKey[\s\S]*?:\s*\(process\.env\.GEMINI_API_KEY \|\| process\.env\.NEXT_PUBLIC_GEMINI_API_KEY \|\| process\.env\.VITE_GEMINI_API_KEY \|\| ''\);/,
  `const apiKey = process.env.GEMINI_API_KEY || (typeof customHeaderKey === 'string' && customHeaderKey.trim() !== '' ? customHeaderKey : (process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || ''));`
);

fs.writeFileSync('vite.config.ts', code);
