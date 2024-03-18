import { Router } from "express";
import {
  meetingJoin,
  meetingCreation,
  meetingDeletion,
  removeParticipants,
  getMeeting,
  assignRole,
} from "../controller/meeting.controller";
import { privateRoute } from "../middleware/route-security.middleware";
import { meetingSchema, roleSchema } from "../schema/meeting.schema";
import { validator } from "../middleware/validator.middleware";
import { roleCheck } from "../middleware/role.middleware";
import { Role } from "@prisma/client";

const router = Router();

router.use(privateRoute);

router.post(
  "/create-meeting",
  roleCheck(Role.HOST),
  validator(meetingSchema),
  meetingCreation
);

router.delete("/:id", roleCheck(Role.HOST), meetingDeletion);

router.post("/join-meeting", meetingJoin);

router.get("/:id", getMeeting);

router.delete(
  "/remove-participants/:meetingid/:participantid",
  roleCheck(Role.HOST),
  removeParticipants
);

router.post(
  "/assign-role/:id",
  roleCheck(Role.HOST),
  validator(roleSchema),
  assignRole
);

export { router as meetingRoute };
