// Build script for minifying CSS/JS
// Run with: node scripts/build.minify.js

const fs = require('fs');
const path = require('path');

// CSS minification (simple)
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\/|\/\/[^\\n]*$/gm, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*([{};:,])\s*/g, '$1') // Remove spaces around punctuation
    .replace(/;\s*;/g, ';') // Remove duplicate semicolons
    .trim();
}

// JS minification (simple)
function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\/|\/\/[^\\n]*$/gm, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};:,])\s*/g, '$1')
    .replace(/;\s*;/g, ';')
    .trim();
}

// Process files
const cssFiles = ['css/site_global.css', 'css/master_a-master.css', 'css/index.css', 'css/responsive.css'];
const jsFiles = ['scripts/muse-init.js', 'scripts/museconfig.js'];

console.log('Starting minification...');

cssFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const minified = minifyCSS(content);
    const minFile = file.replace('.css', '.min.css');
    fs.writeFileSync(minFile, minified);
    console.log(`Minified: ${file} -> ${minFile}`);
  }
});

jsFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const minified = minifyJS(content);
    const minFile = file.replace('.js', '.min.js');
    fs.writeFileSync(minFile, minified);
    console.log(`Minified: ${file} -> ${minFile}`);
  }
});

console.log('Build complete!');