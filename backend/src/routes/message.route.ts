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

router.get("/", getMessage);

router.post("/:id", validator(messageSchema), sendMessage);

router.route("/:id").delete(deleteMessage);

router.get("/users", getAllUsers);

export { router as messageRoute };
