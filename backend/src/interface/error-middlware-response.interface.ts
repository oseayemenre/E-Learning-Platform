export interface IErrorMiddleWareResponse {
  status: "failed";
  message: string;
  stackTrace?: string | null;
}
