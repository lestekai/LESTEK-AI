import fs from 'fs';
import path from 'path';

let dbRaw = fs.readFileSync(path.join(process.cwd(), 'generated', 'exercise-media-database.json'), 'utf8');

const replacements = [
  ['https://www.gifdotreino.com/Exercicios/B%C3%ADceps/Rosca%20Alternada.gif', 'https://api.smartworkout.app/asset/video/e6d86856-f18f-466b-8cdc-b3a48c9644f5.mp4'],
  ['https://www.gifdotreino.com/Exercicios/Ombros/Eleva%C3%A7%C3%A3o%20Lateral.gif', 'https://api.smartworkout.app/asset/video/30f3160a-3a57-426a-a3b9-4eed573310f8.mp4'],
  ['https://www.gifdotreino.com/Exercicios/Funcional%20e%20HIT/Eleva%C3%A7%C3%A3o%20Lateral%20de%20Perna%20com%20Faixa%20El%C3%A1stica.gif', 'https://api.smartworkout.app/asset/video/30f3160a-3a57-426a-a3b9-4eed573310f8.mp4'],
  ['https://www.gifdotreino.com/Exercicios/Ombros/Eleva%C3%A7%C3%A3o%20Frontal%20com%20Halteres.gif', 'https://api.smartworkout.app/asset/video/dc5a8397-bb70-4dbb-a7e8-dc9297298aa7.mp4'],
  ['https://www.gifdotreino.com/Exercicios/Costas/Puxada%20Alta%20com%20Alavanca.gif', 'https://api.smartworkout.app/asset/video/e4d0d3a5-bc44-482a-a92c-623253bafc74.mp4'],
  ['https://www.gifdotreino.com/Exercicios/Peitoral/Supino%20inclinado%20com%20barra.gif', 'https://api.smartworkout.app/asset/video/2dbf1e31-506c-48c5-ac3d-f215bf36a445.mp4']
];

for (const [bad, good] of replacements) {
    dbRaw = dbRaw.replaceAll(bad, good);
}

fs.writeFileSync(path.join(process.cwd(), 'generated', 'exercise-media-database.json'), dbRaw);

let libRaw = fs.readFileSync(path.join(process.cwd(), 'lib', 'exerciseLibrary.ts'), 'utf8');
for (const [bad, good] of replacements) {
    libRaw = libRaw.replaceAll(bad, good);
}
fs.writeFileSync(path.join(process.cwd(), 'lib', 'exerciseLibrary.ts'), libRaw);

console.log("Fixed known bad urls");
