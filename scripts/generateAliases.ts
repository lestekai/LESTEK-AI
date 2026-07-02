import fs from 'fs';
import path from 'path';
import { EXERCISE_LIBRARY } from '../lib/exerciseLibrary';
import { EXERCISE_DATABASE } from '../lib/exerciseDatabase';
import { normalizeExerciseName } from '../lib/exerciseResolver';

const aliases: Record<string, string> = {};

for (const libEx of EXERCISE_LIBRARY) {
  const normLib = normalizeExerciseName(libEx.name);
  let found = EXERCISE_DATABASE.find(dbEx => 
    dbEx.normalizedName === normLib || dbEx.aliases.includes(normLib)
  );

  if (!found) {
    found = EXERCISE_DATABASE.find(dbEx => {
      const dbNorm = dbEx.normalizedName;
      if (dbNorm.includes(normLib) || normLib.includes(dbNorm)) return true;
      const inputWords = normLib.split(' ').filter(w => w.length > 2);
      const dbWords = dbNorm.split(' ').filter(w => w.length > 2);
      if (inputWords.length > 0 && inputWords.every(w => dbNorm.includes(w))) return true;
      if (dbWords.length > 0 && dbWords.every(w => normLib.includes(w))) return true;
      return false;
    });
  }

  if (!found) {
    // Try relaxed: match all words of lib in DB
    const inputWords = normLib.split(' ').filter(w => w.length > 3 || (w.length > 2 && w !== "com" && w !== "na" && w !== "no" && w !== "em")); 
    if (inputWords.length > 0) {
      found = EXERCISE_DATABASE.find(dbEx => {
        const dbNorm = dbEx.normalizedName;
        return inputWords.every(w => dbNorm.includes(w));
      });
    }
  }

  if (found && found.normalizedName !== normLib) {
    aliases[normLib] = found.normalizedName;
  } else if (!found) {
    console.log("STILL NO MATCH:", libEx.name, "->", normLib);
  }
}

const customOverrides: Record<string, string> = {
  "supino reto com halteres": "supino com halteres",
  "supino reto maquina": "supino reto na maquina",
  "supino reto cabo": "supino com cabo",
  "supino reto barra": "supino barra",
  "supino reto halter": "supino com halteres",
  "supino inclinado barra": "supino inclinado com barra",
  "supino inclinado halter": "supino inclinado com halteres",
  "supino inclinado maquina": "supino inclinado na maquina",
  "supino inclinado cabo": "supino inclinado com cabo",
  "supino declinado cabo": "supino declinado no cabo",
  "supino declinado barra": "supino declinado com barra",
  "supino declinado halter": "supino declinado com halteres",
  "supino declinado maquina": "supino declinado na maquina smith",
  "puxada articulada": "puxada alta com alavanca",
  "crucifixo halter": "crucifixo no chao com halteres",
  "crucifixo barra": "crucifixo na maquina",
  "crucifixo maquina": "crucifixo na maquina",
  "peck deck maquina": "voador no pec deck",
  "peck deck": "voador no pec deck",
  "remada curvada barra": "remada curvada",
  "remada curvada halter": "remada curvada com halteres",
  "remada curvada maquina": "remada na maquina",
  "remada curvada cabo": "remada no cabo",
  "remada baixa barra": "remada curvada com barra",
  "remada baixa halter": "remada curvada com halteres",
  "remada baixa maquina": "remada sentada na maquina",
  "remada baixa cabo": "remada sentada com cabo",
  "remada unilateral barra": "remada cavalinho",
  "remada unilateral halter": "remada unilateral com halter",
  "remada unilateral maquina": "remada maquina",
  "remada unilateral cabo": "remada unilateral no cabo",
  "pullover barra": "pull over barra",
  "pullover halter": "pull over halteres",
  "agachamento halter": "agachamento com halteres",
  "agachamento maquina": "agachamento hack",
  "leg press maquina": "leg press 45",
  "stiff halter": "stiff com halter",
  "avanco barra": "avanco com barra",
  "avanco halter": "avanco com halteres",
  "avanco maquina": "avanco no smith",
  "avanco cabo": "avanco no cabo",
  "desenvolvimento barra": "desenvolvimento barra",
  "desenvolvimento halter": "desenvolvimento halteres",
  "desenvolvimento maquina": "desenvolvimento maquina",
  "desenvolvimento cabo": "desenvolvimento cabo",
  "elevacao lateral barra": "elevacao lateral barra",
  "elevacao lateral halter": "elevacao lateral",
  "elevacao lateral maquina": "elevacao lateral maquina",
  "elevacao lateral cabo": "elevacao lateral no cabo",
  "elevacao frontal barra": "elevacao frontal barra",
  "elevacao frontal halter": "elevacao frontal com halteres",
  "elevacao frontal maquina": "elevacao frontal maquina",
  "elevacao frontal cabo": "elevacao frontal no cabo",
  "crucifixo inverso maquina": "voador invertido",
  "crucifixo inverso cabo": "voador para deltoides posterior com cabo",
  "remada alta barra": "remada alta",
  "remada alta halter": "remada alta com halteres",
  "remada alta maquina": "remada alta no smith",
  "remada alta cabo": "remada alta no cabo",
  "rosca direta barra": "rosca direta",
  "rosca direta halter": "rosca direta com halteres",
  "rosca direta maquina": "rosca na maquina",
  "rosca direta cabo": "rosca direta no cabo",
  "rosca alternada barra": "rosca alternada",
  "rosca alternada halter": "rosca alternada com halteres",
  "rosca alternada maquina": "rosca alternada maquina",
  "rosca alternada cabo": "rosca com cabo",
  "rosca scott barra": "rosca scott",
  "rosca scott halter": "rosca scott halteres",
  "rosca scott maquina": "rosca concentrada na maquina",
  "rosca scott cabo": "rosca no cabo banco daryl",
  "triceps pulley maquina": "triceps pulley",
  "triceps pulley cabo": "triceps pulley",
  "triceps testa barra": "triceps testa",
  "triceps testa halter": "triceps testa com halteres",
  "mergulho maquina": "mergulho assistido maquina",
  "abdominal na polia cabo": "abdominal na polia",
  "elevacao em pe barra": "elevacao de panturrilhas em pe",
  "elevacao em pe halter": "elevacao de panturrilhas em pe",
  "elevacao em pe maquina": "elevacao de panturrilha em maquina em pe",
  "elevacao em pe cabo": "elevacao de panturrilha em pe",
  "elevacao sentado barra": "gemeos sentado",
  "elevacao sentado halter": "gemeos sentado",
  "elevacao sentado maquina": "gemeos sentado",
  "elevacao sentado cabo": "gemeos sentado",
  "panturrilha no leg press maquina": "panturrilha no leg press",
  "supino inclinado halteres": "supino inclinado com halteres",
  "crucifixo maquina": "voador na maquina",
  "triceps corda": "triceps pulley com corda",
  "cadeira abdutora": "maquina de abducao de quadril",
  "cadeira adutora": "maquina de aducao de quadril",
  "gemeos em pe": "elevacao de panturrilhas em pe",
  "abdominal supra na polia": "abdominal na polia",
  "elevação lateral máqina": "elevacao lateral na maquina",
  "elevacao lateral maqina": "elevacao lateral na maquina",
  "crciixo máqina": "crucifixo na maquina",
  "crciixo maqina": "crucifixo na maquina",
  "elevação rontal máqina": "elevacao frontal maquina",
  "elevacao rontal maqina": "elevacao frontal maquina",
  "rosca alternada máqina": "rosca alternada maquina",
  "rosca alternada maqina": "rosca alternada maquina",
  "spino reto barra": "supino reto"
};

for (const k in customOverrides) {
  aliases[k] = customOverrides[k];
}

fs.writeFileSync(path.join(process.cwd(), 'generated', 'aliases.json'), JSON.stringify(aliases, null, 2));
console.log("Wrote mapping to generated/aliases.json");
