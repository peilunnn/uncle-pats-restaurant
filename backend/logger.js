const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "your-service-name" },
  transports: [
    // - Write all logs error (and below) to `error.log`.
    new transports.File({ filename: "error.log", level: "error" }),
    // - Write all logs with level `info` and below to `combined.log`
    new transports.File({ filename: "combined.log" }),
  ],
});

// If we're not in production then also log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = logger;
