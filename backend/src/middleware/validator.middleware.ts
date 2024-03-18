import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { CustomError } from "../utils/custom-error";

export const validator =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const valid = schema.safeParse(req.body);

    if (!valid.success)
      throw new CustomError(400, "Data could not be validated");

    return next();
  };
