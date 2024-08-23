import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";
import morgan from "morgan";
import fs from "fs";
import { connectDb, syncDatabase, models} from "./database"; 



import modules from "./modules/default";
import headerSetter from "./middleware/setHeaders";
import { CustomError } from "./database/types/handlers";




const app = express();

app.use(bodyParser.json());

app.use(headerSetter);


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
