import { LogLevel } from "./types";

export const Logger = (logLevel: LogLevel, message: string) => {
  const now = new Date().toISOString();
  console.log(`[${now}] [${logLevel}]: ${message}`);
};
