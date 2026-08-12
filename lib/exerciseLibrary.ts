export type ExerciseDefinition = {
  id: string;
  name: string;
  targetMuscles: string[];
  equipment?: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  instructions: string;
  commonErrors?: string[];
  substitutions?: string[];
  gifPlaceholder?: string;
  gifUrl?: string;
  description?: string;
};

export function findExerciseInLibrary(id: string): ExerciseDefinition | undefined { 
  if (!id) return undefined;
  return EXERCISE_LIBRARY.find(ex => ex.id === id); 
}

export function searchExercises(query: string, muscleFilter: string = "Todos", difficultyFilter: string = "Todas"): ExerciseDefinition[] {
  let results = EXERCISE_LIBRARY;
  if (muscleFilter !== "Todos") {
    results = results.filter(ex => (ex.targetMuscles || []).includes(muscleFilter));
  }
  if (difficultyFilter !== "Todas") {
    results = results.filter(ex => ex.difficulty === difficultyFilter);
  }
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(ex => 
      ((ex.name || '').toLowerCase().includes(q)) || 
      ((ex.targetMuscles || []).some(m => (m || '').toLowerCase().includes(q)))
    );
  }
  return results;
}

export const EXERCISE_LIBRARY: ExerciseDefinition[] = [
  {
    "id": "supino reto maquina",
    "name": "Supino Reto Máquina",
    "targetMuscles": [
      "Peitoral",
      "Triceps",
      "Ombros"
    ],
    "difficulty": "Intermediário",
    "instructions": "Ajuste o banco, sente-se e empurre as alavancas para frente.",
    "equipment": "Máquina"
  },
  {
    "id": "supino reto cabo",
    "name": "Supino Reto Cabo",
    "targetMuscles": [
      "Peitoral",
      "Triceps",
      "Ombros"
    ],
    "difficulty": "Intermediário",
    "instructions": "Fique em pé ou sentado entre as polias e empurre os cabos para frente.",
    "equipment": "Cabo"
  },
  {
    "id": "supino inclinado barra",
    "name": "Supino Inclinado Barra",
    "targetMuscles": [
      "Peitoral Superior",
      "Ombros",
      "Triceps"
    ],
    "difficulty": "Intermediário",
    "instructions": "Deite-se no banco inclinado e empurre a barra para cima.",
    "equipment": "Barra"
  },
  {
    "id": "supino inclinado halter",
    "name": "Supino Inclinado Halter",
    "targetMuscles": [
      "Peitoral Superior",
      "Ombros",
      "Triceps"
    ],
    "difficulty": "Intermediário",
    "instructions": "Deite-se no banco inclinado e empurre os halteres para cima.",
    "equipment": "Halteres"
  },
  {
    "id": "supino inclinado maquina",
    "name": "Supino Inclinado Máquina",
    "targetMuscles": [
      "Peitoral Superior",
      "Ombros",
      "Triceps"
    ],
    "difficulty": "Intermediário",
    "instructions": "Ajuste o banco e empurre as alavancas para cima e para frente.",
    "equipment": "Máquina"
  },
  {
    "id": "crciixo barra",
    "name": "Crucifixo barra",
    "targetMuscles": [
      "Peitoral"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Crucifixo barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo barra"
  },
  {
    "id": "spino declinado barra",
    "name": "Supino declinado barra",
    "targetMuscles": [
      "Peitoral Inferior"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Supino declinado barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino declinado barra"
  },
  {
    "id": "crciixo halter",
    "name": "Crucifixo halter",
    "targetMuscles": [
      "Peitoral"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Crucifixo halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo halter"
  },
  {
    "id": "crciixo máqina",
    "name": "Crucifixo máquina",
    "targetMuscles": [
      "Peitoral"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Crucifixo máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo máquina"
  },
  {
    "id": "spino declinado cabo",
    "name": "Supino declinado cabo",
    "targetMuscles": [
      "Peitoral Inferior"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Supino declinado cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino declinado cabo"
  },
  {
    "id": "crossover cabo",
    "name": "Crossover cabo",
    "targetMuscles": [
      "Peitoral"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Crossover cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crossover cabo"
  },
  {
    "id": "spino declinado máqina",
    "name": "Supino declinado máquina",
    "targetMuscles": [
      "Peitoral Inferior"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Supino declinado máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino declinado máquina"
  },
  {
    "id": "spino declinado halter",
    "name": "Supino declinado halter",
    "targetMuscles": [
      "Peitoral Inferior"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Supino declinado halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino declinado halter"
  },
  {
    "id": "remada alta com barra",
    "name": "Remada Alta com Barra",
    "targetMuscles": [
      "Ombros",
      "Trapézio"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Remada Alta com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Alta com Barra"
  },
  {
    "id": "desenvolvimento militar com barra",
    "name": "Desenvolvimento Militar com Barra",
    "targetMuscles": [
      "Ombros"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Desenvolvimento Militar com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento Militar com Barra"
  },
  {
    "id": "rosca alternada com halteres",
    "name": "Rosca Alternada com Halteres",
    "targetMuscles": [
      "Bíceps"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Rosca Alternada com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Alternada com Halteres"
  },
  {
    "id": "spino reto com halteres",
    "name": "Supino Reto com Halteres",
    "targetMuscles": [
      "Peitoral",
      "Tríceps",
      "Ombros"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Supino Reto com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Reto com Halteres"
  },
  {
    "id": "spino reto barra",
    "name": "Supino reto barra",
    "targetMuscles": [
      "Peitoral",
      "Tríceps",
      "Ombros"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Supino reto barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino reto barra"
  },
  {
    "id": "peck deck máqina",
    "name": "Peck deck máquina",
    "targetMuscles": [
      "Peitoral"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Peck deck máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Peck deck máquina"
  },
  {
    "id": "cadeira extensora máqina",
    "name": "Cadeira extensora máquina",
    "targetMuscles": [
      "Quadríceps"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Cadeira extensora máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Cadeira extensora máquina"
  },
  {
    "id": "remada baixa barra",
    "name": "Remada baixa barra",
    "targetMuscles": [
      "Costas"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Remada baixa barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada baixa barra"
  },
  {
    "id": "remada baixa halter",
    "name": "Remada baixa halter",
    "targetMuscles": [
      "Costas"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Remada baixa halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada baixa halter"
  },
  {
    "id": "agachamento barra",
    "name": "Agachamento barra",
    "targetMuscles": [
      "Quadríceps",
      "Glúteos"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Agachamento barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento barra"
  },
  {
    "id": "avanço barra",
    "name": "Avanço barra",
    "targetMuscles": [
      "Pernas"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Avanço barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Avanço barra"
  },
  {
    "id": "avanço halter",
    "name": "Avanço halter",
    "targetMuscles": [
      "Pernas"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Avanço halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Avanço halter"
  },
  {
    "id": "elevação lateral máqina",
    "name": "Elevação lateral máquina",
    "targetMuscles": [
      "Ombros"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Elevação lateral máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral máquina"
  },
  {
    "id": "remada alta halter",
    "name": "Remada alta halter",
    "targetMuscles": [
      "Ombros",
      "Trapézio"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Remada alta halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada alta halter"
  },
  {
    "id": "spino reto barra 2",
    "name": "Supino Reto Barra",
    "targetMuscles": [
      "Peitoral",
      "Tríceps",
      "Ombros"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Supino Reto Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Reto Barra"
  },
  {
    "id": "elevação sentado barra",
    "name": "Elevação sentado barra",
    "targetMuscles": [
      "Panturrilhas"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Elevação sentado barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação sentado barra"
  },
  {
    "id": "rosca concentrada halter",
    "name": "Rosca concentrada halter",
    "targetMuscles": [
      "Bíceps"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Rosca concentrada halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca concentrada halter"
  },
  {
    "id": "rosca concentrada máqina",
    "name": "Rosca concentrada máquina",
    "targetMuscles": [
      "Bíceps"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Rosca concentrada máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca concentrada máquina"
  },
  {
    "id": "rosca martelo cabo",
    "name": "Rosca martelo cabo",
    "targetMuscles": [
      "Bíceps",
      "Antebraço"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Rosca martelo cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca martelo cabo"
  },
  {
    "id": "elevação em pé barra",
    "name": "Elevação em pé barra",
    "targetMuscles": [
      "Panturrilhas"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Elevação em pé barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação em pé barra"
  },
  {
    "id": "rosca martelo halter",
    "name": "Rosca martelo halter",
    "targetMuscles": [
      "Bíceps",
      "Antebraço"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Rosca martelo halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca martelo halter"
  },
  {
    "id": "rosca martelo barra",
    "name": "Rosca martelo barra",
    "targetMuscles": [
      "Bíceps",
      "Antebraço"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Rosca martelo barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca martelo barra"
  },
  {
    "id": "rosca concentrada cabo",
    "name": "Rosca concentrada cabo",
    "targetMuscles": [
      "Bíceps"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Rosca concentrada cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca concentrada cabo"
  },
  {
    "id": "elevação em pé halter",
    "name": "Elevação em pé halter",
    "targetMuscles": [
      "Panturrilhas"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Elevação em pé halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação em pé halter"
  },
  {
    "id": "elevação sentado cabo",
    "name": "Elevação sentado cabo",
    "targetMuscles": [
      "Panturrilhas"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Elevação sentado cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação sentado cabo"
  },
  {
    "id": "rosca concentrada barra",
    "name": "Rosca concentrada barra",
    "targetMuscles": [
      "Bíceps"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Rosca concentrada barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca concentrada barra"
  },
  {
    "id": "rosca martelo máqina",
    "name": "Rosca martelo máquina",
    "targetMuscles": [
      "Bíceps",
      "Antebraço"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Rosca martelo máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca martelo máquina"
  },
  {
    "id": "rosca scott cabo",
    "name": "Rosca Scott cabo",
    "targetMuscles": [
      "Bíceps"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Rosca Scott cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Scott cabo"
  },
  {
    "id": "elevação em pé cabo",
    "name": "Elevação em pé cabo",
    "targetMuscles": [
      "Panturrilhas"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Elevação em pé cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação em pé cabo"
  },
  {
    "id": "elevação sentado halter",
    "name": "Elevação sentado halter",
    "targetMuscles": [
      "Panturrilhas"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Elevação sentado halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação sentado halter"
  },
  {
    "id": "supino_inclinado_com_cabo_em_pe",
    "name": "Supino Inclinado com Cabo em Pé",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Standing Cable Low Chest Press tem como alvo a parte inferior dos músculos peitorais. Este exercício é realizado usando uma máquina de cabos com as ...",
    "instructions": "O Standing Cable Low Chest Press tem como alvo a parte inferior dos músculos peitorais. Este exercício é realizado usando uma máquina de cabos com as polias ajustadas em uma posição baixa. Ele envolve o peito, os ombros e os tríceps, promovendo o crescimento muscular e a força na parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Cabo em Pé"
  },
  {
    "id": "crciixo maquina 2",
    "name": "Crucifixo Máquina",
    "targetMuscles": [
      "Peitoral"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Crucifixo Máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Máquina"
  },
  {
    "id": "elevação lateral",
    "name": "Elevação Lateral",
    "targetMuscles": [
      "Ombros"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Elevação Lateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Lateral"
  },
  {
    "id": "crucifixo_no_cabo_alto_baixo",
    "name": "Crucifixo no Cabo Alto-Baixo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O High Low Cable Chest Fly é um exercício de isolamento que foca nos músculos peitorais. Envolve o uso de uma máquina de cabos para realizar um movime...",
    "instructions": "O High Low Cable Chest Fly é um exercício de isolamento que foca nos músculos peitorais. Envolve o uso de uma máquina de cabos para realizar um movimento de fly, começando com os cabos posicionados acima dos ombros e puxando-os para baixo em um arco em direção à linha média do corpo. Este movimento enfatiza a parte inferior do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo no Cabo Alto-Baixo"
  },
  {
    "id": "tríceps testa",
    "name": "Tríceps Testa",
    "targetMuscles": [
      "Tríceps"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Tríceps Testa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps Testa"
  },
  {
    "id": "flexao_de_punho_invertida",
    "name": "Flexão de Punho Invertida",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Reverse Wrist Push-Up é um exercício avançado de peso corporal que visa os antebraços, pulsos e flexores dos dedos. Envolve a execução de uma flexão...",
    "instructions": "O Reverse Wrist Push-Up é um exercício avançado de peso corporal que visa os antebraços, pulsos e flexores dos dedos. Envolve a execução de uma flexão com os pulsos em posição invertida, o que coloca um estresse significativo nas articulações dos pulsos e nos músculos do antebraço. Este exercício requer um alto nível de flexibilidade e força nos pulsos, tornando-o adequado apenas para indivíduos experientes.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Punho Invertida"
  },
  {
    "id": "flexao_de_bracos_sobre_os_punhos",
    "name": "Flexão de Braços sobre os Punhos",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Flexões de Punho são uma variação da flexão tradicional realizada nos punhos em vez das palmas das mãos. Este exercício foca no peito, tríceps, ombros...",
    "instructions": "Flexões de Punho são uma variação da flexão tradicional realizada nos punhos em vez das palmas das mãos. Este exercício foca no peito, tríceps, ombros e core, enquanto também fortalece os pulsos e antebraços. É frequentemente usado no treinamento de artes marciais para melhorar a potência dos socos e a estabilidade dos pulsos.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços sobre os Punhos"
  },
  {
    "id": "cardio_bicicleta",
    "name": "Bicicleta Ergométrica",
    "targetMuscles": [
      "Cardio",
      "Pernas"
    ],
    "equipment": "Máquina Multifuncional",
    "difficulty": "Iniciante",
    "description": "Exercício aeróbico de baixo impacto simulando ciclismo.",
    "instructions": "Ajuste o banco de forma que a perna fique levemente flexionada na parte mais baixa do pedal. Mantenha as costas retas e o core contraído.",
    "commonErrors": [
      "Banco muito baixo ou muito alto.",
      "Curvar demais as costas."
    ],
    "substitutions": [
      "Esteira",
      "Elíptico"
    ],
    "gifPlaceholder": "Bicicleta Ergométrica"
  },
  {
    "id": "supino_em_pe_com_cabo",
    "name": "Supino em Pé com Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Standing Cable Chest Press é um exercício eficaz que visa os músculos peitorais, tríceps e deltoides anteriores. Envolve pressionar um cabo para a f...",
    "instructions": "O Standing Cable Chest Press é um exercício eficaz que visa os músculos peitorais, tríceps e deltoides anteriores. Envolve pressionar um cabo para a frente enquanto está em pé, envolvendo o core para estabilidade e equilíbrio.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino em Pé com Cabo"
  },
  {
    "id": "paralelas",
    "name": "Paralelas",
    "targetMuscles": [
      "Tríceps",
      "Peitoral"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Paralelas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Paralelas"
  },
  {
    "id": "desenvolvimento militar",
    "name": "Desenvolvimento Militar",
    "targetMuscles": [
      "Ombros"
    ],
    "difficulty": "Intermediário",
    "instructions": "O exercício Desenvolvimento Militar foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Uso excessivo de carga",
      "Amplitude de movimento encurtada",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento Militar"
  },
  {
    "id": "supino_com_barra_no_chao",
    "name": "Supino com Barra no Chão",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Barbell Floor Press é um exercício composto para a parte superior do corpo que trabalha o peito, tríceps e ombros. É realizado deitando-se no chão e...",
    "instructions": "O Barbell Floor Press é um exercício composto para a parte superior do corpo que trabalha o peito, tríceps e ombros. É realizado deitando-se no chão e pressionando uma barra do nível do peito até a extensão dos braços acima do torso. Este exercício minimiza a tensão nos ombros e enfatiza o envolvimento dos tríceps devido à amplitude de movimento limitada.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Barra no Chão"
  },
  {
    "id": "supino_com_halteres_no_chao",
    "name": "Supino com Halteres no Chão",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Floor Dumbbell Press é um exercício de treinamento de força que foca no peito, tríceps e ombros. É realizado deitado no chão, o que limita a amplitu...",
    "instructions": "O Floor Dumbbell Press é um exercício de treinamento de força que foca no peito, tríceps e ombros. É realizado deitado no chão, o que limita a amplitude de movimento e ajuda a proteger os ombros, permitindo um foco nos músculos de pressão. Este exercício é ideal para desenvolver a força e a massa muscular da parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Halteres no Chão"
  },
  {
    "id": "supino_larsen_com_halteres",
    "name": "Supino Larsen com Halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Dumbbell Larsen Press é uma variação do supino que enfatiza a força e a estabilidade da parte superior do corpo. É realizado com halteres enquanto o...",
    "instructions": "O Dumbbell Larsen Press é uma variação do supino que enfatiza a força e a estabilidade da parte superior do corpo. É realizado com halteres enquanto os pés permanecem fora do chão, o que aumenta o envolvimento do core e reduz o impulso das pernas, focando mais no peito, ombros e tríceps.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Larsen com Halteres"
  },
  {
    "id": "flexao_de_bracos_em_declinio",
    "name": "Flexão de Braços em Declínio",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Decline Push-Up é um exercício de peso corporal que foca no peito superior, ombros e tríceps, elevando os pés em uma superfície estável. Esta variaç...",
    "instructions": "O Decline Push-Up é um exercício de peso corporal que foca no peito superior, ombros e tríceps, elevando os pés em uma superfície estável. Esta variação aumenta a dificuldade em comparação com uma flexão padrão, transferindo mais peso para a parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços em Declínio"
  },
  {
    "id": "flexao_de_bracos_com_salto",
    "name": "Flexão de Braços com Salto",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Push Up Jack é um exercício dinâmico que combina a flexão tradicional com o movimento de um polichinelo. Ele trabalha os músculos do peito, ombros, ...",
    "instructions": "O Push Up Jack é um exercício dinâmico que combina a flexão tradicional com o movimento de um polichinelo. Ele trabalha os músculos do peito, ombros, tríceps e core, além de proporcionar benefícios cardiovasculares. Este exercício melhora a força da parte superior do corpo, a resistência e a coordenação.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Salto"
  },
  {
    "id": "flexao_profunda_em_barras_paralelas",
    "name": "Flexão Profunda em Barras Paralelas",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Deep Push Up On Parallel Bars é um exercício avançado para a parte superior do corpo que foca no peito, tríceps e ombros. Ao realizar este exercício...",
    "instructions": "O Deep Push Up On Parallel Bars é um exercício avançado para a parte superior do corpo que foca no peito, tríceps e ombros. Ao realizar este exercício em barras paralelas, você aumenta a amplitude de movimento em comparação com as flexões padrão, o que melhora o envolvimento muscular e o desenvolvimento da força.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão Profunda em Barras Paralelas"
  },
  {
    "id": "mergulhos_em_planche",
    "name": "Mergulhos em Planche",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Os Planche Dips são um exercício avançado de peso corporal que combina elementos da posição planche e do movimento de mergulho. Este exercício tem com...",
    "instructions": "Os Planche Dips são um exercício avançado de peso corporal que combina elementos da posição planche e do movimento de mergulho. Este exercício tem como alvo principal os músculos do peito, ombros, tríceps e core. Requer força significativa na parte superior do corpo, equilíbrio e coordenação.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Mergulhos em Planche"
  },
  {
    "id": "cao_descendente_em_pe",
    "name": "Cão Descendente em Pé",
    "targetMuscles": [
      "Panturrilhas"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Standing Downward Dog é uma variação da tradicional pose de ioga Downward Dog, realizada em pé. Ele foca principalmente nos ombros, isquiotibiais, p...",
    "instructions": "O Standing Downward Dog é uma variação da tradicional pose de ioga Downward Dog, realizada em pé. Ele foca principalmente nos ombros, isquiotibiais, panturrilhas e músculos das costas, promovendo flexibilidade e força. Este exercício é benéfico para melhorar a postura e aliviar a tensão na parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Cão Descendente em Pé"
  },
  {
    "id": "boxe_com_saco_de_pancadas",
    "name": "Boxe com Saco de Pancadas",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Punching Bag Boxing é um exercício cardiovascular e de treinamento de força que envolve golpear um saco pesado com vários socos. Este exercício melh...",
    "instructions": "O Punching Bag Boxing é um exercício cardiovascular e de treinamento de força que envolve golpear um saco pesado com vários socos. Este exercício melhora a coordenação motora, fortalece a parte superior do corpo, aumenta a resistência cardiovascular e ajuda a aliviar o estresse. Ele envolve músculos nos ombros, braços, peito e core.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Boxe com Saco de Pancadas"
  },
  {
    "id": "crucifixo_no_cabo_para_peitoral_medio",
    "name": "Crucifixo no Cabo para Peitoral Médio",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Cable Middle Chest Fly é um exercício de isolamento que visa os músculos peitorais, especificamente a cabeça esternal do peitoral maior. É realizado...",
    "instructions": "O Cable Middle Chest Fly é um exercício de isolamento que visa os músculos peitorais, especificamente a cabeça esternal do peitoral maior. É realizado usando uma máquina de cabos com alças ajustadas na altura dos ombros, permitindo uma tensão controlada e consistente durante todo o movimento.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo no Cabo para Peitoral Médio"
  },
  {
    "id": "supino_com_halteres_em_pegada_fechada",
    "name": "Supino com Halteres em Pegada Fechada",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Close Grip Dumbbell Bench Press é um exercício composto que foca nos tríceps, peito e ombros. Envolve pressionar halteres a partir de uma posição su...",
    "instructions": "O Close Grip Dumbbell Bench Press é um exercício composto que foca nos tríceps, peito e ombros. Envolve pressionar halteres a partir de uma posição supina em um banco, com as mãos posicionadas mais próximas do que em um supino padrão. Este exercício enfatiza os tríceps enquanto também envolve os músculos peitorais e deltoides anteriores.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Halteres em Pegada Fechada"
  },
  {
    "id": "flexao_de_bracos_superman",
    "name": "Flexão de Braços Superman",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Spider Push Up é uma variação dinâmica da flexão tradicional que envolve o core, peito, ombros, tríceps e oblíquos. Consiste em trazer um joelho em ...",
    "instructions": "O Spider Push Up é uma variação dinâmica da flexão tradicional que envolve o core, peito, ombros, tríceps e oblíquos. Consiste em trazer um joelho em direção ao cotovelo do mesmo lado enquanto você abaixa o corpo, adicionando um elemento de estabilização do core e mobilidade.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços Superman"
  },
  {
    "id": "flexao_de_bracos_negativa",
    "name": "Flexão de Braços Negativa",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "As flexões negativas concentram-se na fase excêntrica da flexão, onde você abaixa o corpo lentamente até o chão. Este exercício ajuda a desenvolver fo...",
    "instructions": "As flexões negativas concentram-se na fase excêntrica da flexão, onde você abaixa o corpo lentamente até o chão. Este exercício ajuda a desenvolver força e controle, particularmente no peito, tríceps e ombros, ao enfatizar a tensão muscular durante a fase de descida.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços Negativa"
  },
  {
    "id": "mergulho_coreano",
    "name": "Mergulho Coreano",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Korean Dip é um exercício avançado de peso corporal que trabalha os tríceps, ombros e peito. Ele envolve um padrão de movimento único que requer for...",
    "instructions": "O Korean Dip é um exercício avançado de peso corporal que trabalha os tríceps, ombros e peito. Ele envolve um padrão de movimento único que requer força significativa na parte superior do corpo e estabilidade. Este exercício é geralmente realizado em barras paralelas e é conhecido por sua transição dinâmica de um mergulho para uma sustentação horizontal.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Mergulho Coreano"
  },
  {
    "id": "crucifixo_em_crossover_ajoelhado_de_cima_para_baixo",
    "name": "Crucifixo em Crossover Ajoelhado de Cima para Baixo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Os crucifixos com cabos de joelhos visam os músculos do peito, especificamente o peitoral maior, enquanto também envolvem os ombros e tríceps. Este ex...",
    "instructions": "Os crucifixos com cabos de joelhos visam os músculos do peito, especificamente o peitoral maior, enquanto também envolvem os ombros e tríceps. Este exercício é realizado usando uma máquina de cabos com polias ajustadas em uma posição alta. Ficar de joelhos proporciona estabilidade e foca o movimento no peito, minimizando o envolvimento das pernas.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo em Crossover Ajoelhado de Cima para Baixo"
  },
  {
    "id": "mergulho_em_barra_reta",
    "name": "Mergulho em Barra Reta",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Os Straight Bar Dips são um exercício composto para a parte superior do corpo que tem como alvo principal os tríceps, peito e ombros. Este exercício e...",
    "instructions": "Os Straight Bar Dips são um exercício composto para a parte superior do corpo que tem como alvo principal os tríceps, peito e ombros. Este exercício envolve abaixar e levantar o corpo usando uma barra reta, envolvendo múltiplos grupos musculares para força e estabilidade.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Mergulho em Barra Reta"
  },
  {
    "id": "flexao_de_escapula",
    "name": "Flexão de Escápula",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Scapula Push-Up é um exercício que foca nos músculos ao redor da escápula, com ênfase principalmente no serrátil anterior. Ele melhora a estabilidad...",
    "instructions": "O Scapula Push-Up é um exercício que foca nos músculos ao redor da escápula, com ênfase principalmente no serrátil anterior. Ele melhora a estabilidade e a mobilidade dos ombros, sendo crucial para atletas e indivíduos que buscam melhorar a força da parte superior do corpo e a postura.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Escápula"
  },
  {
    "id": "crucifixo_com_halteres_em_banco_inclinado_baixo",
    "name": "Crucifixo com Halteres em Banco Inclinado Baixo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Dumbbell Incline Low Fly é um exercício de isolamento que foca na parte superior dos músculos peitorais. É realizado em um banco inclinado, o que en...",
    "instructions": "O Dumbbell Incline Low Fly é um exercício de isolamento que foca na parte superior dos músculos peitorais. É realizado em um banco inclinado, o que enfatiza a cabeça clavicular do peitoral maior. Este exercício também envolve os deltoides anteriores e estabiliza a articulação do ombro.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com Halteres em Banco Inclinado Baixo"
  },
  {
    "id": "pressao_de_svend",
    "name": "Pressão de Svend",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Svend Press em pé é um exercício de isolamento que tem como alvo os músculos do peito, particularmente o peitoral maior. Envolve pressionar um disco...",
    "instructions": "O Svend Press em pé é um exercício de isolamento que tem como alvo os músculos do peito, particularmente o peitoral maior. Envolve pressionar um disco de peso enquanto mantém tensão constante no peito, promovendo o envolvimento e crescimento muscular. Este exercício é realizado em pé, o que também envolve o core para estabilidade.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Pressão de Svend"
  },
  {
    "id": "supino_inclinado_com_cabo_baixo",
    "name": "Supino Inclinado com Cabo Baixo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Low Cable Incline Bench Press é um exercício composto que visa os músculos do peito superior, especificamente a cabeça clavicular do peitoral maior....",
    "instructions": "O Low Cable Incline Bench Press é um exercício composto que visa os músculos do peito superior, especificamente a cabeça clavicular do peitoral maior. Este exercício também envolve os deltoides anteriores e tríceps. Ao usar cabos, proporciona tensão constante durante o movimento, aumentando a ativação e o crescimento muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Cabo Baixo"
  },
  {
    "id": "crucifixo_unilateral_na_polia",
    "name": "Crucifixo Unilateral na Polia",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O exercício de Fly com Cabo de Um Braço é um exercício de isolamento que foca nos músculos peitorais, especificamente o peito. Envolve o uso de uma má...",
    "instructions": "O exercício de Fly com Cabo de Um Braço é um exercício de isolamento que foca nos músculos peitorais, especificamente o peito. Envolve o uso de uma máquina de cabos para realizar um movimento de fly com um braço, permitindo um treino unilateral e melhorando a simetria muscular. Este exercício ajuda a melhorar a definição muscular e a força na área do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Unilateral na Polia"
  },
  {
    "id": "crucifixo_sentado_na_polia",
    "name": "Crucifixo Sentado na Polia",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Seated Cable Fly é um exercício de isolamento que visa os músculos peitorais, especificamente a cabeça esternal do peitoral maior. Envolve o uso de ...",
    "instructions": "O Seated Cable Fly é um exercício de isolamento que visa os músculos peitorais, especificamente a cabeça esternal do peitoral maior. Envolve o uso de uma máquina de cabos para realizar um movimento de fly enquanto está sentado, o que ajuda a manter a estabilidade e a focar na contração muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Sentado na Polia"
  },
  {
    "id": "supino_com_halteres_em_pegada_neutra",
    "name": "Supino com Halteres em Pegada Neutra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Hammer Grip Dumbbell Bench Press é um exercício de peito que trabalha os músculos peitorais, tríceps e deltoides anteriores. Envolve pressionar os h...",
    "instructions": "O Hammer Grip Dumbbell Bench Press é um exercício de peito que trabalha os músculos peitorais, tríceps e deltoides anteriores. Envolve pressionar os halteres para cima enquanto mantém uma pegada neutra, o que pode reduzir a tensão nos ombros e pulsos em comparação com as variações tradicionais de supino.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Halteres em Pegada Neutra"
  },
  {
    "id": "crucifixo_no_chao_com_halteres",
    "name": "Crucifixo no Chão com Halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Dumbbell Floor Chest Fly é um exercício de isolamento que tem como alvo os músculos peitorais. É realizado deitado no chão, o que limita a amplitude...",
    "instructions": "O Dumbbell Floor Chest Fly é um exercício de isolamento que tem como alvo os músculos peitorais. É realizado deitado no chão, o que limita a amplitude de movimento e oferece suporte, tornando-o uma alternativa mais segura ao bench fly para aqueles com preocupações nos ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo no Chão com Halteres"
  },
  {
    "id": "flexao_de_bracos",
    "name": "Flexão de Braços",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "A flexão é um exercício de peso corporal que tem como alvo principal o peito, tríceps e ombros. Também envolve o core e os músculos estabilizadores, t...",
    "instructions": "A flexão é um exercício de peso corporal que tem como alvo principal o peito, tríceps e ombros. Também envolve o core e os músculos estabilizadores, tornando-se um treino abrangente para a parte superior do corpo. As flexões podem ser realizadas em qualquer lugar e são fundamentais para construir força e resistência.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços"
  },
  {
    "id": "supino_declinado_no_cabo",
    "name": "Supino Declinado no Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Decline Cable Chest Press é um exercício de isolamento que foca na parte inferior dos músculos peitorais. Ele envolve o uso de uma máquina de cabos ...",
    "instructions": "O Decline Cable Chest Press é um exercício de isolamento que foca na parte inferior dos músculos peitorais. Ele envolve o uso de uma máquina de cabos com um banco declinado para pressionar as alças para frente, simulando o movimento de um supino declinado. Este exercício ajuda a desenvolver a parte inferior do peito e a melhorar a definição geral do tórax.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Declinado no Cabo"
  },
  {
    "id": "crucifixo_em_suspensao",
    "name": "Crucifixo em Suspensão",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Suspension Chest Fly é um exercício para a parte superior do corpo que tem como alvo os músculos peitorais, utilizando tiras de suspensão para envol...",
    "instructions": "O Suspension Chest Fly é um exercício para a parte superior do corpo que tem como alvo os músculos peitorais, utilizando tiras de suspensão para envolver os músculos estabilizadores e melhorar a força do core. Este exercício é eficaz para desenvolver a definição do peito e melhorar a estabilidade dos ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo em Suspensão"
  },
  {
    "id": "crucifixo_com_faixa_elastica",
    "name": "Crucifixo com Faixa Elástica",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Band Chest Fly é um exercício de isolamento que foca nos músculos peitorais utilizando bandas de resistência. Ele imita o movimento do tradicional f...",
    "instructions": "O Band Chest Fly é um exercício de isolamento que foca nos músculos peitorais utilizando bandas de resistência. Ele imita o movimento do tradicional fly com halteres, mas oferece resistência variável ao longo do movimento. Este exercício é eficaz para aumentar a força do peito e melhorar a definição muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com Faixa Elástica"
  },
  {
    "id": "pullover_com_barra",
    "name": "Pullover com Barra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O pullover com barra é um exercício composto que tem como alvo principal o peito e o latíssimo do dorso, enquanto também envolve os tríceps, ombros e ...",
    "instructions": "O pullover com barra é um exercício composto que tem como alvo principal o peito e o latíssimo do dorso, enquanto também envolve os tríceps, ombros e core. É realizado deitado em um banco com uma barra segurada acima do peito, em seguida, abaixando-a atrás da cabeça em um movimento em arco.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Pullover com Barra"
  },
  {
    "id": "crucifixo_inclinado_com_halteres",
    "name": "Crucifixo Inclinado com Halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Fly com Halteres em Inclinação é um exercício de isolamento que foca nos músculos peitorais, especificamente na parte superior do peito. Envolve dei...",
    "instructions": "O Fly com Halteres em Inclinação é um exercício de isolamento que foca nos músculos peitorais, especificamente na parte superior do peito. Envolve deitar-se em um banco inclinado e mover os halteres em um arco amplo para engajar efetivamente os músculos do peito. Este exercício ajuda a desenvolver a porção superior do peitoral maior, melhorando a definição e a força do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Inclinado com Halteres"
  },
  {
    "id": "supino_inclinado_com_halteres",
    "name": "Supino inclinado com halteres",
    "targetMuscles": [
      "Peito",
      "Tríceps"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Supino Inclinado com Halteres é um exercício composto que visa a parte superior dos músculos peitorais, bem como os deltoides anteriores e tríceps. ...",
    "instructions": "O Supino Inclinado com Halteres é um exercício composto que visa a parte superior dos músculos peitorais, bem como os deltoides anteriores e tríceps. Envolve pressionar halteres para cima enquanto se está deitado em um banco inclinado, o que enfatiza mais o peito superior do que o supino reto.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino inclinado com halteres"
  },
  {
    "id": "flexao_de_bracos_com_palmas",
    "name": "Flexão de Braços com Palmas",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Clap Push-Up é um exercício pliométrico avançado que melhora a força da parte superior do corpo, a explosão e a coordenação. Ele foca principalmente...",
    "instructions": "O Clap Push-Up é um exercício pliométrico avançado que melhora a força da parte superior do corpo, a explosão e a coordenação. Ele foca principalmente no peito, tríceps e ombros, enquanto também envolve o core para estabilidade.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Palmas"
  },
  {
    "id": "supino_larsen_com_barra",
    "name": "Supino Larsen com Barra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Barbell Larsen Press é uma variação do supino projetada para melhorar a força e estabilidade da parte superior do corpo. Ele enfatiza o peito, os om...",
    "instructions": "O Barbell Larsen Press é uma variação do supino projetada para melhorar a força e estabilidade da parte superior do corpo. Ele enfatiza o peito, os ombros e os tríceps, minimizando o impulso das pernas ao manter os pés elevados do chão.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Larsen com Barra"
  },
  {
    "id": "aquecimento_com_faixa_elastica",
    "name": "Aquecimento com Faixa Elástica",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O alongamento dinâmico de ombros com banda elástica é projetado para aumentar a mobilidade e flexibilidade dos ombros, preparando os músculos e articu...",
    "instructions": "O alongamento dinâmico de ombros com banda elástica é projetado para aumentar a mobilidade e flexibilidade dos ombros, preparando os músculos e articulações para atividades físicas mais intensas. Este exercício utiliza uma banda de resistência para facilitar o alongamento dinâmico, direcionando-se aos deltoides, músculos do manguito rotador e tecidos conjuntivos circundantes.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Aquecimento com Faixa Elástica"
  },
  {
    "id": "pressao_poliquin_com_halteres",
    "name": "Pressão Poliquin com Halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Dumbbell Poliquin Press é um exercício para os ombros que foca nos músculos deltóides, particularmente nas cabeças anterior e lateral. Ele combina e...",
    "instructions": "O Dumbbell Poliquin Press é um exercício para os ombros que foca nos músculos deltóides, particularmente nas cabeças anterior e lateral. Ele combina elementos de um tradicional desenvolvimento de ombros com um movimento rotacional único para melhorar a estabilidade e a força dos ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Pressão Poliquin com Halteres"
  },
  {
    "id": "crucifixo_no_pec_deck",
    "name": "Crucifixo no Pec Deck",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Pec Deck Chest Fly é um exercício de isolamento que visa os músculos peitorais, principalmente o peitoral maior. Envolve o uso de uma máquina pec de...",
    "instructions": "O Pec Deck Chest Fly é um exercício de isolamento que visa os músculos peitorais, principalmente o peitoral maior. Envolve o uso de uma máquina pec deck, onde o usuário se senta com as costas apoiadas em um encosto, braços estendidos para os lados e cotovelos ligeiramente dobrados. O movimento consiste em trazer os braços juntos à frente do peito, concentrando-se em contrair os músculos peitorais.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo no Pec Deck"
  },
  {
    "id": "alongamento_de_rotacao_das_costas_em_posicao_de_joelhos",
    "name": "Alongamento de Rotação das Costas em Posição de Joelhos",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O alongamento de rotação de costas ajoelhado é um exercício de mobilidade projetado para melhorar a rotação da coluna torácica e aumentar a flexibilid...",
    "instructions": "O alongamento de rotação de costas ajoelhado é um exercício de mobilidade projetado para melhorar a rotação da coluna torácica e aumentar a flexibilidade na parte superior das costas. É particularmente benéfico para indivíduos que buscam aumentar a amplitude de movimento e reduzir a rigidez nas costas, ombros e pescoço.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Rotação das Costas em Posição de Joelhos"
  },
  {
    "id": "supino_declinado_com_barra",
    "name": "Supino Declinado com Barra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Decline Barbell Bench Press é um exercício composto que visa a parte inferior dos músculos peitorais, tríceps e deltoides anteriores. É realizado em...",
    "instructions": "O Decline Barbell Bench Press é um exercício composto que visa a parte inferior dos músculos peitorais, tríceps e deltoides anteriores. É realizado em um banco declinado, que posiciona o corpo em um ângulo descendente, enfatizando a parte inferior do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Declinado com Barra"
  },
  {
    "id": "pressao_de_peito_com_faixa_no_banco",
    "name": "Pressão de Peito com Faixa no Banco",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Band Bench Chest Press é um exercício de resistência que foca nos músculos peitorais, utilizando faixas de resistência para fornecer tensão variável...",
    "instructions": "O Band Bench Chest Press é um exercício de resistência que foca nos músculos peitorais, utilizando faixas de resistência para fornecer tensão variável durante o movimento. Ele envolve principalmente o peito, tríceps e ombros, oferecendo uma alternativa versátil ao supino tradicional.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Pressão de Peito com Faixa no Banco"
  },
  {
    "id": "supino_com_barra_e_correntes",
    "name": "Supino com Barra e Correntes",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Supino com Barra e Correntes é uma variação do supino tradicional que incorpora correntes para adicionar resistência variável. À medida que a barra ...",
    "instructions": "O Supino com Barra e Correntes é uma variação do supino tradicional que incorpora correntes para adicionar resistência variável. À medida que a barra é levantada, mais elos de corrente são erguidos do chão, aumentando a carga. Este exercício foca nos músculos peitorais, tríceps e ombros, e ajuda a melhorar a força e a potência ao acomodar a resistência ao longo de toda a amplitude de movimento.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Barra e Correntes"
  },
  {
    "id": "supino_inclinado_com_halteres_em_pegada_neutra",
    "name": "Supino Inclinado com Halteres em Pegada Neutra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Incline Neutral Grip Dumbbell Press foca na parte superior dos músculos peitorais, deltoides anteriores e tríceps. Este exercício é realizado em um ...",
    "instructions": "O Incline Neutral Grip Dumbbell Press foca na parte superior dos músculos peitorais, deltoides anteriores e tríceps. Este exercício é realizado em um banco inclinado com halteres segurados em uma pegada neutra, ou seja, palmas das mãos voltadas uma para a outra. Ele enfatiza o peito superior e reduz a tensão nos ombros em comparação com outros movimentos de pressão.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Halteres em Pegada Neutra"
  },
  {
    "id": "flexao_de_bracos_com_faixa_de_resistencia",
    "name": "Flexão de Braços com Faixa de Resistência",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Flexão com Faixa de Resistência é uma variação da flexão tradicional que incorpora uma faixa de resistência para aumentar a intensidade e envolver o...",
    "instructions": "O Flexão com Faixa de Resistência é uma variação da flexão tradicional que incorpora uma faixa de resistência para aumentar a intensidade e envolver o peito, tríceps e ombros de forma mais eficaz. Este exercício melhora a força e a estabilidade da parte superior do corpo ao adicionar resistência variável durante o movimento.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Faixa de Resistência"
  },
  {
    "id": "press_de_forca_unilateral_cruzado",
    "name": "Press de Força Unilateral Cruzado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Cross Body One-Arm Strength Press é um exercício unilateral que tem como alvo os ombros, peito e tríceps. Envolve pressionar um haltere através do c...",
    "instructions": "O Cross Body One-Arm Strength Press é um exercício unilateral que tem como alvo os ombros, peito e tríceps. Envolve pressionar um haltere através do corpo, engajando a estabilidade do core e melhorando a mobilidade dos ombros. Este exercício é benéfico para melhorar o equilíbrio muscular e a coordenação.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Press de Força Unilateral Cruzado"
  },
  {
    "id": "press_militar_com_rotacao_em_pe",
    "name": "Press Militar com Rotação em Pé",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Standing Press Around é um exercício dinâmico para os ombros que trabalha os deltoides, trapézio e parte superior do peito. Envolve um movimento cir...",
    "instructions": "O Standing Press Around é um exercício dinâmico para os ombros que trabalha os deltoides, trapézio e parte superior do peito. Envolve um movimento circular com peso, engajando múltiplos grupos musculares para melhorar a estabilidade e força dos ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Press Militar com Rotação em Pé"
  },
  {
    "id": "mergulho_de_peito",
    "name": "Mergulho de Peito",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Os mergulhos em barras paralelas visam o peito, tríceps e ombros. Este exercício composto enfatiza a parte inferior dos músculos peitorais e ajuda a d...",
    "instructions": "Os mergulhos em barras paralelas visam o peito, tríceps e ombros. Este exercício composto enfatiza a parte inferior dos músculos peitorais e ajuda a desenvolver força e massa na parte superior do corpo. A forma adequada é crucial para maximizar a eficácia e prevenir lesões.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Mergulho de Peito"
  },
  {
    "id": "toque_de_ombro",
    "name": "Toque de Ombro",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Shoulder Tap é um exercício de peso corporal que visa o core, os ombros e os músculos estabilizadores. Envolve toques alternados no ombro oposto enq...",
    "instructions": "O Shoulder Tap é um exercício de peso corporal que visa o core, os ombros e os músculos estabilizadores. Envolve toques alternados no ombro oposto enquanto se mantém em posição de prancha, promovendo equilíbrio e coordenação.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Toque de Ombro"
  },
  {
    "id": "flexao_de_bracos_ajoelhada_com_pegada_ampla",
    "name": "Flexão de Braços Ajoelhada com Pegada Ampla",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Push-Up de Mãos Largas Ajoelhado é um exercício com o peso do corpo que foca no peito, ombros e tríceps. Ao realizar este exercício de joelhos com u...",
    "instructions": "O Push-Up de Mãos Largas Ajoelhado é um exercício com o peso do corpo que foca no peito, ombros e tríceps. Ao realizar este exercício de joelhos com uma colocação ampla das mãos, reduz-se a carga em comparação com um push-up padrão, tornando-o adequado para iniciantes ou como aquecimento para atletas mais avançados.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços Ajoelhada com Pegada Ampla"
  },
  {
    "id": "crucifixo_no_cabo_deitado",
    "name": "Crucifixo no Cabo deitado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Lying Cable Fly é um exercício de isolamento que tem como alvo os músculos peitorais. Ele envolve deitar-se em um banco plano e usar cabos para real...",
    "instructions": "O Lying Cable Fly é um exercício de isolamento que tem como alvo os músculos peitorais. Ele envolve deitar-se em um banco plano e usar cabos para realizar um movimento de fly, o que ajuda a desenvolver o peito, focando nas porções interna e externa dos peitorais. Este exercício também envolve os ombros e tríceps como músculos secundários.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo no Cabo deitado"
  },
  {
    "id": "supino_com_faixa_de_resistencia",
    "name": "Supino com Faixa de Resistência",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Bench Press Com Faixa de Resistência é uma variação do exercício tradicional de supino que incorpora faixas de resistência para aumentar a tensão ao...",
    "instructions": "O Bench Press Com Faixa de Resistência é uma variação do exercício tradicional de supino que incorpora faixas de resistência para aumentar a tensão ao longo do movimento. Este exercício tem como alvo os músculos peitorais, tríceps e deltoides anteriores, melhorando a força e a estabilidade na parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Faixa de Resistência"
  },
  {
    "id": "supino_reto_deitado",
    "name": "Supino Reto deitado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Hammer Bench Press é uma variação do supino tradicional realizada usando uma máquina de força hammer. Este exercício foca nos músculos peitorais, tr...",
    "instructions": "O Hammer Bench Press é uma variação do supino tradicional realizada usando uma máquina de força hammer. Este exercício foca nos músculos peitorais, tríceps e deltoides anteriores. Ele oferece um caminho de movimento guiado, o que pode ser benéfico para manter a forma adequada e reduzir o risco de lesões.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Reto deitado"
  },
  {
    "id": "flexao_de_braco_com_arqueiro",
    "name": "Flexão de Braço com Arqueiro",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Archer Push-Up é um exercício avançado de peso corporal que trabalha o peito, tríceps e ombros, enquanto também envolve o core e os músculos estabil...",
    "instructions": "O Archer Push-Up é um exercício avançado de peso corporal que trabalha o peito, tríceps e ombros, enquanto também envolve o core e os músculos estabilizadores. Ele envolve um posicionamento mais amplo das mãos e o deslocamento do peso corporal de um lado para o outro, imitando o movimento de puxar um arco.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braço com Arqueiro"
  },
  {
    "id": "supino_com_halteres",
    "name": "Supino com Halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Supino com Halteres é um exercício composto que tem como alvo principal os músculos peitorais, com ativação secundária dos tríceps e deltoides anter...",
    "instructions": "O Supino com Halteres é um exercício composto que tem como alvo principal os músculos peitorais, com ativação secundária dos tríceps e deltoides anteriores. É realizado deitando-se em um banco plano e pressionando os halteres para cima a partir do nível do peito até que os braços estejam totalmente estendidos.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Halteres"
  },
  {
    "id": "alongamento_de_peitoral_com_cotovelos_abertos",
    "name": "Alongamento de Peitoral com Cotovelos Abertos",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O alongamento de peito com cotovelos para fora é um alongamento estático que tem como alvo os músculos peitorais, especificamente projetado para melho...",
    "instructions": "O alongamento de peito com cotovelos para fora é um alongamento estático que tem como alvo os músculos peitorais, especificamente projetado para melhorar a flexibilidade e a amplitude de movimento no peito e nos ombros. Este exercício é benéfico para indivíduos que desejam melhorar sua postura e aliviar a tensão na parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Peitoral com Cotovelos Abertos"
  },
  {
    "id": "alongamento_de_peitoral_na_porta",
    "name": "Alongamento de Peitoral na Porta",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O alongamento de peito na porta é um exercício de alongamento estático projetado para melhorar a flexibilidade e a mobilidade no peito, ombros e parte...",
    "instructions": "O alongamento de peito na porta é um exercício de alongamento estático projetado para melhorar a flexibilidade e a mobilidade no peito, ombros e parte superior das costas. É realizado usando uma porta como suporte, permitindo um alongamento profundo dos músculos peitorais e deltoides anteriores.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Peitoral na Porta"
  },
  {
    "id": "flexao_de_bracos_em_barras_paralelas",
    "name": "Flexão de Braços em Barras Paralelas",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O push-up em barras paralelas é um exercício composto para a parte superior do corpo que tem como alvo principal o peito, tríceps e ombros. Envolve su...",
    "instructions": "O push-up em barras paralelas é um exercício composto para a parte superior do corpo que tem como alvo principal o peito, tríceps e ombros. Envolve sustentar o peso do corpo em barras paralelas e abaixar o peito em direção às barras antes de empurrar de volta para a posição inicial. Este exercício melhora a força da parte superior do corpo, a estabilidade e a resistência muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços em Barras Paralelas"
  },
  {
    "id": "alongamento_completo_global",
    "name": "Alongamento Completo Global",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O World's Greatest Stretch é um exercício dinâmico que atinge múltiplos grupos musculares, melhorando a flexibilidade, a mobilidade e o movimento func...",
    "instructions": "O World's Greatest Stretch é um exercício dinâmico que atinge múltiplos grupos musculares, melhorando a flexibilidade, a mobilidade e o movimento funcional geral. É particularmente eficaz para aquecer o corpo antes de um treino, com foco nos quadris, isquiotibiais, coluna torácica e ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Alongamento Completo Global"
  },
  {
    "id": "press_de_peito_na_maquina",
    "name": "Press de Peito na Máquina",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O exercício de máquina de supino é um exercício de resistência que foca nos músculos peitorais, tríceps e deltoides anteriores. Ele oferece um caminho...",
    "instructions": "O exercício de máquina de supino é um exercício de resistência que foca nos músculos peitorais, tríceps e deltoides anteriores. Ele oferece um caminho de movimento controlado, tornando-o ideal para iniciantes e para aqueles que se concentram na isolação muscular. A máquina permite ajustar os níveis de resistência para acomodar diferentes níveis de força.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Press de Peito na Máquina"
  },
  {
    "id": "supino_no_chao_com_kettlebell_com_um_braco",
    "name": "Supino no Chão com Kettlebell com um Braço",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Kettlebell One Arm Floor Press é um exercício de força que foca no peito, tríceps e ombros. Envolve pressionar um kettlebell a partir de uma posição...",
    "instructions": "O Kettlebell One Arm Floor Press é um exercício de força que foca no peito, tríceps e ombros. Envolve pressionar um kettlebell a partir de uma posição deitado no chão, concentrando-se na força unilateral e estabilidade.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino no Chão com Kettlebell com um Braço"
  },
  {
    "id": "supino_inclinado_com_halteres_em_declinio",
    "name": "Supino Inclinado com Halteres em Declínio",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Decline Dumbbell Bench Press é um exercício composto que foca na parte inferior dos músculos peitorais, enquanto também envolve os tríceps e os delt...",
    "instructions": "O Decline Dumbbell Bench Press é um exercício composto que foca na parte inferior dos músculos peitorais, enquanto também envolve os tríceps e os deltoides anteriores. Este exercício é realizado em um banco declinado, o que permite uma maior ênfase na parte inferior do peito em comparação com as variações planas ou inclinadas.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Halteres em Declínio"
  },
  {
    "id": "supino_com_pino",
    "name": "Supino com Pino",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Pin Bench Press é uma variação do supino tradicional onde a barra é pressionada a partir de uma parada completa sobre pinos de segurança ajustados a...",
    "instructions": "O Pin Bench Press é uma variação do supino tradicional onde a barra é pressionada a partir de uma parada completa sobre pinos de segurança ajustados a uma altura específica. Este exercício foca no peito, tríceps e ombros, e é particularmente útil para melhorar a força de bloqueio e superar pontos de estagnação no supino.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Pino"
  },
  {
    "id": "crucifixo_unilateral_no_cabo_de_cima_para_baixo",
    "name": "Crucifixo Unilateral no Cabo de Cima para Baixo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O exercício One-Arm High-to-Low Cable Fly é um exercício de isolamento que foca nos músculos peitorais, especificamente na parte inferior do peito. En...",
    "instructions": "O exercício One-Arm High-to-Low Cable Fly é um exercício de isolamento que foca nos músculos peitorais, especificamente na parte inferior do peito. Envolve puxar um cabo de uma posição alta para uma posição baixa através do corpo, envolvendo o peito, ombros e tríceps. Este exercício ajuda a desenvolver a simetria muscular e melhorar a força unilateral.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Unilateral no Cabo de Cima para Baixo"
  },
  {
    "id": "pressao_de_peito_na_maquina",
    "name": "Pressão de Peito na Máquina",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Machine Chest Press é um exercício de resistência que tem como alvo os músculos peitorais, principalmente o peitoral maior, com ativação secundária ...",
    "instructions": "O Machine Chest Press é um exercício de resistência que tem como alvo os músculos peitorais, principalmente o peitoral maior, com ativação secundária dos tríceps e deltoides anteriores. É realizado utilizando uma máquina sentada que proporciona um movimento guiado, permitindo uma execução controlada e segura, especialmente benéfica para iniciantes ou aqueles que focam na isolação muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Pressão de Peito na Máquina"
  },
  {
    "id": "crucifixo_com_halteres_de_baixo_para_cima",
    "name": "Crucifixo com Halteres de Baixo para Cima",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Dumbbell Low to High Fly é um exercício de isolamento que foca nos músculos do peito, particularmente nos peitorais superiores. Ele envolve mover um...",
    "instructions": "O Dumbbell Low to High Fly é um exercício de isolamento que foca nos músculos do peito, particularmente nos peitorais superiores. Ele envolve mover um par de halteres em um arco de uma posição baixa perto dos quadris para uma posição alta acima do nível dos ombros, envolvendo o peito, os ombros e o core para estabilidade.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com Halteres de Baixo para Cima"
  },
  {
    "id": "supino_declinado_na_smith_machine",
    "name": "Supino Declinado na Smith Machine",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Decline Smith Bench Press é um exercício composto que foca na parte inferior dos músculos peitorais, com envolvimento secundário dos tríceps e delto...",
    "instructions": "O Decline Smith Bench Press é um exercício composto que foca na parte inferior dos músculos peitorais, com envolvimento secundário dos tríceps e deltoides anteriores. Utilizar a máquina Smith proporciona estabilidade e controle, permitindo uma contração focada dos músculos do peito enquanto minimiza o risco de lesões. Este exercício é realizado em um banco declinado ajustado em um ângulo, o que direciona a ênfase para a parte inferior do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Declinado na Smith Machine"
  },
  {
    "id": "flexao_de_bracos_com_maos_afastadas",
    "name": "Flexão de Braços com Mãos Afastadas",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Wide Hand Push Up é um exercício com peso corporal que tem como alvo o peito, os ombros e os tríceps. Ao posicionar as mãos mais afastadas do que a ...",
    "instructions": "O Wide Hand Push Up é um exercício com peso corporal que tem como alvo o peito, os ombros e os tríceps. Ao posicionar as mãos mais afastadas do que a largura dos ombros, ele enfatiza a parte externa dos músculos peitorais e aumenta o envolvimento dos deltoides anteriores.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Mãos Afastadas"
  },
  {
    "id": "supino_barra",
    "name": "Supino Barra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Supino com Barra é um exercício composto que trabalha o peito, tríceps e ombros. É realizado deitado em um banco plano enquanto se pressiona uma bar...",
    "instructions": "O Supino com Barra é um exercício composto que trabalha o peito, tríceps e ombros. É realizado deitado em um banco plano enquanto se pressiona uma barra para cima a partir do nível do peito até que os braços estejam totalmente estendidos.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Barra"
  },
  {
    "id": "cadeira_abdutora",
    "name": "Cadeira Abdutora",
    "targetMuscles": [
      "Pernas",
      "Glúteos"
    ],
    "equipment": "Máquina",
    "difficulty": "Iniciante",
    "description": "A Cadeira Abdutora é um exercício focado nos músculos abdutores (parte externa) e glúteos. Ajuda a estabilizar o quadril e a pelve.",
    "instructions": "Sente-se no aparelho e ajuste o peso. Afaste as pernas empurrando as almofadas laterais para fora, usando a força dos glúteos e abdutores. Retorne lentamente.",
    "commonErrors": [
      "Fazer o movimento muito rápido",
      "Não apoiar bem as costas no banco"
    ],
    "substitutions": [
      "Abdução de quadril na polia",
      "Abdução com caneleira"
    ],
    "gifPlaceholder": "Cadeira Abdutora"
  },
  {
    "id": "flexao_de_bracos_em_aneis",
    "name": "Flexão de Braços em Anéis",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Ring Push-Up é um exercício avançado para a parte superior do corpo que trabalha o peito, os ombros e os tríceps, enquanto envolve o core para estab...",
    "instructions": "O Ring Push-Up é um exercício avançado para a parte superior do corpo que trabalha o peito, os ombros e os tríceps, enquanto envolve o core para estabilidade. Ele consiste em realizar flexões usando anéis de ginástica, o que adiciona um elemento de instabilidade, exigindo maior ativação e controle muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços em Anéis"
  },
  {
    "id": "pressao_de_peito_na_maquina_com_pegada_martelo",
    "name": "Pressão de Peito na Máquina com Pegada Martelo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Machine Chest Press Hammer Grip é um exercício de resistência que foca nos músculos peitorais, especificamente na cabeça esternal do peitoral maior....",
    "instructions": "O Machine Chest Press Hammer Grip é um exercício de resistência que foca nos músculos peitorais, especificamente na cabeça esternal do peitoral maior. Ele também envolve os tríceps e deltoides anteriores. A posição de pegada em martelo permite um alinhamento neutro do punho, reduzindo a tensão nos punhos e ombros.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Pressão de Peito na Máquina com Pegada Martelo"
  },
  {
    "id": "flexao_de_bracos_com_apoio_dos_joelhos",
    "name": "Flexão de Braços com Apoio dos Joelhos",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Flexões de joelhos, também conhecidas como flexões modificadas, são um exercício amigável para iniciantes que trabalha o peito, os ombros e os tríceps...",
    "instructions": "Flexões de joelhos, também conhecidas como flexões modificadas, são um exercício amigável para iniciantes que trabalha o peito, os ombros e os tríceps. Esta variação reduz a carga sobre a parte superior do corpo ao permitir que os joelhos permaneçam no chão, tornando-a uma excelente escolha para desenvolver força e resistência para aqueles que são novos nas flexões ou estão retornando de uma lesão.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Apoio dos Joelhos"
  },
  {
    "id": "flexao_de_bracos_com_peso_adicional",
    "name": "Flexão de Braços com Peso Adicional",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Push-Up com Peso é um exercício composto para a parte superior do corpo que foca no peito, ombros e tríceps. Ao adicionar peso, essa variação aument...",
    "instructions": "O Push-Up com Peso é um exercício composto para a parte superior do corpo que foca no peito, ombros e tríceps. Ao adicionar peso, essa variação aumenta a resistência, melhorando a força muscular e a resistência. Requer forma adequada para garantir segurança e eficácia.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Peso Adicional"
  },
  {
    "id": "supino_com_cabo",
    "name": "Supino com Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Cable Bench Press é uma variação do supino tradicional que utiliza uma máquina de cabos para fornecer tensão constante durante o movimento. Este exe...",
    "instructions": "O Cable Bench Press é uma variação do supino tradicional que utiliza uma máquina de cabos para fornecer tensão constante durante o movimento. Este exercício foca nos músculos peitorais, tríceps e deltoides anteriores. É realizado em um banco plano com cabos presos a um sistema de polias baixas, permitindo uma amplitude de movimento controlada e suave.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino com Cabo"
  },
  {
    "id": "crucifixo_na_maquina",
    "name": "Crucifixo na Máquina",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O exercício de fly peitoral na máquina é um exercício de isolamento que tem como alvo os músculos peitorais. Ele envolve o uso de uma máquina de fly p...",
    "instructions": "O exercício de fly peitoral na máquina é um exercício de isolamento que tem como alvo os músculos peitorais. Ele envolve o uso de uma máquina de fly peitoral para realizar um movimento controlado que estica e contrai os músculos do peito, aprimorando a definição e a força muscular. Este exercício é ideal para focar no peito sem envolver significativamente outros grupos musculares.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo na Máquina"
  },
  {
    "id": "flexao_de_bracos_com_apoio_nos_dedos",
    "name": "Flexão de Braços com Apoio nos Dedos",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Finger Push-Up é um exercício avançado de peso corporal que foca na parte superior do corpo, especialmente no peito, ombros, tríceps e antebraços. R...",
    "instructions": "O Finger Push-Up é um exercício avançado de peso corporal que foca na parte superior do corpo, especialmente no peito, ombros, tríceps e antebraços. Requer força e estabilidade significativas nos dedos, tornando-o adequado para atletas experientes que buscam melhorar a força de pegada e a resistência geral da parte superior do corpo.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Apoio nos Dedos"
  },
  {
    "id": "aberturas_poliquin",
    "name": "Aberturas Poliquin",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Poliquin flys, também conhecidos como Poliquin dumbbell flys, são uma variação do exercício tradicional de fly com halteres. Este movimento foca nos m...",
    "instructions": "Poliquin flys, também conhecidos como Poliquin dumbbell flys, são uma variação do exercício tradicional de fly com halteres. Este movimento foca nos músculos peitorais com um ângulo e amplitude de movimento únicos, enfatizando as fases de alongamento e contração. É realizado em um banco inclinado para aumentar a ativação das fibras do peito superior.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Aberturas Poliquin"
  },
  {
    "id": "alongamento_de_peito_com_braco_fletido",
    "name": "Alongamento de Peito com Braço Fletido",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "exercise_detail.primary_muscle:",
    "instructions": "exercise_detail.primary_muscle:",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Peito com Braço Fletido"
  },
  {
    "id": "crucifixo_em_cabo_unilateral_baixo_para_alto",
    "name": "Crucifixo em Cabo Unilateral Baixo para Alto",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O exercício de Crucifixo com Cabo de Baixo para Cima com um Braço é um exercício de isolamento que foca nos músculos peitorais, especialmente na parte...",
    "instructions": "O exercício de Crucifixo com Cabo de Baixo para Cima com um Braço é um exercício de isolamento que foca nos músculos peitorais, especialmente na parte superior do peito. Envolve puxar um cabo de uma posição baixa para uma posição alta através do corpo, envolvendo o peito, os ombros e o core para estabilização. Este exercício ajuda a desenvolver a simetria do peito e a melhorar a definição muscular.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo em Cabo Unilateral Baixo para Alto"
  },
  {
    "id": "abertura_de_peito_em_pe",
    "name": "Abertura de Peito em Pé",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Alongamento de Peito em Pé é um exercício de alongamento projetado para melhorar a flexibilidade e a mobilidade do peito, ombros e parte superior da...",
    "instructions": "O Alongamento de Peito em Pé é um exercício de alongamento projetado para melhorar a flexibilidade e a mobilidade do peito, ombros e parte superior das costas. Ele ajuda a contrariar os efeitos da má postura e do tempo prolongado sentado, abrindo o peito e promovendo um melhor alinhamento.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Abertura de Peito em Pé"
  },
  {
    "id": "supino_sentado_no_cabo",
    "name": "Supino Sentado no Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Seated Cable Chest Press é um exercício composto que visa os músculos peitorais, tríceps e deltoides anteriores. Ele envolve empurrar um peso para f...",
    "instructions": "O Seated Cable Chest Press é um exercício composto que visa os músculos peitorais, tríceps e deltoides anteriores. Ele envolve empurrar um peso para frente usando uma máquina de cabos enquanto está sentado, proporcionando tensão constante durante o movimento.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Supino Sentado no Cabo"
  },
  {
    "id": "clam_shell_peitoral_sentado",
    "name": "Clam Shell Peitoral Sentado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Seated Chest Clam é um exercício de isolamento que tem como alvo os músculos peitorais, especificamente a parte interna do peito. Ele envolve aperta...",
    "instructions": "O Seated Chest Clam é um exercício de isolamento que tem como alvo os músculos peitorais, especificamente a parte interna do peito. Ele envolve apertar os músculos do peito juntos enquanto se mantém em uma posição sentada, geralmente usando uma máquina projetada para esse fim.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Clam Shell Peitoral Sentado"
  },
  {
    "id": "crucifixo_no_cabo_baixo_alto",
    "name": "Crucifixo no Cabo Baixo-Alto",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "O Low High Cable Chest Fly é um exercício de isolamento que visa os músculos peitorais. Ele envolve o uso de uma máquina de cabos para realizar um mov...",
    "instructions": "O Low High Cable Chest Fly é um exercício de isolamento que visa os músculos peitorais. Ele envolve o uso de uma máquina de cabos para realizar um movimento de fly de um ângulo baixo para um ângulo alto, enfatizando a parte superior do peito. Este exercício ajuda a desenvolver a definição e a força do peito.",
    "commonErrors": [],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo no Cabo Baixo-Alto"
  },
  {
    "id": "planche_inclinado",
    "name": "Planche Inclinado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Planche Inclinado. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Planche Inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Planche Inclinado"
  },
  {
    "id": "supino_inclinado_com_halter_unilateral",
    "name": "Supino Inclinado com Halter Unilateral",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Supino Inclinado com Halter Unilateral. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Inclinado com Halter Unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Halter Unilateral"
  },
  {
    "id": "cadeira_extensora",
    "name": "Cadeira Extensora",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "maquina",
    "difficulty": "Intermediário",
    "description": "Cadeira Extensora. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Cadeira Extensora foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Cadeira Extensora"
  },
  {
    "id": "supino_com_halter_unilateral",
    "name": "Supino com Halter Unilateral",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Supino com Halter Unilateral. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com Halter Unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com Halter Unilateral"
  },
  {
    "id": "gemeos_em_pe",
    "name": "Gêmeos em Pé",
    "targetMuscles": [
      "Panturrilhas"
    ],
    "equipment": "Máquina",
    "difficulty": "Iniciante",
    "description": "Exercício de flexão plantar para dar volume nas panturrilhas, focando no músculo gastrocnêmio.",
    "instructions": "Posicione os ombros sob as almofadas. Estenda os tornozelos subindo na ponta dos pés, contraindo a panturrilha forte no topo. Desça alongando bem.",
    "commonErrors": [
      "Fazer o movimento rápido e curto",
      "Dobrar os joelhos para usar impulso"
    ],
    "substitutions": [
      "Elevação de calcanhares no banco de leg press"
    ],
    "gifPlaceholder": "Gêmeos em Pé"
  },
  {
    "id": "abducao_de_quadril_lateral",
    "name": "Abdução de Quadril Lateral",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Abdução de Quadril Lateral. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Abdução de Quadril Lateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Abdução de Quadril Lateral"
  },
  {
    "id": "abducao_lateral_do_quadril_com_alavanca",
    "name": "Abdução Lateral do Quadril com Alavanca",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Abdução Lateral do Quadril com Alavanca. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Abdução Lateral do Quadril com Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Abdução Lateral do Quadril com Alavanca"
  },
  {
    "id": "cadeira_adutora",
    "name": "Cadeira Adutora",
    "targetMuscles": [
      "Pernas"
    ],
    "equipment": "Máquina",
    "difficulty": "Iniciante",
    "description": "A Cadeira Adutora é um exercício que tem como alvo os músculos adutores da parte interna das coxas.",
    "instructions": "Sente-se no aparelho mantendo a postura correta. Aproxime as pernas, pressionando contra as almofadas, e depois retorne controladamente na fase excêntrica.",
    "commonErrors": [
      "Fazer o retorno (excêntrica) de forma descontrolada",
      "Inclinar o tronco para frente"
    ],
    "substitutions": [
      "Adutor na polia"
    ],
    "gifPlaceholder": "Cadeira Adutora"
  },
  {
    "id": "supino_inclinado_na_maquina_smith",
    "name": "Supino Inclinado na Máquina Smith",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Supino Inclinado na Máquina Smith. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Inclinado na Máquina Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado na Máquina Smith"
  },
  {
    "id": "crucifixo_com_halteres_em_banco_declinado",
    "name": "Crucifixo com Halteres em Banco Declinado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Crucifixo com Halteres em Banco Declinado. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Crucifixo com Halteres em Banco Declinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com Halteres em Banco Declinado"
  },
  {
    "id": "flexao_de_braco_unilateral",
    "name": "Flexão de Braço Unilateral",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Flexão de Braço Unilateral. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Flexão de Braço Unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braço Unilateral"
  },
  {
    "id": "supino_declinado",
    "name": "Supino Declinado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Supino Declinado. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Declinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Declinado"
  },
  {
    "id": "gemeos_sentado",
    "name": "Gêmeos Sentado",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "maquina",
    "difficulty": "Intermediário",
    "description": "Gêmeos Sentado. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Gêmeos Sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Gêmeos Sentado"
  },
  {
    "id": "crucifixo_baixo_com_halter_unilateral",
    "name": "Crucifixo Baixo com Halter Unilateral",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Crucifixo Baixo com Halter Unilateral. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Crucifixo Baixo com Halter Unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Baixo com Halter Unilateral"
  },
  {
    "id": "agachamento_bulgaro",
    "name": "Agachamento Búlgaro",
    "targetMuscles": [
      "Pernas",
      "Glúteos"
    ],
    "equipment": "Halteres",
    "difficulty": "Intermediário",
    "description": "Exercício unilateral brutal e muito eficaz. Trabalha isoladamente quadríceps e glúteos, exigindo equilíbrio.",
    "instructions": "Apoie o peito de um dos pés em um banco atrás de você. Segure halteres. Desça abaixando os quadris até a coxa da perna da frente ficar paralela ao chão. O joelho não deve passar a ponta do pé.",
    "commonErrors": [
      "Postura cronicamente curvada",
      "Apoiar a perna no banco em posição de muito desconforto"
    ],
    "substitutions": [
      "Afundo",
      "Avanço"
    ],
    "gifPlaceholder": "Agachamento Búlgaro"
  },
  {
    "id": "mesa_flexora",
    "name": "Mesa Flexora",
    "targetMuscles": [
      "Pernas"
    ],
    "equipment": "Máquina",
    "difficulty": "Iniciante",
    "description": "Exelente para focar o trabalho na cadeia posterior da perna (isquiotibiais).",
    "instructions": "Deite-se de bruços na máquina com a almofada posicionada logo acima dos calcanhares. Flexione as pernas puxando a almofada em direção aos glúteos.",
    "commonErrors": [
      "Tirar o quadril do banco para fazer alavanca"
    ],
    "substitutions": [
      "Cadeira Flexora",
      "Stiff"
    ],
    "gifPlaceholder": "Mesa Flexora"
  },
  {
    "id": "esteira",
    "name": "Esteira",
    "targetMuscles": [
      "Cardio"
    ],
    "equipment": "maquina",
    "difficulty": "Intermediário",
    "description": "Esteira. Exercício focado principalmente em trabalhar cardio.",
    "instructions": "O exercício Esteira foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Esteira"
  },
  {
    "id": "supino_no_smith",
    "name": "Supino no Smith",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Variado",
    "difficulty": "Intermediário",
    "description": "Supino no Smith. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino no Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino no Smith"
  },
  {
    "id": "abducao_de_quadril_sentado_com_faixa_elastica",
    "name": "Abdução de Quadril Sentado com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Abdução de Quadril Sentado com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Abdução de Quadril Sentado com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Abdução de Quadril Sentado com Faixa Elástica"
  },
  {
    "id": "abducao_de_quadril_com_ponte",
    "name": "Abdução de Quadril com Ponte",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Abdução de Quadril com Ponte. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Abdução de Quadril com Ponte foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Abdução de Quadril com Ponte"
  },
  {
    "id": "afundo_profundo",
    "name": "Afundo Profundo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Afundo Profundo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Afundo Profundo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Afundo Profundo"
  },
  {
    "id": "abducao_de_quadril_com_faixa",
    "name": "Abdução de Quadril com Faixa",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Abdução de Quadril com Faixa. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Abdução de Quadril com Faixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Abdução de Quadril com Faixa"
  },
  {
    "id": "abracos_nos_joelhos_em_pe",
    "name": "Abraços nos Joelhos em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Abraços nos Joelhos em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Abraços nos Joelhos em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Abraços nos Joelhos em Pé"
  },
  {
    "id": "afundo_lateral",
    "name": "Afundo Lateral",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Afundo Lateral. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Afundo Lateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Afundo Lateral"
  },
  {
    "id": "abducao_de_quadril_com_cabo",
    "name": "Abdução de quadril com cabo",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Abdução de quadril com cabo. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Abdução de quadril com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Abdução de quadril com cabo"
  },
  {
    "id": "afundo_com_halteres",
    "name": "Afundo com Halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Afundo com Halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Afundo com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Afundo com Halteres"
  },
  {
    "id": "abducao_de_quadril_em_decubito_lateral",
    "name": "Abdução de Quadril em Decúbito Lateral",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Abdução de Quadril em Decúbito Lateral. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Abdução de Quadril em Decúbito Lateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Abdução de Quadril em Decúbito Lateral"
  },
  {
    "id": "aducao_do_quadril_lateral_com_alavanca",
    "name": "Adução do Quadril Lateral com Alavanca",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Adução do Quadril Lateral com Alavanca. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Adução do Quadril Lateral com Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Adução do Quadril Lateral com Alavanca"
  },
  {
    "id": "abducao_de_quadril_em_pe",
    "name": "Abdução de Quadril em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Abdução de Quadril em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Abdução de Quadril em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Abdução de Quadril em Pé"
  },
  {
    "id": "afundo_com_barra",
    "name": "Afundo com Barra",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Afundo com Barra. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Afundo com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Afundo com Barra"
  },
  {
    "id": "aducao_do_quadril_com_cabo",
    "name": "Adução do Quadril com Cabo",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Adução do Quadril com Cabo. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Adução do Quadril com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Adução do Quadril com Cabo"
  },
  {
    "id": "aducao_de_ombro_com_faixa_elastica",
    "name": "Adução de Ombro com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Adução de Ombro com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Adução de Ombro com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Adução de Ombro com Faixa Elástica"
  },
  {
    "id": "afundo_lateral_com_barra",
    "name": "Afundo Lateral com Barra",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Afundo Lateral com Barra. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Afundo Lateral com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Afundo Lateral com Barra"
  },
  {
    "id": "afundo_alternado_com_salto",
    "name": "Afundo Alternado com Salto",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Afundo Alternado com Salto. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Afundo Alternado com Salto foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Afundo Alternado com Salto"
  },
  {
    "id": "afundo_com_landmine",
    "name": "Afundo com landmine",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Afundo com landmine. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Afundo com landmine foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Afundo com landmine"
  },
  {
    "id": "afundo_na_maquina_smith",
    "name": "Afundo na Máquina Smith",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Afundo na Máquina Smith. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Afundo na Máquina Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Afundo na Máquina Smith"
  },
  {
    "id": "afundo",
    "name": "Afundo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Afundo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Afundo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Afundo"
  },
  {
    "id": "afundo_com_gymstick",
    "name": "Afundo com Gymstick",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Afundo com Gymstick. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Afundo com Gymstick foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Afundo com Gymstick"
  },
  {
    "id": "aducao_de_quadril_deitado_de_lado",
    "name": "Adução de quadril deitado de lado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Adução de quadril deitado de lado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Adução de quadril deitado de lado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Adução de quadril deitado de lado"
  },
  {
    "id": "agachamento_bulgaro_calistenia",
    "name": "Agachamento Búlgaro Calistenia",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Búlgaro Calistenia. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Búlgaro Calistenia foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Búlgaro Calistenia"
  },
  {
    "id": "agachamento_frontal_com_cabo",
    "name": "Agachamento Frontal com Cabo",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Frontal com Cabo. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Frontal com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Frontal com Cabo"
  },
  {
    "id": "agachamento_jefferson",
    "name": "Agachamento Jefferson",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Jefferson. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Jefferson foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Jefferson"
  },
  {
    "id": "agachamento_goblet_com_kettlebell_e_faixa_elastica",
    "name": "Agachamento Goblet com Kettlebell e Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Goblet com Kettlebell e Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Goblet com Kettlebell e Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Goblet com Kettlebell e Faixa Elástica"
  },
  {
    "id": "agachamento_camarao",
    "name": "Agachamento Camarão",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Camarão. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Camarão foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Camarão"
  },
  {
    "id": "agachamento_cossaco",
    "name": "Agachamento Cossaco",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Cossaco. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Cossaco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Cossaco"
  },
  {
    "id": "agachamento_frontal_com_kettlebell",
    "name": "Agachamento Frontal com Kettlebell",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Frontal com Kettlebell. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Frontal com Kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Frontal com Kettlebell"
  },
  {
    "id": "agachamento_bulgaro_com_halteres",
    "name": "Agachamento Búlgaro com Halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Búlgaro com Halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Búlgaro com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Búlgaro com Halteres"
  },
  {
    "id": "agachamento_bulgaro_com_peso_corporal",
    "name": "Agachamento Búlgaro com Peso Corporal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Búlgaro com Peso Corporal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Búlgaro com Peso Corporal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Búlgaro com Peso Corporal"
  },
  {
    "id": "agachamento_frontal_com_polia",
    "name": "Agachamento Frontal com Polia",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Frontal com Polia. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Frontal com Polia foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Frontal com Polia"
  },
  {
    "id": "agachamento_frontal_com_barra_no_banco",
    "name": "Agachamento Frontal com Barra no Banco",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Frontal com Barra no Banco. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Frontal com Barra no Banco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Frontal com Barra no Banco"
  },
  {
    "id": "afundo_no_banco",
    "name": "Afundo no banco",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Afundo no banco. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Afundo no banco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Afundo no banco"
  },
  {
    "id": "agachamento_bulgaro_com_barra",
    "name": "Agachamento Búlgaro com Barra",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Búlgaro com Barra. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Búlgaro com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Búlgaro com Barra"
  },
  {
    "id": "agachamento_dividido_profundo",
    "name": "Agachamento Dividido Profundo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Dividido Profundo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Dividido Profundo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Dividido Profundo"
  },
  {
    "id": "agachamento_funcional",
    "name": "Agachamento Funcional",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Funcional. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Funcional foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Funcional"
  },
  {
    "id": "agachamento_goblet_com_haltere",
    "name": "Agachamento Goblet com Haltere",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Goblet com Haltere. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Goblet com Haltere foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Goblet com Haltere"
  },
  {
    "id": "agachamento_hack_invertido",
    "name": "Agachamento Hack Invertido",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Hack Invertido. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Hack Invertido foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Hack Invertido"
  },
  {
    "id": "agachamento_frontal_com_barra_no_smith",
    "name": "Agachamento Frontal com Barra no Smith",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Frontal com Barra no Smith. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Frontal com Barra no Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Frontal com Barra no Smith"
  },
  {
    "id": "agachamento_frontal",
    "name": "Agachamento Frontal",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Frontal. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Frontal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Frontal"
  },
  {
    "id": "afundo_no_banco_com_halteres",
    "name": "Afundo no banco com halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Afundo no banco com halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Afundo no banco com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Afundo no banco com halteres"
  },
  {
    "id": "agachamento_com_gymstick",
    "name": "Agachamento com Gymstick",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Gymstick. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com Gymstick foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Gymstick"
  },
  {
    "id": "agachamento_sumo_sem_pesos",
    "name": "Agachamento Sumô sem Pesos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Sumô sem Pesos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Sumô sem Pesos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Sumô sem Pesos"
  },
  {
    "id": "agachamento_com_elevacao_dos_joelhos",
    "name": "Agachamento com Elevação dos Joelhos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Elevação dos Joelhos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com Elevação dos Joelhos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Elevação dos Joelhos"
  },
  {
    "id": "agachamento_pistola_com_kettlebell",
    "name": "Agachamento Pistola com Kettlebell",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Pistola com Kettlebell. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Pistola com Kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Pistola com Kettlebell"
  },
  {
    "id": "agachamento_com_faixa_elastica_em_afundo",
    "name": "Agachamento com Faixa Elástica em Afundo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Faixa Elástica em Afundo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com Faixa Elástica em Afundo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Faixa Elástica em Afundo"
  },
  {
    "id": "agachamento_pistol_com_trx",
    "name": "Agachamento Pistol com TRX",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Pistol com TRX. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Pistol com TRX foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Pistol com TRX"
  },
  {
    "id": "agachamento_pistola_com_halteres",
    "name": "Agachamento Pistola com Halteres",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Pistola com Halteres. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Pistola com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Pistola com Halteres"
  },
  {
    "id": "agachamento_com_cinto",
    "name": "Agachamento com Cinto",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Cinto. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento com Cinto foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Cinto"
  },
  {
    "id": "agachamento_com_barra_sobre_a_cabeca",
    "name": "Agachamento com Barra Sobre a Cabeça",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Barra Sobre a Cabeça. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com Barra Sobre a Cabeça foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Barra Sobre a Cabeça"
  },
  {
    "id": "agachamento_zercher",
    "name": "Agachamento Zercher",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Zercher. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Zercher foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Zercher"
  },
  {
    "id": "agachamento_sissy",
    "name": "Agachamento Sissy",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Sissy. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Sissy foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Sissy"
  },
  {
    "id": "agachamento_skater",
    "name": "Agachamento Skater",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Skater. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Skater foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Skater"
  },
  {
    "id": "agachamento_sissy_ajoelhado_com_peso_corporal",
    "name": "Agachamento Sissy ajoelhado com Peso Corporal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Sissy ajoelhado com Peso Corporal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Sissy ajoelhado com Peso Corporal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Sissy ajoelhado com Peso Corporal"
  },
  {
    "id": "agachamento_sumo_com_halteres",
    "name": "Agachamento Sumô com Halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Sumô com Halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento Sumô com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Sumô com Halteres"
  },
  {
    "id": "agachamento_pistola_com_apoio_em_caixa",
    "name": "Agachamento Pistola com Apoio em Caixa",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Pistola com Apoio em Caixa. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Pistola com Apoio em Caixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Pistola com Apoio em Caixa"
  },
  {
    "id": "agachamento_pistola_na_caixa",
    "name": "Agachamento Pistola na Caixa",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Pistola na Caixa. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Pistola na Caixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Pistola na Caixa"
  },
  {
    "id": "agachamento_pistola_apoiado",
    "name": "Agachamento Pistola Apoiado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento Pistola Apoiado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento Pistola Apoiado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento Pistola Apoiado"
  },
  {
    "id": "agachamento_com_chute_lateral_e_toque_no_calcanhar",
    "name": "Agachamento com Chute Lateral e Toque no Calcanhar",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Chute Lateral e Toque no Calcanhar. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com Chute Lateral e Toque no Calcanhar foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Chute Lateral e Toque no Calcanhar"
  },
  {
    "id": "agachamento_bulgaro_com_salto",
    "name": "Agachamento búlgaro com salto",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento búlgaro com salto. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento búlgaro com salto foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento búlgaro com salto"
  },
  {
    "id": "agachamento_com_faixa_elastica_sobre_a_cabeca",
    "name": "Agachamento com Faixa Elástica sobre a Cabeça",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Faixa Elástica sobre a Cabeça. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com Faixa Elástica sobre a Cabeça foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Faixa Elástica sobre a Cabeça"
  },
  {
    "id": "agachamento_com_sustentacao_e_elevacao_de_panturrilhas",
    "name": "Agachamento com Sustentação e Elevação de Panturrilhas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Sustentação e Elevação de Panturrilhas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com Sustentação e Elevação de Panturrilhas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Sustentação e Elevação de Panturrilhas"
  },
  {
    "id": "agachamento_em_plie_com_halteres",
    "name": "Agachamento em plié com halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento em plié com halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento em plié com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento em plié com halteres"
  },
  {
    "id": "agachamento_hack_com_barra",
    "name": "Agachamento hack com barra",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento hack com barra. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento hack com barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento hack com barra"
  },
  {
    "id": "agachamento_com_salto_usando_barra_hexagonal",
    "name": "Agachamento com Salto usando Barra Hexagonal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Salto usando Barra Hexagonal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com Salto usando Barra Hexagonal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Salto usando Barra Hexagonal"
  },
  {
    "id": "agachamento_com_salto_ajoelhado",
    "name": "Agachamento com salto ajoelhado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com salto ajoelhado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com salto ajoelhado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com salto ajoelhado"
  },
  {
    "id": "agachamento_com_kettlebell",
    "name": "Agachamento com kettlebell",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com kettlebell. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento com kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com kettlebell"
  },
  {
    "id": "agachamento_com_salto",
    "name": "Agachamento com Salto",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Salto. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com Salto foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Salto"
  },
  {
    "id": "agachamento_e_press_com_kettlebell",
    "name": "Agachamento e press com kettlebell",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento e press com kettlebell. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento e press com kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento e press com kettlebell"
  },
  {
    "id": "agachamento_com_salto_e_halteres",
    "name": "Agachamento com salto e halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com salto e halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento com salto e halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com salto e halteres"
  },
  {
    "id": "agachamento_na_maquina_abdutora",
    "name": "Agachamento na Máquina Abdutora",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento na Máquina Abdutora. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Agachamento na Máquina Abdutora foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento na Máquina Abdutora"
  },
  {
    "id": "agachamento_na_maquina_hack",
    "name": "Agachamento na Máquina Hack",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento na Máquina Hack. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento na Máquina Hack foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento na Máquina Hack"
  },
  {
    "id": "agachamento_no_banco_com_peso_corporal",
    "name": "Agachamento no Banco com Peso Corporal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento no Banco com Peso Corporal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento no Banco com Peso Corporal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento no Banco com Peso Corporal"
  },
  {
    "id": "agachamento_com_barra_no_chao_seguido_de_levantamento_militar",
    "name": "Agachamento com barra no chão seguido de levantamento militar",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com barra no chão seguido de levantamento militar. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com barra no chão seguido de levantamento militar foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com barra no chão seguido de levantamento militar"
  },
  {
    "id": "agachamento_havaiano",
    "name": "Agachamento havaiano",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento havaiano. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento havaiano foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento havaiano"
  },
  {
    "id": "agachamento_com_joelho_elevado",
    "name": "Agachamento com Joelho Elevado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Joelho Elevado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com Joelho Elevado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Joelho Elevado"
  },
  {
    "id": "agachamento_com_halteres_no_banco",
    "name": "Agachamento com Halteres no Banco",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Halteres no Banco. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento com Halteres no Banco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Halteres no Banco"
  },
  {
    "id": "agachamento_na_parede_com_bola_de_exercicio",
    "name": "Agachamento na Parede com Bola de Exercício",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento na Parede com Bola de Exercício. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento na Parede com Bola de Exercício foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento na Parede com Bola de Exercício"
  },
  {
    "id": "agachamento_com_trava",
    "name": "Agachamento com Trava",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com Trava. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento com Trava foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com Trava"
  },
  {
    "id": "agachamento_com_barra_e_salto",
    "name": "Agachamento com barra e salto",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento com barra e salto. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento com barra e salto foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento com barra e salto"
  },
  {
    "id": "agachamento_no_landmine",
    "name": "Agachamento no Landmine",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento no Landmine. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento no Landmine foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento no Landmine"
  },
  {
    "id": "alongamento_assistido_reverso_peitoral_e_ombro",
    "name": "Alongamento assistido reverso (peitoral e ombro)",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento assistido reverso (peitoral e ombro). Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento assistido reverso (peitoral e ombro) foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento assistido reverso (peitoral e ombro)"
  },
  {
    "id": "alongamento_da_panturrilha_agachado",
    "name": "Alongamento da panturrilha agachado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento da panturrilha agachado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento da panturrilha agachado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento da panturrilha agachado"
  },
  {
    "id": "alongamento_abraco_com_tapinhas_nas_costas",
    "name": "Alongamento Abraço com Tapinhas nas Costas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento Abraço com Tapinhas nas Costas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento Abraço com Tapinhas nas Costas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento Abraço com Tapinhas nas Costas"
  },
  {
    "id": "alongamento_piriforme",
    "name": "Alongamento Piriforme",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento Piriforme. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento Piriforme foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento Piriforme"
  },
  {
    "id": "alongamento_da_panturrilha_com_descida_do_calcanhar",
    "name": "Alongamento da panturrilha com descida do calcanhar",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento da panturrilha com descida do calcanhar. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento da panturrilha com descida do calcanhar foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento da panturrilha com descida do calcanhar"
  },
  {
    "id": "alongamento_dinamico_do_peitoral",
    "name": "Alongamento Dinâmico do Peitoral",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento Dinâmico do Peitoral. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento Dinâmico do Peitoral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento Dinâmico do Peitoral"
  },
  {
    "id": "alongamento_borboleta",
    "name": "Alongamento Borboleta",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento Borboleta. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento Borboleta foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento Borboleta"
  },
  {
    "id": "alongamento_com_pvc_na_posicao_frontal_de_rack",
    "name": "Alongamento com PVC na Posição Frontal de Rack",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento com PVC na Posição Frontal de Rack. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento com PVC na Posição Frontal de Rack foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento com PVC na Posição Frontal de Rack"
  },
  {
    "id": "alongamento_da_parte_superior_das_costas",
    "name": "Alongamento da parte superior das costas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento da parte superior das costas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento da parte superior das costas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento da parte superior das costas"
  },
  {
    "id": "alongamento_sentado_para_a_panturrilha_com_perna_esticada",
    "name": "Alongamento Sentado para a Panturrilha com Perna Esticada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento Sentado para a Panturrilha com Perna Esticada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento Sentado para a Panturrilha com Perna Esticada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento Sentado para a Panturrilha com Perna Esticada"
  },
  {
    "id": "agachamento_unilateral_cruzado_com_barra",
    "name": "Agachamento unilateral cruzado com Barra",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento unilateral cruzado com Barra. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento unilateral cruzado com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento unilateral cruzado com Barra"
  },
  {
    "id": "alongamento_inclinado_lateral_em_pe",
    "name": "Alongamento Inclinado Lateral em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento Inclinado Lateral em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento Inclinado Lateral em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento Inclinado Lateral em Pé"
  },
  {
    "id": "alongamento_lateral_da_parte_interna_da_coxa",
    "name": "Alongamento Lateral da Parte Interna da Coxa",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento Lateral da Parte Interna da Coxa. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento Lateral da Parte Interna da Coxa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento Lateral da Parte Interna da Coxa"
  },
  {
    "id": "agachamento_pistola",
    "name": "Agachamento pistola",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento pistola. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento pistola foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento pistola"
  },
  {
    "id": "agachamento_unilateral_cruzado",
    "name": "Agachamento unilateral cruzado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento unilateral cruzado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Agachamento unilateral cruzado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento unilateral cruzado"
  },
  {
    "id": "alongamento_da_esfinge",
    "name": "Alongamento da Esfinge",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento da Esfinge. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento da Esfinge foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento da Esfinge"
  },
  {
    "id": "agachamento_no_smith",
    "name": "Agachamento no Smith",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento no Smith. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento no Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento no Smith"
  },
  {
    "id": "alongamento_reverso_de_pulso",
    "name": "Alongamento Reverso de Pulso",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento Reverso de Pulso. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento Reverso de Pulso foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento Reverso de Pulso"
  },
  {
    "id": "airbike",
    "name": "Airbike",
    "targetMuscles": [
      "Cardio"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Airbike. Exercício focado principalmente em trabalhar cardio.",
    "instructions": "O exercício Airbike foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Airbike"
  },
  {
    "id": "agachamento_unilateral_cruzado_com_haltere",
    "name": "Agachamento unilateral cruzado com haltere",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Agachamento unilateral cruzado com haltere. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Agachamento unilateral cruzado com haltere foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Agachamento unilateral cruzado com haltere"
  },
  {
    "id": "alongamento_de_triceps_em_pe",
    "name": "Alongamento de tríceps em pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de tríceps em pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de tríceps em pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de tríceps em pé"
  },
  {
    "id": "alongamento_de_quadril_90_90",
    "name": "Alongamento de quadril 90-90",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de quadril 90-90. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de quadril 90-90 foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de quadril 90-90"
  },
  {
    "id": "alongamento_de_pernas_duplo",
    "name": "Alongamento de Pernas Duplo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de Pernas Duplo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de Pernas Duplo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Pernas Duplo"
  },
  {
    "id": "alongamento_de_isquiotibiais_deitado",
    "name": "Alongamento de Isquiotibiais deitado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de Isquiotibiais deitado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de Isquiotibiais deitado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Isquiotibiais deitado"
  },
  {
    "id": "alongamento_de_panturrilha_com_corda",
    "name": "Alongamento de Panturrilha com Corda",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de Panturrilha com Corda. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de Panturrilha com Corda foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Panturrilha com Corda"
  },
  {
    "id": "alongamento_de_ombro_com_o_braco_cruzado",
    "name": "Alongamento de ombro com o braço cruzado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de ombro com o braço cruzado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de ombro com o braço cruzado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de ombro com o braço cruzado"
  },
  {
    "id": "alongamento_das_costas_com_rolo_de_espuma",
    "name": "Alongamento das Costas com Rolo de Espuma",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento das Costas com Rolo de Espuma. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento das Costas com Rolo de Espuma foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento das Costas com Rolo de Espuma"
  },
  {
    "id": "alongamento_de_ombro_reverso_em_pe",
    "name": "Alongamento de ombro reverso em pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de ombro reverso em pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de ombro reverso em pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de ombro reverso em pé"
  },
  {
    "id": "alongamento_de_panturrilha_na_parede",
    "name": "Alongamento de panturrilha na parede",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de panturrilha na parede. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de panturrilha na parede foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de panturrilha na parede"
  },
  {
    "id": "alongamento_de_panturrilha_em_passo_largo",
    "name": "Alongamento de panturrilha em passo largo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de panturrilha em passo largo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de panturrilha em passo largo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de panturrilha em passo largo"
  },
  {
    "id": "alongamento_de_rotacao_da_coluna_em_pe",
    "name": "Alongamento de rotação da coluna em pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de rotação da coluna em pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de rotação da coluna em pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de rotação da coluna em pé"
  },
  {
    "id": "alongamento_de_isquiotibiais_em_pe",
    "name": "Alongamento de Isquiotibiais em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de Isquiotibiais em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de Isquiotibiais em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Isquiotibiais em Pé"
  },
  {
    "id": "alongamento_de_adutores_com_pernas_afastadas_em_pe",
    "name": "Alongamento de Adutores com Pernas Afastadas em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de Adutores com Pernas Afastadas em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de Adutores com Pernas Afastadas em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Adutores com Pernas Afastadas em Pé"
  },
  {
    "id": "alongamento_de_panturrilha_com_uma_perna",
    "name": "Alongamento de panturrilha com uma perna",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de panturrilha com uma perna. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de panturrilha com uma perna foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de panturrilha com uma perna"
  },
  {
    "id": "alongamento_de_panturrilha_em_posicao_estatica",
    "name": "Alongamento de panturrilha em posição estática",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de panturrilha em posição estática. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de panturrilha em posição estática foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de panturrilha em posição estática"
  },
  {
    "id": "alongamento_de_quadriceps_em_quatro_apoios",
    "name": "Alongamento de Quadríceps em Quatro Apoios",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de Quadríceps em Quatro Apoios. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de Quadríceps em Quatro Apoios foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Quadríceps em Quatro Apoios"
  },
  {
    "id": "alongamento_de_panturrilha_com_uma_perna_esticada",
    "name": "Alongamento de panturrilha com uma perna esticada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de panturrilha com uma perna esticada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de panturrilha com uma perna esticada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de panturrilha com uma perna esticada"
  },
  {
    "id": "alongamento_de_punho",
    "name": "Alongamento de Punho",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de Punho. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de Punho foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Punho"
  },
  {
    "id": "alongamento_de_gluteos_deitado",
    "name": "Alongamento de Glúteos Deitado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de Glúteos Deitado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de Glúteos Deitado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Glúteos Deitado"
  },
  {
    "id": "alongamento_de_quadriceps_ajoelhado",
    "name": "Alongamento de Quadríceps ajoelhado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento de Quadríceps ajoelhado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento de Quadríceps ajoelhado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento de Quadríceps ajoelhado"
  },
  {
    "id": "alongamento_do_trato_iliotibial_com_rolo_de_espuma",
    "name": "Alongamento do trato iliotibial com rolo de espuma",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do trato iliotibial com rolo de espuma. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do trato iliotibial com rolo de espuma foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do trato iliotibial com rolo de espuma"
  },
  {
    "id": "alongamento_do_piriforme_sentado",
    "name": "Alongamento do Piriforme Sentado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do Piriforme Sentado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do Piriforme Sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do Piriforme Sentado"
  },
  {
    "id": "alongamento_dos_extensores_dos_dedos_dos_pes",
    "name": "Alongamento dos Extensores dos Dedos dos Pés",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos Extensores dos Dedos dos Pés. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos Extensores dos Dedos dos Pés foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos Extensores dos Dedos dos Pés"
  },
  {
    "id": "alongamento_dos_adutores_com_a_perna_estendida_ajoelhado",
    "name": "Alongamento dos Adutores com a Perna Estendida ajoelhado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos Adutores com a Perna Estendida ajoelhado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos Adutores com a Perna Estendida ajoelhado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos Adutores com a Perna Estendida ajoelhado"
  },
  {
    "id": "alongamento_do_peitoral_e_do_ombro_na_porta",
    "name": "Alongamento do peitoral e do ombro na porta",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do peitoral e do ombro na porta. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do peitoral e do ombro na porta foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do peitoral e do ombro na porta"
  },
  {
    "id": "alongamento_do_peito_e_parte_frontal_dos_ombros",
    "name": "Alongamento do Peito e Parte Frontal dos Ombros",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do Peito e Parte Frontal dos Ombros. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do Peito e Parte Frontal dos Ombros foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do Peito e Parte Frontal dos Ombros"
  },
  {
    "id": "alongamento_do_tibial_posterior",
    "name": "Alongamento do tibial posterior",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do tibial posterior. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do tibial posterior foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do tibial posterior"
  },
  {
    "id": "alongamento_dos_adutores_em_posicao_sentada_com_pernas_abertas",
    "name": "Alongamento dos Adutores em Posição Sentada com Pernas Abertas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos Adutores em Posição Sentada com Pernas Abertas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos Adutores em Posição Sentada com Pernas Abertas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos Adutores em Posição Sentada com Pernas Abertas"
  },
  {
    "id": "alongamento_do_tendao_de_aquiles_em_pe",
    "name": "Alongamento do tendão de Aquiles em pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do tendão de Aquiles em pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do tendão de Aquiles em pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do tendão de Aquiles em pé"
  },
  {
    "id": "alongamento_do_peitoral_ate_as_costas",
    "name": "Alongamento do Peitoral até as Costas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do Peitoral até as Costas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do Peitoral até as Costas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do Peitoral até as Costas"
  },
  {
    "id": "alongamento_do_desviador_ulnar_e_extensor_do_punho",
    "name": "Alongamento do desviador ulnar e extensor do punho",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do desviador ulnar e extensor do punho. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do desviador ulnar e extensor do punho foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do desviador ulnar e extensor do punho"
  },
  {
    "id": "alongamento_do_peito_com_rolo_de_espuma",
    "name": "Alongamento do peito com rolo de espuma",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do peito com rolo de espuma. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do peito com rolo de espuma foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do peito com rolo de espuma"
  },
  {
    "id": "alongamento_do_peitoral_reverso",
    "name": "Alongamento do peitoral reverso",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do peitoral reverso. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do peitoral reverso foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do peitoral reverso"
  },
  {
    "id": "alongamento_do_peitoral_com_um_braco_em_pe",
    "name": "Alongamento do Peitoral com um Braço em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do Peitoral com um Braço em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do Peitoral com um Braço em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do Peitoral com um Braço em Pé"
  },
  {
    "id": "alongamento_dos_isquiotibiais_sentado",
    "name": "Alongamento dos Isquiotibiais Sentado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos Isquiotibiais Sentado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos Isquiotibiais Sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos Isquiotibiais Sentado"
  },
  {
    "id": "alongamento_do_ombro_com_toalha",
    "name": "Alongamento do ombro com toalha",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do ombro com toalha. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do ombro com toalha foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do ombro com toalha"
  },
  {
    "id": "alongamento_dos_adutores_com_pernas_abertas_em_pe",
    "name": "Alongamento dos Adutores com Pernas Abertas em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos Adutores com Pernas Abertas em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos Adutores com Pernas Abertas em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos Adutores com Pernas Abertas em Pé"
  },
  {
    "id": "alongamento_do_peito_acima_da_cabeca",
    "name": "Alongamento do Peito Acima da Cabeça",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do Peito Acima da Cabeça. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do Peito Acima da Cabeça foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do Peito Acima da Cabeça"
  },
  {
    "id": "alongamento_do_gastrocnemio_com_joelho_flexionado",
    "name": "Alongamento do Gastrocnêmio com Joelho Flexionado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do Gastrocnêmio com Joelho Flexionado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do Gastrocnêmio com Joelho Flexionado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do Gastrocnêmio com Joelho Flexionado"
  },
  {
    "id": "alongamento_do_manguito_rotador",
    "name": "Alongamento do manguito rotador",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento do manguito rotador. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento do manguito rotador foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento do manguito rotador"
  },
  {
    "id": "alongamento_dos_ombros_por_tras_das_costas",
    "name": "Alongamento dos ombros por trás das costas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos ombros por trás das costas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos ombros por trás das costas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos ombros por trás das costas"
  },
  {
    "id": "alongamento_dos_isquiotibiais_em_pe_com_a_perna_cruzada",
    "name": "Alongamento dos isquiotibiais em pé com a perna cruzada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos isquiotibiais em pé com a perna cruzada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos isquiotibiais em pé com a perna cruzada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos isquiotibiais em pé com a perna cruzada"
  },
  {
    "id": "alongamento_na_parede_do_canto",
    "name": "Alongamento na parede do canto",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento na parede do canto. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento na parede do canto foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento na parede do canto"
  },
  {
    "id": "alongamentos_de_pes_e_tornozelos",
    "name": "Alongamentos de pés e tornozelos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamentos de pés e tornozelos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamentos de pés e tornozelos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamentos de pés e tornozelos"
  },
  {
    "id": "anilha_press",
    "name": "Anilha Press",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Anilha Press. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Anilha Press foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Anilha Press"
  },
  {
    "id": "alongamento_dos_flexores_dos_dedos_dos_pes_em_pe",
    "name": "Alongamento dos flexores dos dedos dos pés em pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos flexores dos dedos dos pés em pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos flexores dos dedos dos pés em pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos flexores dos dedos dos pés em pé"
  },
  {
    "id": "alongamento_em_circulos_nos_punhos",
    "name": "Alongamento em Círculos nos Punhos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento em Círculos nos Punhos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento em Círculos nos Punhos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento em Círculos nos Punhos"
  },
  {
    "id": "arranco_com_kettlebell_em_afundo",
    "name": "Arranco com kettlebell em afundo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Arranco com kettlebell em afundo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Arranco com kettlebell em afundo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Arranco com kettlebell em afundo"
  },
  {
    "id": "arranco_com_kettlebell_de_um_braco",
    "name": "Arranco com kettlebell de um braço",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Arranco com kettlebell de um braço. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Arranco com kettlebell de um braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Arranco com kettlebell de um braço"
  },
  {
    "id": "alongamento_dos_flexores_do_quadril_em_posicao_de_joelho",
    "name": "Alongamento dos flexores do quadril em posição de joelho",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos flexores do quadril em posição de joelho. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos flexores do quadril em posição de joelho foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos flexores do quadril em posição de joelho"
  },
  {
    "id": "andar_de_bicicleta_ao_ar_livre",
    "name": "Andar de Bicicleta ao Ar Livre",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Andar de Bicicleta ao Ar Livre. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Andar de Bicicleta ao Ar Livre foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Andar de Bicicleta ao Ar Livre"
  },
  {
    "id": "alongamento_dos_adutores_da_coxa_com_rolo_de_espuma",
    "name": "Alongamento dos adutores da coxa com rolo de espuma",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos adutores da coxa com rolo de espuma. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos adutores da coxa com rolo de espuma foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos adutores da coxa com rolo de espuma"
  },
  {
    "id": "arranco_com_barra",
    "name": "Arranco com Barra",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Arranco com Barra. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Arranco com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Arranco com Barra"
  },
  {
    "id": "andar_de_pato",
    "name": "Andar de Pato",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Andar de Pato. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Andar de Pato foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Andar de Pato"
  },
  {
    "id": "alongamento_em_pe_dos_quadriceps",
    "name": "Alongamento em Pé dos Quadríceps",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento em Pé dos Quadríceps. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento em Pé dos Quadríceps foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento em Pé dos Quadríceps"
  },
  {
    "id": "alongamento_reverso_assistido_peito_e_ombro",
    "name": "Alongamento reverso assistido (peito e ombro)",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento reverso assistido (peito e ombro). Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento reverso assistido (peito e ombro) foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento reverso assistido (peito e ombro)"
  },
  {
    "id": "alongamento_dos_isquiotibiais_em_pe",
    "name": "Alongamento dos isquiotibiais em pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos isquiotibiais em pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos isquiotibiais em pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos isquiotibiais em pé"
  },
  {
    "id": "alongamento_dos_flexores_de_quadril_ajoelhado",
    "name": "Alongamento dos flexores de quadril ajoelhado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos flexores de quadril ajoelhado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos flexores de quadril ajoelhado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos flexores de quadril ajoelhado"
  },
  {
    "id": "alongamento_dos_adutores_sentado",
    "name": "Alongamento dos adutores sentado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos adutores sentado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos adutores sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos adutores sentado"
  },
  {
    "id": "alongamento_dos_latissimos_dorsais_com_rolo_de_espuma",
    "name": "Alongamento dos latíssimos dorsais com rolo de espuma",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Alongamento dos latíssimos dorsais com rolo de espuma. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Alongamento dos latíssimos dorsais com rolo de espuma foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Alongamento dos latíssimos dorsais com rolo de espuma"
  },
  {
    "id": "avanco_com_cabo",
    "name": "Avanço com Cabo",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Avanço com Cabo. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Avanço com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Avanço com Cabo"
  },
  {
    "id": "avanco_invertido_com_halteres",
    "name": "Avanço Invertido com Halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Avanço Invertido com Halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Avanço Invertido com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Avanço Invertido com Halteres"
  },
  {
    "id": "arremesso_com_barra",
    "name": "Arremesso com Barra",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Arremesso com Barra. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Arremesso com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Arremesso com Barra"
  },
  {
    "id": "avanco_com_joelho_elevado_em_caminhada",
    "name": "Avanço com Joelho Elevado em Caminhada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Avanço com Joelho Elevado em Caminhada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Avanço com Joelho Elevado em Caminhada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Avanço com Joelho Elevado em Caminhada"
  },
  {
    "id": "avanco_com_halteres",
    "name": "Avanço com Halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Avanço com Halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Avanço com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Avanço com Halteres"
  },
  {
    "id": "avanco_com_halteres_para_tras",
    "name": "Avanço com Halteres para Trás",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Avanço com Halteres para Trás. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Avanço com Halteres para Trás foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Avanço com Halteres para Trás"
  },
  {
    "id": "arremesso_e_pressao_com_barra",
    "name": "Arremesso e Pressão com Barra",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Arremesso e Pressão com Barra. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Arremesso e Pressão com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Arremesso e Pressão com Barra"
  },
  {
    "id": "avanco_sem_peso_corporal",
    "name": "Avanço sem Peso Corporal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Avanço sem Peso Corporal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Avanço sem Peso Corporal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Avanço sem Peso Corporal"
  },
  {
    "id": "arranque_e_arremesso_com_kettlebell",
    "name": "Arranque e Arremesso com Kettlebell",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Arranque e Arremesso com Kettlebell. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Arranque e Arremesso com Kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Arranque e Arremesso com Kettlebell"
  },
  {
    "id": "avanco_com_barra",
    "name": "Avanço com Barra",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Avanço com Barra. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Avanço com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Avanço com Barra"
  },
  {
    "id": "arranco_de_potencia",
    "name": "Arranco de Potência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Arranco de Potência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Arranco de Potência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Arranco de Potência"
  },
  {
    "id": "arranco_e_levantamento_com_kettlebell",
    "name": "Arranco e Levantamento com Kettlebell",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Arranco e Levantamento com Kettlebell. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Arranco e Levantamento com Kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Arranco e Levantamento com Kettlebell"
  },
  {
    "id": "arremesso_de_medicina_bola_com_levantamento_de_tronco",
    "name": "Arremesso de Medicina Bola com Levantamento de Tronco",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Arremesso de Medicina Bola com Levantamento de Tronco. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Arremesso de Medicina Bola com Levantamento de Tronco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Arremesso de Medicina Bola com Levantamento de Tronco"
  },
  {
    "id": "back_lever",
    "name": "Back Lever",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Back Lever. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Back Lever foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Back Lever"
  },
  {
    "id": "arremesso_de_bola_de_reacao",
    "name": "Arremesso de Bola de Reação",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Arremesso de Bola de Reação. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Arremesso de Bola de Reação foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Arremesso de Bola de Reação"
  },
  {
    "id": "arremesso_com_haltere_de_um_braco",
    "name": "Arremesso com haltere de um braço",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Arremesso com haltere de um braço. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Arremesso com haltere de um braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Arremesso com haltere de um braço"
  },
  {
    "id": "avanco_com_puxador_de_cabo",
    "name": "Avanço com Puxador de Cabo",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Avanço com Puxador de Cabo. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Avanço com Puxador de Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Avanço com Puxador de Cabo"
  },
  {
    "id": "avanco_invertido",
    "name": "Avanço Invertido",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Avanço Invertido. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Avanço Invertido foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Avanço Invertido"
  },
  {
    "id": "avanco_com_joelho_alto_em_cima_da_bola_bosu",
    "name": "Avanço com Joelho Alto em Cima da Bola Bosu",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Avanço com Joelho Alto em Cima da Bola Bosu. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Avanço com Joelho Alto em Cima da Bola Bosu foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Avanço com Joelho Alto em Cima da Bola Bosu"
  },
  {
    "id": "balanco_com_gymstick",
    "name": "Balanço com gymstick",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Balanço com gymstick. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Balanço com gymstick foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Balanço com gymstick"
  },
  {
    "id": "barra_fixa_com_salto",
    "name": "Barra fixa com Salto",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra fixa com Salto. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra fixa com Salto foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra fixa com Salto"
  },
  {
    "id": "barra_fixa_com_giro",
    "name": "Barra Fixa com Giro",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra Fixa com Giro. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra Fixa com Giro foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra Fixa com Giro"
  },
  {
    "id": "barra_fixa",
    "name": "Barra fixa",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra fixa. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Barra fixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra fixa"
  },
  {
    "id": "barra_fixa_com_pegada_neutra",
    "name": "Barra fixa com pegada neutra",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra fixa com pegada neutra. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra fixa com pegada neutra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra fixa com pegada neutra"
  },
  {
    "id": "barra_fixa_assistida",
    "name": "Barra Fixa Assistida",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra Fixa Assistida. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Barra Fixa Assistida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra Fixa Assistida"
  },
  {
    "id": "bandeira_humana",
    "name": "Bandeira Humana",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Bandeira Humana. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Bandeira Humana foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Bandeira Humana"
  },
  {
    "id": "barra_fixa_para_o_braquial",
    "name": "Barra Fixa para o Braquial",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra Fixa para o Braquial. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra Fixa para o Braquial foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra Fixa para o Braquial"
  },
  {
    "id": "barra_fixa_com_arco",
    "name": "Barra fixa com Arco",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra fixa com Arco. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra fixa com Arco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra fixa com Arco"
  },
  {
    "id": "barra_fixa_com_pegada_por_tras_do_pescoco",
    "name": "Barra Fixa com Pegada por Trás do Pescoço",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra Fixa com Pegada por Trás do Pescoço. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra Fixa com Pegada por Trás do Pescoço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra Fixa com Pegada por Trás do Pescoço"
  },
  {
    "id": "barra_fixa_com_pegada_supinada",
    "name": "Barra Fixa com Pegada Supinada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra Fixa com Pegada Supinada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra Fixa com Pegada Supinada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra Fixa com Pegada Supinada"
  },
  {
    "id": "balancos_com_kettlebell",
    "name": "Balanços com Kettlebell",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Balanços com Kettlebell. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Balanços com Kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Balanços com Kettlebell"
  },
  {
    "id": "barra_fixa_assistida_com_faixa_elastica",
    "name": "Barra fixa Assistida com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra fixa Assistida com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra fixa Assistida com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra fixa Assistida com Faixa Elástica"
  },
  {
    "id": "barra_fixa_com_pegada_fechada",
    "name": "Barra Fixa com Pegada Fechada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra Fixa com Pegada Fechada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra Fixa com Pegada Fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra Fixa com Pegada Fechada"
  },
  {
    "id": "balloon_drill",
    "name": "Balloon Drill",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Balloon Drill. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Balloon Drill foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Balloon Drill"
  },
  {
    "id": "barra_fixa_com_pegada_invertida_assistido",
    "name": "Barra fixa com pegada invertida assistido",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra fixa com pegada invertida assistido. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra fixa com pegada invertida assistido foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra fixa com pegada invertida assistido"
  },
  {
    "id": "barra_fixa_com_bracos_alternados",
    "name": "Barra fixa com braços alternados",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra fixa com braços alternados. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra fixa com braços alternados foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra fixa com braços alternados"
  },
  {
    "id": "barbell_hang_clean",
    "name": "Barbell Hang Clean",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barbell Hang Clean. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barbell Hang Clean foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barbell Hang Clean"
  },
  {
    "id": "barra_fixa_de_cabeca_para_baixo",
    "name": "Barra Fixa de Cabeça para Baixo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra Fixa de Cabeça para Baixo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra Fixa de Cabeça para Baixo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra Fixa de Cabeça para Baixo"
  },
  {
    "id": "barra_fixa_com_peso",
    "name": "Barra fixa com peso",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra fixa com peso. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra fixa com peso foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra fixa com peso"
  },
  {
    "id": "barra_fixa_com_l_sit",
    "name": "Barra fixa com L-sit",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra fixa com L-sit. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra fixa com L-sit foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra fixa com L-sit"
  },
  {
    "id": "burpees",
    "name": "Burpees",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Burpees. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Burpees foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Burpees"
  },
  {
    "id": "bom_dia_1",
    "name": "Bom dia (1)",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Bom dia (1). Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Bom dia (1) foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Bom dia (1)"
  },
  {
    "id": "bola_na_parede",
    "name": "Bola na parede",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Bola na parede. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Bola na parede foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Bola na parede"
  },
  {
    "id": "barra_fixa_pegada_invertida",
    "name": "Barra fixa pegada invertida",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Barra fixa pegada invertida. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Barra fixa pegada invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Barra fixa pegada invertida"
  },
  {
    "id": "bicicleta_ergometrica_reclinada",
    "name": "Bicicleta Ergométrica Reclinada",
    "targetMuscles": [
      "Cardio"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Bicicleta Ergométrica Reclinada. Exercício focado principalmente em trabalhar cardio.",
    "instructions": "O exercício Bicicleta Ergométrica Reclinada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Bicicleta Ergométrica Reclinada"
  },
  {
    "id": "boxe_jab",
    "name": "Boxe jab",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Boxe jab. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Boxe jab foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Boxe jab"
  },
  {
    "id": "bola_medicinal_lancada_para_cima_e_para_baixo",
    "name": "Bola medicinal lançada para cima e para baixo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Bola medicinal lançada para cima e para baixo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Bola medicinal lançada para cima e para baixo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Bola medicinal lançada para cima e para baixo"
  },
  {
    "id": "caminhada_lateral_com_faixa_de_resistencia",
    "name": "Caminhada Lateral com Faixa de Resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Caminhada Lateral com Faixa de Resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Caminhada Lateral com Faixa de Resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Caminhada Lateral com Faixa de Resistência"
  },
  {
    "id": "bom_dia_com_faixa_elastica_de_resistencia",
    "name": "Bom Dia com Faixa Elástica de Resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Bom Dia com Faixa Elástica de Resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Bom Dia com Faixa Elástica de Resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Bom Dia com Faixa Elástica de Resistência"
  },
  {
    "id": "boxe_sombra",
    "name": "Boxe Sombra",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Boxe Sombra. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Boxe Sombra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Boxe Sombra"
  },
  {
    "id": "caminhada_na_parada_de_mao",
    "name": "Caminhada na Parada de Mão",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Caminhada na Parada de Mão. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Caminhada na Parada de Mão foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Caminhada na Parada de Mão"
  },
  {
    "id": "burpee_jack",
    "name": "Burpee Jack",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Burpee Jack. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Burpee Jack foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Burpee Jack"
  },
  {
    "id": "bom_dia",
    "name": "Bom dia",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Bom dia. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Bom dia foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Bom dia"
  },
  {
    "id": "caminhada_na_parede",
    "name": "Caminhada na Parede",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Caminhada na Parede. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Caminhada na Parede foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Caminhada na Parede"
  },
  {
    "id": "cadeira_flexora",
    "name": "Cadeira flexora",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Cadeira flexora. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Cadeira flexora foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Cadeira flexora"
  },
  {
    "id": "caminhada_com_halteres",
    "name": "Caminhada com Halteres",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Caminhada com Halteres. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Caminhada com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Caminhada com Halteres"
  },
  {
    "id": "cardio_de_passos_de_boxeador",
    "name": "Cardio de Passos de Boxeador",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Cardio de Passos de Boxeador. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Cardio de Passos de Boxeador foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Cardio de Passos de Boxeador"
  },
  {
    "id": "caminhar",
    "name": "Caminhar",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Caminhar. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Caminhar foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Caminhar"
  },
  {
    "id": "caminhada_rapida",
    "name": "Caminhada Rápida",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Caminhada Rápida. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Caminhada Rápida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Caminhada Rápida"
  },
  {
    "id": "bom_dia_na_maquina_smith",
    "name": "Bom Dia na Máquina Smith",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Bom Dia na Máquina Smith. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Bom Dia na Máquina Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Bom Dia na Máquina Smith"
  },
  {
    "id": "cross_over_polia_alta",
    "name": "Cross over polia Alta",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Cross over polia Alta. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Cross over polia Alta foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Cross over polia Alta"
  },
  {
    "id": "coice_de_burro",
    "name": "Coice de Burro",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Coice de Burro. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Coice de Burro foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Coice de Burro"
  },
  {
    "id": "contracao_abdominal",
    "name": "Contração abdominal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Contração abdominal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Contração abdominal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Contração abdominal"
  },
  {
    "id": "corrida_latera",
    "name": "Corrida Latera",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Corrida Latera. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Corrida Latera foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Corrida Latera"
  },
  {
    "id": "catavento_corporal",
    "name": "Catavento corporal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Catavento corporal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Catavento corporal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Catavento corporal"
  },
  {
    "id": "carregamento_zercher",
    "name": "Carregamento Zercher",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Carregamento Zercher. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Carregamento Zercher foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Carregamento Zercher"
  },
  {
    "id": "chute_em_gancho",
    "name": "Chute em Gancho",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Chute em Gancho. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Chute em Gancho foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Chute em Gancho"
  },
  {
    "id": "corrida_na_bicicleta_ergometrica",
    "name": "Corrida na Bicicleta Ergométrica",
    "targetMuscles": [
      "Cardio"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Corrida na Bicicleta Ergométrica. Exercício focado principalmente em trabalhar cardio.",
    "instructions": "O exercício Corrida na Bicicleta Ergométrica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Corrida na Bicicleta Ergométrica"
  },
  {
    "id": "chutes_alternados_de_gluteos_no_banco",
    "name": "Chutes Alternados de Glúteos no Banco",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Chutes Alternados de Glúteos no Banco. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Chutes Alternados de Glúteos no Banco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Chutes Alternados de Glúteos no Banco"
  },
  {
    "id": "corrida_para_tras",
    "name": "Corrida para Trás",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Corrida para Trás. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Corrida para Trás foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Corrida para Trás"
  },
  {
    "id": "corrida_de_sprint_com_assistencia_de_faixa_elastica",
    "name": "Corrida de Sprint com Assistência de Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Corrida de Sprint com Assistência de Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Corrida de Sprint com Assistência de Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Corrida de Sprint com Assistência de Faixa Elástica"
  },
  {
    "id": "chutes_ate_o_gluteo",
    "name": "Chutes até o Glúteo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Chutes até o Glúteo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Chutes até o Glúteo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Chutes até o Glúteo"
  },
  {
    "id": "corrida_com_joelhos_altos",
    "name": "Corrida com Joelhos Altos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Corrida com Joelhos Altos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Corrida com Joelhos Altos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Corrida com Joelhos Altos"
  },
  {
    "id": "corrida_estacionaria",
    "name": "Corrida Estacionária",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Corrida Estacionária. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Corrida Estacionária foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Corrida Estacionária"
  },
  {
    "id": "corrida_com_salto",
    "name": "Corrida com Salto",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Corrida com Salto. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Corrida com Salto foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Corrida com Salto"
  },
  {
    "id": "coice_com_perna_flexionada",
    "name": "Coice com Perna Flexionada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Coice com Perna Flexionada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Coice com Perna Flexionada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Coice com Perna Flexionada"
  },
  {
    "id": "corda_de_batalha",
    "name": "Corda de batalha",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Corda de batalha. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Corda de batalha foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Corda de batalha"
  },
  {
    "id": "corrida_com_elevacao_dos_joelhos",
    "name": "Corrida com Elevação dos Joelhos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Corrida com Elevação dos Joelhos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Corrida com Elevação dos Joelhos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Corrida com Elevação dos Joelhos"
  },
  {
    "id": "corrida_de_passos_curtos",
    "name": "Corrida de Passos Curtos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Corrida de Passos Curtos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Corrida de Passos Curtos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Corrida de Passos Curtos"
  },
  {
    "id": "corrida_com_passos_rapidos",
    "name": "Corrida com Passos Rápidos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Corrida com Passos Rápidos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Corrida com Passos Rápidos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Corrida com Passos Rápidos"
  },
  {
    "id": "circulos_com_um_braco",
    "name": "Círculos com um braço",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Círculos com um braço. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Círculos com um braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Círculos com um braço"
  },
  {
    "id": "circulos_de_braco_com_pesos",
    "name": "Círculos de Braço com Pesos",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Círculos de Braço com Pesos. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Círculos de Braço com Pesos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Círculos de Braço com Pesos"
  },
  {
    "id": "cross_over_polia_media",
    "name": "Cross over polia media",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Cross over polia media. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Cross over polia media foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Cross over polia media"
  },
  {
    "id": "crucifixo_com_halteres_inclinado",
    "name": "Crucifixo com Halteres Inclinado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crucifixo com Halteres Inclinado. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Crucifixo com Halteres Inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com Halteres Inclinado"
  },
  {
    "id": "crucifixo_inverso_unilateral_com_cabo",
    "name": "Crucifixo inverso unilateral com cabo",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crucifixo inverso unilateral com cabo. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Crucifixo inverso unilateral com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo inverso unilateral com cabo"
  },
  {
    "id": "crucifixo_com_halteres",
    "name": "Crucifixo com halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crucifixo com halteres. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Crucifixo com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com halteres"
  },
  {
    "id": "crossover_unilateral_com_cabo",
    "name": "Crossover Unilateral com Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crossover Unilateral com Cabo. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Crossover Unilateral com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crossover Unilateral com Cabo"
  },
  {
    "id": "crucifixo_com_cabo_declinado",
    "name": "Crucifixo com Cabo Declinado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crucifixo com Cabo Declinado. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Crucifixo com Cabo Declinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com Cabo Declinado"
  },
  {
    "id": "crossover_na_alavanca",
    "name": "Crossover na Alavanca",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crossover na Alavanca. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Crossover na Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crossover na Alavanca"
  },
  {
    "id": "cruzado_de_direita",
    "name": "Cruzado de Direita",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Cruzado de Direita. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Cruzado de Direita foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Cruzado de Direita"
  },
  {
    "id": "cross_over_polia_baixa",
    "name": "Cross over polia baixa",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Cross over polia baixa. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Cross over polia baixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Cross over polia baixa"
  },
  {
    "id": "circulos_com_os_bracos",
    "name": "Círculos com os braços",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Círculos com os braços. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Círculos com os braços foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Círculos com os braços"
  },
  {
    "id": "crucifixo_com_trx",
    "name": "Crucifixo com TRX",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crucifixo com TRX. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Crucifixo com TRX foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com TRX"
  },
  {
    "id": "crucifixo_inclinado_cross",
    "name": "Crucifixo Inclinado Cross",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crucifixo Inclinado Cross. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Crucifixo Inclinado Cross foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Inclinado Cross"
  },
  {
    "id": "crucifixo_com_halteres_declinado",
    "name": "Crucifixo com Halteres Declinado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crucifixo com Halteres Declinado. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Crucifixo com Halteres Declinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo com Halteres Declinado"
  },
  {
    "id": "crucifixo_unilateral_em_declinado_com_cabo",
    "name": "Crucifixo Unilateral em Declinado com Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crucifixo Unilateral em Declinado com Cabo. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Crucifixo Unilateral em Declinado com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Unilateral em Declinado com Cabo"
  },
  {
    "id": "crucifixo_invertido_com_gymstick_para_deltoides_posterior",
    "name": "Crucifixo invertido com gymstick para deltoides posterior",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crucifixo invertido com gymstick para deltoides posterior. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Crucifixo invertido com gymstick para deltoides posterior foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo invertido com gymstick para deltoides posterior"
  },
  {
    "id": "cruz_de_ferro_com_halteres",
    "name": "Cruz de ferro com halteres",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Cruz de ferro com halteres. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Cruz de ferro com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Cruz de ferro com halteres"
  },
  {
    "id": "crucifixo_deitado_com_cabo",
    "name": "Crucifixo Deitado com Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crucifixo Deitado com Cabo. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Crucifixo Deitado com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crucifixo Deitado com Cabo"
  },
  {
    "id": "crossover_de_peitoral_superior_com_cabo",
    "name": "Crossover de peitoral superior com cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Crossover de peitoral superior com cabo. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Crossover de peitoral superior com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Crossover de peitoral superior com cabo"
  },
  {
    "id": "desenvolvimento_de_ombro_com_barra_sentado",
    "name": "Desenvolvimento de ombro com barra sentado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro com barra sentado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombro com barra sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro com barra sentado"
  },
  {
    "id": "desenvolvimento_cubano_com_halteres",
    "name": "Desenvolvimento Cubano com Halteres",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento Cubano com Halteres. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento Cubano com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento Cubano com Halteres"
  },
  {
    "id": "desenvolvimento_cubano_sentado_com_halteres",
    "name": "Desenvolvimento cubano sentado com halteres",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento cubano sentado com halteres. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento cubano sentado com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento cubano sentado com halteres"
  },
  {
    "id": "desenvolvimento_de_ombro_com_halteres_em_z",
    "name": "Desenvolvimento de ombro com halteres em Z",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro com halteres em Z. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombro com halteres em Z foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro com halteres em Z"
  },
  {
    "id": "desenvolvimento_de_ombro_com_cabo",
    "name": "Desenvolvimento de ombro com cabo",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro com cabo. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombro com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro com cabo"
  },
  {
    "id": "desenvolvimento_arnold_com_um_braco",
    "name": "Desenvolvimento arnold com um braço",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento arnold com um braço. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento arnold com um braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento arnold com um braço"
  },
  {
    "id": "desenvolvimento_de_ombro_na_maquina",
    "name": "Desenvolvimento de ombro na máquina",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro na máquina. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombro na máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro na máquina"
  },
  {
    "id": "desenvolvimento_de_ombro_alternada_em_pe_com_halteres",
    "name": "Desenvolvimento de Ombro Alternada em Pé com Halteres",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de Ombro Alternada em Pé com Halteres. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de Ombro Alternada em Pé com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de Ombro Alternada em Pé com Halteres"
  },
  {
    "id": "desenvolvimento_de_ombro_com_cabo_ajoelhado",
    "name": "Desenvolvimento de ombro com cabo ajoelhado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro com cabo ajoelhado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombro com cabo ajoelhado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro com cabo ajoelhado"
  },
  {
    "id": "desenvolvimento_arnold",
    "name": "Desenvolvimento Arnold",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento Arnold. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento Arnold foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento Arnold"
  },
  {
    "id": "desenvolvimento_de_ombro_deitado",
    "name": "Desenvolvimento de ombro deitado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro deitado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombro deitado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro deitado"
  },
  {
    "id": "descida_de_um_pe_so",
    "name": "Descida de um Pé Só",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Descida de um Pé Só. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Descida de um Pé Só foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Descida de um Pé Só"
  },
  {
    "id": "copia_de_abdominal_de_ra_com_bola_de_exercicios",
    "name": "Cópia de Abdominal de Rã com Bola de Exercícios",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Cópia de Abdominal de Rã com Bola de Exercícios. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Cópia de Abdominal de Rã com Bola de Exercícios foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Cópia de Abdominal de Rã com Bola de Exercícios"
  },
  {
    "id": "desenvolvimento_de_ombro_com_kettlebell",
    "name": "Desenvolvimento de ombro com kettlebell",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro com kettlebell. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Desenvolvimento de ombro com kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro com kettlebell"
  },
  {
    "id": "desenvolvimento_de_ombros_com_rotacao_alternada_com_halteres",
    "name": "Desenvolvimento de Ombros com Rotação Alternada com Halteres",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de Ombros com Rotação Alternada com Halteres. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de Ombros com Rotação Alternada com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de Ombros com Rotação Alternada com Halteres"
  },
  {
    "id": "desenvolvimento_de_ombro_com_halteres_em_forma_de_w",
    "name": "Desenvolvimento de ombro com halteres em forma de W",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro com halteres em forma de W. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombro com halteres em forma de W foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro com halteres em forma de W"
  },
  {
    "id": "desenvolvimento_arnold_com_kettlebell",
    "name": "Desenvolvimento Arnold com kettlebell",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento Arnold com kettlebell. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Desenvolvimento Arnold com kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento Arnold com kettlebell"
  },
  {
    "id": "desenvolvimento_arnold_metade",
    "name": "Desenvolvimento Arnold (metade)",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento Arnold (metade). Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento Arnold (metade) foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento Arnold (metade)"
  },
  {
    "id": "desenvolvimento_de_ombro_no_banco_com_halteres",
    "name": "Desenvolvimento de Ombro no Banco com Halteres",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de Ombro no Banco com Halteres. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de Ombro no Banco com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de Ombro no Banco com Halteres"
  },
  {
    "id": "desenvolvimento_de_ombro_na_maquina_pegada_martelo",
    "name": "Desenvolvimento de ombro na máquina (pegada martelo)",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro na máquina (pegada martelo). Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombro na máquina (pegada martelo) foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro na máquina (pegada martelo)"
  },
  {
    "id": "desenvolvimento_de_ombro_reversa_na_maquina",
    "name": "Desenvolvimento de ombro reversa na máquina",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro reversa na máquina. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombro reversa na máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro reversa na máquina"
  },
  {
    "id": "desenvolvimento_militar_atras_da_cabeca_com_gymstick",
    "name": "Desenvolvimento militar atrás da cabeça com gymstick",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento militar atrás da cabeça com gymstick. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Desenvolvimento militar atrás da cabeça com gymstick foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento militar atrás da cabeça com gymstick"
  },
  {
    "id": "desenvolvimento_de_ombros_atras_da_cabeca_na_maquina_smith",
    "name": "Desenvolvimento de ombros atrás da cabeça na máquina Smith",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombros atrás da cabeça na máquina Smith. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombros atrás da cabeça na máquina Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombros atrás da cabeça na máquina Smith"
  },
  {
    "id": "desenvolvimento_de_ombros_atras_do_pescoco_sentado",
    "name": "Desenvolvimento de ombros atrás do pescoço sentado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombros atrás do pescoço sentado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombros atrás do pescoço sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombros atrás do pescoço sentado"
  },
  {
    "id": "desenvolvimento_militar_com_pegada_fechada",
    "name": "Desenvolvimento militar com pegada fechada",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento militar com pegada fechada. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento militar com pegada fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento militar com pegada fechada"
  },
  {
    "id": "desenvolvimento_de_ombros_com_barra_w_com_pegada_invertida",
    "name": "Desenvolvimento de ombros com barra W com pegada invertida",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombros com barra W com pegada invertida. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombros com barra W com pegada invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombros com barra W com pegada invertida"
  },
  {
    "id": "desenvolvimento_de_ombros_na_maquina_smith",
    "name": "Desenvolvimento de ombros na máquina Smith",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombros na máquina Smith. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombros na máquina Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombros na máquina Smith"
  },
  {
    "id": "desenvolvimento_de_ombro_sentado_com_faixa_de_resistencia",
    "name": "Desenvolvimento de ombro sentado com faixa de resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro sentado com faixa de resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Desenvolvimento de ombro sentado com faixa de resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro sentado com faixa de resistência"
  },
  {
    "id": "desenvolvimentos_com_kettlebell_unilateral_de_joelhos",
    "name": "Desenvolvimentos com kettlebell unilateral de joelhos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimentos com kettlebell unilateral de joelhos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Desenvolvimentos com kettlebell unilateral de joelhos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimentos com kettlebell unilateral de joelhos"
  },
  {
    "id": "desenvolvimento_de_ombros_na_maquina",
    "name": "Desenvolvimento de ombros na máquina",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombros na máquina. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombros na máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombros na máquina"
  },
  {
    "id": "desenvolvimento_militar_com_peso_do_corpo",
    "name": "Desenvolvimento militar com peso do corpo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento militar com peso do corpo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Desenvolvimento militar com peso do corpo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento militar com peso do corpo"
  },
  {
    "id": "deslize_de_parede_do_serratil_com_rolo_de_espuma",
    "name": "Deslize de parede do serrátil com rolo de espuma",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Deslize de parede do serrátil com rolo de espuma. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Deslize de parede do serrátil com rolo de espuma foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Deslize de parede do serrátil com rolo de espuma"
  },
  {
    "id": "desenvolvimento_militar_com_barra_no_chao_ajoelhado",
    "name": "Desenvolvimento militar com barra no chão ajoelhado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento militar com barra no chão ajoelhado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento militar com barra no chão ajoelhado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento militar com barra no chão ajoelhado"
  },
  {
    "id": "desenvolvimento_militar_de_uma_mao_com_kettlebell",
    "name": "Desenvolvimento militar de uma mão com kettlebell",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento militar de uma mão com kettlebell. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento militar de uma mão com kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento militar de uma mão com kettlebell"
  },
  {
    "id": "desenvolvimento_militar_inclinado_com_barra_presa_no_chao",
    "name": "Desenvolvimento militar inclinado com barra presa no chão",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento militar inclinado com barra presa no chão. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento militar inclinado com barra presa no chão foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento militar inclinado com barra presa no chão"
  },
  {
    "id": "desenvolvimento_de_ombros_com_halteres_em_pe_com_pegada_neutra",
    "name": "Desenvolvimento de ombros com halteres em pé com pegada neutra",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombros com halteres em pé com pegada neutra. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombros com halteres em pé com pegada neutra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombros com halteres em pé com pegada neutra"
  },
  {
    "id": "desenvolvimento_militar_em_pe_na_maquina_smith",
    "name": "Desenvolvimento militar em pé na máquina Smith",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento militar em pé na máquina Smith. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento militar em pé na máquina Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento militar em pé na máquina Smith"
  },
  {
    "id": "desenvolvimento_lateral_com_gymstick",
    "name": "Desenvolvimento lateral com gymstick",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento lateral com gymstick. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Desenvolvimento lateral com gymstick foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento lateral com gymstick"
  },
  {
    "id": "desenvolvimento_de_ombro_unilateral_com_banda",
    "name": "Desenvolvimento de ombro unilateral com banda",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro unilateral com banda. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Desenvolvimento de ombro unilateral com banda foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro unilateral com banda"
  },
  {
    "id": "desenvolvimento_de_ombro_unilateral_com_halter",
    "name": "Desenvolvimento de ombro unilateral com halter",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Desenvolvimento de ombro unilateral com halter. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Desenvolvimento de ombro unilateral com halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Desenvolvimento de ombro unilateral com halter"
  },
  {
    "id": "elevacao_com_barra_em_degrau",
    "name": "Elevação com Barra em Degrau",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação com Barra em Degrau. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Elevação com Barra em Degrau foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação com Barra em Degrau"
  },
  {
    "id": "elevacao_frontal_alternada_com_halteres",
    "name": "Elevação Frontal Alternada Com Halteres",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Frontal Alternada Com Halteres. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação Frontal Alternada Com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Frontal Alternada Com Halteres"
  },
  {
    "id": "elevacao_pelvica_com_banda_de_resistencia",
    "name": "Elevação Pélvica com Banda de Resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Pélvica com Banda de Resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação Pélvica com Banda de Resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Pélvica com Banda de Resistência"
  },
  {
    "id": "elevacao_lateral_de_perna_com_faixa_elastica",
    "name": "Elevação Lateral de Perna com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Lateral de Perna com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação Lateral de Perna com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Lateral de Perna com Faixa Elástica"
  },
  {
    "id": "dumbbell_power_clean",
    "name": "Dumbbell Power Clean",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Dumbbell Power Clean. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Dumbbell Power Clean foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Dumbbell Power Clean"
  },
  {
    "id": "dips_de_escapula",
    "name": "Dips de escápula",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Dips de escápula. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Dips de escápula foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Dips de escápula"
  },
  {
    "id": "elevacao_lateral_de_perna_com_faixa_elastica_deitado_de_lado",
    "name": "Elevação Lateral de Perna com Faixa Elástica Deitado de Lado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Lateral de Perna com Faixa Elástica Deitado de Lado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação Lateral de Perna com Faixa Elástica Deitado de Lado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Lateral de Perna com Faixa Elástica Deitado de Lado"
  },
  {
    "id": "dorsiflexao_plantar",
    "name": "Dorsiflexão plantar",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Dorsiflexão plantar. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Dorsiflexão plantar foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Dorsiflexão plantar"
  },
  {
    "id": "elevacao_pelvica_na_maquina",
    "name": "Elevação Pélvica Na Máquina",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Pélvica Na Máquina. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Elevação Pélvica Na Máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Pélvica Na Máquina"
  },
  {
    "id": "dumbbell_raise",
    "name": "Dumbbell-Raise",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Dumbbell-Raise. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Dumbbell-Raise foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Dumbbell-Raise"
  },
  {
    "id": "elevacao_pelvica_declinado",
    "name": "Elevação Pélvica Declinado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Pélvica Declinado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação Pélvica Declinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Pélvica Declinado"
  },
  {
    "id": "elevacao_pelvica_na_maquina_smith",
    "name": "Elevação Pélvica na Máquina Smith",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Pélvica na Máquina Smith. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Elevação Pélvica na Máquina Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Pélvica na Máquina Smith"
  },
  {
    "id": "elevacao_unilateral_de_panturrilha_no_leg_press",
    "name": "Elevação Unilateral de Panturrilha no Leg Press",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Unilateral de Panturrilha no Leg Press. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação Unilateral de Panturrilha no Leg Press foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Unilateral de Panturrilha no Leg Press"
  },
  {
    "id": "elevacao_pelvica_com_barra_declinado",
    "name": "Elevação Pélvica Com Barra Declinado",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Pélvica Com Barra Declinado. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Elevação Pélvica Com Barra Declinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Pélvica Com Barra Declinado"
  },
  {
    "id": "dumbbell_devil_press",
    "name": "Dumbbell Devil Press",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Dumbbell Devil Press. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Dumbbell Devil Press foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Dumbbell Devil Press"
  },
  {
    "id": "elevacao_pelvica_unilateral_com_barra",
    "name": "Elevação Pélvica Unilateral Com Barra",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Pélvica Unilateral Com Barra. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Elevação Pélvica Unilateral Com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Pélvica Unilateral Com Barra"
  },
  {
    "id": "elevacao_pelvica_na_maquina_de_extensao_de_pernas",
    "name": "Elevação Pélvica na Máquina de Extensão de Pernas",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Pélvica na Máquina de Extensão de Pernas. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Elevação Pélvica na Máquina de Extensão de Pernas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Pélvica na Máquina de Extensão de Pernas"
  },
  {
    "id": "dips_na_cadeira",
    "name": "Dips na cadeira",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Dips na cadeira. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Dips na cadeira foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Dips na cadeira"
  },
  {
    "id": "elevacao_posterior_unilateral_com_halteres_em_decubito_prono",
    "name": "Elevação Posterior unilateral com halteres em Decúbito Prono",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Posterior unilateral com halteres em Decúbito Prono. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação Posterior unilateral com halteres em Decúbito Prono foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Posterior unilateral com halteres em Decúbito Prono"
  },
  {
    "id": "elevacao_pelvica_com_barra",
    "name": "Elevação Pélvica Com Barra",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação Pélvica Com Barra. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Elevação Pélvica Com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação Pélvica Com Barra"
  },
  {
    "id": "elevacao_com_giro_do_cotovelo_oposto_para_o_joelho",
    "name": "Elevação com Giro do Cotovelo Oposto para o Joelho",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação com Giro do Cotovelo Oposto para o Joelho. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação com Giro do Cotovelo Oposto para o Joelho foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação com Giro do Cotovelo Oposto para o Joelho"
  },
  {
    "id": "elevacao_de_panturrilha_no_leg_press_horizontal",
    "name": "Elevação de Panturrilha no Leg Press horizontal",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilha no Leg Press horizontal. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação de Panturrilha no Leg Press horizontal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilha no Leg Press horizontal"
  },
  {
    "id": "elevacao_de_panturrilhas",
    "name": "Elevação de Panturrilhas",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilhas. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação de Panturrilhas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilhas"
  },
  {
    "id": "elevacao_de_perna_reta_em_pe_com_faixa_de_resistencia",
    "name": "Elevação de Perna Reta em Pé com Faixa de Resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Perna Reta em Pé com Faixa de Resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação de Perna Reta em Pé com Faixa de Resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Perna Reta em Pé com Faixa de Resistência"
  },
  {
    "id": "elevacao_da_perna_em_pe_com_faixa_elastica_de_resistencia",
    "name": "Elevação da Perna em Pé com Faixa Elástica de Resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação da Perna em Pé com Faixa Elástica de Resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação da Perna em Pé com Faixa Elástica de Resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação da Perna em Pé com Faixa Elástica de Resistência"
  },
  {
    "id": "elevacao_de_panturrilhas_no_hack",
    "name": "Elevação de Panturrilhas no Hack",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilhas no Hack. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação de Panturrilhas no Hack foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilhas no Hack"
  },
  {
    "id": "elevacao_de_panturrilha_sentado_com_alavanca",
    "name": "Elevação de Panturrilha Sentado com Alavanca",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilha Sentado com Alavanca. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação de Panturrilha Sentado com Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilha Sentado com Alavanca"
  },
  {
    "id": "elevacao_de_deltoide_posterior_com_halteres_inclinado",
    "name": "Elevação de Deltoide Posterior com Halteres Inclinado",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Deltoide Posterior com Halteres Inclinado. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Elevação de Deltoide Posterior com Halteres Inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Deltoide Posterior com Halteres Inclinado"
  },
  {
    "id": "elevacao_de_panturrilha_com_uma_perna_na_maquina_hack",
    "name": "Elevação de Panturrilha com Uma Perna na Máquina Hack",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilha com Uma Perna na Máquina Hack. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação de Panturrilha com Uma Perna na Máquina Hack foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilha com Uma Perna na Máquina Hack"
  },
  {
    "id": "elevacao_de_deltoide_em_y_com_halteres_inclinado",
    "name": "Elevação de Deltoide em Y com Halteres Inclinado",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Deltoide em Y com Halteres Inclinado. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Elevação de Deltoide em Y com Halteres Inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Deltoide em Y com Halteres Inclinado"
  },
  {
    "id": "elevacao_de_panturrilha_com_faixa_elastica_de_resistencia",
    "name": "Elevação de Panturrilha com Faixa Elástica de Resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilha com Faixa Elástica de Resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação de Panturrilha com Faixa Elástica de Resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilha com Faixa Elástica de Resistência"
  },
  {
    "id": "elevacao_de_panturrilha_no_smith",
    "name": "Elevação de Panturrilha no Smith",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilha no Smith. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação de Panturrilha no Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilha no Smith"
  },
  {
    "id": "elevacao_de_panturrilha_no_leg_press",
    "name": "Elevação de Panturrilha no Leg Press",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilha no Leg Press. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação de Panturrilha no Leg Press foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilha no Leg Press"
  },
  {
    "id": "elevacao_de_panturrilha_em_uma_perna",
    "name": "Elevação de Panturrilha em Uma Perna",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilha em Uma Perna. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação de Panturrilha em Uma Perna foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilha em Uma Perna"
  },
  {
    "id": "elevacao_de_panturrilha_em_maquina_em_pe",
    "name": "Elevação de Panturrilha em Máquina em pé",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilha em Máquina em pé. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação de Panturrilha em Máquina em pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilha em Máquina em pé"
  },
  {
    "id": "elevacao_de_panturrilha_sentado_com_peso",
    "name": "Elevação de Panturrilha Sentado com Peso",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilha Sentado com Peso. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação de Panturrilha Sentado com Peso foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilha Sentado com Peso"
  },
  {
    "id": "elevacao_de_panturrilha_sentado_com_barra",
    "name": "Elevação de Panturrilha Sentado com Barra",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilha Sentado com Barra. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação de Panturrilha Sentado com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilha Sentado com Barra"
  },
  {
    "id": "elevacao_de_joelho_com_halteres",
    "name": "Elevação de Joelho com Halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Joelho com Halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Elevação de Joelho com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Joelho com Halteres"
  },
  {
    "id": "elevacao_de_panturrilha_com_barra_em_pe",
    "name": "Elevação de Panturrilha com Barra em Pé",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilha com Barra em Pé. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação de Panturrilha com Barra em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilha com Barra em Pé"
  },
  {
    "id": "elevacao_de_panturrilha_na_maquina",
    "name": "Elevação de Panturrilha na Máquina",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Panturrilha na Máquina. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Elevação de Panturrilha na Máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Panturrilha na Máquina"
  },
  {
    "id": "elevacao_frontal_com_barra_girando",
    "name": "Elevação frontal com barra girando",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação frontal com barra girando. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação frontal com barra girando foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação frontal com barra girando"
  },
  {
    "id": "elevacao_frontal_com_dois_bracos_com_halteres",
    "name": "Elevação frontal com dois braços com halteres",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação frontal com dois braços com halteres. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação frontal com dois braços com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação frontal com dois braços com halteres"
  },
  {
    "id": "elevacao_frontal_com_halteres",
    "name": "Elevação frontal com halteres",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação frontal com halteres. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação frontal com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação frontal com halteres"
  },
  {
    "id": "elevacao_lateral_alternada_com_halteres",
    "name": "Elevação lateral alternada com halteres",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral alternada com halteres. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral alternada com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral alternada com halteres"
  },
  {
    "id": "elevacao_de_quadril_com_banda_de_resistencia_de_joelhos",
    "name": "Elevação de Quadril com Banda de Resistência de Joelhos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Quadril com Banda de Resistência de Joelhos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação de Quadril com Banda de Resistência de Joelhos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Quadril com Banda de Resistência de Joelhos"
  },
  {
    "id": "elevacao_frontal_com_barra_w_inclinada",
    "name": "Elevação frontal com barra w inclinada",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação frontal com barra w inclinada. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação frontal com barra w inclinada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação frontal com barra w inclinada"
  },
  {
    "id": "elevacao_lateral_com_halteres_com_apoio_no_peito",
    "name": "Elevação lateral com halteres com apoio no peito",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral com halteres com apoio no peito. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral com halteres com apoio no peito foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral com halteres com apoio no peito"
  },
  {
    "id": "elevacao_frontal_lateral_com_elastico",
    "name": "Elevação frontal lateral com elástico",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação frontal lateral com elástico. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação frontal lateral com elástico foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação frontal lateral com elástico"
  },
  {
    "id": "elevacao_de_quadril_com_peso_corporal",
    "name": "Elevação de Quadril com Peso Corporal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Quadril com Peso Corporal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação de Quadril com Peso Corporal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Quadril com Peso Corporal"
  },
  {
    "id": "elevacao_frontal_com_halteres_sentado",
    "name": "Elevação frontal com halteres sentado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação frontal com halteres sentado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação frontal com halteres sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação frontal com halteres sentado"
  },
  {
    "id": "elevacao_de_t_com_halteres_inclinada",
    "name": "Elevação de T com Halteres Inclinada",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de T com Halteres Inclinada. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Elevação de T com Halteres Inclinada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de T com Halteres Inclinada"
  },
  {
    "id": "elevacao_de_panturrilha_em_pe",
    "name": "Elevação de panturrilha em pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de panturrilha em pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação de panturrilha em pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de panturrilha em pé"
  },
  {
    "id": "elevacao_de_pernas_deitado_de_lado",
    "name": "Elevação de Pernas deitado de Lado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Pernas deitado de Lado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação de Pernas deitado de Lado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Pernas deitado de Lado"
  },
  {
    "id": "elevacao_de_pernas_estilo_sapo",
    "name": "Elevação de Pernas estilo Sapo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Pernas estilo Sapo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação de Pernas estilo Sapo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Pernas estilo Sapo"
  },
  {
    "id": "elevacao_de_perna_em_pe_com_alavanca",
    "name": "Elevação de Perna em Pé com Alavanca",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Perna em Pé com Alavanca. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Elevação de Perna em Pé com Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Perna em Pé com Alavanca"
  },
  {
    "id": "elevacao_de_perna_unica_com_equilibrio_e_rosca_de_biceps",
    "name": "Elevação de Perna Única com Equilíbrio e Rosca de Bíceps",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação de Perna Única com Equilíbrio e Rosca de Bíceps. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação de Perna Única com Equilíbrio e Rosca de Bíceps foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação de Perna Única com Equilíbrio e Rosca de Bíceps"
  },
  {
    "id": "elevacao_lateral_com_braco_flexionado",
    "name": "Elevação lateral com braço flexionado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral com braço flexionado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral com braço flexionado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral com braço flexionado"
  },
  {
    "id": "elevacao_lateral_com_barra_no_chao",
    "name": "Elevação lateral com barra no chão",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral com barra no chão. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral com barra no chão foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral com barra no chão"
  },
  {
    "id": "elevacao_lateral_com_halteres_sentado",
    "name": "Elevação lateral com halteres sentado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral com halteres sentado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral com halteres sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral com halteres sentado"
  },
  {
    "id": "elevacao_lateral_com_halteres_para_deltoides_posteriores_deitado",
    "name": "Elevação lateral com halteres para deltoides posteriores deitado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral com halteres para deltoides posteriores deitado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral com halteres para deltoides posteriores deitado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral com halteres para deltoides posteriores deitado"
  },
  {
    "id": "elevacao_lateral_de_bracos_com_cabo",
    "name": "Elevação lateral de braços com cabo",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral de braços com cabo. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral de braços com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral de braços com cabo"
  },
  {
    "id": "elevacao_lateral_cruzada_no_crossover",
    "name": "Elevação lateral cruzada no crossover",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral cruzada no crossover. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral cruzada no crossover foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral cruzada no crossover"
  },
  {
    "id": "elevacao_lateral_de_bracos_com_halteres",
    "name": "Elevação lateral de braços com halteres",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral de braços com halteres. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral de braços com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral de braços com halteres"
  },
  {
    "id": "elevacoes_de_ombros_na_paralela",
    "name": "Elevações de ombros na paralela",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevações de ombros na paralela. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevações de ombros na paralela foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevações de ombros na paralela"
  },
  {
    "id": "elevacao_lateral_deitado",
    "name": "Elevação lateral deitado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral deitado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral deitado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral deitado"
  },
  {
    "id": "elevacao_lateral_unilateral_com_cabo",
    "name": "Elevação lateral unilateral com cabo",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral unilateral com cabo. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral unilateral com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral unilateral com cabo"
  },
  {
    "id": "elevacao_lateral_na_maquina",
    "name": "Elevação lateral na máquina",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral na máquina. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral na máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral na máquina"
  },
  {
    "id": "encolhimento_inclinado_pronado",
    "name": "Encolhimento Inclinado Pronado",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Encolhimento Inclinado Pronado. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Encolhimento Inclinado Pronado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Encolhimento Inclinado Pronado"
  },
  {
    "id": "elevacao_lateral_de_halteres_inclinada",
    "name": "Elevação lateral de halteres inclinada",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral de halteres inclinada. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral de halteres inclinada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral de halteres inclinada"
  },
  {
    "id": "elevacoes_frontais_com_halteres_apoiadas_no_peito",
    "name": "Elevações frontais com halteres apoiadas no peito",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevações frontais com halteres apoiadas no peito. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevações frontais com halteres apoiadas no peito foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevações frontais com halteres apoiadas no peito"
  },
  {
    "id": "elevacao_lateral_e_frontal_com_halteres",
    "name": "Elevação lateral e frontal com halteres",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral e frontal com halteres. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral e frontal com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral e frontal com halteres"
  },
  {
    "id": "elevacao_lateral_unilateral_com_halteres",
    "name": "Elevação lateral unilateral com halteres",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral unilateral com halteres. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral unilateral com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral unilateral com halteres"
  },
  {
    "id": "encolhimento_acima_da_cabeca",
    "name": "Encolhimento Acima da Cabeça",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Encolhimento Acima da Cabeça. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Encolhimento Acima da Cabeça foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Encolhimento Acima da Cabeça"
  },
  {
    "id": "encolhimento_sentado_de_gittleson_com_halteres",
    "name": "Encolhimento Sentado de Gittleson com Halteres",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Encolhimento Sentado de Gittleson com Halteres. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Encolhimento Sentado de Gittleson com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Encolhimento Sentado de Gittleson com Halteres"
  },
  {
    "id": "elevacao_lateral_com_toalha_na_parede",
    "name": "Elevação lateral com toalha na parede",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral com toalha na parede. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação lateral com toalha na parede foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral com toalha na parede"
  },
  {
    "id": "elevacao_lateral_de_deltoide_posterior_com_halteres",
    "name": "Elevação lateral de deltóide posterior com halteres",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral de deltóide posterior com halteres. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação lateral de deltóide posterior com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral de deltóide posterior com halteres"
  },
  {
    "id": "elevacao_lateral_unilateral_com_haltere_inclinado",
    "name": "Elevação lateral unilateral com haltere inclinado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral unilateral com haltere inclinado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral unilateral com haltere inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral unilateral com haltere inclinado"
  },
  {
    "id": "elevacao_lateral_tronco_inclinado",
    "name": "Elevação lateral tronco inclinado",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral tronco inclinado. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Elevação lateral tronco inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral tronco inclinado"
  },
  {
    "id": "elevacao_lateral_com_tronco_inclinado",
    "name": "Elevação lateral com tronco inclinado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral com tronco inclinado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Elevação lateral com tronco inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral com tronco inclinado"
  },
  {
    "id": "elevacao_lateral_de_bracos",
    "name": "Elevação lateral de braços",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Elevação lateral de braços. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Elevação lateral de braços foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Elevação lateral de braços"
  },
  {
    "id": "encolhimento_com_cabo",
    "name": "Encolhimento com Cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Encolhimento com Cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Encolhimento com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Encolhimento com Cabo"
  },
  {
    "id": "encolhimento_com_halteres",
    "name": "Encolhimento com Halteres",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Encolhimento com Halteres. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Encolhimento com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Encolhimento com Halteres"
  },
  {
    "id": "esteira_ergometrica",
    "name": "Esteira Ergométrica",
    "targetMuscles": [
      "Cardio"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Esteira Ergométrica. Exercício focado principalmente em trabalhar cardio.",
    "instructions": "O exercício Esteira Ergométrica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Esteira Ergométrica"
  },
  {
    "id": "escalador_de_montanha",
    "name": "Escalador de Montanha",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Escalador de Montanha. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Escalador de Montanha foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Escalador de Montanha"
  },
  {
    "id": "exercicios_de_escada_de_agilidade_lateral",
    "name": "Exercícios de escada de agilidade lateral",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Exercícios de escada de agilidade lateral. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Exercícios de escada de agilidade lateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Exercícios de escada de agilidade lateral"
  },
  {
    "id": "encolhimento_de_barra_atras_das_costas",
    "name": "Encolhimento de Barra Atrás das Costas",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Encolhimento de Barra Atrás das Costas. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Encolhimento de Barra Atrás das Costas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Encolhimento de Barra Atrás das Costas"
  },
  {
    "id": "encolhimento_com_halteres_em_declive",
    "name": "Encolhimento com Halteres em Declive",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Encolhimento com Halteres em Declive. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Encolhimento com Halteres em Declive foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Encolhimento com Halteres em Declive"
  },
  {
    "id": "encolhimento_de_ombros_por_tras_com_barra",
    "name": "Encolhimento de ombros por trás com barra",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Encolhimento de ombros por trás com barra. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Encolhimento de ombros por trás com barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Encolhimento de ombros por trás com barra"
  },
  {
    "id": "encolhimento_de_ombros_na_maquina_smith",
    "name": "Encolhimento de Ombros na Máquina Smith",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Encolhimento de Ombros na Máquina Smith. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Encolhimento de Ombros na Máquina Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Encolhimento de Ombros na Máquina Smith"
  },
  {
    "id": "encolhimento_com_alavanca",
    "name": "Encolhimento com Alavanca",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Encolhimento com Alavanca. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Encolhimento com Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Encolhimento com Alavanca"
  },
  {
    "id": "exercicios_de_escada_de_agilidade",
    "name": "Exercícios de Escada de Agilidade",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Exercícios de Escada de Agilidade. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Exercícios de Escada de Agilidade foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Exercícios de Escada de Agilidade"
  },
  {
    "id": "extensao_concentrada_com_cabo_no_joelho",
    "name": "Extensão Concentrada com Cabo no Joelho",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão Concentrada com Cabo no Joelho. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão Concentrada com Cabo no Joelho foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão Concentrada com Cabo no Joelho"
  },
  {
    "id": "exercicio_de_bailarina_sentada",
    "name": "Exercício de bailarina sentada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Exercício de bailarina sentada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Exercício de bailarina sentada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Exercício de bailarina sentada"
  },
  {
    "id": "encolhimento_de_barra",
    "name": "Encolhimento de Barra",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Encolhimento de Barra. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Encolhimento de Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Encolhimento de Barra"
  },
  {
    "id": "exercicio_de_retracao_escapular_sentada",
    "name": "Exercício de retração escapular sentada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Exercício de retração escapular sentada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Exercício de retração escapular sentada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Exercício de retração escapular sentada"
  },
  {
    "id": "exercicios_das_5_marcas",
    "name": "Exercícios das 5 Marcas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Exercícios das 5 Marcas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Exercícios das 5 Marcas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Exercícios das 5 Marcas"
  },
  {
    "id": "encolhimento_na_maquina",
    "name": "Encolhimento na máquina",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Encolhimento na máquina. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Encolhimento na máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Encolhimento na máquina"
  },
  {
    "id": "esteira_com_inclinacao",
    "name": "Esteira com Inclinação",
    "targetMuscles": [
      "Cardio"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Esteira com Inclinação. Exercício focado principalmente em trabalhar cardio.",
    "instructions": "O exercício Esteira com Inclinação foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Esteira com Inclinação"
  },
  {
    "id": "exercicio_pliometrico_x",
    "name": "Exercício Pliométrico X",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Exercício Pliométrico X. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Exercício Pliométrico X foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Exercício Pliométrico X"
  },
  {
    "id": "esquiador_com_gymstick",
    "name": "Esquiador com gymstick",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Esquiador com gymstick. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Esquiador com gymstick foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Esquiador com gymstick"
  },
  {
    "id": "extensao_de_triceps_com_uma_mao_no_pulley_alto_sobre_a_cabeca",
    "name": "Extensão de Tríceps com Uma Mão no Pulley Alto Sobre a Cabeça",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Tríceps com Uma Mão no Pulley Alto Sobre a Cabeça. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de Tríceps com Uma Mão no Pulley Alto Sobre a Cabeça foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Tríceps com Uma Mão no Pulley Alto Sobre a Cabeça"
  },
  {
    "id": "extensao_de_pernas_com_faixa_elastica_sentado",
    "name": "Extensão de Pernas com Faixa Elástica Sentado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Pernas com Faixa Elástica Sentado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Extensão de Pernas com Faixa Elástica Sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Pernas com Faixa Elástica Sentado"
  },
  {
    "id": "extensao_de_perna_em_pe_com_faixa_de_resistencia",
    "name": "Extensão de Perna em Pé com Faixa de Resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Perna em Pé com Faixa de Resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Extensão de Perna em Pé com Faixa de Resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Perna em Pé com Faixa de Resistência"
  },
  {
    "id": "extensao_de_quadril_no_banco",
    "name": "Extensão de Quadril no Banco",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Quadril no Banco. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Extensão de Quadril no Banco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Quadril no Banco"
  },
  {
    "id": "extensao_de_quadril_em_pe_com_alavanca",
    "name": "Extensão de Quadril em Pé com Alavanca",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Quadril em Pé com Alavanca. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Extensão de Quadril em Pé com Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Quadril em Pé com Alavanca"
  },
  {
    "id": "extensao_de_quadril_com_cabo",
    "name": "Extensão de Quadril com Cabo",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Quadril com Cabo. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Extensão de Quadril com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Quadril com Cabo"
  },
  {
    "id": "extensao_lombar_com_peso",
    "name": "Extensão Lombar com Peso",
    "targetMuscles": [
      "Posterior"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão Lombar com Peso. Exercício focado principalmente em trabalhar posterior.",
    "instructions": "O exercício Extensão Lombar com Peso foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão Lombar com Peso"
  },
  {
    "id": "extensao_de_perna_reta",
    "name": "Extensão De Perna Reta",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão De Perna Reta. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Extensão De Perna Reta foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão De Perna Reta"
  },
  {
    "id": "extensao_de_triceps_com_cabo_em_posicao_ajoelhada",
    "name": "Extensão de Tríceps com Cabo em Posição Ajoelhada",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Tríceps com Cabo em Posição Ajoelhada. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de Tríceps com Cabo em Posição Ajoelhada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Tríceps com Cabo em Posição Ajoelhada"
  },
  {
    "id": "extensao_de_triceps_acima_da_cabeca_com_gymstick",
    "name": "Extensão de Tríceps Acima da Cabeça com Gymstick",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Tríceps Acima da Cabeça com Gymstick. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Extensão de Tríceps Acima da Cabeça com Gymstick foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Tríceps Acima da Cabeça com Gymstick"
  },
  {
    "id": "extensao_de_perna_na_maquina_smith_reversa",
    "name": "Extensão de Perna na Máquina Smith Reversa",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Perna na Máquina Smith Reversa. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Extensão de Perna na Máquina Smith Reversa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Perna na Máquina Smith Reversa"
  },
  {
    "id": "extensao_de_triceps_com_cabos_cruzados",
    "name": "Extensão de Tríceps com Cabos Cruzados",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Tríceps com Cabos Cruzados. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de Tríceps com Cabos Cruzados foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Tríceps com Cabos Cruzados"
  },
  {
    "id": "extensao_de_triceps_com_faixa_elastica",
    "name": "Extensão de Tríceps com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Tríceps com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Extensão de Tríceps com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Tríceps com Faixa Elástica"
  },
  {
    "id": "extensao_de_triceps_com_faixas_elasticas",
    "name": "Extensão de Tríceps com Faixas Elásticas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Tríceps com Faixas Elásticas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Extensão de Tríceps com Faixas Elásticas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Tríceps com Faixas Elásticas"
  },
  {
    "id": "extensao_de_perna_unilateral",
    "name": "Extensão de Perna Unilateral",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Perna Unilateral. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Extensão de Perna Unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Perna Unilateral"
  },
  {
    "id": "extensao_de_triceps_testa_declinado_fechado",
    "name": "Extensão de Tríceps Testa Declinado Fechado",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Tríceps Testa Declinado Fechado. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de Tríceps Testa Declinado Fechado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Tríceps Testa Declinado Fechado"
  },
  {
    "id": "extensao_de_gluteo_em_pe",
    "name": "Extensão De Glúteo Em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão De Glúteo Em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Extensão De Glúteo Em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão De Glúteo Em Pé"
  },
  {
    "id": "extensao_de_triceps_invertida_com_unilateral",
    "name": "Extensão de Tríceps Invertida com unilateral",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Tríceps Invertida com unilateral. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de Tríceps Invertida com unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Tríceps Invertida com unilateral"
  },
  {
    "id": "extensao_de_pernas_sentado_com_faixa_de_resistencia",
    "name": "Extensão de Pernas Sentado com Faixa de Resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Pernas Sentado com Faixa de Resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Extensão de Pernas Sentado com Faixa de Resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Pernas Sentado com Faixa de Resistência"
  },
  {
    "id": "extensao_de_triceps_com_deitado_com_barra",
    "name": "Extensão de Tríceps com deitado com Barra",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Tríceps com deitado com Barra. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de Tríceps com deitado com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Tríceps com deitado com Barra"
  },
  {
    "id": "extensao_de_triceps_com_elastico_na_posicao_horizontal",
    "name": "Extensão de tríceps com elástico na posição horizontal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps com elástico na posição horizontal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Extensão de tríceps com elástico na posição horizontal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps com elástico na posição horizontal"
  },
  {
    "id": "extensao_de_triceps_no_cabo_alto",
    "name": "Extensão de tríceps no cabo alto",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps no cabo alto. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps no cabo alto foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps no cabo alto"
  },
  {
    "id": "extensao_de_triceps_com_barra_w_inclinada",
    "name": "Extensão de tríceps com barra W inclinada",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps com barra W inclinada. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps com barra W inclinada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps com barra W inclinada"
  },
  {
    "id": "extensao_de_triceps_com_pegada_invertida",
    "name": "Extensão de tríceps com pegada invertida",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps com pegada invertida. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps com pegada invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps com pegada invertida"
  },
  {
    "id": "extensao_de_triceps_com_cabo_inclinado",
    "name": "Extensão de tríceps com cabo inclinado",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps com cabo inclinado. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps com cabo inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps com cabo inclinado"
  },
  {
    "id": "extensao_de_triceps_deitado_com_barra_w_pegada_fechada_atras_da_cabeca",
    "name": "Extensão de Tríceps deitado com Barra W Pegada Fechada atrás da Cabeça",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Tríceps deitado com Barra W Pegada Fechada atrás da Cabeça. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de Tríceps deitado com Barra W Pegada Fechada atrás da Cabeça foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Tríceps deitado com Barra W Pegada Fechada atrás da Cabeça"
  },
  {
    "id": "extensao_de_triceps_com_barra_em_pe",
    "name": "Extensão de tríceps com barra em pé",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps com barra em pé. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps com barra em pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps com barra em pé"
  },
  {
    "id": "extensao_de_triceps_lateral_com_cabo",
    "name": "Extensão de tríceps lateral com cabo",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps lateral com cabo. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps lateral com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps lateral com cabo"
  },
  {
    "id": "extensao_de_ombro_com_faixa",
    "name": "Extensão de ombro com faixa",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de ombro com faixa. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Extensão de ombro com faixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de ombro com faixa"
  },
  {
    "id": "extensao_de_triceps_com_cabo_na_posicao_horizontal",
    "name": "Extensão de tríceps com cabo na posição horizontal",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps com cabo na posição horizontal. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps com cabo na posição horizontal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps com cabo na posição horizontal"
  },
  {
    "id": "extensao_de_triceps_na_maquina",
    "name": "Extensão de tríceps na máquina",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps na máquina. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps na máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps na máquina"
  },
  {
    "id": "extensao_de_triceps_com_um_braco",
    "name": "Extensão de tríceps com um braço",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps com um braço. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps com um braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps com um braço"
  },
  {
    "id": "extensao_de_triceps_com_cabo_ajoelhado",
    "name": "Extensão de tríceps com cabo ajoelhado",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps com cabo ajoelhado. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps com cabo ajoelhado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps com cabo ajoelhado"
  },
  {
    "id": "extensao_de_triceps_com_barra_atras_da_cabeca",
    "name": "Extensão de tríceps com barra atrás da cabeça",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps com barra atrás da cabeça. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps com barra atrás da cabeça foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps com barra atrás da cabeça"
  },
  {
    "id": "extensao_de_triceps_no_cabo_deitado",
    "name": "Extensão de tríceps no cabo deitado",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps no cabo deitado. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps no cabo deitado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps no cabo deitado"
  },
  {
    "id": "extensao_de_triceps_na_maquina_pegada_neutra",
    "name": "Extensão de tríceps na máquina pegada neutra",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps na máquina pegada neutra. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps na máquina pegada neutra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps na máquina pegada neutra"
  },
  {
    "id": "extensao_de_triceps_com_haltere_em_pronacao_com_um_braco",
    "name": "Extensão de tríceps com haltere em pronação com um braço",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps com haltere em pronação com um braço. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps com haltere em pronação com um braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps com haltere em pronação com um braço"
  },
  {
    "id": "extensao_de_triceps_deitado_com_corda",
    "name": "Extensão de Tríceps deitado com Corda",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de Tríceps deitado com Corda. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de Tríceps deitado com Corda foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de Tríceps deitado com Corda"
  },
  {
    "id": "extensao_de_triceps_com_haltere_unilateral_sentado",
    "name": "Extensão de tríceps com haltere unilateral sentado",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps com haltere unilateral sentado. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Extensão de tríceps com haltere unilateral sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps com haltere unilateral sentado"
  },
  {
    "id": "extensao_de_triceps",
    "name": "Extensão de tríceps",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão de tríceps. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Extensão de tríceps foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão de tríceps"
  },
  {
    "id": "flexao_nordica_2",
    "name": "Flexão Nórdica (2)",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão Nórdica (2). Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Flexão Nórdica (2) foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão Nórdica (2)"
  },
  {
    "id": "flexao_nordica",
    "name": "Flexão Nórdica",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão Nórdica. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Flexão Nórdica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão Nórdica"
  },
  {
    "id": "flexao_declinada",
    "name": "Flexão Declinada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão Declinada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão Declinada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão Declinada"
  },
  {
    "id": "flexao_com_cruzamento_dos_bracos",
    "name": "Flexão com Cruzamento dos Braços",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão com Cruzamento dos Braços. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão com Cruzamento dos Braços foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão com Cruzamento dos Braços"
  },
  {
    "id": "flexao_invertida",
    "name": "Flexão Invertida",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão Invertida. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão Invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão Invertida"
  },
  {
    "id": "flexao_de_braco_declinada_com_bola_de_estabilidade",
    "name": "Flexão de Braço Declinada com Bola de Estabilidade",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Braço Declinada com Bola de Estabilidade. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Braço Declinada com Bola de Estabilidade foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braço Declinada com Bola de Estabilidade"
  },
  {
    "id": "flexao",
    "name": "Flexão",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão"
  },
  {
    "id": "flexao_com_parada_de_maos",
    "name": "Flexão com parada de mãos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão com parada de mãos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão com parada de mãos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão com parada de mãos"
  },
  {
    "id": "flexao_com_barras_de_apoio",
    "name": "Flexão com barras de apoio",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão com barras de apoio. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão com barras de apoio foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão com barras de apoio"
  },
  {
    "id": "flexao_fechada_com_bola_medicinal",
    "name": "Flexão Fechada com bola medicinal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão Fechada com bola medicinal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão Fechada com bola medicinal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão Fechada com bola medicinal"
  },
  {
    "id": "flexao_com_um_braco",
    "name": "Flexão com um braço",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão com um braço. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão com um braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão com um braço"
  },
  {
    "id": "flexao_cobra",
    "name": "Flexão cobra",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão cobra. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão cobra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão cobra"
  },
  {
    "id": "flexao_com_rotacao",
    "name": "Flexão com Rotação",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão com Rotação. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão com Rotação foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão com Rotação"
  },
  {
    "id": "flexao_com_peso",
    "name": "Flexão com peso",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão com peso. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão com peso foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão com peso"
  },
  {
    "id": "flexao_com_toque_no_peito",
    "name": "Flexão com Toque no Peito",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão com Toque no Peito. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão com Toque no Peito foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão com Toque no Peito"
  },
  {
    "id": "flexao_alternada_de_ombro",
    "name": "Flexão alternada de ombro",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão alternada de ombro. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão alternada de ombro foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão alternada de ombro"
  },
  {
    "id": "flexao_com_toque_nos_dedos_dos_pes",
    "name": "Flexão com Toque nos Dedos dos Pés",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão com Toque nos Dedos dos Pés. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão com Toque nos Dedos dos Pés foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão com Toque nos Dedos dos Pés"
  },
  {
    "id": "flexao_com_kettlebell_profunda",
    "name": "Flexão com kettlebell profunda",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão com kettlebell profunda. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão com kettlebell profunda foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão com kettlebell profunda"
  },
  {
    "id": "face_pull",
    "name": "Face Pull",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Face Pull. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Face Pull foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Face Pull"
  },
  {
    "id": "extensao_lombar_sentada",
    "name": "Extensão lombar sentada",
    "targetMuscles": [
      "Posterior"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Extensão lombar sentada. Exercício focado principalmente em trabalhar posterior.",
    "instructions": "O exercício Extensão lombar sentada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Extensão lombar sentada"
  },
  {
    "id": "flexao_de_bracos_com_apoio_dos_joelhos_fechada",
    "name": "Flexão de Braços com Apoio dos Joelhos Fechada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Braços com Apoio dos Joelhos Fechada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Braços com Apoio dos Joelhos Fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Apoio dos Joelhos Fechada"
  },
  {
    "id": "flexao_de_pernas_com_halteres_declinado",
    "name": "Flexão de Pernas com Halteres Declinado",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Pernas com Halteres Declinado. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Flexão de Pernas com Halteres Declinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Pernas com Halteres Declinado"
  },
  {
    "id": "flexao_de_braco_na_parede_com_pegada_fechada",
    "name": "Flexão de Braço na Parede com Pegada Fechada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Braço na Parede com Pegada Fechada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Braço na Parede com Pegada Fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braço na Parede com Pegada Fechada"
  },
  {
    "id": "flexao_de_pernas_deitado_com_faixa_elastica",
    "name": "Flexão de Pernas deitado com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Pernas deitado com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Pernas deitado com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Pernas deitado com Faixa Elástica"
  },
  {
    "id": "flexao_de_parede",
    "name": "Flexão de Parede",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Parede. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Parede foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Parede"
  },
  {
    "id": "flexao_de_braco_no_bosu",
    "name": "Flexão de Braço no Bosu",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Braço no Bosu. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Braço no Bosu foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braço no Bosu"
  },
  {
    "id": "flexao_de_bracos_com_toque_no_ombro",
    "name": "Flexão de Braços com Toque no Ombro",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Braços com Toque no Ombro. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Braços com Toque no Ombro foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braços com Toque no Ombro"
  },
  {
    "id": "flexao_de_dedos",
    "name": "Flexão de Dedos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Dedos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Dedos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Dedos"
  },
  {
    "id": "flexao_de_braco_com_bola_medicinal_em_um_braco",
    "name": "Flexão de Braço com Bola Medicinal em Um Braço",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Braço com Bola Medicinal em Um Braço. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Braço com Bola Medicinal em Um Braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braço com Bola Medicinal em Um Braço"
  },
  {
    "id": "flexao_de_cotovelos_na_barra",
    "name": "Flexão de Cotovelos na Barra",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Cotovelos na Barra. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Cotovelos na Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Cotovelos na Barra"
  },
  {
    "id": "flexao_de_peito_com_trx",
    "name": "Flexão de Peito com TRX",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Peito com TRX. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Peito com TRX foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Peito com TRX"
  },
  {
    "id": "flexao_de_perna_com_halteres_em_decubito_dorsal",
    "name": "Flexão de Perna com Halteres em Decúbito Dorsal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Perna com Halteres em Decúbito Dorsal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Perna com Halteres em Decúbito Dorsal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Perna com Halteres em Decúbito Dorsal"
  },
  {
    "id": "flexao_de_pernas_com_faixa_elastica",
    "name": "Flexão de Pernas com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Pernas com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Pernas com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Pernas com Faixa Elástica"
  },
  {
    "id": "flexao_de_braco_com_bola_de_estabilidade",
    "name": "Flexão de Braço com Bola de Estabilidade",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Braço com Bola de Estabilidade. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Braço com Bola de Estabilidade foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braço com Bola de Estabilidade"
  },
  {
    "id": "flexao_de_braco_com_bola_medicinal_com_apoio_em_um_braco",
    "name": "Flexão de Braço com Bola Medicinal com Apoio em Um Braço",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Braço com Bola Medicinal com Apoio em Um Braço. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Braço com Bola Medicinal com Apoio em Um Braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braço com Bola Medicinal com Apoio em Um Braço"
  },
  {
    "id": "flexao_de_braco_com_uma_perna",
    "name": "Flexão de Braço com Uma Perna",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Braço com Uma Perna. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Braço com Uma Perna foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braço com Uma Perna"
  },
  {
    "id": "flexao_de_pernas_na_bola_de_estabilidade",
    "name": "Flexão de Pernas na Bola de Estabilidade",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Pernas na Bola de Estabilidade. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Pernas na Bola de Estabilidade foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Pernas na Bola de Estabilidade"
  },
  {
    "id": "flexao_de_pernas_com_alavanca",
    "name": "Flexão de Pernas com Alavanca",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Pernas com Alavanca. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Flexão de Pernas com Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Pernas com Alavanca"
  },
  {
    "id": "flexao_de_braco_com_arqueamento",
    "name": "Flexão de Braço com Arqueamento",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Braço com Arqueamento. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Braço com Arqueamento foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Braço com Arqueamento"
  },
  {
    "id": "flexao_de_pulso_neutra_sentado_com_halteres",
    "name": "Flexão de Pulso Neutra Sentado com Halteres",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Pulso Neutra Sentado com Halteres. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Flexão de Pulso Neutra Sentado com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Pulso Neutra Sentado com Halteres"
  },
  {
    "id": "flexao_de_joelhos",
    "name": "Flexão de joelhos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de joelhos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de joelhos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de joelhos"
  },
  {
    "id": "flexao_de_um_braco_com_apoio",
    "name": "Flexão de um braço com apoio",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de um braço com apoio. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de um braço com apoio foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de um braço com apoio"
  },
  {
    "id": "flexao_de_diamante_de_joelhos",
    "name": "Flexão de diamante de joelhos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de diamante de joelhos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de diamante de joelhos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de diamante de joelhos"
  },
  {
    "id": "flexao_de_braco_com_aducao_da_escapula",
    "name": "Flexão de braço com adução da escapula",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de braço com adução da escapula. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de braço com adução da escapula foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de braço com adução da escapula"
  },
  {
    "id": "flexao_de_um_braco_com_bola_medicinal",
    "name": "Flexão de um braço com bola medicinal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de um braço com bola medicinal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de um braço com bola medicinal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de um braço com bola medicinal"
  },
  {
    "id": "flexao_de_pivo_entre_cadeiras",
    "name": "Flexão de pivô entre cadeiras",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de pivô entre cadeiras. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de pivô entre cadeiras foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de pivô entre cadeiras"
  },
  {
    "id": "flexao_de_punho_fechado",
    "name": "Flexão de Punho Fechado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Punho Fechado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Punho Fechado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Punho Fechado"
  },
  {
    "id": "flexao_de_queda",
    "name": "Flexão de Queda",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Queda. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de Queda foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Queda"
  },
  {
    "id": "flexao_de_apoio_com_elevacao_de_braco",
    "name": "Flexão de apoio com elevação de braço",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de apoio com elevação de braço. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Flexão de apoio com elevação de braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de apoio com elevação de braço"
  },
  {
    "id": "flexao_de_punho_com_cabo_em_um_braco_no_chao",
    "name": "Flexão de Punho com Cabo em um Braço no Chão",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Punho com Cabo em um Braço no Chão. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Flexão de Punho com Cabo em um Braço no Chão foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Punho com Cabo em um Braço no Chão"
  },
  {
    "id": "flexao_de_ombro_com_faixa",
    "name": "Flexão de ombro com faixa",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de ombro com faixa. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de ombro com faixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de ombro com faixa"
  },
  {
    "id": "flexao_de_braco_com_palmas",
    "name": "Flexão de braço com palmas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de braço com palmas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de braço com palmas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de braço com palmas"
  },
  {
    "id": "flexao_de_punho_reversa_com_barra_sobre_um_banco",
    "name": "Flexão de Punho Reversa com Barra Sobre um Banco",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Punho Reversa com Barra Sobre um Banco. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Flexão de Punho Reversa com Barra Sobre um Banco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Punho Reversa com Barra Sobre um Banco"
  },
  {
    "id": "flexao_diamante",
    "name": "Flexão diamante",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão diamante. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão diamante foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão diamante"
  },
  {
    "id": "flexao_de_braco_em_posicao_de_parada_de_mao_com_balanco",
    "name": "Flexão de braço em posição de parada de mão com balanço",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de braço em posição de parada de mão com balanço. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de braço em posição de parada de mão com balanço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de braço em posição de parada de mão com balanço"
  },
  {
    "id": "flexao_de_punho_reversa_com_anilha",
    "name": "Flexão de Punho Reversa com Anilha",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Punho Reversa com Anilha. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Flexão de Punho Reversa com Anilha foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Punho Reversa com Anilha"
  },
  {
    "id": "flexao_de_braco_com_as_maos_entre_bancos",
    "name": "Flexão de braço com as mãos entre bancos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de braço com as mãos entre bancos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de braço com as mãos entre bancos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de braço com as mãos entre bancos"
  },
  {
    "id": "flexao_de_punho_com_halteres",
    "name": "Flexão de Punho com Halteres",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de Punho com Halteres. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Flexão de Punho com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de Punho com Halteres"
  },
  {
    "id": "flexao_de_pivo_com_banco",
    "name": "Flexão de pivô com banco",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de pivô com banco. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de pivô com banco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de pivô com banco"
  },
  {
    "id": "flexao_de_pernas_com_toalha",
    "name": "Flexão de pernas com toalha",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão de pernas com toalha. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão de pernas com toalha foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão de pernas com toalha"
  },
  {
    "id": "flexoes_hindu",
    "name": "Flexões hindu",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexões hindu. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexões hindu foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexões hindu"
  },
  {
    "id": "gluteo_coice_com_gymstick",
    "name": "Glúteo Coice com Gymstick",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Glúteo Coice com Gymstick. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Glúteo Coice com Gymstick foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Glúteo Coice com Gymstick"
  },
  {
    "id": "gluteos_coice_com_faixa_elastica",
    "name": "Glúteos Coice com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Glúteos Coice com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Glúteos Coice com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Glúteos Coice com Faixa Elástica"
  },
  {
    "id": "gluteo_coice_na_maquina_de_extensao_de_pernas",
    "name": "Glúteo Coice Na Máquina De Extensão De Pernas",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Glúteo Coice Na Máquina De Extensão De Pernas. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Glúteo Coice Na Máquina De Extensão De Pernas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Glúteo Coice Na Máquina De Extensão De Pernas"
  },
  {
    "id": "flexao_reversa_com_cotovelos",
    "name": "Flexão reversa com cotovelos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão reversa com cotovelos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão reversa com cotovelos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão reversa com cotovelos"
  },
  {
    "id": "gluteo_coice_com_pernas_flexionada_com_faixa",
    "name": "Glúteo Coice com Pernas Flexionada com Faixa",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Glúteo Coice com Pernas Flexionada com Faixa. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Glúteo Coice com Pernas Flexionada com Faixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Glúteo Coice com Pernas Flexionada com Faixa"
  },
  {
    "id": "flexoes_de_apoio_de_mao_na_parede",
    "name": "Flexões de apoio de mão na parede",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexões de apoio de mão na parede. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexões de apoio de mão na parede foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexões de apoio de mão na parede"
  },
  {
    "id": "gluteo_coice_na_maquina",
    "name": "Glúteo Coice Na Máquina",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Glúteo Coice Na Máquina. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Glúteo Coice Na Máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Glúteo Coice Na Máquina"
  },
  {
    "id": "gluteo_coice_na_alavanca",
    "name": "Glúteo Coice Na Alavanca",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Glúteo Coice Na Alavanca. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Glúteo Coice Na Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Glúteo Coice Na Alavanca"
  },
  {
    "id": "gluteo_coice_em_pe_com_faixa_elastica",
    "name": "Glúteo Coice em Pé com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Glúteo Coice em Pé com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Glúteo Coice em Pé com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Glúteo Coice em Pé com Faixa Elástica"
  },
  {
    "id": "gancho_de_direita",
    "name": "Gancho de Direita",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Gancho de Direita. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Gancho de Direita foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Gancho de Direita"
  },
  {
    "id": "flexao_plus",
    "name": "Flexão plus",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão plus. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão plus foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão plus"
  },
  {
    "id": "gluteos_na_polia_baixa",
    "name": "Glúteos na Polia Baixa",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Glúteos na Polia Baixa. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Glúteos na Polia Baixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Glúteos na Polia Baixa"
  },
  {
    "id": "flexao_hindu_modificada",
    "name": "Flexão hindu modificada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão hindu modificada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão hindu modificada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão hindu modificada"
  },
  {
    "id": "flexao_em_pivo",
    "name": "Flexão em pivô",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão em pivô. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão em pivô foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão em pivô"
  },
  {
    "id": "gluteo_coice_no_smith",
    "name": "Glúteo Coice No Smith",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Glúteo Coice No Smith. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Glúteo Coice No Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Glúteo Coice No Smith"
  },
  {
    "id": "gluteos_coice_nilateral_polia_baixa",
    "name": "Gluteos Coice nilateral Polia Baixa",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Gluteos Coice nilateral Polia Baixa. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Gluteos Coice nilateral Polia Baixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Gluteos Coice nilateral Polia Baixa"
  },
  {
    "id": "flexao_na_parede",
    "name": "Flexão na parede",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão na parede. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão na parede foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão na parede"
  },
  {
    "id": "hand_grip",
    "name": "Hand Grip",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Hand Grip. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Hand Grip foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Hand Grip"
  },
  {
    "id": "flexao_inclinada",
    "name": "Flexão inclinada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Flexão inclinada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Flexão inclinada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Flexão inclinada"
  },
  {
    "id": "leg_press_alternado_deitado_com_gymstick",
    "name": "Leg Press Alternado Deitado com Gymstick",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Leg Press Alternado Deitado com Gymstick. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Leg Press Alternado Deitado com Gymstick foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Leg Press Alternado Deitado com Gymstick"
  },
  {
    "id": "inclinacao_pelvica",
    "name": "Inclinação Pélvica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Inclinação Pélvica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Inclinação Pélvica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Inclinação Pélvica"
  },
  {
    "id": "lancamento_de_bola_medicinal_deitado",
    "name": "Lançamento de Bola Medicinal deitado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Lançamento de Bola Medicinal deitado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Lançamento de Bola Medicinal deitado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Lançamento de Bola Medicinal deitado"
  },
  {
    "id": "hands_bike",
    "name": "Hands Bike",
    "targetMuscles": [
      "Cardio"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Hands Bike. Exercício focado principalmente em trabalhar cardio.",
    "instructions": "O exercício Hands Bike foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Hands Bike"
  },
  {
    "id": "joelhos_altos_contra_a_parede",
    "name": "Joelhos altos contra a parede",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Joelhos altos contra a parede. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Joelhos altos contra a parede foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Joelhos altos contra a parede"
  },
  {
    "id": "joelho_alternado_no_peito",
    "name": "Joelho Alternado no Peito",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Joelho Alternado no Peito. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Joelho Alternado no Peito foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Joelho Alternado no Peito"
  },
  {
    "id": "inclinacao_lateral_em_pe",
    "name": "Inclinação Lateral em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Inclinação Lateral em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Inclinação Lateral em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Inclinação Lateral em Pé"
  },
  {
    "id": "inclinacao_lateral",
    "name": "Inclinação Lateral",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Inclinação Lateral. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Inclinação Lateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Inclinação Lateral"
  },
  {
    "id": "hiperextensao_reversa_com_faixa_de_resistencia",
    "name": "Hiperextensão Reversa com Faixa de Resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Hiperextensão Reversa com Faixa de Resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Hiperextensão Reversa com Faixa de Resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Hiperextensão Reversa com Faixa de Resistência"
  },
  {
    "id": "lancamento_de_bola_medicinal",
    "name": "Lançamento de bola medicinal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Lançamento de bola medicinal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Lançamento de bola medicinal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Lançamento de bola medicinal"
  },
  {
    "id": "heaving_snatch_balance",
    "name": "Heaving Snatch Balance",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Heaving Snatch Balance. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Heaving Snatch Balance foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Heaving Snatch Balance"
  },
  {
    "id": "hiperextensao_no_chao",
    "name": "Hiperextensão no Chão",
    "targetMuscles": [
      "Posterior"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Hiperextensão no Chão. Exercício focado principalmente em trabalhar posterior.",
    "instructions": "O exercício Hiperextensão no Chão foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Hiperextensão no Chão"
  },
  {
    "id": "hiperextensao_invertida_de_sapo",
    "name": "Hiperextensão Invertida de Sapo",
    "targetMuscles": [
      "Posterior"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Hiperextensão Invertida de Sapo. Exercício focado principalmente em trabalhar posterior.",
    "instructions": "O exercício Hiperextensão Invertida de Sapo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Hiperextensão Invertida de Sapo"
  },
  {
    "id": "impulso_com_barra",
    "name": "Impulso com barra",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Impulso com barra. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Impulso com barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Impulso com barra"
  },
  {
    "id": "hiperextensao",
    "name": "Hiperextensão",
    "targetMuscles": [
      "Posterior"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Hiperextensão. Exercício focado principalmente em trabalhar posterior.",
    "instructions": "O exercício Hiperextensão foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Hiperextensão"
  },
  {
    "id": "hiperextensao_de_lombar_no_banco_plano",
    "name": "Hiperextensão de Lombar no Banco Plano",
    "targetMuscles": [
      "Posterior"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Hiperextensão de Lombar no Banco Plano. Exercício focado principalmente em trabalhar posterior.",
    "instructions": "O exercício Hiperextensão de Lombar no Banco Plano foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Hiperextensão de Lombar no Banco Plano"
  },
  {
    "id": "impossible_dips",
    "name": "Impossible Dips",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Impossible Dips. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Impossible Dips foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Impossible Dips"
  },
  {
    "id": "kettlebell_em_forma_de_oito",
    "name": "Kettlebell em Forma de Oito",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Kettlebell em Forma de Oito. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Kettlebell em Forma de Oito foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Kettlebell em Forma de Oito"
  },
  {
    "id": "hiperextensao_com_torcao",
    "name": "Hiperextensão com Torção",
    "targetMuscles": [
      "Posterior"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Hiperextensão com Torção. Exercício focado principalmente em trabalhar posterior.",
    "instructions": "O exercício Hiperextensão com Torção foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Hiperextensão com Torção"
  },
  {
    "id": "kettlebell_hang_clean",
    "name": "Kettlebell Hang Clean",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Kettlebell Hang Clean. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Kettlebell Hang Clean foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Kettlebell Hang Clean"
  },
  {
    "id": "levantamento_lateral_de_perna_em_quatro_apoios",
    "name": "Levantamento Lateral de Perna em Quatro Apoios",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Lateral de Perna em Quatro Apoios. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Levantamento Lateral de Perna em Quatro Apoios foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Lateral de Perna em Quatro Apoios"
  },
  {
    "id": "levantamento_terra_com_alavanca",
    "name": "Levantamento Terra com Alavanca",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Terra com Alavanca. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Levantamento Terra com Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Terra com Alavanca"
  },
  {
    "id": "levantamento_terra",
    "name": "Levantamento Terra",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Terra. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Levantamento Terra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Terra"
  },
  {
    "id": "levantamento_terra_unilateral",
    "name": "Levantamento Terra Unilateral",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Terra Unilateral. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Levantamento Terra Unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Terra Unilateral"
  },
  {
    "id": "levantamento_de_braco_apoiado_na_parede",
    "name": "Levantamento de braço apoiado na parede",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento de braço apoiado na parede. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Levantamento de braço apoiado na parede foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento de braço apoiado na parede"
  },
  {
    "id": "leg_press_horizontal",
    "name": "Leg Press Horizontal",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Leg Press Horizontal. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Leg Press Horizontal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Leg Press Horizontal"
  },
  {
    "id": "levantamento_terra_sumo_com_halteres",
    "name": "Levantamento Terra Sumô com Halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Terra Sumô com Halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Levantamento Terra Sumô com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Terra Sumô com Halteres"
  },
  {
    "id": "levantamento_terra_zercher",
    "name": "Levantamento Terra Zercher",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Terra Zercher. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Levantamento Terra Zercher foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Terra Zercher"
  },
  {
    "id": "levantamento_terra_com_barra_hexagonal",
    "name": "Levantamento Terra com Barra Hexagonal",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Terra com Barra Hexagonal. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Levantamento Terra com Barra Hexagonal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Terra com Barra Hexagonal"
  },
  {
    "id": "leg_press_unilateral",
    "name": "Leg Press unilateral",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Leg Press unilateral. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Leg Press unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Leg Press unilateral"
  },
  {
    "id": "levantamento_terra_romeno",
    "name": "Levantamento Terra Romeno",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Terra Romeno. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Levantamento Terra Romeno foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Terra Romeno"
  },
  {
    "id": "levantamento_com_suporte",
    "name": "Levantamento com Suporte",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento com Suporte. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Levantamento com Suporte foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento com Suporte"
  },
  {
    "id": "levantamento_de_halteres_de_4_maneiras_2",
    "name": "Levantamento de halteres de 4 maneiras (2)",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento de halteres de 4 maneiras (2). Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Levantamento de halteres de 4 maneiras (2) foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento de halteres de 4 maneiras (2)"
  },
  {
    "id": "levantamento_terra_com_barra_no_landmine",
    "name": "Levantamento Terra com Barra no Landmine",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Terra com Barra no Landmine. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Levantamento Terra com Barra no Landmine foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Terra com Barra no Landmine"
  },
  {
    "id": "levantamento_de_halteres_de_3_maneiras",
    "name": "Levantamento de halteres de 3 maneiras",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento de halteres de 3 maneiras. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Levantamento de halteres de 3 maneiras foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento de halteres de 3 maneiras"
  },
  {
    "id": "leg_press_90_no_smith",
    "name": "Leg press 90 no smith",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Leg press 90 no smith. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Leg press 90 no smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Leg press 90 no smith"
  },
  {
    "id": "levantamento_turco",
    "name": "Levantamento Turco",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Turco. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Levantamento Turco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Turco"
  },
  {
    "id": "levantamento_terra_com_halteres",
    "name": "Levantamento Terra com Halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Terra com Halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Levantamento Terra com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Terra com Halteres"
  },
  {
    "id": "levantamento_terra_sumo",
    "name": "Levantamento Terra Sumô",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Terra Sumô. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Levantamento Terra Sumô foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Terra Sumô"
  },
  {
    "id": "levantamento_terra_com_kettlebell",
    "name": "Levantamento Terra com Kettlebell",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento Terra com Kettlebell. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Levantamento Terra com Kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento Terra com Kettlebell"
  },
  {
    "id": "mergulho_de_triceps_com_alavanca",
    "name": "Mergulho de tríceps com alavanca",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Mergulho de tríceps com alavanca. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Mergulho de tríceps com alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Mergulho de tríceps com alavanca"
  },
  {
    "id": "mergulho_de_peito_assistido",
    "name": "Mergulho de peito assistido",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Mergulho de peito assistido. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Mergulho de peito assistido foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Mergulho de peito assistido"
  },
  {
    "id": "levantamento_terra_romeno_com_halteres",
    "name": "Levantamento terra romeno com halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento terra romeno com halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Levantamento terra romeno com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento terra romeno com halteres"
  },
  {
    "id": "mergulhos_assistidos_para_triceps",
    "name": "Mergulhos Assistidos para Tríceps",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Mergulhos Assistidos para Tríceps. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Mergulhos Assistidos para Tríceps foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Mergulhos Assistidos para Tríceps"
  },
  {
    "id": "levantamento_frontal_unilateral_com_cabo",
    "name": "Levantamento frontal unilateral com cabo",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento frontal unilateral com cabo. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Levantamento frontal unilateral com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento frontal unilateral com cabo"
  },
  {
    "id": "levantamento_frontal_com_anilha",
    "name": "Levantamento frontal com anilha",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento frontal com anilha. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Levantamento frontal com anilha foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento frontal com anilha"
  },
  {
    "id": "mergulho_de_triceps",
    "name": "Mergulho de tríceps",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Mergulho de tríceps. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Mergulho de tríceps foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Mergulho de tríceps"
  },
  {
    "id": "levantamento_de_panturrilha_com_apoio_e_sobrecarga",
    "name": "Levantamento de panturrilha com apoio e sobrecarga",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento de panturrilha com apoio e sobrecarga. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Levantamento de panturrilha com apoio e sobrecarga foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento de panturrilha com apoio e sobrecarga"
  },
  {
    "id": "mergulho_reverso",
    "name": "Mergulho reverso",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Mergulho reverso. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Mergulho reverso foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Mergulho reverso"
  },
  {
    "id": "levantamento_frontal_de_cabo_com_dois_bracos",
    "name": "Levantamento frontal de cabo com dois braços",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento frontal de cabo com dois braços. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Levantamento frontal de cabo com dois braços foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento frontal de cabo com dois braços"
  },
  {
    "id": "levantamento_frontal_alternado_com_haltere_sentado",
    "name": "Levantamento frontal alternado com haltere sentado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento frontal alternado com haltere sentado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Levantamento frontal alternado com haltere sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento frontal alternado com haltere sentado"
  },
  {
    "id": "mesa_flexora_unilateral",
    "name": "Mesa Flexora Unilateral",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Mesa Flexora Unilateral. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Mesa Flexora Unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Mesa Flexora Unilateral"
  },
  {
    "id": "levantamento_lateral_com_kettlebell",
    "name": "Levantamento lateral com kettlebell",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento lateral com kettlebell. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Levantamento lateral com kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento lateral com kettlebell"
  },
  {
    "id": "levantamento_de_panturrilha_com_apoio_de_banco",
    "name": "Levantamento de panturrilha com apoio de banco",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento de panturrilha com apoio de banco. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Levantamento de panturrilha com apoio de banco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento de panturrilha com apoio de banco"
  },
  {
    "id": "levantamento_de_panturrilha_com_alavanca",
    "name": "Levantamento de panturrilha com alavanca",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento de panturrilha com alavanca. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Levantamento de panturrilha com alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento de panturrilha com alavanca"
  },
  {
    "id": "levantamento_de_panturrilha_com_apoio_de_uma_perna",
    "name": "Levantamento de panturrilha com apoio de uma perna",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento de panturrilha com apoio de uma perna. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Levantamento de panturrilha com apoio de uma perna foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento de panturrilha com apoio de uma perna"
  },
  {
    "id": "meio_agachado_com_puxada_para_o_rosto_no_cabo",
    "name": "Meio Agachado com Puxada para o Rosto no Cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Meio Agachado com Puxada para o Rosto no Cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Meio Agachado com Puxada para o Rosto no Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Meio Agachado com Puxada para o Rosto no Cabo"
  },
  {
    "id": "mergulhos_para_triceps_no_chao",
    "name": "Mergulhos para tríceps no chão",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Mergulhos para tríceps no chão. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Mergulhos para tríceps no chão foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Mergulhos para tríceps no chão"
  },
  {
    "id": "medicine_ball_rotational_throw",
    "name": "Medicine Ball Rotational Throw",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Medicine Ball Rotational Throw. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Medicine Ball Rotational Throw foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Medicine Ball Rotational Throw"
  },
  {
    "id": "levantamento_frontal_com_barra",
    "name": "Levantamento frontal com barra",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Levantamento frontal com barra. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Levantamento frontal com barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Levantamento frontal com barra"
  },
  {
    "id": "paralela",
    "name": "Paralela",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Paralela. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Paralela foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Paralela"
  },
  {
    "id": "maquina_eliptica",
    "name": "Máquina Elíptica",
    "targetMuscles": [
      "Cardio"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Máquina Elíptica. Exercício focado principalmente em trabalhar cardio.",
    "instructions": "O exercício Máquina Elíptica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Máquina Elíptica"
  },
  {
    "id": "maquina_de_rosca_direta",
    "name": "Máquina de rosca direta",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Máquina de rosca direta. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Máquina de rosca direta foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Máquina de rosca direta"
  },
  {
    "id": "maquina_de_flexao_de_triceps",
    "name": "Máquina de flexão de tríceps",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Máquina de flexão de tríceps. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Máquina de flexão de tríceps foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Máquina de flexão de tríceps"
  },
  {
    "id": "moinho_de_vento_com_haltere",
    "name": "Moinho de vento com haltere",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Moinho de vento com haltere. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Moinho de vento com haltere foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Moinho de vento com haltere"
  },
  {
    "id": "nave_seal_burpee",
    "name": "Nave Seal Burpee",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Nave Seal Burpee. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Nave Seal Burpee foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Nave Seal Burpee"
  },
  {
    "id": "maquina_de_abducao_de_quadril",
    "name": "Máquina de Abdução de Quadril",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Máquina de Abdução de Quadril. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Máquina de Abdução de Quadril foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Máquina de Abdução de Quadril"
  },
  {
    "id": "muscle_up",
    "name": "Muscle up",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Muscle up. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Muscle up foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Muscle up"
  },
  {
    "id": "maquina_de_aducao_de_quadril",
    "name": "Máquina de Adução de Quadril",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Máquina de Adução de Quadril. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Máquina de Adução de Quadril foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Máquina de Adução de Quadril"
  },
  {
    "id": "maquina_de_elevacao_lateral",
    "name": "Máquina de elevação lateral",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Máquina de elevação lateral. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Máquina de elevação lateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Máquina de elevação lateral"
  },
  {
    "id": "muscle_snatch",
    "name": "Muscle Snatch",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Muscle Snatch. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Muscle Snatch foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Muscle Snatch"
  },
  {
    "id": "maquina_de_voador_de_peito_inclinado",
    "name": "Máquina de voador de peito inclinado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Máquina de voador de peito inclinado. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Máquina de voador de peito inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Máquina de voador de peito inclinado"
  },
  {
    "id": "maquina_de_remo",
    "name": "Máquina de remo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Máquina de remo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Máquina de remo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Máquina de remo"
  },
  {
    "id": "maquina_de_caminhada_ondulatorio",
    "name": "Máquina de Caminhada Ondulatório",
    "targetMuscles": [
      "Cardio"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Máquina de Caminhada Ondulatório. Exercício focado principalmente em trabalhar cardio.",
    "instructions": "O exercício Máquina de Caminhada Ondulatório foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Máquina de Caminhada Ondulatório"
  },
  {
    "id": "moinho_com_kettlebell",
    "name": "Moinho com Kettlebell",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Moinho com Kettlebell. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Moinho com Kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Moinho com Kettlebell"
  },
  {
    "id": "minhoca",
    "name": "Minhoca",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Minhoca. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Minhoca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Minhoca"
  },
  {
    "id": "panturrilhas_em_pe",
    "name": "Panturrilhas em Pé",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Panturrilhas em Pé. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Panturrilhas em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Panturrilhas em Pé"
  },
  {
    "id": "maquina_simulador_escada",
    "name": "Máquina Simulador Escada",
    "targetMuscles": [
      "Cardio"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Máquina Simulador Escada. Exercício focado principalmente em trabalhar cardio.",
    "instructions": "O exercício Máquina Simulador Escada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Máquina Simulador Escada"
  },
  {
    "id": "maquina_de_flexao_de_perna_unilateral",
    "name": "Máquina de Flexão de Perna Unilateral",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Máquina de Flexão de Perna Unilateral. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Máquina de Flexão de Perna Unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Máquina de Flexão de Perna Unilateral"
  },
  {
    "id": "panturrilha_em_pe_no_smith",
    "name": "Panturrilha em Pé no Smith",
    "targetMuscles": [
      "Panturrilha"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Panturrilha em Pé no Smith. Exercício focado principalmente em trabalhar panturrilha.",
    "instructions": "O exercício Panturrilha em Pé no Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Panturrilha em Pé no Smith"
  },
  {
    "id": "paralelas_entre_cadeiras",
    "name": "Paralelas entre Cadeiras",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Paralelas entre Cadeiras. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Paralelas entre Cadeiras foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Paralelas entre Cadeiras"
  },
  {
    "id": "polichinelo_frontal",
    "name": "Polichinelo Frontal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Polichinelo Frontal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Polichinelo Frontal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Polichinelo Frontal"
  },
  {
    "id": "passo_lateral_em_alta_velocidade",
    "name": "Passo Lateral em Alta Velocidade",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Passo Lateral em Alta Velocidade. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Passo Lateral em Alta Velocidade foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Passo Lateral em Alta Velocidade"
  },
  {
    "id": "peso_muerto_piernas_rigidas_con_barra",
    "name": "Peso muerto piernas rígidas con barra",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Peso muerto piernas rígidas con barra. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Peso muerto piernas rígidas con barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Peso muerto piernas rígidas con barra"
  },
  {
    "id": "ponte_unilateral_com_uma_perna_levantada",
    "name": "Ponte Unilateral Com Uma Perna Levantada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Ponte Unilateral Com Uma Perna Levantada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Ponte Unilateral Com Uma Perna Levantada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Ponte Unilateral Com Uma Perna Levantada"
  },
  {
    "id": "ponte_com_halteres",
    "name": "Ponte com Halteres",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Ponte com Halteres. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Ponte com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Ponte com Halteres"
  },
  {
    "id": "plataforma_vibratoria",
    "name": "Plataforma Vibratória",
    "targetMuscles": [
      "Cardio"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Plataforma Vibratória. Exercício focado principalmente em trabalhar cardio.",
    "instructions": "O exercício Plataforma Vibratória foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Plataforma Vibratória"
  },
  {
    "id": "passo_de_esqui",
    "name": "Passo de Esqui",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Passo de Esqui. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Passo de Esqui foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Passo de Esqui"
  },
  {
    "id": "ponte_de_gluteos_com_barra",
    "name": "Ponte de Glúteos com Barra",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Ponte de Glúteos com Barra. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Ponte de Glúteos com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Ponte de Glúteos com Barra"
  },
  {
    "id": "patinador",
    "name": "Patinador",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Patinador. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Patinador foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Patinador"
  },
  {
    "id": "planche",
    "name": "Planche",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Planche. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Planche foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Planche"
  },
  {
    "id": "passagem_de_bola_medicinal_de_peito_em_pe",
    "name": "Passagem de Bola Medicinal de Peito em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Passagem de Bola Medicinal de Peito em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Passagem de Bola Medicinal de Peito em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Passagem de Bola Medicinal de Peito em Pé"
  },
  {
    "id": "paralelas_na_argola",
    "name": "Paralelas na Argola",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Paralelas na Argola. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Paralelas na Argola foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Paralelas na Argola"
  },
  {
    "id": "ponte_em_unilateral",
    "name": "Ponte em Unilateral",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Ponte em Unilateral. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Ponte em Unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Ponte em Unilateral"
  },
  {
    "id": "ponte_com_faixa_elastica",
    "name": "Ponte com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Ponte com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Ponte com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Ponte com Faixa Elástica"
  },
  {
    "id": "ponte_unilateral_no_banco",
    "name": "Ponte Unilateral no Banco",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Ponte Unilateral no Banco. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Ponte Unilateral no Banco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Ponte Unilateral no Banco"
  },
  {
    "id": "ponte_de_gluteos",
    "name": "Ponte de Glúteos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Ponte de Glúteos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Ponte de Glúteos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Ponte de Glúteos"
  },
  {
    "id": "planche_com_flexao_de_braco",
    "name": "Planche com Flexão de Braço",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Planche com Flexão de Braço. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Planche com Flexão de Braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Planche com Flexão de Braço"
  },
  {
    "id": "paralelas_na_barra",
    "name": "Paralelas na Barra",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Paralelas na Barra. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Paralelas na Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Paralelas na Barra"
  },
  {
    "id": "passo_invertido_com_elevacao_do_joelho",
    "name": "Passo Invertido com Elevação do Joelho",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Passo Invertido com Elevação do Joelho. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Passo Invertido com Elevação do Joelho foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Passo Invertido com Elevação do Joelho"
  },
  {
    "id": "pulldown_inclinado_com_corda",
    "name": "Pulldown inclinado com corda",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pulldown inclinado com corda. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Pulldown inclinado com corda foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pulldown inclinado com corda"
  },
  {
    "id": "postura_do_arco",
    "name": "Postura do Arco",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Postura do Arco. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Postura do Arco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Postura do Arco"
  },
  {
    "id": "postura_de_peixe",
    "name": "Postura de peixe",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Postura de peixe. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Postura de peixe foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Postura de peixe"
  },
  {
    "id": "pull_up",
    "name": "Pull Up",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pull Up. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Pull Up foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pull Up"
  },
  {
    "id": "pullover_com_cabo",
    "name": "Pullover com Cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pullover com Cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Pullover com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pullover com Cabo"
  },
  {
    "id": "pulldown_com_corda",
    "name": "Pulldown com corda",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pulldown com corda. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Pulldown com corda foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pulldown com corda"
  },
  {
    "id": "power_clean",
    "name": "Power Clean",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Power Clean. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Power Clean foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Power Clean"
  },
  {
    "id": "postura_do_bebe_feliz",
    "name": "Postura do Bebê Feliz",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Postura do Bebê Feliz. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Postura do Bebê Feliz foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Postura do Bebê Feliz"
  },
  {
    "id": "pulldown_unilateral_no_cabo",
    "name": "Pulldown Unilateral no Cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pulldown Unilateral no Cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Pulldown Unilateral no Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pulldown Unilateral no Cabo"
  },
  {
    "id": "postura_do_sapo",
    "name": "Postura do sapo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Postura do sapo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Postura do sapo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Postura do sapo"
  },
  {
    "id": "postura_da_virilha_sentada",
    "name": "Postura da Virilha Sentada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Postura da Virilha Sentada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Postura da Virilha Sentada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Postura da Virilha Sentada"
  },
  {
    "id": "pullover_com_halteres_na_bola_de_estabilidade",
    "name": "Pullover com Halteres na Bola de Estabilidade",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pullover com Halteres na Bola de Estabilidade. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Pullover com Halteres na Bola de Estabilidade foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pullover com Halteres na Bola de Estabilidade"
  },
  {
    "id": "postura_da_cobra_alongamento_abdominal",
    "name": "Postura da Cobra - Alongamento Abdominal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Postura da Cobra - Alongamento Abdominal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Postura da Cobra - Alongamento Abdominal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Postura da Cobra - Alongamento Abdominal"
  },
  {
    "id": "pullover_com_barra_w_pegada_invertida",
    "name": "Pullover com Barra W Pegada invertida",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pullover com Barra W Pegada invertida. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Pullover com Barra W Pegada invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pullover com Barra W Pegada invertida"
  },
  {
    "id": "pullover_com_cabo_sentado",
    "name": "Pullover com cabo sentado",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pullover com cabo sentado. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Pullover com cabo sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pullover com cabo sentado"
  },
  {
    "id": "protracao_e_retracao_da_escapula",
    "name": "Protração e retração da escápula",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Protração e retração da escápula. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Protração e retração da escápula foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Protração e retração da escápula"
  },
  {
    "id": "postura_do_arco_oscilante",
    "name": "Postura do Arco Oscilante",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Postura do Arco Oscilante. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Postura do Arco Oscilante foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Postura do Arco Oscilante"
  },
  {
    "id": "pressao_unilateral_assistida_por_alavanca",
    "name": "Pressão Unilateral Assistida por Alavanca",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pressão Unilateral Assistida por Alavanca. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Pressão Unilateral Assistida por Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pressão Unilateral Assistida por Alavanca"
  },
  {
    "id": "postura_de_meio_sapo",
    "name": "Postura de meio sapo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Postura de meio sapo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Postura de meio sapo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Postura de meio sapo"
  },
  {
    "id": "pullover_com_barra_no_banco_declinado",
    "name": "Pullover com barra no banco declinado",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pullover com barra no banco declinado. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Pullover com barra no banco declinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pullover com barra no banco declinado"
  },
  {
    "id": "pulos_com_abertura_de_pernas",
    "name": "Pulos com Abertura de Pernas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pulos com Abertura de Pernas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Pulos com Abertura de Pernas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pulos com Abertura de Pernas"
  },
  {
    "id": "pullover_de_braco_reto_com_halteres_joelhos_a_90_graus",
    "name": "Pullover de braço reto com halteres (joelhos a 90 graus)",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pullover de braço reto com halteres (joelhos a 90 graus). Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Pullover de braço reto com halteres (joelhos a 90 graus) foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pullover de braço reto com halteres (joelhos a 90 graus)"
  },
  {
    "id": "puxada_ajoelhada_com_banda_de_resistencia",
    "name": "Puxada ajoelhada com banda de resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada ajoelhada com banda de resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Puxada ajoelhada com banda de resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada ajoelhada com banda de resistência"
  },
  {
    "id": "puxada_alta_na_polia_nuca",
    "name": "Puxada alta na polia nuca",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada alta na polia nuca. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada alta na polia nuca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada alta na polia nuca"
  },
  {
    "id": "puxada_alta",
    "name": "Puxada Alta",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada Alta. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada Alta foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada Alta"
  },
  {
    "id": "puxada_alta_com_um_joelho_apoiado",
    "name": "Puxada Alta com Um Joelho Apoiado",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada Alta com Um Joelho Apoiado. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada Alta com Um Joelho Apoiado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada Alta com Um Joelho Apoiado"
  },
  {
    "id": "puxada_de_cabo_ajoelhada",
    "name": "Puxada De Cabo Ajoelhada",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada De Cabo Ajoelhada. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Puxada De Cabo Ajoelhada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada De Cabo Ajoelhada"
  },
  {
    "id": "puxada_alta_unilateral_alta_ajoelhada",
    "name": "Puxada alta unilateral alta ajoelhada",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada alta unilateral alta ajoelhada. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada alta unilateral alta ajoelhada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada alta unilateral alta ajoelhada"
  },
  {
    "id": "puxada_alta_neutra_com_cabos_duplos_no_chao",
    "name": "Puxada Alta Neutra com Cabos Duplos no Chão",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada Alta Neutra com Cabos Duplos no Chão. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada Alta Neutra com Cabos Duplos no Chão foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada Alta Neutra com Cabos Duplos no Chão"
  },
  {
    "id": "pullover_com_haltere",
    "name": "Pullover com haltere",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pullover com haltere. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Pullover com haltere foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pullover com haltere"
  },
  {
    "id": "puxada_com_halteres_entre_as_pernas",
    "name": "Puxada com Halteres entre as Pernas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada com Halteres entre as Pernas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Puxada com Halteres entre as Pernas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada com Halteres entre as Pernas"
  },
  {
    "id": "pulos_de_joelho_elevado",
    "name": "Pulos de Joelho Elevado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pulos de Joelho Elevado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Pulos de Joelho Elevado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pulos de Joelho Elevado"
  },
  {
    "id": "puxada_com_um_braco_com_cabo",
    "name": "Puxada com Um Braço com Cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada com Um Braço com Cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada com Um Braço com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada com Um Braço com Cabo"
  },
  {
    "id": "puxada_alta_com_triangulo",
    "name": "Puxada Alta com Triângulo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada Alta com Triângulo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada Alta com Triângulo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada Alta com Triângulo"
  },
  {
    "id": "pullover_na_maquina_de_alavanca",
    "name": "Pullover na Máquina de Alavanca",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pullover na Máquina de Alavanca. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Pullover na Máquina de Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pullover na Máquina de Alavanca"
  },
  {
    "id": "puxada_alta_na_maquina_nuca",
    "name": "Puxada alta na Máquina Nuca",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada alta na Máquina Nuca. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada alta na Máquina Nuca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada alta na Máquina Nuca"
  },
  {
    "id": "puxada_alta_invertida",
    "name": "Puxada Alta Invertida",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada Alta Invertida. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada Alta Invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada Alta Invertida"
  },
  {
    "id": "puxada_com_faixa_elastica",
    "name": "Puxada com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Puxada com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada com Faixa Elástica"
  },
  {
    "id": "pulo_de_impulso_de_quadril_de_uma_perna",
    "name": "Pulo de impulso de quadril de uma perna",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pulo de impulso de quadril de uma perna. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Pulo de impulso de quadril de uma perna foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pulo de impulso de quadril de uma perna"
  },
  {
    "id": "puxada_front_lever",
    "name": "Puxada Front Lever",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada Front Lever. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Puxada Front Lever foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada Front Lever"
  },
  {
    "id": "remada_curvada_em_t",
    "name": "Remada Curvada em T",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Curvada em T. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Curvada em T foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Curvada em T"
  },
  {
    "id": "remada_alta_com_cabo",
    "name": "Remada Alta com Cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Alta com Cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Alta com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Alta com Cabo"
  },
  {
    "id": "remada_alta_1",
    "name": "Remada Alta (1)",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Alta (1). Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Remada Alta (1) foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Alta (1)"
  },
  {
    "id": "puxada_para_o_rosto_de_joelhos",
    "name": "Puxada para o Rosto de Joelhos",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada para o Rosto de Joelhos. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada para o Rosto de Joelhos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada para o Rosto de Joelhos"
  },
  {
    "id": "puxada_escapular_na_barra_fixa",
    "name": "Puxada escapular na barra fixa",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada escapular na barra fixa. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Puxada escapular na barra fixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada escapular na barra fixa"
  },
  {
    "id": "pendulo_de_ombro",
    "name": "Pêndulo de ombro",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Pêndulo de ombro. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Pêndulo de ombro foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Pêndulo de ombro"
  },
  {
    "id": "puxar_com_faixa_elastica",
    "name": "Puxar com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxar com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Puxar com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxar com Faixa Elástica"
  },
  {
    "id": "remada_alta_com_barra_w",
    "name": "Remada Alta Com Barra W",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Alta Com Barra W. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Alta Com Barra W foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Alta Com Barra W"
  },
  {
    "id": "puxada_isometrica",
    "name": "Puxada isométrica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada isométrica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Puxada isométrica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada isométrica"
  },
  {
    "id": "puxada_de_face_com_cabo_cruzado",
    "name": "Puxada de face com cabo cruzado",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada de face com cabo cruzado. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada de face com cabo cruzado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada de face com cabo cruzado"
  },
  {
    "id": "quatro_apoios",
    "name": "Quatro Apoios",
    "targetMuscles": [
      "Gluteos"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Quatro Apoios. Exercício focado principalmente em trabalhar gluteos.",
    "instructions": "O exercício Quatro Apoios foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Quatro Apoios"
  },
  {
    "id": "remada_curvada_inclinada_com_barra",
    "name": "Remada Curvada Inclinada com Barra",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Curvada Inclinada com Barra. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Curvada Inclinada com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Curvada Inclinada com Barra"
  },
  {
    "id": "puxada_na_polia_alta_com_pegada_fechada",
    "name": "Puxada na Polia Alta com Pegada Fechada",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada na Polia Alta com Pegada Fechada. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada na Polia Alta com Pegada Fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada na Polia Alta com Pegada Fechada"
  },
  {
    "id": "quadrupede_com_elevacao_de_braco_e_perna_contralateral",
    "name": "Quadrúpede com elevação de braço e perna contralateral",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Quadrúpede com elevação de braço e perna contralateral. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Quadrúpede com elevação de braço e perna contralateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Quadrúpede com elevação de braço e perna contralateral"
  },
  {
    "id": "remada_curvada_com_barra",
    "name": "Remada Curvada com Barra",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Curvada com Barra. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Curvada com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Curvada com Barra"
  },
  {
    "id": "remada_curvada_com_pegada_invertida_na_barra",
    "name": "Remada Curvada com Pegada Invertida na Barra",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Curvada com Pegada Invertida na Barra. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Curvada com Pegada Invertida na Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Curvada com Pegada Invertida na Barra"
  },
  {
    "id": "puxada_em_pe_com_torcao_no_cabo",
    "name": "Puxada em Pé com Torção no Cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada em Pé com Torção no Cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada em Pé com Torção no Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada em Pé com Torção no Cabo"
  },
  {
    "id": "remada_alta_com_halter",
    "name": "Remada Alta com Halter",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Alta com Halter. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Alta com Halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Alta com Halter"
  },
  {
    "id": "rastejo_de_urso",
    "name": "Rastejo de Urso",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rastejo de Urso. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rastejo de Urso foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rastejo de Urso"
  },
  {
    "id": "puxada_com_um_braco_com_peso_adicional",
    "name": "Puxada com Um Braço com Peso Adicional",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Puxada com Um Braço com Peso Adicional. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Puxada com Um Braço com Peso Adicional foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Puxada com Um Braço com Peso Adicional"
  },
  {
    "id": "remada_unilateral_com_cabo",
    "name": "Remada Unilateral com Cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Unilateral com Cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Unilateral com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Unilateral com Cabo"
  },
  {
    "id": "remada_invertida_com_argolas",
    "name": "Remada Invertida Com Argolas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Invertida Com Argolas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Remada Invertida Com Argolas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Invertida Com Argolas"
  },
  {
    "id": "remada_unilateral_com_barra",
    "name": "Remada Unilateral com Barra",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Unilateral com Barra. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Unilateral com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Unilateral com Barra"
  },
  {
    "id": "remada_t_invertida_com_alavanca",
    "name": "Remada T invertida com alavanca",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada T invertida com alavanca. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada T invertida com alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada T invertida com alavanca"
  },
  {
    "id": "remada_sentada_com_cabo",
    "name": "Remada Sentada com Cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Sentada com Cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Sentada com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Sentada com Cabo"
  },
  {
    "id": "remada_inclinada_com_pegada_reversa_com_halteres",
    "name": "Remada Inclinada com Pegada Reversa com Halteres",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Inclinada com Pegada Reversa com Halteres. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Inclinada com Pegada Reversa com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Inclinada com Pegada Reversa com Halteres"
  },
  {
    "id": "remada_invertida",
    "name": "Remada Invertida",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Invertida. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Invertida"
  },
  {
    "id": "remada_sentada_com_corda_na_polia",
    "name": "Remada Sentada com Corda na Polia",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Sentada com Corda na Polia. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Sentada com Corda na Polia foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Sentada com Corda na Polia"
  },
  {
    "id": "remada_t_com_alavanca",
    "name": "Remada T com alavanca",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada T com alavanca. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada T com alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada T com alavanca"
  },
  {
    "id": "remada_afastada_com_banda_de_resistencia",
    "name": "Remada afastada com banda de resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada afastada com banda de resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Remada afastada com banda de resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada afastada com banda de resistência"
  },
  {
    "id": "remada_t_com_landmine",
    "name": "Remada T com Landmine",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada T com Landmine. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada T com Landmine foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada T com Landmine"
  },
  {
    "id": "remada_renegada_com_halteres",
    "name": "Remada Renegada com Halteres",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Renegada com Halteres. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Renegada com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Renegada com Halteres"
  },
  {
    "id": "remada_inclinada_com_pegada_neutra_com_halteres",
    "name": "Remada Inclinada com Pegada Neutra com Halteres",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Inclinada com Pegada Neutra com Halteres. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Inclinada com Pegada Neutra com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Inclinada com Pegada Neutra com Halteres"
  },
  {
    "id": "remada_sentada_na_maquina",
    "name": "Remada Sentada na Máquina",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Sentada na Máquina. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Sentada na Máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Sentada na Máquina"
  },
  {
    "id": "remada_sentada_com_anilhas",
    "name": "Remada Sentada com Anilhas",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Sentada com Anilhas. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Sentada com Anilhas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Sentada com Anilhas"
  },
  {
    "id": "remada_inclinada_a_45_graus",
    "name": "Remada Inclinada a 45 Graus",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Inclinada a 45 Graus. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Inclinada a 45 Graus foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Inclinada a 45 Graus"
  },
  {
    "id": "remada_invertida_na_mesa",
    "name": "Remada Invertida na Mesa",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Invertida na Mesa. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Remada Invertida na Mesa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Invertida na Mesa"
  },
  {
    "id": "remada_inclinada_no_banco_com_cabo",
    "name": "Remada Inclinada no banco com Cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Inclinada no banco com Cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Inclinada no banco com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Inclinada no banco com Cabo"
  },
  {
    "id": "remada_curvada_no_smith",
    "name": "Remada Curvada no Smith",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Curvada no Smith. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Curvada no Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Curvada no Smith"
  },
  {
    "id": "remada_inclinada_com_cabo",
    "name": "Remada Inclinada com Cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada Inclinada com Cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada Inclinada com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada Inclinada com Cabo"
  },
  {
    "id": "remada_de_espingarda",
    "name": "Remada de espingarda",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada de espingarda. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada de espingarda foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada de espingarda"
  },
  {
    "id": "remada_alta_com_halteres_unilateral",
    "name": "Remada alta com halteres unilateral",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada alta com halteres unilateral. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada alta com halteres unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada alta com halteres unilateral"
  },
  {
    "id": "remada_curvada_com_halteres",
    "name": "Remada curvada com halteres",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada curvada com halteres. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada curvada com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada curvada com halteres"
  },
  {
    "id": "remada_com_barra",
    "name": "Remada com barra",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada com barra. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada com barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada com barra"
  },
  {
    "id": "remada_curvada_com_halteres_com_pegada_invertida",
    "name": "Remada curvada com halteres com pegada invertida",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada curvada com halteres com pegada invertida. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada curvada com halteres com pegada invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada curvada com halteres com pegada invertida"
  },
  {
    "id": "remada_inversa_com_cabos_deitado",
    "name": "Remada inversa com cabos deitado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada inversa com cabos deitado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Remada inversa com cabos deitado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada inversa com cabos deitado"
  },
  {
    "id": "remada_curvada_com_kettlebell",
    "name": "Remada curvada com kettlebell",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada curvada com kettlebell. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada curvada com kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada curvada com kettlebell"
  },
  {
    "id": "remada_curvada_com_barra_de_pegada_alternada_ampla_com_aducao_de_escapula",
    "name": "Remada curvada com barra de pegada alternada ampla com adução de escapula",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada curvada com barra de pegada alternada ampla com adução de escapula. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada curvada com barra de pegada alternada ampla com adução de escapula foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada curvada com barra de pegada alternada ampla com adução de escapula"
  },
  {
    "id": "remada_com_halteres_para_a_posterior_de_ombros",
    "name": "Remada com halteres para a posterior de ombros",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada com halteres para a posterior de ombros. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Remada com halteres para a posterior de ombros foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada com halteres para a posterior de ombros"
  },
  {
    "id": "remada_frontal_com_alavanca",
    "name": "Remada frontal com alavanca",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada frontal com alavanca. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada frontal com alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada frontal com alavanca"
  },
  {
    "id": "remada_com_barra_curvada_para_tras",
    "name": "Remada com barra curvada para trás",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada com barra curvada para trás. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Remada com barra curvada para trás foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada com barra curvada para trás"
  },
  {
    "id": "remada_com_banda_de_resistencia_curvada_para_deltoides_posterior",
    "name": "Remada com banda de resistência curvada para deltoides posterior",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada com banda de resistência curvada para deltoides posterior. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Remada com banda de resistência curvada para deltoides posterior foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada com banda de resistência curvada para deltoides posterior"
  },
  {
    "id": "remada_lateral_com_halteres_sentado",
    "name": "Remada lateral com halteres sentado",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada lateral com halteres sentado. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Remada lateral com halteres sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada lateral com halteres sentado"
  },
  {
    "id": "remada_com_halteres_em_posicao_prancha",
    "name": "Remada com Halteres em Posição Prancha",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada com Halteres em Posição Prancha. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada com Halteres em Posição Prancha foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada com Halteres em Posição Prancha"
  },
  {
    "id": "remada_invertida_com_cable_inclinado",
    "name": "Remada invertida com cable inclinado",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada invertida com cable inclinado. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada invertida com cable inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada invertida com cable inclinado"
  },
  {
    "id": "remada_cruzada_no_cross",
    "name": "Remada cruzada no cross",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada cruzada no cross. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada cruzada no cross foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada cruzada no cross"
  },
  {
    "id": "remada_com_cabo_sentada_unilateral_com_torcao",
    "name": "Remada com Cabo Sentada Unilateral com Torção",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada com Cabo Sentada Unilateral com Torção. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada com Cabo Sentada Unilateral com Torção foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada com Cabo Sentada Unilateral com Torção"
  },
  {
    "id": "remada_em_y_com_cabo",
    "name": "Remada em Y com cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada em Y com cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada em Y com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada em Y com cabo"
  },
  {
    "id": "remada_com_o_peso_do_corpo_na_porta",
    "name": "Remada com o Peso do Corpo na Porta",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada com o Peso do Corpo na Porta. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Remada com o Peso do Corpo na Porta foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada com o Peso do Corpo na Porta"
  },
  {
    "id": "remada_de_deltoide_posterior_sentado_com_haltere",
    "name": "Remada de deltoide posterior sentado com haltere",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada de deltoide posterior sentado com haltere. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Remada de deltoide posterior sentado com haltere foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada de deltoide posterior sentado com haltere"
  },
  {
    "id": "rolagem_de_espuma_para_isquiotibiais",
    "name": "Rolagem de espuma para isquiotibiais",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rolagem de espuma para isquiotibiais. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rolagem de espuma para isquiotibiais foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rolagem de espuma para isquiotibiais"
  },
  {
    "id": "rolamento_de_espuma_nos_romboides",
    "name": "Rolamento de espuma nos romboides",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rolamento de espuma nos romboides. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rolamento de espuma nos romboides foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rolamento de espuma nos romboides"
  },
  {
    "id": "rosca_direta_com_barra",
    "name": "Rosca Direta com Barra",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Direta com Barra. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Direta com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Direta com Barra"
  },
  {
    "id": "rolamento_de_espuma_para_panturrilhas",
    "name": "Rolamento de Espuma para Panturrilhas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rolamento de Espuma para Panturrilhas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rolamento de Espuma para Panturrilhas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rolamento de Espuma para Panturrilhas"
  },
  {
    "id": "rolo_de_espuma_para_fascite_plantar",
    "name": "Rolo de espuma para fascite plantar",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rolo de espuma para fascite plantar. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rolo de espuma para fascite plantar foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rolo de espuma para fascite plantar"
  },
  {
    "id": "rolamento_na_bola_suica",
    "name": "Rolamento na bola suíça",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rolamento na bola suíça. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rolamento na bola suíça foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rolamento na bola suíça"
  },
  {
    "id": "rolinho_de_antebraco",
    "name": "Rolinho de antebraço",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rolinho de antebraço. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Rolinho de antebraço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rolinho de antebraço"
  },
  {
    "id": "rosca_banco_inclinado",
    "name": "Rosca Banco Inclinado",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Banco Inclinado. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Banco Inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Banco Inclinado"
  },
  {
    "id": "rosca_bilateral_com_cabo_em_banco_inclinado",
    "name": "Rosca Bilateral com Cabo em Banco Inclinado",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Bilateral com Cabo em Banco Inclinado. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Bilateral com Cabo em Banco Inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Bilateral com Cabo em Banco Inclinado"
  },
  {
    "id": "rolando_como_uma_bola",
    "name": "Rolando como uma Bola",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rolando como uma Bola. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rolando como uma Bola foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rolando como uma Bola"
  },
  {
    "id": "rolamento_de_espuma_nas_costas",
    "name": "Rolamento de espuma nas costas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rolamento de espuma nas costas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rolamento de espuma nas costas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rolamento de espuma nas costas"
  },
  {
    "id": "rolo_de_espuma_para_ombro_e_peito_frontal",
    "name": "Rolo de espuma para ombro e peito frontal",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rolo de espuma para ombro e peito frontal. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rolo de espuma para ombro e peito frontal foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rolo de espuma para ombro e peito frontal"
  },
  {
    "id": "remada_sentada_com_faixa",
    "name": "Remada sentada com faixa",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada sentada com faixa. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Remada sentada com faixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada sentada com faixa"
  },
  {
    "id": "rolamento_de_espuma_nos_quadriceps",
    "name": "Rolamento de espuma nos quadríceps",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rolamento de espuma nos quadríceps. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rolamento de espuma nos quadríceps foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rolamento de espuma nos quadríceps"
  },
  {
    "id": "rolo_de_espuma_para_os_gluteos",
    "name": "Rolo de Espuma para os Glúteos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rolo de Espuma para os Glúteos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rolo de Espuma para os Glúteos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rolo de Espuma para os Glúteos"
  },
  {
    "id": "remada_unilateral_com_barra_landmine",
    "name": "Remada unilateral com barra landmine",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada unilateral com barra landmine. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada unilateral com barra landmine foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada unilateral com barra landmine"
  },
  {
    "id": "rolo_de_espuma_ombro_posterior",
    "name": "Rolo de espuma ombro posterior",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rolo de espuma ombro posterior. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rolo de espuma ombro posterior foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rolo de espuma ombro posterior"
  },
  {
    "id": "remada_unilateral_com_gymstick",
    "name": "Remada unilateral com gymstick",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada unilateral com gymstick. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Remada unilateral com gymstick foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada unilateral com gymstick"
  },
  {
    "id": "remada_sentado_com_cabo_pegada_fechada",
    "name": "Remada sentado com cabo pegada fechada",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Remada sentado com cabo pegada fechada. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Remada sentado com cabo pegada fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Remada sentado com cabo pegada fechada"
  },
  {
    "id": "rosca_concentrada_com_pegada_fechada_sentado",
    "name": "Rosca Concentrada com Pegada Fechada Sentado",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Concentrada com Pegada Fechada Sentado. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Concentrada com Pegada Fechada Sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Concentrada com Pegada Fechada Sentado"
  },
  {
    "id": "rosca_alternada_com_halteres_sentado",
    "name": "Rosca alternada com halteres sentado",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca alternada com halteres sentado. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca alternada com halteres sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca alternada com halteres sentado"
  },
  {
    "id": "rosca_unilateral_com_cabo",
    "name": "Rosca Unilateral com Cabo",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Unilateral com Cabo. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Unilateral com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Unilateral com Cabo"
  },
  {
    "id": "rosca_scott_com_barra_w",
    "name": "Rosca Scott com Barra W",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Scott com Barra W. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Scott com Barra W foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Scott com Barra W"
  },
  {
    "id": "rosca_inversa_com_barra",
    "name": "Rosca Inversa com Barra",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Inversa com Barra. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Rosca Inversa com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Inversa com Barra"
  },
  {
    "id": "rosca_alternada_com_barra",
    "name": "Rosca alternada com barra",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca alternada com barra. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca alternada com barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca alternada com barra"
  },
  {
    "id": "rosca_direta_com_barra_em_pegada_fechada",
    "name": "Rosca Direta com Barra em Pegada Fechada",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Direta com Barra em Pegada Fechada. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Direta com Barra em Pegada Fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Direta com Barra em Pegada Fechada"
  },
  {
    "id": "rosca_scott_com_halteres_martelo_no_banco",
    "name": "Rosca Scott com Halteres Martelo no Banco",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Scott com Halteres Martelo no Banco. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Scott com Halteres Martelo no Banco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Scott com Halteres Martelo no Banco"
  },
  {
    "id": "rosca_inversa_com_halteres",
    "name": "Rosca Inversa com Halteres",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Inversa com Halteres. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Inversa com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Inversa com Halteres"
  },
  {
    "id": "rosca_scott_com_alavanca",
    "name": "Rosca Scott com Alavanca",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Scott com Alavanca. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Scott com Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Scott com Alavanca"
  },
  {
    "id": "rosca_direta_com_barra_no_colete_scott",
    "name": "Rosca Direta com Barra no colete scott",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Direta com Barra no colete scott. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Direta com Barra no colete scott foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Direta com Barra no colete scott"
  },
  {
    "id": "rosca_biceps_inclinada_com_halteres_sentado",
    "name": "Rosca bíceps inclinada com halteres sentado",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca bíceps inclinada com halteres sentado. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca bíceps inclinada com halteres sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca bíceps inclinada com halteres sentado"
  },
  {
    "id": "rosca_biceps_com_cabo_ajoelhado",
    "name": "Rosca bíceps com cabo ajoelhado",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca bíceps com cabo ajoelhado. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca bíceps com cabo ajoelhado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca bíceps com cabo ajoelhado"
  },
  {
    "id": "rosca_biceps_alta_com_halteres",
    "name": "Rosca bíceps alta com halteres",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca bíceps alta com halteres. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca bíceps alta com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca bíceps alta com halteres"
  },
  {
    "id": "rosca_zottman",
    "name": "Rosca Zottman",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Zottman. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Zottman foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Zottman"
  },
  {
    "id": "rosca_biceps_inclinada_com_cabos",
    "name": "Rosca bíceps inclinada com cabos",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca bíceps inclinada com cabos. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca bíceps inclinada com cabos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca bíceps inclinada com cabos"
  },
  {
    "id": "rosca_biceps_com_halteres",
    "name": "Rosca bíceps com halteres",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca bíceps com halteres. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca bíceps com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca bíceps com halteres"
  },
  {
    "id": "rosca_direta_com_barra_deitado_em_banco_alto",
    "name": "Rosca Direta com Barra deitado em Banco Alto",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Direta com Barra deitado em Banco Alto. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Direta com Barra deitado em Banco Alto foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Direta com Barra deitado em Banco Alto"
  },
  {
    "id": "rosca_biceps_com_pegada_fechada_na_barra_w",
    "name": "Rosca bíceps com pegada fechada na barra W",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca bíceps com pegada fechada na barra W. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca bíceps com pegada fechada na barra W foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca bíceps com pegada fechada na barra W"
  },
  {
    "id": "rosca_biceps_com_faixa_elastica",
    "name": "Rosca bíceps com faixa elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca bíceps com faixa elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rosca bíceps com faixa elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca bíceps com faixa elástica"
  },
  {
    "id": "rosca_direta_com_cabo_deitado",
    "name": "Rosca Direta com Cabo deitado",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca Direta com Cabo deitado. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca Direta com Cabo deitado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca Direta com Cabo deitado"
  },
  {
    "id": "rosca_biceps_sentado",
    "name": "Rosca bíceps sentado",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca bíceps sentado. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca bíceps sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca bíceps sentado"
  },
  {
    "id": "rosca_de_dedos_com_halteres",
    "name": "Rosca de Dedos com Halteres",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca de Dedos com Halteres. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Rosca de Dedos com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca de Dedos com Halteres"
  },
  {
    "id": "rosca_com_halteres_no_colete_scott",
    "name": "Rosca com halteres no colete scott",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca com halteres no colete scott. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca com halteres no colete scott foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca com halteres no colete scott"
  },
  {
    "id": "rosca_com_halteres",
    "name": "Rosca com halteres",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca com halteres. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca com halteres"
  },
  {
    "id": "rosca_concentrada",
    "name": "Rosca concentrada",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca concentrada. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca concentrada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca concentrada"
  },
  {
    "id": "rosca_de_biceps_com_alavanca",
    "name": "Rosca de bíceps com alavanca",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca de bíceps com alavanca. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca de bíceps com alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca de bíceps com alavanca"
  },
  {
    "id": "rosca_biceps_unilateral_com_pegada_invertida_em_cabo",
    "name": "Rosca bíceps unilateral com pegada invertida em cabo",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca bíceps unilateral com pegada invertida em cabo. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca bíceps unilateral com pegada invertida em cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca bíceps unilateral com pegada invertida em cabo"
  },
  {
    "id": "rosca_de_biceps_com_halteres_no_banco_scott",
    "name": "Rosca de Bíceps com Halteres no Banco Scott",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca de Bíceps com Halteres no Banco Scott. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca de Bíceps com Halteres no Banco Scott foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca de Bíceps com Halteres no Banco Scott"
  },
  {
    "id": "rosca_de_biceps_com_puxada_de_cabo",
    "name": "Rosca de Bíceps com Puxada de Cabo",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca de Bíceps com Puxada de Cabo. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca de Bíceps com Puxada de Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca de Bíceps com Puxada de Cabo"
  },
  {
    "id": "rosca_concentrada_unilateral_com_cabo",
    "name": "Rosca concentrada unilateral com cabo",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca concentrada unilateral com cabo. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca concentrada unilateral com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca concentrada unilateral com cabo"
  },
  {
    "id": "rosca_com_cabo_de_um_braco",
    "name": "Rosca com cabo de um braço",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca com cabo de um braço. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca com cabo de um braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca com cabo de um braço"
  },
  {
    "id": "rosca_de_punho_pegada_neutra_com_anilhas",
    "name": "Rosca de Punho Pegada Neutra com Anilhas",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca de Punho Pegada Neutra com Anilhas. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Rosca de Punho Pegada Neutra com Anilhas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca de Punho Pegada Neutra com Anilhas"
  },
  {
    "id": "rosca_de_punho_com_barra_atras_das_costas",
    "name": "Rosca de Punho com Barra Atrás das Costas",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca de Punho com Barra Atrás das Costas. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Rosca de Punho com Barra Atrás das Costas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca de Punho com Barra Atrás das Costas"
  },
  {
    "id": "rosca_de_punho_reversa_com_barra",
    "name": "Rosca de Punho Reversa com Barra",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca de Punho Reversa com Barra. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Rosca de Punho Reversa com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca de Punho Reversa com Barra"
  },
  {
    "id": "rosca_biceps_unilateral",
    "name": "Rosca bíceps unilateral",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca bíceps unilateral. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca bíceps unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca bíceps unilateral"
  },
  {
    "id": "rosca_biceps_unilateral_no_cabo_alto",
    "name": "Rosca bíceps unilateral no cabo alto",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca bíceps unilateral no cabo alto. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca bíceps unilateral no cabo alto foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca bíceps unilateral no cabo alto"
  },
  {
    "id": "rosca_com_polia_alta",
    "name": "Rosca com Polia Alta",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca com Polia Alta. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca com Polia Alta foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca com Polia Alta"
  },
  {
    "id": "rosca_concentrada_com_perna",
    "name": "Rosca concentrada com perna",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca concentrada com perna. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rosca concentrada com perna foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca concentrada com perna"
  },
  {
    "id": "rosca_com_barra",
    "name": "Rosca com barra",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca com barra. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca com barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca com barra"
  },
  {
    "id": "rosca_concentrada_com_cabo",
    "name": "Rosca concentrada com cabo",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca concentrada com cabo. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca concentrada com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca concentrada com cabo"
  },
  {
    "id": "rosca_martelo_com_faixa_de_resistencia",
    "name": "Rosca martelo com faixa de resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca martelo com faixa de resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rosca martelo com faixa de resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca martelo com faixa de resistência"
  },
  {
    "id": "rosca_scott_com_halteres",
    "name": "Rosca scott com halteres",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca scott com halteres. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca scott com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca scott com halteres"
  },
  {
    "id": "rosca_martelo",
    "name": "Rosca martelo",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca martelo. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca martelo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca martelo"
  },
  {
    "id": "rosca_de_biceps_unilateral_com_faixa_de_resistencia",
    "name": "Rosca de bíceps unilateral com faixa de resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca de bíceps unilateral com faixa de resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rosca de bíceps unilateral com faixa de resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca de bíceps unilateral com faixa de resistência"
  },
  {
    "id": "rosca_spider_unilateral",
    "name": "Rosca spider unilateral",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca spider unilateral. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca spider unilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca spider unilateral"
  },
  {
    "id": "rosca_no_cabo",
    "name": "Rosca no Cabo",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca no Cabo. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca no Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca no Cabo"
  },
  {
    "id": "rosca_scott_alternados_com_halteres",
    "name": "Rosca scott alternados com halteres",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca scott alternados com halteres. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca scott alternados com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca scott alternados com halteres"
  },
  {
    "id": "rosca_martelo_com_garrafa_de_agua",
    "name": "Rosca martelo com garrafa de água",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca martelo com garrafa de água. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rosca martelo com garrafa de água foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca martelo com garrafa de água"
  },
  {
    "id": "rosca_scott_unilateral_com_halteres",
    "name": "Rosca scott unilateral com halteres",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca scott unilateral com halteres. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca scott unilateral com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca scott unilateral com halteres"
  },
  {
    "id": "rosca_martelo_com_halteres_no_banco_scott",
    "name": "Rosca martelo com halteres no banco scott",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca martelo com halteres no banco scott. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca martelo com halteres no banco scott foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca martelo com halteres no banco scott"
  },
  {
    "id": "rosca_de_punho_com_barra",
    "name": "Rosca de punho com barra",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca de punho com barra. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Rosca de punho com barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca de punho com barra"
  },
  {
    "id": "rosca_spider_com_unico_haltere",
    "name": "Rosca spider com único haltere",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca spider com único haltere. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca spider com único haltere foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca spider com único haltere"
  },
  {
    "id": "rosca_direta_com_barra_w",
    "name": "Rosca direta com barra w",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca direta com barra w. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca direta com barra w foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca direta com barra w"
  },
  {
    "id": "rosca_pronada_no_banco_inclinado",
    "name": "Rosca pronada no banco inclinado",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca pronada no banco inclinado. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca pronada no banco inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca pronada no banco inclinado"
  },
  {
    "id": "rotacao_externa_de_quadril_com_faixa_elastica",
    "name": "Rotação Externa De Quadril Com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação Externa De Quadril Com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação Externa De Quadril Com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação Externa De Quadril Com Faixa Elástica"
  },
  {
    "id": "rosca_de_dedo_com_barra",
    "name": "Rosca de dedo com barra",
    "targetMuscles": [
      "Antebraço"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca de dedo com barra. Exercício focado principalmente em trabalhar antebraço.",
    "instructions": "O exercício Rosca de dedo com barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca de dedo com barra"
  },
  {
    "id": "rosca_martelo_com_halter_no_colete_scott",
    "name": "Rosca martelo com halter no colete scott",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca martelo com halter no colete scott. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca martelo com halter no colete scott foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca martelo com halter no colete scott"
  },
  {
    "id": "rosca_martelo_sentada",
    "name": "Rosca martelo sentada",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca martelo sentada. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca martelo sentada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca martelo sentada"
  },
  {
    "id": "rosca_inversa_com_barra_w",
    "name": "Rosca inversa com barra W",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca inversa com barra W. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca inversa com barra W foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca inversa com barra W"
  },
  {
    "id": "rosca_martelo_com_corda",
    "name": "Rosca martelo com corda",
    "targetMuscles": [
      "Biceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rosca martelo com corda. Exercício focado principalmente em trabalhar biceps.",
    "instructions": "O exercício Rosca martelo com corda foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rosca martelo com corda"
  },
  {
    "id": "rotacao_interna_do_quadril_sentado_com_faixa_elastica",
    "name": "Rotação Interna do Quadril Sentado com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação Interna do Quadril Sentado com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação Interna do Quadril Sentado com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação Interna do Quadril Sentado com Faixa Elástica"
  },
  {
    "id": "rotacao_externa_do_ombro_deitado_com_haltere",
    "name": "Rotação externa do ombro deitado com haltere",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação externa do ombro deitado com haltere. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação externa do ombro deitado com haltere foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação externa do ombro deitado com haltere"
  },
  {
    "id": "rotacao_interna_do_ombro",
    "name": "Rotação interna do ombro",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação interna do ombro. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação interna do ombro foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação interna do ombro"
  },
  {
    "id": "rotacao_externa_de_halteres_apoiada_no_banco",
    "name": "Rotação externa de halteres apoiada no banco",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação externa de halteres apoiada no banco. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação externa de halteres apoiada no banco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação externa de halteres apoiada no banco"
  },
  {
    "id": "rotacao_espinhal_deitado",
    "name": "Rotação espinhal deitado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação espinhal deitado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação espinhal deitado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação espinhal deitado"
  },
  {
    "id": "rotacao_externa_de_ombro_com_faixa_elastica",
    "name": "Rotação externa de ombro com faixa elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação externa de ombro com faixa elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação externa de ombro com faixa elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação externa de ombro com faixa elástica"
  },
  {
    "id": "rotacao_interna_do_ombro_sentada_com_cabo",
    "name": "Rotação interna do ombro sentada com cabo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação interna do ombro sentada com cabo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação interna do ombro sentada com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação interna do ombro sentada com cabo"
  },
  {
    "id": "rotacao_de_pe_e_tornozelo",
    "name": "Rotação de Pé e Tornozelo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação de Pé e Tornozelo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação de Pé e Tornozelo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação de Pé e Tornozelo"
  },
  {
    "id": "rotacao_externa_de_quadril_sentado_com_faixa_elastica",
    "name": "Rotação Externa de Quadril Sentado com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação Externa de Quadril Sentado com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação Externa de Quadril Sentado com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação Externa de Quadril Sentado com Faixa Elástica"
  },
  {
    "id": "rotacao_externa_com_cabo_a_90_graus",
    "name": "Rotação externa com cabo a 90 graus",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação externa com cabo a 90 graus. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação externa com cabo a 90 graus foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação externa com cabo a 90 graus"
  },
  {
    "id": "rotacao_interna_de_ombro_com_cabo",
    "name": "Rotação interna de ombro com cabo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação interna de ombro com cabo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação interna de ombro com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação interna de ombro com cabo"
  },
  {
    "id": "rotacao_externa_do_ombro",
    "name": "Rotação externa do ombro",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação externa do ombro. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação externa do ombro foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação externa do ombro"
  },
  {
    "id": "rotacao_para_tras_de_joelhos",
    "name": "Rotação para trás de joelhos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação para trás de joelhos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação para trás de joelhos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação para trás de joelhos"
  },
  {
    "id": "rotacao_em_pe",
    "name": "Rotação em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação em Pé"
  },
  {
    "id": "rotacao_externa_de_ombro_com_cabo",
    "name": "Rotação Externa de Ombro com Cabo",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação Externa de Ombro com Cabo. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação Externa de Ombro com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação Externa de Ombro com Cabo"
  },
  {
    "id": "rotacao_do_corpo_superior_deitado",
    "name": "Rotação do corpo superior deitado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação do corpo superior deitado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação do corpo superior deitado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação do corpo superior deitado"
  },
  {
    "id": "rotacao_interna_de_cabo_a_90_graus",
    "name": "Rotação interna de cabo a 90 graus",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação interna de cabo a 90 graus. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação interna de cabo a 90 graus foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação interna de cabo a 90 graus"
  },
  {
    "id": "rotacao_externa_do_pe_com_faixa_elastica",
    "name": "Rotação Externa do Pé com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação Externa do Pé com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação Externa do Pé com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação Externa do Pé com Faixa Elástica"
  },
  {
    "id": "rotacao_da_coluna_toracica_de_joelhos",
    "name": "Rotação da coluna torácica de joelhos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação da coluna torácica de joelhos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação da coluna torácica de joelhos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação da coluna torácica de joelhos"
  },
  {
    "id": "rotacao_externa_com_cabo_em_posicao_de_joelhos",
    "name": "Rotação externa com cabo em posição de joelhos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Rotação externa com cabo em posição de joelhos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Rotação externa com cabo em posição de joelhos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Rotação externa com cabo em posição de joelhos"
  },
  {
    "id": "soco_direto_de_direita",
    "name": "Soco direto de direita",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Soco direto de direita. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Soco direto de direita foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Soco direto de direita"
  },
  {
    "id": "socos",
    "name": "Socos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Socos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Socos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Socos"
  },
  {
    "id": "salto_com_halteres_dividido",
    "name": "Salto com halteres dividido",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Salto com halteres dividido. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Salto com halteres dividido foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Salto com halteres dividido"
  },
  {
    "id": "saltos_pliometricos_em_zigue_zague",
    "name": "Saltos Pliométricos em Zigue-Zague",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Saltos Pliométricos em Zigue-Zague. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Saltos Pliométricos em Zigue-Zague foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Saltos Pliométricos em Zigue-Zague"
  },
  {
    "id": "salto_na_caixa_para_agachamento_pistola",
    "name": "Salto na Caixa para Agachamento Pistola",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Salto na Caixa para Agachamento Pistola. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Salto na Caixa para Agachamento Pistola foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Salto na Caixa para Agachamento Pistola"
  },
  {
    "id": "saltos_com_joelhos_altos",
    "name": "Saltos com Joelhos Altos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Saltos com Joelhos Altos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Saltos com Joelhos Altos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Saltos com Joelhos Altos"
  },
  {
    "id": "saltos_potentes",
    "name": "Saltos Potentes",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Saltos Potentes. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Saltos Potentes foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Saltos Potentes"
  },
  {
    "id": "saltos_em_tesoura",
    "name": "Saltos em tesoura",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Saltos em tesoura. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Saltos em tesoura foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Saltos em tesoura"
  },
  {
    "id": "salto_na_caixa",
    "name": "Salto na Caixa",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Salto na Caixa. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Salto na Caixa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Salto na Caixa"
  },
  {
    "id": "salto_em_caixa_com_uma_perna",
    "name": "Salto em Caixa com uma Perna",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Salto em Caixa com uma Perna. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Salto em Caixa com uma Perna foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Salto em Caixa com uma Perna"
  },
  {
    "id": "step_com_elastico",
    "name": "Step com elástico",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Step com elástico. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Step com elástico foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Step com elástico"
  },
  {
    "id": "salto_em_distancia",
    "name": "Salto em Distância",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Salto em Distância. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Salto em Distância foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Salto em Distância"
  },
  {
    "id": "salto_para_tras",
    "name": "Salto para Trás",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Salto para Trás. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Salto para Trás foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Salto para Trás"
  },
  {
    "id": "salto_em_uma_perna_para_a_frente",
    "name": "Salto em Uma Perna para a Frente",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Salto em Uma Perna para a Frente. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Salto em Uma Perna para a Frente foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Salto em Uma Perna para a Frente"
  },
  {
    "id": "serrote",
    "name": "Serrote",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Serrote. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Serrote foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Serrote"
  },
  {
    "id": "salto_com_joelhos_flexionados",
    "name": "Salto com Joelhos Flexionados",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Salto com Joelhos Flexionados. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Salto com Joelhos Flexionados foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Salto com Joelhos Flexionados"
  },
  {
    "id": "snap_jumps",
    "name": "Snap Jumps",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Snap Jumps. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Snap Jumps foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Snap Jumps"
  },
  {
    "id": "saltos_de_afastamento",
    "name": "Saltos de afastamento",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Saltos de afastamento. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Saltos de afastamento foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Saltos de afastamento"
  },
  {
    "id": "salto_para_caixa_2_para_1",
    "name": "Salto para Caixa 2 para 1",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Salto para Caixa 2 para 1. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Salto para Caixa 2 para 1 foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Salto para Caixa 2 para 1"
  },
  {
    "id": "salto_em_agachamento_com_joelhos_flexionados",
    "name": "Salto em Agachamento com Joelhos Flexionados",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Salto em Agachamento com Joelhos Flexionados. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Salto em Agachamento com Joelhos Flexionados foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Salto em Agachamento com Joelhos Flexionados"
  },
  {
    "id": "supino_declinado_com_halteres",
    "name": "Supino Declinado com Halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Declinado com Halteres. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Declinado com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Declinado com Halteres"
  },
  {
    "id": "supino_declinado_unilateral_pegada_martelo_com_haltere",
    "name": "Supino Declinado Unilateral Pegada Martelo com Haltere",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Declinado Unilateral Pegada Martelo com Haltere. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Declinado Unilateral Pegada Martelo com Haltere foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Declinado Unilateral Pegada Martelo com Haltere"
  },
  {
    "id": "superman",
    "name": "Superman",
    "targetMuscles": [
      "Posterior"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Superman. Exercício focado principalmente em trabalhar posterior.",
    "instructions": "O exercício Superman foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Superman"
  },
  {
    "id": "supino_unilateral_no_cabo",
    "name": "Supino Unilateral no Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Unilateral no Cabo. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Unilateral no Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Unilateral no Cabo"
  },
  {
    "id": "supino_invertido_com_pegada_fechada",
    "name": "Supino Invertido com Pegada Fechada",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Invertido com Pegada Fechada. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Supino Invertido com Pegada Fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Invertido com Pegada Fechada"
  },
  {
    "id": "supino_inclinado_com_halteres_em_martelo",
    "name": "Supino Inclinado com Halteres em Martelo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Inclinado com Halteres em Martelo. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Inclinado com Halteres em Martelo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Halteres em Martelo"
  },
  {
    "id": "supino_reto",
    "name": "Supino Reto",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Reto. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Reto foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Reto"
  },
  {
    "id": "subida_no_step_com_elevacao_de_joelhos",
    "name": "Subida no Step com Elevação de Joelhos",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Subida no Step com Elevação de Joelhos. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Subida no Step com Elevação de Joelhos foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Subida no Step com Elevação de Joelhos"
  },
  {
    "id": "stiff_unilateral_com_halteres",
    "name": "Stiff Unilateral com Halteres",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Stiff Unilateral com Halteres. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Stiff Unilateral com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Stiff Unilateral com Halteres"
  },
  {
    "id": "stiff_unilateral_com_barra",
    "name": "Stiff Unilateral com Barra",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Stiff Unilateral com Barra. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Stiff Unilateral com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Stiff Unilateral com Barra"
  },
  {
    "id": "supino_alternado_com_halteres",
    "name": "Supino Alternado com Halteres",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Alternado com Halteres. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Alternado com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Alternado com Halteres"
  },
  {
    "id": "supino_unilateral_com_halteres_com_pegada_reversa",
    "name": "Supino Unilateral com Halteres com Pegada Reversa",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Unilateral com Halteres com Pegada Reversa. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Unilateral com Halteres com Pegada Reversa foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Unilateral com Halteres com Pegada Reversa"
  },
  {
    "id": "subida_na_corda_sem_pernas",
    "name": "Subida na Corda sem Pernas",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Subida na Corda sem Pernas. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Subida na Corda sem Pernas foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Subida na Corda sem Pernas"
  },
  {
    "id": "supino_inclinado_na_maquina_com_pegada_martelo",
    "name": "Supino Inclinado na Máquina com Pegada Martelo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Inclinado na Máquina com Pegada Martelo. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Inclinado na Máquina com Pegada Martelo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado na Máquina com Pegada Martelo"
  },
  {
    "id": "supino_inclinado_com_halteres_e_pegada_invertida",
    "name": "Supino Inclinado com Halteres e Pegada Invertida",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Inclinado com Halteres e Pegada Invertida. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Inclinado com Halteres e Pegada Invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado com Halteres e Pegada Invertida"
  },
  {
    "id": "supino_inclinado_na_alavanca",
    "name": "Supino Inclinado na Alavanca",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Inclinado na Alavanca. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Inclinado na Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Inclinado na Alavanca"
  },
  {
    "id": "stiff_com_elastico_de_resistencia",
    "name": "Stiff com Elástico de Resistência",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Stiff com Elástico de Resistência. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Stiff com Elástico de Resistência foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Stiff com Elástico de Resistência"
  },
  {
    "id": "supino_reto_na_maquina",
    "name": "Supino Reto na Máquina",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Reto na Máquina. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino Reto na Máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Reto na Máquina"
  },
  {
    "id": "supino_fechado",
    "name": "Supino Fechado",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino Fechado. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Supino Fechado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino Fechado"
  },
  {
    "id": "stiff_com_halter",
    "name": "Stiff com Halter",
    "targetMuscles": [
      "Quadriceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Stiff com Halter. Exercício focado principalmente em trabalhar quadriceps.",
    "instructions": "O exercício Stiff com Halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Stiff com Halter"
  },
  {
    "id": "supino_com_alavanca",
    "name": "Supino com Alavanca",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino com Alavanca. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com Alavanca"
  },
  {
    "id": "supino_com_cabo_sentado",
    "name": "Supino com cabo sentado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino com cabo sentado. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com cabo sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com cabo sentado"
  },
  {
    "id": "supino_com_halteres_pegada_invertida",
    "name": "Supino com Halteres Pegada Invertida",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino com Halteres Pegada Invertida. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com Halteres Pegada Invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com Halteres Pegada Invertida"
  },
  {
    "id": "supino_com_kettlebell_no_chao",
    "name": "Supino com kettlebell no chão",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino com kettlebell no chão. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com kettlebell no chão foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com kettlebell no chão"
  },
  {
    "id": "supino_com_halteres_com_pegada_fechada",
    "name": "Supino com halteres com pegada fechada",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino com halteres com pegada fechada. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com halteres com pegada fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com halteres com pegada fechada"
  },
  {
    "id": "supino_declinado_na_maquina_smith",
    "name": "Supino declinado na máquina Smith",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino declinado na máquina Smith. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino declinado na máquina Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino declinado na máquina Smith"
  },
  {
    "id": "supino_declinado_pegada_martelo",
    "name": "Supino declinado pegada martelo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino declinado pegada martelo. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino declinado pegada martelo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino declinado pegada martelo"
  },
  {
    "id": "supino_inclinado_com_halteres_e_pegada_fechada",
    "name": "Supino inclinado com halteres e pegada fechada",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino inclinado com halteres e pegada fechada. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino inclinado com halteres e pegada fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino inclinado com halteres e pegada fechada"
  },
  {
    "id": "supino_com_pegada_aberta",
    "name": "Supino com pegada aberta",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino com pegada aberta. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com pegada aberta foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com pegada aberta"
  },
  {
    "id": "supino_inclinado_com_cabo",
    "name": "Supino inclinado com cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino inclinado com cabo. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino inclinado com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino inclinado com cabo"
  },
  {
    "id": "supino_declinada_com_alavanca",
    "name": "Supino declinada com alavanca",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino declinada com alavanca. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino declinada com alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino declinada com alavanca"
  },
  {
    "id": "supino_com_pegada_fechada",
    "name": "Supino com pegada fechada",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino com pegada fechada. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com pegada fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com pegada fechada"
  },
  {
    "id": "supino_com_barra_declinado",
    "name": "Supino com barra declinado",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino com barra declinado. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com barra declinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com barra declinado"
  },
  {
    "id": "supino_declinada_na_maquina",
    "name": "Supino declinada na máquina",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino declinada na máquina. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino declinada na máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino declinada na máquina"
  },
  {
    "id": "supino_com_kettlebell_de_um_braco",
    "name": "Supino com kettlebell de um braço",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino com kettlebell de um braço. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com kettlebell de um braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com kettlebell de um braço"
  },
  {
    "id": "supino_com_pegada_fechada_sentado_com_cabo",
    "name": "Supino com Pegada Fechada Sentado com Cabo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino com Pegada Fechada Sentado com Cabo. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com Pegada Fechada Sentado com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com Pegada Fechada Sentado com Cabo"
  },
  {
    "id": "supino_com_haltere_pegada_fechada",
    "name": "Supino com haltere pegada fechada",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino com haltere pegada fechada. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com haltere pegada fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com haltere pegada fechada"
  },
  {
    "id": "supino_inclinado_com_pegada_fechada",
    "name": "Supino inclinado com pegada fechada",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino inclinado com pegada fechada. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino inclinado com pegada fechada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino inclinado com pegada fechada"
  },
  {
    "id": "supino_em_pe_com_faixa_elastica",
    "name": "Supino em Pé com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino em Pé com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Supino em Pé com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino em Pé com Faixa Elástica"
  },
  {
    "id": "supino_com_banco_inclinado_no_smith",
    "name": "Supino com banco inclinado no Smith",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino com banco inclinado no Smith. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino com banco inclinado no Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino com banco inclinado no Smith"
  },
  {
    "id": "swimming",
    "name": "Swimming",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Swimming. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Swimming foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Swimming"
  },
  {
    "id": "toque_lateral_dos_dedos_dos_pes_em_pe",
    "name": "Toque Lateral dos Dedos dos Pés em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Toque Lateral dos Dedos dos Pés em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Toque Lateral dos Dedos dos Pés em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Toque Lateral dos Dedos dos Pés em Pé"
  },
  {
    "id": "supino_pegada_martelo",
    "name": "Supino pegada martelo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino pegada martelo. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino pegada martelo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino pegada martelo"
  },
  {
    "id": "supino_reto_em_pe_no_cross_over",
    "name": "Supino reto em pé no cross over",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino reto em pé no cross over. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino reto em pé no cross over foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino reto em pé no cross over"
  },
  {
    "id": "toques_de_dedos_em_pe",
    "name": "Toques de Dedos em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Toques de Dedos em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Toques de Dedos em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Toques de Dedos em Pé"
  },
  {
    "id": "supino_na_maquina_smith",
    "name": "Supino na máquina Smith",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino na máquina Smith. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino na máquina Smith foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino na máquina Smith"
  },
  {
    "id": "tesoura_de_bracos",
    "name": "Tesoura de Braços",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tesoura de Braços. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Tesoura de Braços foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tesoura de Braços"
  },
  {
    "id": "suspensao_passiva",
    "name": "Suspensão Passiva",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Suspensão Passiva. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Suspensão Passiva foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Suspensão Passiva"
  },
  {
    "id": "supino_no_banco_inclinado_30_graus_com_pegada_invertida",
    "name": "Supino no banco inclinado 30 graus com pegada invertida",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino no banco inclinado 30 graus com pegada invertida. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino no banco inclinado 30 graus com pegada invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino no banco inclinado 30 graus com pegada invertida"
  },
  {
    "id": "supino_invertido_com_pegada_aberta",
    "name": "Supino invertido com pegada aberta",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino invertido com pegada aberta. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino invertido com pegada aberta foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino invertido com pegada aberta"
  },
  {
    "id": "swing_de_kettlebell",
    "name": "Swing de kettlebell",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Swing de kettlebell. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Swing de kettlebell foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Swing de kettlebell"
  },
  {
    "id": "supino_na_maquina",
    "name": "Supino na máquina",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino na máquina. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino na máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino na máquina"
  },
  {
    "id": "toque_nos_dedos_dos_pes_em_pe",
    "name": "Toque nos Dedos dos Pés em Pé",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Toque nos Dedos dos Pés em Pé. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Toque nos Dedos dos Pés em Pé foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Toque nos Dedos dos Pés em Pé"
  },
  {
    "id": "swing_360",
    "name": "Swing 360",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Swing 360. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Swing 360 foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Swing 360"
  },
  {
    "id": "swing_de_kettlebell_de_um_braco",
    "name": "Swing de kettlebell de um braço",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Swing de kettlebell de um braço. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Swing de kettlebell de um braço foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Swing de kettlebell de um braço"
  },
  {
    "id": "supino_na_maquina_para_miolo_do_peitoral",
    "name": "Supino na Máquina para Miolo do Peitoral",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino na Máquina para Miolo do Peitoral. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino na Máquina para Miolo do Peitoral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino na Máquina para Miolo do Peitoral"
  },
  {
    "id": "supino_inclinado_na_maquina",
    "name": "Supino inclinado na máquina",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino inclinado na máquina. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino inclinado na máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino inclinado na máquina"
  },
  {
    "id": "supino_unilateral_com_alavanca",
    "name": "Supino unilateral com Alavanca",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino unilateral com Alavanca. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino unilateral com Alavanca foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino unilateral com Alavanca"
  },
  {
    "id": "supino_no_smith_com_o_triangulo",
    "name": "Supino no smith com o triângulo",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Supino no smith com o triângulo. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Supino no smith com o triângulo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Supino no smith com o triângulo"
  },
  {
    "id": "toque_nos_dedos_dos_pes_sentado",
    "name": "Toque nos Dedos dos Pés Sentado",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Toque nos Dedos dos Pés Sentado. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Toque nos Dedos dos Pés Sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Toque nos Dedos dos Pés Sentado"
  },
  {
    "id": "triceps_coice_com_cabo",
    "name": "Tríceps Coice com Cabo",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps Coice com Cabo. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps Coice com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps Coice com Cabo"
  },
  {
    "id": "triceps_frances_no_banco_inclinado_com_halter",
    "name": "Tríceps francês no banco inclinado com halter",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps francês no banco inclinado com halter. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps francês no banco inclinado com halter foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps francês no banco inclinado com halter"
  },
  {
    "id": "triceps_frances_na_polia_com_corda",
    "name": "Tríceps francês na polia com corda",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps francês na polia com corda. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps francês na polia com corda foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps francês na polia com corda"
  },
  {
    "id": "triceps_testa_com_faixa_elastica",
    "name": "Tríceps Testa com Faixa Elástica",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps Testa com Faixa Elástica. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Tríceps Testa com Faixa Elástica foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps Testa com Faixa Elástica"
  },
  {
    "id": "triceps_no_banco",
    "name": "Tríceps no Banco",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps no Banco. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps no Banco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps no Banco"
  },
  {
    "id": "triceps_testa_com_banco_declinado_com_halteres",
    "name": "Tríceps Testa com Banco Declinado com Halteres",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps Testa com Banco Declinado com Halteres. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps Testa com Banco Declinado com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps Testa com Banco Declinado com Halteres"
  },
  {
    "id": "triceps_frances_com_faixa_elastica_acima_da_cabeca",
    "name": "Tríceps Francês com Faixa Elástica Acima da Cabeça",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps Francês com Faixa Elástica Acima da Cabeça. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Tríceps Francês com Faixa Elástica Acima da Cabeça foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps Francês com Faixa Elástica Acima da Cabeça"
  },
  {
    "id": "triceps_coice_com_halteres",
    "name": "Tríceps Coice com Halteres",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps Coice com Halteres. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps Coice com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps Coice com Halteres"
  },
  {
    "id": "triceps_testa_com_barra_pegada_invertida",
    "name": "Tríceps Testa com Barra Pegada Invertida",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps Testa com Barra Pegada Invertida. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps Testa com Barra Pegada Invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps Testa com Barra Pegada Invertida"
  },
  {
    "id": "triceps_frances_alternada_com_halteres_no_banco_inclinado",
    "name": "Tríceps Francês Alternada com Halteres no Banco Inclinado",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps Francês Alternada com Halteres no Banco Inclinado. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps Francês Alternada com Halteres no Banco Inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps Francês Alternada com Halteres no Banco Inclinado"
  },
  {
    "id": "triceps_frances_com_barra_w_acima_da_cabeca_sentado",
    "name": "Tríceps francês com barra W acima da cabeça sentado",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps francês com barra W acima da cabeça sentado. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps francês com barra W acima da cabeça sentado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps francês com barra W acima da cabeça sentado"
  },
  {
    "id": "triceps_frances_com_halteres",
    "name": "Tríceps Francês com Halteres",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps Francês com Halteres. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps Francês com Halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps Francês com Halteres"
  },
  {
    "id": "triceps_no_banco_1",
    "name": "Tríceps no Banco(1)",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps no Banco(1). Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps no Banco(1) foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps no Banco(1)"
  },
  {
    "id": "triceps_pulley_barra_v",
    "name": "Tríceps Pulley barra V",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps Pulley barra V. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps Pulley barra V foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps Pulley barra V"
  },
  {
    "id": "triceps_frances_com_halter_bilateral",
    "name": "Tríceps Francês com Halter Bilateral",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps Francês com Halter Bilateral. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps Francês com Halter Bilateral foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps Francês com Halter Bilateral"
  },
  {
    "id": "triceps_frances_unilateral_no_cabo",
    "name": "Tríceps francês unilateral no cabo",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps francês unilateral no cabo. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps francês unilateral no cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps francês unilateral no cabo"
  },
  {
    "id": "triceps_frances_em_pe_com_gymstick",
    "name": "Tríceps Francês em Pé com Gymstick",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps Francês em Pé com Gymstick. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Tríceps Francês em Pé com Gymstick foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps Francês em Pé com Gymstick"
  },
  {
    "id": "torcao_obliqua_sentada",
    "name": "Torção Oblíqua Sentada",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Torção Oblíqua Sentada. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Torção Oblíqua Sentada foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Torção Oblíqua Sentada"
  },
  {
    "id": "torcoes_do_cotovelo_para_o_joelho",
    "name": "Torções do Cotovelo para o Joelho",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Torções do Cotovelo para o Joelho. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Torções do Cotovelo para o Joelho foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Torções do Cotovelo para o Joelho"
  },
  {
    "id": "tracao_lateral_com_elastico",
    "name": "Tração lateral com elástico",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tração lateral com elástico. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Tração lateral com elástico foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tração lateral com elástico"
  },
  {
    "id": "wall_sit_com_inclinacao_de_tronco",
    "name": "Wall Sit com Inclinação de Tronco",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Wall Sit com Inclinação de Tronco. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Wall Sit com Inclinação de Tronco foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Wall Sit com Inclinação de Tronco"
  },
  {
    "id": "voador_no_pec_deck",
    "name": "Voador no pec deck",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Voador no pec deck. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Voador no pec deck foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Voador no pec deck"
  },
  {
    "id": "elevacao_frontal_com_cabo_duplo_no_cross",
    "name": "elevação frontal com cabo duplo no cross",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "elevação frontal com cabo duplo no cross. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício elevação frontal com cabo duplo no cross foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "elevação frontal com cabo duplo no cross"
  },
  {
    "id": "wall_sit",
    "name": "Wall Sit",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Wall Sit. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Wall Sit foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Wall Sit"
  },
  {
    "id": "voador_na_maquina",
    "name": "Voador na Máquina",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Voador na Máquina. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Voador na Máquina foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Voador na Máquina"
  },
  {
    "id": "triceps_testa_com_barra",
    "name": "Tríceps testa com barra",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps testa com barra. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps testa com barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps testa com barra"
  },
  {
    "id": "virar_pneu",
    "name": "Virar Pneu",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Virar Pneu. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício Virar Pneu foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Virar Pneu"
  },
  {
    "id": "triceps_pulley_corda",
    "name": "Tríceps pulley corda",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps pulley corda. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps pulley corda foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps pulley corda"
  },
  {
    "id": "triceps_pulley_barra",
    "name": "Tríceps pulley barra",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps pulley barra. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps pulley barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps pulley barra"
  },
  {
    "id": "voador_invertido",
    "name": "Voador invertido",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Voador invertido. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Voador invertido foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Voador invertido"
  },
  {
    "id": "v_up_com_bola_de_estabilidade",
    "name": "V-Up com Bola de Estabilidade",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "V-Up com Bola de Estabilidade. Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício V-Up com Bola de Estabilidade foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "V-Up com Bola de Estabilidade"
  },
  {
    "id": "voador_unilateral_no_solo_com_barra",
    "name": "Voador unilateral no Solo com Barra",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Voador unilateral no Solo com Barra. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Voador unilateral no Solo com Barra foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Voador unilateral no Solo com Barra"
  },
  {
    "id": "triceps_pulley_pegada_invertida",
    "name": "Tríceps pulley pegada invertida",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps pulley pegada invertida. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps pulley pegada invertida foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps pulley pegada invertida"
  },
  {
    "id": "voador_na_maquina_para_deltoides_posteriores",
    "name": "Voador na Máquina para Deltoides Posteriores",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Voador na Máquina para Deltoides Posteriores. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Voador na Máquina para Deltoides Posteriores foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Voador na Máquina para Deltoides Posteriores"
  },
  {
    "id": "remada_invertida_com_halteres_inclinado",
    "name": "remada invertida com halteres inclinado",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "remada invertida com halteres inclinado. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício remada invertida com halteres inclinado foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "remada invertida com halteres inclinado"
  },
  {
    "id": "voador_para_deltoides_posterior_com_cabo",
    "name": "Voador para deltoides posterior com cabo",
    "targetMuscles": [
      "Ombro"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Voador para deltoides posterior com cabo. Exercício focado principalmente em trabalhar ombro.",
    "instructions": "O exercício Voador para deltoides posterior com cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Voador para deltoides posterior com cabo"
  },
  {
    "id": "voador_com_halteres_para_cima",
    "name": "Voador com Halteres para Cima",
    "targetMuscles": [
      "Peito"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Voador com Halteres para Cima. Exercício focado principalmente em trabalhar peito.",
    "instructions": "O exercício Voador com Halteres para Cima foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Voador com Halteres para Cima"
  },
  {
    "id": "aducao_de_pernas_alongamento_do_adutor_maior",
    "name": "adução de pernas (alongamento do adutor maior)",
    "targetMuscles": [
      "Corpo todo"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "adução de pernas (alongamento do adutor maior). Exercício focado principalmente em trabalhar corpo todo.",
    "instructions": "O exercício adução de pernas (alongamento do adutor maior) foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "adução de pernas (alongamento do adutor maior)"
  },
  {
    "id": "triceps_testa_pegada_neutra_com_halteres",
    "name": "Tríceps testa pegada neutra com halteres",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Tríceps testa pegada neutra com halteres. Exercício focado principalmente em trabalhar triceps.",
    "instructions": "O exercício Tríceps testa pegada neutra com halteres foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Tríceps testa pegada neutra com halteres"
  },
  {
    "id": "voador_de_deltoides_posterior_com_cabo",
    "name": "Voador de Deltoides Posterior com Cabo",
    "targetMuscles": [
      "Costas"
    ],
    "equipment": "Peso Corporal",
    "difficulty": "Intermediário",
    "description": "Voador de Deltoides Posterior com Cabo. Exercício focado principalmente em trabalhar costas.",
    "instructions": "O exercício Voador de Deltoides Posterior com Cabo foca em trabalhar fortemente os músculos alvo. Mantenha a forma correta e execute o movimento na amplitude completa para extrair o máximo do exercício.",
    "commonErrors": [
      "Amplitude de movimento incompleta",
      "Postura incorreta",
      "Balanço desnecessário do corpo"
    ],
    "substitutions": [],
    "gifPlaceholder": "Voador de Deltoides Posterior com Cabo"
  }
];
