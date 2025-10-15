import { LogLevel } from "./types";

export const Logger = (logLevel: LogLevel, message: string) => {
  console.log(`${logLevel}: ${message}`);
};
