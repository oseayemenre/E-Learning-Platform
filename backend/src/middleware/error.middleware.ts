import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom-error";
import {
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { IErrorMiddleWareResponse } from "../interface/error-middlware-response.interface";

export const errorMiddleware = (
  error: CustomError,
  req: Request,
  res: Response<IErrorMiddleWareResponse>,
  next: NextFunction
) => {
  (error.message = error.message ? error.message : "Internal Server Error"),
    (error.status = error.status ? error.status : 500);

  if (
    error instanceof PrismaClientInitializationError ||
    error instanceof PrismaClientValidationError
  )
    throw new CustomError(400, error.message);

  if (error.name === "JsonWebTokenError")
    throw new CustomError(401, "Token could not be validated as genuine");

  if (error.name === "TokenExpiredError")
    throw new CustomError(401, "Token is expired.");

  res.status(error.status).json({
    status: "failed",
    message: error.message,
    stackTrace: process.env.NODE_ENV === "production" ? null : error.stack,
  });

  return next();
};
