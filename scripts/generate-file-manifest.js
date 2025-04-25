
const fs = require('fs');
const path = require('path');

function generateFileManifest(dir) {
  const files = [];

  function traverseDirectory(currentPath) {
    const entries = fs.readdirSync(currentPath);

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules and other non-relevant directories
        if (entry !== 'node_modules' && entry !== 'dist' && entry !== '.git') {
          traverseDirectory(fullPath);
        }
      } else if (entry.match(/\.(tsx|js|css)$/)) {
        // Use relative path from project root
        files.push(path.relative(process.cwd(), fullPath));
      }
    }
  }

  traverseDirectory(dir);
  return files;
}

const manifest = generateFileManifest(process.cwd());
fs.writeFileSync('file-manifest.txt', manifest.join('\n'));

console.log('File manifest generated successfully.');
