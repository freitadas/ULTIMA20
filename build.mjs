// Creates a clean, public-only directory for the Cloudflare Workers static assets.
import { mkdir, copyFile, rm } from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','story.js','expansion.js','game.js','cutscene_hospital.webp','cutscene_rooftop.webp','cutscene_helix.webp','cutscene_flashback.webp'])await copyFile(file,`dist/${file}`);
console.log('Assets públicos gerados em dist/ (index.html, styles.css, story.js, expansion.js, game.js).');
