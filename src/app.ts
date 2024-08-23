import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";
import morgan from "morgan";
import fs from "fs";
import { connectDb, syncDatabase, models} from "./database"; 
import rateLimit from 'express-rate-limit';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import modules from "./services";
import headerSetter from "./middleware/setHeaders";
import { CustomError } from "./database/types/handlers";



const app = express();

app.use(bodyParser.json());

app.use(headerSetter);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5, 
  message: 'Too many requests from this IP, please try again later.'
});


const options = {
    definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tweet AI API',
      version: '1.0.0',
      description: 'API documentation for the Tweet AI application',
    },
    servers: [
      {
        url: 'http://localhost:9000/', // Base URL for the API
      },
    ],
  },
  apis:['./services']
};

const swaggerSpec = swaggerJSDoc(options);
console.log(swaggerSpec);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(limiter);

modules(app);
const logDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),{flags: 'a'}
);
app.use(morgan("combined", {stream: accessLogStream}));

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data, isSuccess: false });
  }
);

async function initializeApp() {
  try {
    await connectDb(); 
    await syncDatabase(); 
  } catch (error) {
    console.error('Error initializing app:', error);
    process.exit(1);
  }
}

initializeApp();



export default app;
