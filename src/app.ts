import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { connectDb, syncDatabase, models} from "./database"; 
import rateLimit from 'express-rate-limit';
import swaggerUI from 'swagger-ui-express';
import modules from "./services";
import headerSetter from "./middleware/setHeaders";
import { CustomError } from "./database/types/handlers";
import swaggerSpec from "./config/swaggerConfig";
import http from 'http';
import { setupSocketIO } from "./config/socketConfig";



const app = express();
const server = http.createServer(app);

setupSocketIO(server);  

app.use(bodyParser.json());

app.use(headerSetter);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5, 
  message: 'Too many requests from this IP, please try again later.'
});



app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec)); ;

app.use(limiter);

modules(app);

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



export  {app, server};
