import dotenv from "dotenv";
import { IConfigurables } from "../database/types/models";

dotenv.config({ path: `${process.env.NODE_ENV}.env` });



export  const configuration : IConfigurables  = {
    dev: {
        dbName: process.env.DB_NAME_DEV!,
        dbUser: process.env.DB_USER_DEV!,
        dbPass: process.env.DB_PASSWORD_DEV!,
        dbHost: process.env.DB_HOST_DEV!,
        dbDialect: process.env.DB_DIALECT_DEV!,
        port: process.env.PORT_DEV!,
    },
    prod: {
        dbName: process.env.DB_NAME_PRDD!,
        dbUser: process.env.DB_USER_PRDD!,
        dbPass: process.env.DB_PASSWORD_PRDD!,
        dbHost: process.env.DB_HOST_PROD!,
        dbDialect: process.env.DB_DIALECT_PROD!,
        port: process.env.PORT_PRDD!,
    }
}
