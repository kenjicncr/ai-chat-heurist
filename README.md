# Heurist AI Chat Demo

Using Heurist with the Vercel AI SDK to build a chatbot.

## Features

- Multi-model support (Hermes LLaMA and GPT-4o mini)
- Real-time streaming chat interface
- Weather information tool
- Temperature conversion between Celsius and Fahrenheit
- TypeScript support with strict typing
- Error handling and graceful shutdown
- Development mode with detailed step logging

## Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Heurist API key (for Hermes model)
- OpenAI API key (for GPT-4o mini)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ai-chat-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:
   Create a `.env` file in the root directory:

```bash
HEURIST_API_KEY=your_heurist_api_key
OPENAI_API_KEY=your_openai_api_key
```

## Project Structure

```bash
src/
├── config/
│   └── ai.ts           # AI configuration and model setup
├── tools/
│   └── weather.ts      # Weather and temperature tools
├── types/
│   └── chat.ts         # Type definitions
└── index.ts           # Main application entry
```

## Available Models

1. Hermes 3 LLaMA 3.1 8B (Heurist)

   - Advanced agentic capabilities
   - Enhanced reasoning and roleplaying
   - Long context support

2. GPT-4o mini (OpenAI)
   - Fast, lightweight model
   - Suitable for simple tasks
   - Quick response times

## Switching Models

The default model can be changed in `src/config/ai.ts`:

```typescript
// Change the index to use a different model
export const DEFAULT_MODEL = MODELS[0]; // Use Hermes
export const DEFAULT_MODEL = MODELS[1]; // Use GPT-4o mini
```

Or dynamically in your code:

```typescript
import { customModel, MODELS } from "./config/ai";

// Use specific model by ID
const model = customModel("gpt-4o-mini");
// or
const model = customModel("hermes-3-llama3.1-8b");
```

## Usage

1. Start the application:

```bash
pnpm tsx src/index.ts
```

2. Example interactions:

- "What's the weather in Tokyo?"
- "Convert 25 Celsius to Fahrenheit"
- "What's the temperature in Paris and convert it to Fahrenheit?"

3. Exit: Press `Ctrl+C`

## Development

Run with debug logging:

```bash
NODE_ENV=development pnpm tsx src/index.ts
```

## Tools

### Weather Tool

- Simulated weather data
- Temperature in Celsius

### Temperature Conversion Tool

- Celsius to Fahrenheit conversion
- Precise calculations (2 decimal places)

## Dependencies

- `ai`: Vercel AI SDK
- `@ai-sdk/openai`: OpenAI compatibility layer
- `zod`: Runtime type validation
- `dotenv`: Environment configuration

## License

MIT License
