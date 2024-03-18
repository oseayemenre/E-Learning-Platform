import { Request } from "express";

export interface IToken {
  id: string;
}

export interface IRequest extends Request {
  user?: {
    id: string;
  };
}
