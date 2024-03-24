import { Router } from "express";
import { privateRoute } from "../middleware/route-security.middleware";
import {
  sendMessage,
  deleteMessage,
  getMessage,
  getAllUsers,
} from "../controller/message.controller";
import { validator } from "../middleware/validator.middleware";
import { messageSchema } from "../schema/message.schema";

const router = Router();

router.use(privateRoute);

router.get("/users", getAllUsers);

router
  .route("/:id")
  .get(getMessage)
  .post(validator(messageSchema), sendMessage)
  .delete(deleteMessage);

export { router as messageRoute };
