import { GoogleGenAI } from "@google/genai";

export async function handler(event: any, context: any) {

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Gemini-Key, X-Gemini-Api-Key",
    "Access-Control-Allow-Methods":
      "POST, OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: "Method Not Allowed"
      })
    };
  }

  try {

    const normalizedHeaders: Record<string, string> = {};
    if (event.headers) {
      for (const [key, val] of Object.entries(event.headers)) {
        normalizedHeaders[key.toLowerCase()] = String(val || "");
      }
    }

    const customHeaderKey =
      normalizedHeaders["x-gemini-key"] ||
      normalizedHeaders["x-gemini-api-key"] ||
      "";

    const getEnv = (key: string) => {
      if (typeof process !== 'undefined' && process.env) {
        return process.env[key] || process.env[' ' + key] || null;
      }
      return null;
    };

    const apiKey =
      (typeof customHeaderKey === "string" && customHeaderKey.trim() !== "")
        ? customHeaderKey
        : (getEnv("GEMINI_API_KEY") ||
           getEnv("NEXT_PUBLIC_GEMINI_API_KEY") ||
           getEnv("VITE_GEMINI_API_KEY"));

    console.log("===== GEMINI ENV DEBUG =====");

    console.log({
      GEMINI_EXISTS: !!getEnv("GEMINI_API_KEY"),
      NEXT_EXISTS: !!getEnv("NEXT_PUBLIC_GEMINI_API_KEY"),
      VITE_EXISTS: !!getEnv("VITE_GEMINI_API_KEY"),

      HEADER_EXISTS:
        !!customHeaderKey,

      API_SIZE:
        apiKey?.length || 0,

      API_START:
        apiKey?.substring(0, 5) || "VAZIA"
    });

    if (!apiKey?.trim()) {

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error:
            "Nenhuma API KEY Gemini encontrada. Adicione uma chave em Configurações no app para usar como backup."
        })
      };

    }

    const body =
      JSON.parse(event.body || "{}");

    const prompt =
      body.prompt || "";

    const model =
      body.model ||
      "gemini-2.5-flash";

    const systemInstruction =
      body.systemInstruction;

    const responseMimeType =
      body.responseMimeType;

    const ai =
      new GoogleGenAI({
        apiKey: apiKey.trim(),
        httpOptions: {
          headers: {
            "User-Agent":
              "evolux-ai-netlify"
          }
        }
      });

    const config: any = {
      temperature: 0.2
    };

    if (systemInstruction) {
      config.systemInstruction =
        systemInstruction;
    }

    if (responseMimeType) {
      config.responseMimeType =
        responseMimeType;
    }

    const modelsToTry = [

      model,

      "gemini-2.5-flash",

      "gemini-2.5-flash-lite",

      "gemini-1.5-flash"

    ];

    let text = "";
    let lastError: any;

    for (const currentModel of modelsToTry) {

      try {

        console.log(
          `Tentando modelo: ${currentModel}`
        );

        const response =
          await ai.models.generateContent({

            model: currentModel,

            contents: prompt,

            config

          });

        text =
          response?.text || "";

        if (text?.trim()) {

          console.log(
            `Sucesso usando ${currentModel}`
          );

          break;

        }

      } catch (err: any) {

        lastError = err;

        console.error(
          `Falhou ${currentModel}`,
          err?.message || err
        );

      }

    }

    if (!text) {

      throw new Error(

        lastError?.message ||

        "Falha ao gerar resposta"

      );

    }

    return {

      statusCode: 200,

      headers,

      body: JSON.stringify({

        success: true,

        modelUsed: model,

        text

      })

    };

  } catch (error: any) {

    console.error(
      "ERRO GEMINI NETLIFY",
      error
    );

    return {

      statusCode: 500,

      headers: {

        "Content-Type":
          "application/json",

        "Access-Control-Allow-Origin":
          "*"

      },

      body: JSON.stringify({

        error:
          error?.message ||

          "Internal Server Error",

        stack:
          process.env.NODE_ENV !==
          "production"

            ? error?.stack

            : undefined

      })

    };

  }

}