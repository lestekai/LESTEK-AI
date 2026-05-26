const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== 'dist') {
        processDir(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes("supabase.from('profiles')")) {
        // Replace
        content = content.replaceAll("supabase.from('profiles')", "supabaseAdmin.from('profiles')");
        
        // Ensure import
        if (!content.includes('supabaseAdmin')) {
          if (content.includes("import { supabase } from '@/lib/supabase'")) {
            content = content.replace("import { supabase } from '@/lib/supabase';", "import { supabase } from '@/lib/supabase';\nimport { supabaseAdmin } from '@/lib/supabase-admin';");
          } else if (content.includes("const { supabase } = await import('@/lib/supabase')")) {
            content = content.replace("const { supabase } = await import('@/lib/supabase');", "const { supabase } = await import('@/lib/supabase');\n      const { supabaseAdmin } = await import('@/lib/supabase-admin');");
          }
        }
        
        fs.writeFileSync(fullPath, content);
        console.log(`Fixed ${fullPath}`);
      }
    }
  }
}

processDir('./app');
processDir('./components');
