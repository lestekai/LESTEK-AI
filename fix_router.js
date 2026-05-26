const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace imports
  if (content.includes('react-router-dom')) {
    changed = true;
    
    let nextImports = [];
    if (content.includes('useNavigate') || content.includes('useLocation')) {
      nextImports.push('useRouter');
      if (content.includes('useLocation')) nextImports.push('usePathname');
    }
    
    // We replace react-router-dom line completely. If Link is used, import it from next/link
    let hasLink = content.includes('Link } from \'react-router-dom') || content.includes('Link} from \'react-router-dom');
    
    content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]react-router-dom['"];?/g, (match, p1) => {
      let imports = [];
      if (p1.includes('useSearchParams')) imports.push('useSearchParams');
      if (p1.includes('useNavigate') || p1.includes('useLocation')) {
        imports.push('useRouter');
        if (p1.includes('useLocation')) imports.push('usePathname');
      }
      let res = '';
      if (imports.length) res += `import { ${[...new Set(imports)].join(', ')} } from 'next/navigation';\n`;
      if (p1.includes('Link')) res += `import Link from 'next/link';\n`;
      return res.trim();
    });
  }

  // Replace useNavigate()
  if (changed && content.includes('useNavigate()')) {
    content = content.replace(/const\s+(\w+)\s*=\s*useNavigate\(\);/g, 'const $1 = useRouter();');
  }

  // Replace useLocation()
  if (changed && content.includes('useLocation()')) {
    content = content.replace(/const\s+(\w+)\s*=\s*useLocation\(\);/g, 'const pathname = usePathname();');
    // If it was const location = useLocation(), and location.pathname is used:
    content = content.replace(/location\.pathname/g, 'pathname');
  }

  // Replace Link to={...} with Link href={...}
  if (changed && content.includes('<Link')) {
    content = content.replace(/<Link([^>]+)to=/g, '<Link$1href=');
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === 'dist') continue;
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

processDirectory('app');
processDirectory('components');
processDirectory('lib');
