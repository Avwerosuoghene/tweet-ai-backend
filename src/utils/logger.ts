
import winston from 'winston';
import path from 'path';

const logDirectory = path.join(__dirname, '../logs'); 

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDirectory, 'access.log') })
  ],
});

export default logger;