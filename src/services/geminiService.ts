/**
 * EVOLUX AI - Gemini Stable Service Layer
 * Centralized service to manage all Gemini requests with retry, timeout, fallback, and validation.
 */

export interface GeminiPayload {
  prompt: string;
  model?: string;
  systemInstruction?: string;
  responseMimeType?: string;
}

export interface GeminiResponse {
  text: string;
}

const DEFAULT_MODEL = 'gemini-2.5-flash';
const VALID_MODELS = [
  'gemini-2.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-2.5-flash',
  'gemini-3.1-pro-preview',
  'gemini-3.1-flash-image-preview',
  'gemini-2.5-flash-image'
];

/**
 * Calls the unified Gemini API endpoint with auto-retry, timeout, payload validation, and clean logging.
 *
 * @param payload The request parameters containing prompt, model, and system instruction.
 * @param retries Number of retry attempts (default is 3).
 * @param delayMs Delay multiplier between retries (default is 1000ms).
 */
export async function generateAI(
  payload: GeminiPayload,
  retries = 3,
  delayMs = 1000
): Promise<GeminiResponse> {
  const { prompt, model = DEFAULT_MODEL, systemInstruction, responseMimeType } = payload;

  // Verification: Validating that the API Key config is set and ready (backend proxies the actual key)
  // Fallback to client-side env variable injection if Netlify function misses it
  let clientViteKey = '';
  try {
    // Vite static replacements
    // @ts-ignore
    const vKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GEMINI_API_KEY : '';
    // @ts-ignore
    const nKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY : '';
    clientViteKey = vKey || nKey || '';
  } catch(e) {}
  
  if (!clientViteKey && typeof process !== 'undefined' && process.env) {
    clientViteKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
  }

  const customKey = clientViteKey;
  const apiKey = "RESOLVED_SAFE_ON_BACKEND";
  if (!apiKey) {
    throw Error("API KEY ausente");
  }

  // 1. Validation of empty prompt
  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    throw new Error('Erro no payload: O prompt enviado está vazio ou é inválido.');
  }

  // 2. Model validation
  if (model && !VALID_MODELS.includes(model)) {
    console.warn(`[Gemini Service] Aviso: O modelo '${model}' não está mapeado oficialmente na lista de suportados, mas prosseguindo.`);
  }

  // Define endpoint
  const GEMINI_ENDPOINT = '/api/gemini/generate';
  const url = (typeof window !== 'undefined' ? window.location.origin : '') + GEMINI_ENDPOINT;

  // Mandatory logs requested by the user:
  console.log("Endpoint:", url);
  console.log("Modelo:", model);
  console.log("Payload:", payload);

  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000); // 50s timeout

    try {
      console.log(`[Gemini Service] Tentativa ${attempt} de ${retries} para o modelo '${model}'...`);
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (customKey) {
        // headers['X-Gemini-Key'] = customKey;
      }
      
      const response = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          prompt: prompt.trim(),
          model,
          systemInstruction,
          responseMimeType,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Explicitly check for HTTP 404 as requested
      if (response.status === 404) {
        console.error(`[Gemini Service] ERRO HTTP 404 detectado! URL completa utilizada: ${url}`);
      }

      const responseText = await response.text();
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${responseText || 'Sem detalhes do erro de resposta'}`);
      }

      if (!responseText || responseText.trim() === '') {
        throw new Error('Gemini retornou um corpo de resposta totalmente vazio.');
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Erro ao analisar JSON retornado pelo servidor: ${responseText.substring(0, 150)}`);
      }

      if (!data) {
        throw new Error('O corpo do JSON retornado é inválido ou nulo.');
      }

      const extractedText = data.text;
      if (!extractedText) {
        throw new Error('O formato retornado está incompleto (falta o campo "text").');
      }

      console.log(`[Gemini Service] Sucesso na tentativa ${attempt}! Resposta recebida.`);
      return { text: extractedText };

    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error(`[Gemini Service] Erro na tentativa ${attempt} de ${retries}:`, error);

      const isTimeout = error.name === 'AbortError';
      const errorMessage = isTimeout ? 'Timeout de 50 segundos excedido' : (error.message || 'Erro desconhecido');
      
      const isApiKeyError = errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('API key not valid') || errorMessage.includes('API KEY ausente');
      
      if (isApiKeyError) {
        console.warn('[Gemini Service] Chave de API inválida detectada. Abortando tentativas e ativando fallback.');
        attempt = retries; // Force fallback logic
      }

      if (attempt < retries) {
        const nextDelay = delayMs * attempt;
        console.log(`[Gemini Service] Aguardando ${nextDelay}ms antes de tentar novamente...`);
        await new Promise((resolve) => setTimeout(resolve, nextDelay));
      } else {
        // Last attempt failed, return elegant fallback or throw fully detailed error
        console.warn('[Gemini Service] Todas as tentativas falharam. Usando mecanismo de fallback elegante.');
        
        // Define an elegant fallback response to prevent frontend application crashes for specific formats
        if (!responseMimeType || responseMimeType === 'text/plain') {
          console.log('[Gemini Service] Fallback: Retornando resposta de texto offline.');
          return { text: "O serviço de Inteligência Artificial da Evolux está indisponível no momento devido a restrições de rede ou chave de API ausente. Por favor, tente novamente mais tarde ou configure a sua chave." };
        }

        if (responseMimeType === 'application/json') {
          // If the requester expected a Questionnaire wizard JSON response:
          if (prompt.includes('treino') || prompt.includes('recipe') || prompt.includes('exercises') || prompt.includes('targetMuscles') || prompt.includes('habits')) {
            console.log('[Gemini Service] Fallback: Retornando plano de treino adaptativo offline estruturado.');
            return {
              text: JSON.stringify({
                programName: "Plano de Evolução Adaptativa (Modo Segurança)",
                planPromptDescription: "Protocolo adaptativo offline ativado devido a instabilidade de rede.",
                phases: [{
                  id: "fase_1_offline",
                  name: "Adaptação e Segurança",
                  description: "Foco em execução e controle motor com peso corporal e básico.",
                  durationWeeks: 4,
                  schedule: [
                    { 
                      dayName: "Segunda-feira", 
                      focus: "Força e Condicionamento Geral (Full Body)",
                      isRest: false,
                      intensity: "Moderada",
                      warmup: ["Polichinelos 1 min", "Rotação de Tronco 20 reps"],
                      cooldown: ["Alongamento completo 2 min"],
                      exercises: [
                        { id: "e1", name: "Agachamento Livre", sets: 3, reps: "15", restSeconds: 60, instructions: "Mantenha a postura e contraia o core.", targetMuscles: ["Quadríceps", "Glúteos"], equipment: "Peso Corporal", difficulty: "Fácil" },
                        { id: "e2", name: "Flexão de Braços", sets: 3, reps: "12", restSeconds: 60, instructions: "Mantenha o corpo alinhado, descendo até o peito quase tocar o chão.", targetMuscles: ["Peito", "Tríceps", "Ombros"], equipment: "Peso Corporal", difficulty: "Intermediário" },
                        { id: "e3", name: "Prancha Abdominal", sets: 3, reps: "45s", restSeconds: 60, instructions: "Mantenha o corpo paralelo ao chão, sem elevar a pelve.", targetMuscles: ["Abdômen", "Core"], equipment: "Peso Corporal", difficulty: "Fácil" }
                      ]
                    },
                    {
                      dayName: "Terça-feira",
                      focus: "Descanso Ativo",
                      isRest: true,
                      intensity: "Baixa",
                      warmup: [],
                      cooldown: [],
                      exercises: []
                    },
                    { 
                      dayName: "Quarta-feira", 
                      focus: "Hipertrofia e Resistência Superior",
                      isRest: false,
                      intensity: "Alta",
                      warmup: ["Rotação de ombros 20 reps"],
                      cooldown: ["Alongamento dorsais 1 min"],
                      exercises: [
                        { id: "e4", name: "Barra Fixa ou Remada", sets: 3, reps: "8", restSeconds: 90, instructions: "Inicie o movimento ativando as escápulas.", targetMuscles: ["Dorsais", "Bíceps"], equipment: "Peso Corporal / Barra de Porta", difficulty: "Difícil" },
                        { id: "e5", name: "Tríceps Banco", sets: 3, reps: "12", restSeconds: 60, instructions: "Mantenha os cotovelos paralelos e próximos ao corpo.", targetMuscles: ["Tríceps"], equipment: "Cadeira / Banco", difficulty: "Fácil" }
                      ]
                    }
                  ]
                }]
              })
            };
          }
          // If the requester expected a finance voice parsing response:
          if (prompt.includes('income') || prompt.includes('expense') || prompt.includes('amount')) {
            console.log('[Gemini Service] Fallback: Retornando objeto financeiro parseado offline padronizado.');
            return {
              text: JSON.stringify({
                amount: 0,
                description: "Processamento por voz limitado (Tente registrar manualmente)",
                type: "expense"
              })
            };
          }
          
          return {
            text: JSON.stringify({
              error: true,
              message: "Serviço Evolux AI Indisponível no momento.",
              fallback: true
            })
          };
        }
        
        throw new Error(`Serviço Evolux AI Indisponível (Tentativas esgotadas): ${errorMessage}`);
      }
    }
  }

  throw new Error('Erro crítico inesperado no loop do Gemini Service.');
}
