import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'
import path from 'path'
import url from 'url'
import fs from 'fs'

async function getRequestBody(req: any): Promise<string> {
  // If request already has parsed body, use it
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      return req.body;
    }
    return JSON.stringify(req.body);
  }

  return new Promise((resolve) => {
    let bodyData = '';
    const onData = (chunk: any) => {
      bodyData += typeof chunk === 'string' ? chunk : chunk.toString('utf8');
    };
    const onEnd = () => {
      req.off('data', onData);
      req.off('end', onEnd);
      resolve(bodyData.trim());
    };
    const onError = (err: any) => {
      console.error('Error reading request body:', err);
      req.off('data', onData);
      req.off('end', onEnd);
      resolve(bodyData.trim());
    };
    req.on('data', onData);
    req.on('end', onEnd);
    req.on('error', onError);
    
    // Safety timeout to prevent hanging
    setTimeout(() => {
      onEnd();
    }, 5000);
  });
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // Set GEMINI_API_KEY from env or fallback to system process.env so our custom middleware has it
  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (apiKey) {
    process.env.GEMINI_API_KEY = apiKey;
  }

  return {
    plugins: [
      react(),
      {
        name: 'evolux-api-middleware',
        configureServer(server) {
          // Global middleware
          server.middlewares.use((req, res, next) => {
            const rawUrl = req.originalUrl || req.url || '';
            
            if (rawUrl.toLowerCase() === '/health') {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true }));
              return;
            }
            next();
          });

          server.middlewares.use((req, res, next) => {
            const rawUrl = req.originalUrl || req.url || '';
            const lowercaseUrl = rawUrl.toLowerCase();
            
            if (lowercaseUrl.includes('/api/gemini/generate')) {
              // Set CORS headers
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-Gemini-Key, X-Gemini-Api-Key');
              res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

              if (req.method === 'OPTIONS') {
                res.statusCode = 204;
                res.end();
                return;
              }

              if (req.method === 'POST') {
                (async () => {
                  try {
                    const body = await getRequestBody(req);
                    console.log('Gemini request body received, length:', body.length);
                    
                    if (!body) {
                      throw new Error('Empty request body received.');
                    }

                    const { prompt, model, systemInstruction, responseMimeType } = JSON.parse(body);
                    
                    const customHeaderKey = req.headers['x-gemini-key'] || req.headers['X-Gemini-Key'] ||'';
                    const apiKey = (typeof customHeaderKey === 'string' && customHeaderKey.trim() !== '')
                      ? customHeaderKey
                      : (process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '');

                    if (!apiKey || apiKey.trim() === '') {
                      console.error('Gemini error: API Key missing in process.env and request headers');
                      res.statusCode = 500;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ error: 'API KEY ausente para o serviço do Gemini.' }));
                      return;
                    }
                    
                    const { GoogleGenAI } = await import('@google/genai');
                    const ai = new GoogleGenAI({ 
                      apiKey: apiKey.trim(),
                      httpOptions: {
                        headers: {
                          'User-Agent': 'aistudio-build',
                        }
                      }
                    });
                    
                    let config: any = {
                      temperature: 0.2
                    };

                    if (systemInstruction) config.systemInstruction = systemInstruction;
                    if (responseMimeType) config.responseMimeType = responseMimeType;

                    const requestModel = model || "gemini-1.5-flash";
                    console.log('Calling Gemini with model:', requestModel);
                    
                    let text = "";
                    try {
                      const response = await ai.models.generateContent({
                        model: requestModel,
                        contents: prompt,
                        config
                      });
                      text = response.text || "";
                    } catch (genError: any) {
                      console.warn(`[Vite Middleware] Falha ao tentar com o modelo ${requestModel}:`, genError.message || genError);
                      if (requestModel !== "gemini-1.5-flash") {
                        const fallbackModel = "gemini-1.5-flash";
                        console.log(`[Vite Middleware] Tentando modelo de fallback alternativo: ${fallbackModel}...`);
                        try {
                          const fallbackResponse = await ai.models.generateContent({
                            model: fallbackModel,
                            contents: prompt,
                            config
                          });
                          text = fallbackResponse.text || "";
                          console.log(`[Vite Middleware] Sucesso usando o modelo de fallback ${fallbackModel}!`);
                        } catch (fallbackError: any) {
                          console.error('[Vite Middleware] Erro também no modelo de fallback:', fallbackError);
                          throw fallbackError;
                        }
                      } else {
                        throw genError;
                      }
                    }
                    
                    console.log('Gemini response successful, text length:', text.length);
                    
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ text }));
                  } catch (error: any) {
                    console.error('Vite Gemini Middleware Error:', error);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: error.message || 'Error processing request' }));
                  }
                })();
                return;
              }
            }
            
            next();
          });
        }
      }
    ],
    css: {
      postcss: {
        plugins: [
          tailwindcss(),
        ],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
  };
})
