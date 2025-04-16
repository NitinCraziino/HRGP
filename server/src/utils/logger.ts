import { createLogger, format, transports } from "winston";
import { NODE_ENV } from "../config";
import "winston-daily-rotate-file";
import path from "path";

// Set up log directory
const logDirectory = path.resolve(path.join(__dirname, "../../"), "logs");

// Custom log format to include function name, location, and data
const consoleFormat = format.printf(
  ({ timestamp, level, message, stack, location, statusCode, url, data, ...meta }) => {
    const logLevel = level.toUpperCase();
    const locationInfo = location ? ` | Location: ${location}` : "";
    const statusCodeInfo = statusCode ? ` | Status Code: ${statusCode}` : "";
    const urlInfo = url ? ` | URL: ${url}` : "";
    const dataInfo = data ? ` | Data: ${JSON.stringify(data)}` : "";
    // const metaInfo = Object.keys(meta).length ? ` | Meta: ${JSON.stringify(meta, null, 2)}` : "";

    return `${timestamp} [${logLevel}]: [${message}] \n \x1b[36m${locationInfo}\x1b[0m${statusCodeInfo}:  ${stack ? `\nStack: ${stack}` : ""}${urlInfo}${dataInfo}`;
  },
);

// Logger setup with daily file rotation
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "DD-MM-YYYY HH:mm" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: "service" },
  transports: [
    new transports.DailyRotateFile({
      filename: path.join(logDirectory + "/error", "%DATE%.log"),
      datePattern: "DD-MM-YYYY",
      level: "error",
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
    }),
    new transports.DailyRotateFile({
      filename: path.join(logDirectory + "/combined", "%DATE%.log"),
      datePattern: "DD-MM-YYYY",
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
    }),
  ],
});

// Console logging for non-production environments
if (NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      level: "debug",
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        consoleFormat,
      ),
    }),
  );
}

export default logger;
