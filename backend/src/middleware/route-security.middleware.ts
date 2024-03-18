import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom-error";
import { IRequest } from "../interface/jwt.interface";
import { verifyToken } from "../utils/jwt";

export const privateRoute = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token as string;

  if (!token) throw new CustomError(404, "Token not found");

  const decodeToken = verifyToken(token, "ACCESS_TOKEN");

  if (!decodeToken) throw new CustomError(401, "Token is invalid");

  req.user = decodeToken as { id: string };

  return next();
};

export const publicRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token as string;

  if (token) throw new CustomError(400, "User already logged in");

  return next();
};
