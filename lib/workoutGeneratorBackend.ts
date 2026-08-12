import { GoogleGenAI } from '@google/genai';
import { EXERCISE_LIBRARY } from './exerciseLibrary';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function processWorkoutGeneration(
  requestId: string,
  userId: string,
  idToken: string,
  questionnaireData: any,
  apiKey: string
) {
  console.log(`[Workout Generator] Starting generation for request ${requestId}`);
  
  try {
    // 1. Mark request as processing
    await setDoc(doc(db, 'workout_generation_requests', requestId), {
      status: 'processing',
      updatedAt: new Date().toISOString()
    }, { merge: true });

    const ai = new GoogleGenAI({ 
      apiKey: apiKey.trim(),
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

    const validExerciseNames = EXERCISE_LIBRARY.map((ex: any) => ex.name).join(', ');

    const planSystemInstruction = `Você é o Evolux AI, um Personal Trainer, Fisiologista e Treinador de Alta Performance de elite mundial.
Sua missão é criar o planejamento de treino mais estruturado, científico, biomecanicamente correto e eficiente possível para o usuário.
Você tem profundo conhecimento sobre periodização, hipertrofia, força, mobilidade e nutrição esportiva. 
Crie protocolos de nível profissional (com aquecimento específico, mobilidade, técnicas avançadas como Drop-set, Rest-Pause, Bi-set, etc., quando apropriado).
Seja técnico, direto, motivacional e focado na evolução absoluta.

IMPORTANTE: Responda APENAS E EXCLUSIVAMENTE com um objeto JSON estritamente válido, sem blocos de código markdown (\`\`\`) ou texto fora do JSON. Não inclua NENHUM texto de introdução ou conclusão. O primeiro caractere DEVE ser { e o último }.

REGRAS ESTRUTURAIS:
- "programName": Nome impactante do programa.
- "planPromptDescription": Uma descrição de alto impacto sobre o protocolo e a ciência por trás.
- Gere de 2 a 4 fases lógicas em "phases" (ex: Adaptação, Hipertrofia, Força).
- Cada fase deve ter "id", "name", "description", "durationWeeks" e "schedule".
- O "schedule" DEVE obrigatoriamente ser um array contendo os 7 dias da semana (ex: Segunda-feira a Domingo). Para os dias em que o usuário não treinar, marque "isRest": true e "focus": "Descanso".
- Adeque a quantidade de dias de treino (isRest: false) exatamente ao que foi pedido pelo usuário no campo "daysPerWeek".
- Dias de treino DEVEM incluir "warmup" (array de strings) e "cooldown" (array de strings).
- "exercises" DEVE ser array detalhado. Inclua no mínimo de 4 a 8 exercícios por dia de treino ativo.
- Se "includeCardio" for verdadeiro, adicione cardio.

FORMATO DO JSON EXIGIDO:
{
  "programName": "Nome do Programa",
  "planPromptDescription": "Descrição",
  "phases": [
    {
      "id": "fase_1",
      "name": "Fase 1",
      "description": "Foco",
      "durationWeeks": 4,
      "schedule": [
        {
          "dayName": "Segunda-feira",
          "focus": "Peitoral",
          "isRest": false,
          "intensity": "Alta",
          "warmup": ["Aquecimento"],
          "cooldown": ["Alongamento"],
          "exercises": [
            {
              "id": "ex_1",
              "name": "Supino",
              "sets": 4,
              "reps": "8-10",
              "restSeconds": 90,
              "targetMuscles": ["Peitoral Maior"],
              "instructions": "Instruções.",
              "substitutions": ["Supino Máquina"],
              "difficulty": "Intermediário",
              "equipment": "Barra",
              "tempo": "3010",
              "rir": "1-2",
              "target": "Força"
            }
          ]
        },
        {
          "dayName": "Terça-feira",
          "focus": "Descanso",
          "isRest": true,
          "intensity": "Baixa",
          "warmup": [],
          "cooldown": [],
          "exercises": []
        }
      ]
    }
  ]
}`;

    const finalData = questionnaireData;
    const prompt = `Gere um protocolo de treinamento hiper-preciso, profissional e totalmente personalizado com base neste perfil do aluno:
    
- NOME: ${finalData.name || 'Aluno'}
- GÊNERO: ${finalData.gender || 'Não especificado'}
- IDADE: ${finalData.age || 'Não especificada'} anos
- PESO: ${finalData.weight || 'Não especificado'} kg
- ALTURA: ${finalData.height || 'Não especificada'} cm
- OBJETIVO PRINCIPAL: ${finalData.mainGoal || 'Não especificado'}
- EXPERIÊNCIA: ${finalData.experienceLevel || 'Não especificado'}
- OBJETIVO ESPECÍFICO/RESTRIÇÕES: ${finalData.specificGoal || 'Nenhuma'}
- LOCAL DE TREINO: ${finalData.location || 'Não especificado'}
- EQUIPAMENTOS: ${(finalData.equipment || []).join(', ') || 'Padrão do local'}
- DIAS POR SEMANA: ${finalData.daysPerWeek || 3}
- TEMPO POR SESSÃO: ${finalData.minutesPerSession || 60} minutos
- NÍVEL DE ENERGIA: ${finalData.energyLevel || 'Normal'}
- INCLUIR CARDIO: ${finalData.includeCardio ? 'Sim' : 'Não'}

INSTRUÇÕES FINAIS PARA A IA:
- Você DEVE retornar exatamente um JSON no formato especificado no seu system prompt.
- Garanta que o "schedule" de cada fase tenha EXATAMENTE 7 itens, representando os 7 dias da semana.
- Como o aluno selecionou treinar ${finalData.daysPerWeek || 3} dias por semana, haverão ${7 - (finalData.daysPerWeek || 3)} dias marcados com "isRest": true.
- Adeque os exercícios, séries e repetições estritamente para o objetivo principal (${finalData.mainGoal || ''}).
- IMPORTANTE: Todos os exercícios listados devem ser selecionados APENAS da seguinte lista de exercícios disponíveis no sistema. NUNCA crie exercícios que não estejam nesta lista:
${validExerciseNames}`;

    let responseText = "";
    let lastError: any = null;
    const candidateModels = ['gemini-2.5-flash', 'gemini-3.1-flash-lite', 'gemini-2.0-flash', 'gemini-3.1-pro'];

    for (const modelName of candidateModels) {
      try {
        console.log(`[Workout Generator] Trying model: ${modelName}`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            temperature: 0.2,
            systemInstruction: planSystemInstruction,
            responseMimeType: 'application/json'
          }
        });

        if (response?.text) {
          responseText = response.text;
          console.log(`[Workout Generator] Success with model: ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.warn(`[Workout Generator] Model ${modelName} failed: ${err?.message || err}`);
        lastError = err;
      }
    }

    if (!responseText) {
      throw new Error(lastError?.message || "Empty response from Gemini models");
    }

    let cleanText = responseText;
    if (cleanText.startsWith('```json')) cleanText = cleanText.replace(/```json/g, '').replace(/```/g, '');
    else if (cleanText.startsWith('```')) cleanText = cleanText.replace(/```/g, '');
    cleanText = cleanText.trim();

    const planItem = JSON.parse(cleanText);
    
    if (!planItem.phases) {
      planItem.phases = [{
        id: 'fase_1',
        name: planItem.phaseName || 'Fase 1',
        description: planItem.planPromptDescription || '',
        durationWeeks: 4,
        schedule: planItem.schedule || []
      }];
      planItem.programName = planItem.phaseName || 'Programa de Treino';
    }
    
    if (!planItem.schedule && planItem.phases && planItem.phases.length > 0) {
      planItem.schedule = planItem.phases[0].schedule;
    }
    
    planItem.currentPhaseIndex = 0;
    planItem.currentWeekIndex = 0;
    
    const workoutId = `workout_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const generatedAt = new Date().toISOString();
    
    const finalWorkout = {
      ...planItem,
      id: workoutId,
      phaseId: workoutId,
      user_id: userId,
      generatedAt
    };
    
    // Save workout using Firestore SDK
    await setDoc(doc(db, 'workouts', workoutId), finalWorkout);
    
    // Mark request as completed
    await setDoc(doc(db, 'workout_generation_requests', requestId), {
      status: 'completed',
      completedAt: generatedAt,
      workoutId: workoutId,
      source: 'gemini'
    }, { merge: true });
    
    console.log(`[Workout Generator] Completed generation for request ${requestId}, saved workout ${workoutId}`);

  } catch(error: any) {
    console.error(`[Workout Generator] Error for request ${requestId}:`, error);
    
    try {
      await setDoc(doc(db, 'workout_generation_requests', requestId), {
        status: 'failed',
        error: error.message || 'Unknown error'
      }, { merge: true });
    } catch (dbError) {
      console.error(`[Workout Generator] Failed to set error status in Firestore:`, dbError);
    }
  }
}
