import express from 'express';
import cors from 'cors';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// API route for Gemini
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { prompt, model, systemInstruction, responseMimeType } = req.body;
    
    const customHeaderKey = req.headers['x-gemini-key'] || req.headers['X-Gemini-Key'] || '';
    const apiKey = (typeof customHeaderKey === 'string' && customHeaderKey.trim() !== '')
      ? customHeaderKey
      : process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API KEY ausente para o serviço do Gemini.' });
    }

    const ai = new GoogleGenAI({ 
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' }
      }
    });

    let config: any = { temperature: 0.2 };
    if (systemInstruction) config.systemInstruction = systemInstruction;
    if (responseMimeType) config.responseMimeType = responseMimeType;
    
    const requestModel = model || "gemini-2.5-flash";
    
    const candidateModels = Array.from(new Set([
      requestModel,
      "gemini-2.5-flash",
      "gemini-1.5-flash",
      "gemini-2.0-flash",
      "gemini-3.1-flash-lite"
    ]));

    let responseText = "";
    let lastError: any = null;

    for (const curModel of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: curModel,
          contents: prompt,
          config
        });
        if (response?.text) {
          responseText = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`[Gemini Server] Modelo '${curModel}' falhou/limite atingido: ${err?.message || err}`);
        lastError = err;
      }
    }
    
    if (responseText) {
      res.json({ text: responseText });
    } else {
      res.status(500).json({ error: lastError?.message || 'Serviço de IA indisponível no momento. Tente novamente em instantes.' });
    }
  } catch (error: any) {
    console.error('Server Gemini Error:', error);
    res.status(500).json({ error: error.message || 'Error processing request' });
  }
});

// Serve static files from the Vite build output
app.use(express.static(path.join(__dirname)));

// SPA fallback: any other route should return index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
