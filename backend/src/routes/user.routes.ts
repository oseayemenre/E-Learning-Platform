import { Router } from "express";
import { validator } from "../middleware/validator.middleware";
import { AuthSchema } from "../schema/auth.schema";
import {
  createAccount,
  deleteUser,
  getUser,
  login,
  logout,
  refreshToken,
  updatePassword,
} from "../controller/user.controller";
import {
  privateRoute,
  publicRoute,
} from "../middleware/route-security.middleware";

const router = Router();

router.post(
  "/create-account",
  publicRoute,
  validator(AuthSchema),
  createAccount
);

router.post("/login", publicRoute, login);

router.delete("/delete-account", privateRoute, deleteUser);

router.patch("/update-password", privateRoute, updatePassword);

router.get("/", privateRoute, getUser);

router.get("/refresh-token", privateRoute, refreshToken);

router.post("/logout", privateRoute, logout);

export { router as userRoute };
