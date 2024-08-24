import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { connectDb, syncDatabase, models } from "./database";
import swaggerUI from 'swagger-ui-express';
import modules from "./services";
import headerSetter from "./middleware/setHeaders";
import { CustomError } from "./database/types/handlers";
import swaggerSpec from "./config/swaggerConfig";
import http from 'http';
import { setupSocketIO } from "./config/socketConfig";
import apiLimiter from "./middleware/rateLimiter";

const app = express();
const server = http.createServer(app);

setupSocketIO(server);

app.use(bodyParser.json());

app.use(headerSetter);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));;

app.use(apiLimiter);

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

export { app, server };
