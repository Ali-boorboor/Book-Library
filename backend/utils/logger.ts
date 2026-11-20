type LoggerColors = "Base" | "Error" | "Success" | "Warning" | "Info";

const COLORS: Record<LoggerColors, string> = {
  Base: "\x1b[0m",
  Error: "\x1b[31m",
  Success: "\x1b[32m",
  Warning: "\x1b[33m",
  Info: "\x1b[36m",
};

const RESET = "\x1b[0m";

export const logger = (text: string, color: LoggerColors = "Base") => {
  console.log(`${COLORS[color]}${text}${RESET}`);
};
