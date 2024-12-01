import { tool } from "ai";
import { WeatherSchema, TemperatureConversionSchema } from "../types/chat";

export const weatherTool = tool({
  description: "Get the weather in a location (in Celsius)",
  parameters: WeatherSchema,
  execute: async ({ location }) => ({
    location,
    temperature: Math.round((Math.random() * 30 + 5) * 10) / 10,
  }),
});

export const temperatureConversionTool = tool({
  description: "Convert a temperature from Celsius to Fahrenheit",
  parameters: TemperatureConversionSchema,
  execute: async ({ celsius }) => {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return { fahrenheit: Math.round(fahrenheit * 100) / 100 };
  },
});
