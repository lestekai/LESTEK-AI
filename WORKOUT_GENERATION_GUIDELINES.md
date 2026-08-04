# Diretrizes de Geração de Treino - EVOLUX AI

Este documento estabelece as regras de arquitetura, experiência e engenharia de prompt para a geração de treinos por Inteligência Artificial no projeto EVOLUX, respeitando as instruções de qualidade, escalabilidade e UX/UI exigidas.

## 1. Princípios Fundamentais (UX e Engenharia)
- **Velocidade e Confiabilidade:** O usuário nunca deve ficar "preso" em telas de carregamento sem resposta. A geração de treino exige tempos de timeout configurados (atualmente 50 segundos) com mecanismo de `AbortController`.
- **Estratégia Offline First (Fallback de Segurança):** Caso a rede falhe, o serviço do Gemini esteja indisponível ou ocorra erro de chave de API, o sistema **NÃO DEVE** apresentar um erro na interface que impeça a jornada. O sistema deve acionar o "Plano de Evolução Adaptativa (Modo Segurança)" – um plano estruturado de fallback em JSON embutido no serviço, garantindo a continuidade do usuário.
- **Minimalismo e Clareza:** As instruções ao modelo exigem estritamente um formato JSON. Nenhum caractere markdown ou texto solto é permitido, reduzindo complexidade no parsing.

## 2. Requisitos do Prompt de Geração
O `systemInstruction` enviado ao Gemini define a persona do **Evolux AI**:
- **Persona:** Personal Trainer, Fisiologista e Treinador de Alta Performance de elite mundial.
- **Estrutura:** O JSON exigido deve conter 2 a 4 fases lógicas, com cronograma exato de dias de treino (`isRest: false`) e descanso (`isRest: true`) correspondendo à disponibilidade informada pelo usuário.
- **Complexidade Fisiológica:** Inclusão obrigatória de aquecimento específico (`warmup`), resfriamento (`cooldown`) e variáveis avançadas (ex: séries, repetições, RIR, tempo sob tensão, descanso em segundos).

## 3. Estrutura do JSON Esperado
O modelo foi treinado e configurado para retornar o seguinte esquema base:
```json
{
  "programName": "Nome do Programa",
  "planPromptDescription": "Descrição técnica",
  "phases": [
    {
      "id": "fase_1",
      "name": "Nome da Fase",
      "description": "Foco da fase",
      "durationWeeks": 4,
      "schedule": [
         // Arrays de dias (Segunda a Domingo) contendo os "exercises" (nome, séries, repetições, etc)
      ]
    }
  ]
}
```

## 4. Evolução Contínua
Pensando como Arquiteto de Software e Product Manager:
- **Modelo de IA:** Utilizamos o modelo mais rápido e recente da classe Flash (`gemini-2.5-flash`) para equilibrar custo, performance (UX de velocidade) e inteligência.
- **Desacoplamento:** O serviço de requisição está centralizado em `src/services/geminiService.ts`, de modo que qualquer componente (Questionário, Assistente de Voz) possa consumir o mesmo barramento.
- **Tratamento de Mídia:** Exercícios gerados que não possuam vídeos exatos no banco de dados utilizam algoritmos de fallback de músculo alvo e placeholders visuais elegantes (sem quebra de UI).
