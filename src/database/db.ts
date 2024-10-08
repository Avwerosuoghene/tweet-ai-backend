import { configuration } from "../config/appconfig";
import { IConfigurables } from "./types/models";

import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import logger from "../utils/logger";

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';
const dbName = configuration[nodeEnv as keyof IConfigurables].dbName;
const dbUser = configuration[nodeEnv as keyof IConfigurables].dbUser;
const dbPass = configuration[nodeEnv as keyof IConfigurables].dbPass;
const dbHost = configuration[nodeEnv as keyof IConfigurables].dbHost;
const dbDialect = configuration[nodeEnv as keyof IConfigurables].dbDialect as Dialect;


const sequelize = new Sequelize(
  dbName, 
  dbUser, 
  dbPass, 
  {
    host: dbHost,
    dialect: dbDialect,
    logging: false, 
  }
);

export const connectDb = async (): Promise<Sequelize> => {
  try {
    await sequelize.authenticate();
    logger.info('SQL Database connected');
    return sequelize;
  } catch (err) {
    logger.info('Unable to connect to the database:', err);
    process.exit(1);
  }
};

export const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync(); 
    logger.info('Database & tables synchronized!');
  } catch (err) {
    logger.error('Error syncing database:', err);
    process.exit(1);
  }
};


export default sequelize;

