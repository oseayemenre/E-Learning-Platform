import jwt, { JwtPayload } from "jsonwebtoken";
import { IToken } from "../interface/jwt.interface";

export const createToken = (
  data: IToken,
  secret: string,
  expires: string
): string => {
  return jwt.sign(data, secret, {
    expiresIn: expires,
  });
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
