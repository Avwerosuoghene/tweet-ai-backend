import { Request, Response, NextFunction } from "express";
import { succesHandler } from "../../helpers/responseHandler";

export class DefaultController {


  static async getBots(req: Request, res: Response, next: NextFunction) {

    try {

      return succesHandler(res, 200, '', true, {})
    } catch (err: any) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
}
