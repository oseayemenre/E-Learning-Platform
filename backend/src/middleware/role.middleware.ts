import { NextFunction, Response } from "express";
import { IRequest } from "../interface/jwt.interface";
import { findUserById } from "../services/user.services";
import { CustomError } from "../utils/custom-error";

export const roleCheck =
  (role: string) =>
  async (req: IRequest, res: Response, next: NextFunction) => {
    const user = await findUserById((req.user as { id: string }).id);

    if (user?.role !== role)
      throw new CustomError(401, "User not authorized for this route");

    return next();
  };
