import dotenv from "dotenv";
import swaggerJSDoc from 'swagger-jsdoc';
import { IConfigurables } from '../database/types/models';
import { configuration } from './appconfig';

const nodeEnv = process.env.NODE_ENV!;
dotenv.config({ path: `${process.env.NODE_ENV}.env` });

const port = parseInt(configuration[nodeEnv as keyof IConfigurables].port)

const baseUrl = `http://localhost:${port}/api/v1`;

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
        url: baseUrl,  
        description: 'nodeEnv server - Version 1.0.0',
      },
    ],
  },
  apis: ['./src/helpers/swaggerDocs.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;