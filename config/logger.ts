// Description: This file defines the logger configuration for the application using winston.
import winston from "winston";
import config from "config";
import { error } from "console";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
const level = () => {
  const env = config.get<string>("env") || "development";
  const isDevelopment = env === "development"; //check if the environment is development
  return isDevelopment ? "debug" : "warn"; //return debug if the environment is development
};
const colors = {
  //colors for the logs
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
}; //create a custom format for the logs

winston.addColors(colors); //add the colors to the logs
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }), //colorize the logs
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
); //create a logger object
const transports = [
  new winston.transports.Console(), //log to the console
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }), //log errors to a file
  new winston.transports.File({ filename: "logs/all.log" }), //log all logs to a file
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger; //export the logger
