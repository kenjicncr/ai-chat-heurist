import { createOpenAI } from "@ai-sdk/openai";
import { openai } from "@ai-sdk/openai";
import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";
import dotenv from "dotenv";

dotenv.config();

export function createHeuristAI() {
  return createOpenAI({
    baseURL: "https://llm-gateway.heurist.xyz",
    apiKey: process.env.HEURIST_API_KEY,
  });
}

export const heuristai = createHeuristAI();

export const MODELS = [
  {
    id: "hermes-3-llama3.1-8b",
    label: "Hermes - Heurist",
    apiIdentifier: "hermes-3-llama3.1-8b",
    description:
      "flagship Hermes LLM trained by Nous Research, with advanced agentic capabilities, enhanced roleplaying, reasoning, multi-turn conversation, long context coherence and agentic abilities. Uncensored. Supports tool calling",
    provider: "heurist",
  },
  {
    id: "gpt-4o-mini",
    label: "GPT 4o mini",
    apiIdentifier: "gpt-4o-mini",
    description: "Small model for fast, lightweight tasks",
    provider: "openai",
  },
] as const;

// Custom middleware for model-specific adjustments
const customMiddleware = {
  // Add any middleware functions here
};

export function customModel(modelId: string) {
  console.log("Using model:", modelId);
  const model = MODELS.find((m) => m.id === modelId);

  if (!model) {
    throw new Error(`Model ${modelId} not found`);
  }

  if (model.provider === "heurist") {
    return wrapLanguageModel({
      model: heuristai(model.apiIdentifier),
      middleware: customMiddleware,
    });
  }
  // OpenAI handling
  return wrapLanguageModel({
    model: openai(model.apiIdentifier),
    middleware: customMiddleware,
  });
}

// Export default model config
export const DEFAULT_MODEL = MODELS[0];
