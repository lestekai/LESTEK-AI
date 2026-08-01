import fs from 'fs';
import path from 'path';

function processDirectory(dir: string) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Layout spacing
      content = content.replace(/space-y-8/g, 'space-y-4');
      content = content.replace(/space-y-6/g, 'space-y-4');
      content = content.replace(/p-6/g, 'p-4');
      content = content.replace(/p-8/g, 'p-5');
      content = content.replace(/px-6/g, 'px-4');
      content = content.replace(/py-6/g, 'py-4');
      content = content.replace(/px-5/g, 'px-4');
      content = content.replace(/py-5/g, 'py-3');
      content = content.replace(/py-4/g, 'py-3');
      content = content.replace(/mb-8/g, 'mb-4');
      content = content.replace(/mb-6/g, 'mb-4');
      content = content.replace(/mb-5/g, 'mb-3');
      content = content.replace(/mt-8/g, 'mt-4');
      content = content.replace(/mt-6/g, 'mt-4');
      content = content.replace(/mt-5/g, 'mt-3');
      content = content.replace(/gap-8/g, 'gap-4');
      content = content.replace(/gap-6/g, 'gap-4');
      
      // Rounded corners
      content = content.replace(/rounded-\[32px\]/g, 'rounded-2xl');
      content = content.replace(/rounded-3xl/g, 'rounded-2xl');
      
      // Sizes for large elements
      content = content.replace(/w-\[270px\]/g, 'w-[220px]');
      content = content.replace(/h-\[195px\]/g, 'h-[140px]');
      content = content.replace(/w-14 h-14/g, 'w-10 h-10');
      content = content.replace(/size=\{24\}/g, 'size={20}');
      
      // Text colors
      content = content.replace(/text-white/g, 'text-text-primary');
      content = content.replace(/text-slate-200/g, 'text-text-primary');
      content = content.replace(/text-slate-300/g, 'text-text-secondary');
      content = content.replace(/text-slate-400/g, 'text-text-secondary');
      content = content.replace(/text-slate-500/g, 'text-text-secondary');
      
      // Border colors
      content = content.replace(/border-white\/5/g, 'border-surface-light');
      content = content.replace(/border-white\/10/g, 'border-surface-light');
      content = content.replace(/border-slate-800/g, 'border-surface-light');
      
      fs.writeFileSync(fullPath, content);
      console.log(`Processed: ${fullPath}`);
    }
  });
}

processDirectory('components/workout');
