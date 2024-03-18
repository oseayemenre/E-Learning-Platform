import { ICustomError } from "../interface/custom-error.interface";

export class CustomError extends Error implements ICustomError {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}
