import { resolveExerciseMedia } from '../lib/exerciseResolver';

const idsToTest = [
  "spino reto barra",
  "crciixo máqina",
  "elevação lateral máqina",
  "elevação rontal máqina",
  "rosca alternada máqina",
  "Supino inclinado barra",
  "Puxada Articulada",
  "Crucifixo máquina",
  "Elevação Lateral",
  "Elevação lateral máquina"
];

for (const id of idsToTest) {
  const media = resolveExerciseMedia(id, '');
  console.log(`${id} =>`, media.url);
}
