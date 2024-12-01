import { customModel, MODELS } from "./config/ai";
import { CoreMessage, streamText } from "ai";
import dotenv from "dotenv";
import * as readline from "node:readline/promises";
import { weatherTool, temperatureConversionTool } from "./tools/weather";

dotenv.config();

if (!process.env.HEURIST_API_KEY) {
  throw new Error("HEURIST_API_KEY environment variable is required");
}

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages: CoreMessage[] = [];

const tools = {
  weather: weatherTool,
  convertCelsiusToFahrenheit: temperatureConversionTool,
} as const;

async function handleChatStream(
  result: Awaited<ReturnType<typeof streamText<typeof tools>>>
) {
  let fullResponse = "";
  process.stdout.write("\nAssistant: ");

  try {
    for await (const delta of result.textStream) {
      fullResponse += delta;
      process.stdout.write(delta);
    }
    process.stdout.write("\n\n");
    return fullResponse;
  } catch (error) {
    console.error("Error in stream:", error);
    throw error;
  }
}

async function selectModel(): Promise<string> {
  console.log("\nAvailable Models:");
  MODELS.forEach((model, index) => {
    console.log(`${index + 1}. ${model.label} - ${model.description}`);
  });

  while (true) {
    const selection = await terminal.question("\nSelect a model (1-2): ");
    const index = parseInt(selection) - 1;

    if (index >= 0 && index < MODELS.length) {
      return MODELS[index].id;
    }
    console.log("Invalid selection. Please try again.");
  }
}

async function main() {
  console.log("AI Chat initialized. Type your message (Ctrl+C to exit)\n");

  const modelId = await selectModel();
  console.log(
    `\nUsing model: ${MODELS.find((m) => m.id === modelId)?.label}\n`
  );

  while (true) {
    try {
      const userInput = await terminal.question("You: ");
      messages.push({ role: "user", content: userInput });

      const result = streamText({
        model: customModel(modelId),
        messages,
        tools,
        maxSteps: 10,
        onStepFinish: (step) => {
          if (process.env.NODE_ENV === "development") {
            console.log("\nStep:", JSON.stringify(step, null, 2));
          }
        },
      });

      const response = await handleChatStream(result);
      messages.push({ role: "assistant", content: response });
    } catch (error) {
      console.error("Error:", error);
      process.stdout.write("\nAn error occurred. Please try again.\n\n");
    }
  }
}

process.on("SIGINT", () => {
  console.log("\nGoodbye!");
  process.exit(0);
});

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
