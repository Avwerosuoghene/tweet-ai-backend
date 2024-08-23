
import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDirectory = path.join(__dirname, '../logs');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, 'access.log'), format: winston.format.combine(
        winston.format.timestamp(), 
        winston.format.json() 
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error', 
      format: winston.format.combine(
        winston.format.timestamp(), 
        winston.format.json()      
      ),
    }),
  ],
});

if (!fs.existsSync(logDirectory)) {
  console.log(logDirectory)
  fs.mkdirSync(logDirectory);
}


export default logger;