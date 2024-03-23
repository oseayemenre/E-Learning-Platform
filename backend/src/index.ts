import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { CustomError } from "./utils/custom-error";
import { errorMiddleware } from "./middleware/error.middleware";
import { userRoute } from "./routes/user.routes";
import { meetingRoute } from "./routes/meeting.route";
import { messageRoute } from "./routes/message.route";

export const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/meetings", meetingRoute);
app.use("/api/v1/messages", messageRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Home route",
  });
});

app.get("*", (req: Request, res: Response) => {
  throw new CustomError(404, "Route doesn't exist");
});

app.use(errorMiddleware);
