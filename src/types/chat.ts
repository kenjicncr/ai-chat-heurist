import { z } from "zod";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export const WeatherSchema = z.object({
  location: z.string().describe("The location to get the weather for"),
});

export const TemperatureConversionSchema = z.object({
  celsius: z.number().describe("The temperature in Celsius to convert"),
});

export type WeatherResponse = {
  location: string;
  temperature: number;
};

export type TemperatureConversionResponse = {
  fahrenheit: number;
};
