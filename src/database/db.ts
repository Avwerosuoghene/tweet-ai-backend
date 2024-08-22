import { configuration } from "../config/appconfig";
import { IConfigurables } from "./types/models";

import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

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
    console.log('SQL Database connected');
    return sequelize;
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
};

export default sequelize;

