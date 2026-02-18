// Image optimization script
// Run with: node scripts/image-optimizer.js

const fs = require('fs');
const path = require('path');

console.log('Image optimization script created.');
console.log('To optimize images, use a tool like:');
console.log('  - ImageOptim (macOS)');
console.log('  - TinyPNG API');
console.log('  - Squoosh CLI');
console.log('');
console.log('Recommended workflow:');
console.log('1. Convert JPEGs to WebP format');
console.log('2. Convert PNGs to WebP/AVIF');
console.log('3. Add width/height attributes to all images');
console.log('4. Use srcset for responsive images');
console.log('');
console.log('Example HTML for responsive image:');
console.log('<img src="image.jpg" srcset="image-320w.jpg 320w, image-640w.jpg 640w, image-1280w.jpg 1280w" sizes="(max-width: 640px) 100vw, 50vw" alt="Description">');