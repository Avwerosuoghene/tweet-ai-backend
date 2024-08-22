import { body } from "express-validator";

export const defaultValidator = {
  getBots: [
    body("userName").trim().not()
      .isEmpty(),
    body("password").trim().not()
      .isEmpty(),
  ],

};
