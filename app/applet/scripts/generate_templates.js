const fs = require('fs');

const extraTemplates = [];

// Emagrecimento 2-15
for (let i = 2; i <= 15; i++) {
   const daysCount = i <= 5 ? 5 : i <= 10 ? 6 : 7;
   extraTemplates.push(`  {
    "phaseName": "Treino 61: Emagrecimento & Definição EM${i.toString().padStart(2, '0')}",
    "planPromptDescription": "Plano otimizado para queima calórica e manutenção de massa magra - Variante ${i}.",
    "schedule": [
      {
        "dayName": "Segunda-feira",
        "focus": "Peito + Tríceps + Core",
        "isRest": false,
        "intensity": "Alta",
        "exercises": [
          {"id": "supino_reto_halter","name": "Supino reto halter","sets": 4,"reps": "10-15","restSeconds": 60,"targetMuscles": ["Peitoral"]},
          {"id": "supino_inclinado_maquina","name": "Supino inclinado máquina","sets": 3,"reps": "12-15","restSeconds": 60,"targetMuscles": ["Peitoral"]},
          {"id": "triceps_pulley_cabo","name": "Tríceps pulley cabo","sets": 4,"reps": "12-15","restSeconds": 45,"targetMuscles": ["Tríceps"]}
        ]
      },
      {
        "dayName": "Terça-feira",
        "focus": "Pernas",
        "isRest": false,
        "intensity": "Extrema",
        "exercises": [
          {"id": "agachamento_livre","name": "Agachamento livre","sets": 4,"reps": "10-12","restSeconds": 90,"targetMuscles": ["Pernas"]},
          {"id": "leg_press_maquina","name": "Leg press máquina","sets": 4,"reps": "12-15","restSeconds": 90,"targetMuscles": ["Pernas"]}
        ]
      },
      {
        "dayName": "Quarta-feira",
        "focus": "Costas + Bíceps",
        "isRest": false,
        "intensity": "Alta",
        "exercises": [
          {"id": "puxada_alta_maquina","name": "Puxada alta máquina","sets": 4,"reps": "10-15","restSeconds": 60,"targetMuscles": ["Costas"]},
          {"id": "rosca_direta_cabo","name": "Rosca direta cabo","sets": 4,"reps": "12-15","restSeconds": 45,"targetMuscles": ["Bíceps"]}
        ]
      },
      {
        "dayName": "Quinta-feira",
        "focus": "Ombros + Abdômen",
        "isRest": false,
        "intensity": "Alta",
        "exercises": [
          {"id": "desenvolvimento_maquina","name": "Desenvolvimento máquina","sets": 4,"reps": "10-15","restSeconds": 60,"targetMuscles": ["Ombros"]},
          {"id": "prancha","name": "Prancha","sets": 4,"reps": "60s","restSeconds": 45,"targetMuscles": ["Abdômen"]}
        ]
      },
      {
        "dayName": "Sexta-feira",
        "focus": "Full Body Metabólico",
        "isRest": false,
        "intensity": "Muito Alta",
        "exercises": [
          {"id": "burpee","name": "Burpee","sets": 4,"reps": "15","restSeconds": 60,"targetMuscles": ["Corpo Inteiro"]},
          {"id": "kettlebell_swing","name": "Kettlebell Swing","sets": 4,"reps": "20","restSeconds": 60,"targetMuscles": ["Corpo Inteiro"]}
        ]
      },
      {
        "dayName": "Sábado",
        "focus": "Cardio/HIIT",
        "isRest": ${daysCount < 6},
        "intensity": "${daysCount < 6 ? 'Nenhuma' : 'Média'}",
        "exercises": ${daysCount < 6 ? '[]' : '[{"id": "esteira_hiit","name": "Esteira HIIT","sets": 1,"reps": "25min","restSeconds": 0,"targetMuscles": ["Cardio"]}]'}
      },
      {
        "dayName": "Domingo",
        "focus": "Recuperação Ativa",
        "isRest": ${daysCount < 7},
        "intensity": "${daysCount < 7 ? 'Nenhuma' : 'Baixa'}",
        "exercises": ${daysCount < 7 ? '[]' : '[{"id": "caminhada","name": "Caminhada","sets": 1,"reps": "45min","restSeconds": 0,"targetMuscles": ["Cardio"]}]'}
      }
    ]
  }`);
}

// Hipertrofia 1-15 (since only HI01 is generated for hyperbole? HI is not yet generated, or is it?)
for (let i = 1; i <= 15; i++) {
   const daysCount = i <= 5 ? 4 : i <= 10 ? 5 : 6;
   extraTemplates.push(`  {
    "phaseName": "Treino 62: Hipertrofia HI${i.toString().padStart(2, '0')}",
    "planPromptDescription": "Plano otimizado para hipertrofia máxima - Variante ${i}.",
    "schedule": [
      {
        "dayName": "Segunda-feira",
        "focus": "Peito",
        "isRest": false,
        "intensity": "Alta",
        "exercises": [
          {"id": "supino_reto_barra","name": "Supino reto barra","sets": 4,"reps": "8-12","restSeconds": 90,"targetMuscles": ["Peitoral"]},
          {"id": "crucifixo_maquina","name": "Crucifixo máquina","sets": 3,"reps": "12-15","restSeconds": 60,"targetMuscles": ["Peitoral"]}
        ]
      },
      {
        "dayName": "Terça-feira",
        "focus": "Costas",
        "isRest": false,
        "intensity": "Alta",
        "exercises": [
          {"id": "puxada_alta_maquina","name": "Puxada alta máquina","sets": 4,"reps": "8-12","restSeconds": 90,"targetMuscles": ["Costas"]},
          {"id": "remada_baixa_cabo","name": "Remada baixa cabo","sets": 3,"reps": "12-15","restSeconds": 60,"targetMuscles": ["Costas"]}
        ]
      },
      {
        "dayName": "Quarta-feira",
        "focus": "Pernas",
        "isRest": false,
        "intensity": "Extrema",
        "exercises": [
          {"id": "agachamento_livre","name": "Agachamento livre","sets": 4,"reps": "8-10","restSeconds": 120,"targetMuscles": ["Pernas"]},
          {"id": "cadeira_extensora_maquina","name": "Cadeira extensora máquina","sets": 3,"reps": "15","restSeconds": 60,"targetMuscles": ["Pernas"]}
        ]
      },
      {
        "dayName": "Quinta-feira",
        "focus": "Ombros",
        "isRest": false,
        "intensity": "Alta",
        "exercises": [
          {"id": "desenvolvimento_halter","name": "Desenvolvimento halter","sets": 4,"reps": "10-12","restSeconds": 90,"targetMuscles": ["Ombros"]},
          {"id": "elevacao_lateral_cabo","name": "Elevação lateral cabo","sets": 4,"reps": "15","restSeconds": 60,"targetMuscles": ["Ombros"]}
        ]
      },
      {
        "dayName": "Sexta-feira",
        "focus": "Braços",
        "isRest": ${daysCount < 5},
        "intensity": "${daysCount < 5 ? 'Nenhuma' : 'Alta'}",
        "exercises": ${daysCount < 5 ? '[]' : '[\n          {"id": "triceps_pulley_cabo","name": "Tríceps pulley cabo","sets": 4,"reps": "12","restSeconds": 60,"targetMuscles": ["Tríceps"]},\n          {"id": "rosca_direta_cabo","name": "Rosca direta cabo","sets": 4,"reps": "12","restSeconds": 60,"targetMuscles": ["Bíceps"]}\n        ]'}
      },
      {
        "dayName": "Sábado",
        "focus": "Pontos Fracos",
        "isRest": ${daysCount < 6},
        "intensity": "${daysCount < 6 ? 'Nenhuma' : 'Média'}",
        "exercises": ${daysCount < 6 ? '[]' : '[\n          {"id": "panturrilha_em_pe","name": "Panturrilha em pé","sets": 4,"reps": "15","restSeconds": 60,"targetMuscles": ["Panturrilha"]}\n        ]'}
      },
      {
        "dayName": "Domingo",
        "focus": "Descanso",
        "isRest": true,
        "intensity": "Nenhuma",
        "exercises": []
      }
    ]
  }`);
}

// Força Bruta 2-15
for (let i = 2; i <= 15; i++) {
   const daysCount = i <= 5 ? 3 : i <= 10 ? 4 : 5;
   extraTemplates.push(`  {
    "phaseName": "Treino 63: Força Bruta FO${i.toString().padStart(2, '0')}",
    "planPromptDescription": "Treino de Força Bruta e progressão de Lifts - Variante ${i}.",
    "schedule": [
      {
        "dayName": "Segunda-feira",
        "focus": "Agachamento",
        "isRest": false,
        "intensity": "Extrema",
        "exercises": [
          {"id": "agachamento_livre","name": "Agachamento livre","sets": 5,"reps": "5","restSeconds": 180,"targetMuscles": ["Pernas"]}
        ]
      },
      {
        "dayName": "Terça-feira",
        "focus": "Recuperação",
        "isRest": true,
        "intensity": "Nenhuma",
        "exercises": []
      },
      {
        "dayName": "Quarta-feira",
        "focus": "Supino",
        "isRest": false,
        "intensity": "Extrema",
        "exercises": [
          {"id": "supino_reto_barra","name": "Supino reto barra","sets": 5,"reps": "5","restSeconds": 180,"targetMuscles": ["Peitoral"]}
        ]
      },
      {
        "dayName": "Quinta-feira",
        "focus": "Recuperação",
        "isRest": ${daysCount < 4},
        "intensity": "${daysCount < 4 ? 'Nenhuma' : 'Média'}",
        "exercises": ${daysCount < 4 ? '[]' : '[{"id": "desenvolvimento_barra","name": "Desenvolvimento barra","sets": 3,"reps": "8","restSeconds": 120,"targetMuscles": ["Ombros"]}]'}
      },
      {
        "dayName": "Sexta-feira",
        "focus": "Terra",
        "isRest": false,
        "intensity": "Extrema",
        "exercises": [
          {"id": "levantamento_terra_barra","name": "Levantamento terra barra","sets": 5,"reps": "5","restSeconds": 180,"targetMuscles": ["Costas"]}
        ]
      },
      {
        "dayName": "Sábado",
        "focus": "Acessórios",
        "isRest": ${daysCount < 5},
        "intensity": "${daysCount < 5 ? 'Nenhuma' : 'Baixa'}",
        "exercises": ${daysCount < 5 ? '[]' : '[{"id": "rosca_direta_barra","name": "Rosca direta barra","sets": 3,"reps": "12","restSeconds": 60,"targetMuscles": ["Bíceps"]}]'}
      },
      {
        "dayName": "Domingo",
        "focus": "Descanso",
        "isRest": true,
        "intensity": "Nenhuma",
        "exercises": []
      }
    ]
  }`);
}

// Condicionamento 2-15
for (let i = 2; i <= 15; i++) {
   const daysCount = i <= 5 ? 3 : i <= 10 ? 4 : 5;
   extraTemplates.push(`  {
    "phaseName": "Treino 64: Condicionamento & Saúde CO${i.toString().padStart(2, '0')}",
    "planPromptDescription": "Treinos leves para coração e saúde - Variante ${i}.",
    "schedule": [
      {
        "dayName": "Segunda-feira",
        "focus": "Corpo Inteiro",
        "isRest": false,
        "intensity": "Média",
        "exercises": [
          {"id": "agachamento_peso_corporal","name": "Agachamento Peso Corporal","sets": 3,"reps": "15","restSeconds": 60,"targetMuscles": ["Pernas"]},
          {"id": "flexao_bracos","name": "Flexão de Braços","sets": 3,"reps": "10","restSeconds": 60,"targetMuscles": ["Peitoral"]}
        ]
      },
      {
        "dayName": "Terça-feira",
        "focus": "Cardio",
        "isRest": false,
        "intensity": "Baixa",
        "exercises": [
          {"id": "caminhada","name": "Caminhada Recreativa","sets": 1,"reps": "30min","restSeconds": 0,"targetMuscles": ["Cardio"]}
        ]
      },
      {
        "dayName": "Quarta-feira",
        "focus": "Mobilidade",
        "isRest": false,
        "intensity": "Baixa",
        "exercises": [
          {"id": "alongamentos","name": "Rotina de Alongamentos","sets": 1,"reps": "20min","restSeconds": 0,"targetMuscles": ["Mobilidade"]}
        ]
      },
      {
        "dayName": "Quinta-feira",
        "focus": "Funcional",
        "isRest": ${daysCount < 4},
        "intensity": "${daysCount < 4 ? 'Nenhuma' : 'Média'}",
        "exercises": ${daysCount < 4 ? '[]' : '[{"id": "prancha","name": "Prancha","sets": 3,"reps": "45s","restSeconds": 45,"targetMuscles": ["Core"]}]'}
      },
      {
        "dayName": "Sexta-feira",
        "focus": "Corpo Inteiro",
        "isRest": ${daysCount < 5},
        "intensity": "${daysCount < 5 ? 'Nenhuma' : 'Média'}",
        "exercises": ${daysCount < 5 ? '[]' : '[\n          {"id": "afundo_livre","name": "Afundo livre","sets": 3,"reps": "12","restSeconds": 60,"targetMuscles": ["Pernas"]}\n        ]'}
      },
      {
        "dayName": "Sábado",
        "focus": "Atividade Recreativa",
        "isRest": false,
        "intensity": "Baixa",
        "exercises": [
          {"id": "bicicleta","name": "Bicicleta Recreativa","sets": 1,"reps": "45min","restSeconds": 0,"targetMuscles": ["Cardio"]}
        ]
      },
      {
        "dayName": "Domingo",
        "focus": "Descanso",
        "isRest": true,
        "intensity": "Nenhuma",
        "exercises": []
      }
    ]
  }`);
}

let tsFile = fs.readFileSync('lib/templates.ts', 'utf8');

const insertPosition = tsFile.lastIndexOf('];');
if (insertPosition !== -1) {
  tsFile = tsFile.slice(0, insertPosition) + ',\\n' + extraTemplates.join(',\\n') + '\\n' + tsFile.slice(insertPosition);
  fs.writeFileSync('lib/templates.ts', tsFile);
  console.log("Done inserting", extraTemplates.length, "templates.");
} else {
  console.log("Could not find array end `];`");
}
