import { Application, Router } from "express";
import { DefaultController } from "./defaultController";
import { defaultValidator } from "../../validations/defaultValidator";

const router = Router();
const apiVersion = '/api/v1';

// router.post(
//   "/bots",
//   defaultValidator.getBots,
//   DefaultController.authenticate
// );


export default (app: Application) => {

  app.use(apiVersion, router);

  return app
}
