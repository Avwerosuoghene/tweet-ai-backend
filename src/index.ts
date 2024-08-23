import { configuration } from "./config/appconfig";
import dotenv from "dotenv";

dotenv.config();

const nodeEnv = process.env.NODE_ENV!;
const port = parseInt(configuration[nodeEnv as keyof IConfigurables].port)

import app from "./app";
import { IConfigurables } from "./database/types/models";
import startBackgroundProcess from "./background/autobotTask";
import logger from "./utils/logger";

app.listen(port,  () => {
    logger.info(`Listening on port ${port}!!!`);

})

startBackgroundProcess();