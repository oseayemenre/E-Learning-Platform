import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { TMeetingSchema, TRoleSchema } from "../schema/meeting.schema";
import { IRequest } from "../interface/jwt.interface";
import { v4 as uuid } from "uuid";
import {
  assignUserRole,
  createMeeting,
  deleteMeeting,
  findMeeting,
  joinMeeting,
  removeMember,
} from "../services/meeting.services";
import { Meeting, Role, User } from "@prisma/client";
import { CustomError } from "../utils/custom-error";

export const meetingCreation = asyncHandler(
  async (
    req: IRequest,
    res: Response<{
      message: "success";
      user: User | null;
    }>
  ) => {
    const { name, meetingTime, meetingDuration } = req.body as TMeetingSchema;

    const meetingDurationToNumber = parseInt(meetingDuration.split(/s+/)[0]);

    let meetingDurationformatted: Date;

    if (
      meetingDuration.split(/\s+/)[meetingDuration.split(/\s+/).length - 1] ===
      "minutes"
    ) {
      meetingDurationformatted = new Date(
        new Date(meetingTime).setMinutes(
          new Date(meetingTime).getMinutes() + meetingDurationToNumber
        )
      );

      const meetingTimeformatted = new Date(meetingTime);

      const user = await createMeeting((req.user as { id: string }).id, {
        name,
        meetingId: uuid().split("-")[uuid().split("-").length - 1],
        meetingTime: meetingTimeformatted,
        meetingDuration: meetingDurationformatted,
      });

      res.status(201).json({
        message: "success",
        user,
      });
    }

    if (
      meetingDuration.split(/\s+/)[meetingDuration.split(/\s+/).length - 1] ===
      "seconds"
    ) {
      meetingDurationformatted = new Date(
        new Date(meetingTime).setSeconds(
          new Date(meetingTime).getSeconds() + meetingDurationToNumber
        )
      );

      const meetingTimeformatted = new Date(meetingTime);

      const user = await createMeeting((req.user as { id: string }).id, {
        name,
        meetingId: uuid().split("-")[uuid().split("-").length - 1],
        meetingTime: meetingTimeformatted,
        meetingDuration: meetingDurationformatted,
      });

      res.status(201).json({
        message: "success",
        user,
      });
    }

    if (
      meetingDuration.split(/\s+/)[meetingDuration.split(/\s+/).length - 1] ===
      "hours"
    ) {
      meetingDurationformatted = new Date(
        new Date(meetingTime).setHours(
          new Date(meetingTime).getHours() + meetingDurationToNumber
        )
      );

      const meetingTimeformatted = new Date(meetingTime);

      const user = await createMeeting((req.user as { id: string }).id, {
        name,
        meetingId: uuid().split("-")[uuid().split("-").length - 1],
        meetingTime: meetingTimeformatted,
        meetingDuration: meetingDurationformatted,
      });

      res.status(201).json({
        message: "success",
        user,
      });
    }

    throw new CustomError(400, "Meeting could not be created");
  }
);

export const getMeeting = asyncHandler(
  async (
    req: Request,
    res: Response<{
      status: "success";
      meeting: Meeting | null;
    }>
  ) => {
    const { id } = req.params as { id: string };
    const meeting = await findMeeting(id);

    res.status(200).json({
      status: "success",
      meeting,
    });
  }
);

export const meetingDeletion = asyncHandler(
  async (
    req: Request,
    res: Response<{
      status: string;
      message: string;
    }>
  ) => {
    const { id } = req.params as { id: string };

    await deleteMeeting(id);

    res.status(200).json({
      status: "success",
      message: "Meeting deleted",
    });
  }
);

export const meetingJoin = asyncHandler(
  async (
    req: IRequest,
    res: Response<{
      status: "success";
      message: string;
    }>
  ) => {
    const { meetingId } = req.body as { meetingId: string };

    await joinMeeting(req.user?.id as string, meetingId);

    res.status(200).json({
      status: "success",
      message: "You've joined the meeting",
    });
  }
);

export const removeParticipants = asyncHandler(
  async (
    req: Request,
    res: Response<{
      status: "success";
      meeting: Meeting | null;
    }>
  ) => {
    const { participantid, meetingid } = req.params as {
      participantid: string;
      meetingid: string;
    };

    const meeting = await removeMember(meetingid, participantid);

    res.status(200).json({
      status: "success",
      meeting,
    });
  }
);

export const assignRole = asyncHandler(
  async (
    req: Request,
    res: Response<{
      status: "success";
      user: User;
    }>
  ) => {
    const { id } = req.params as { id: string };
    const { role } = req.body as TRoleSchema;

    const user = await assignUserRole(id, role);

    res.status(200).json({
      status: "success",
      user,
    });
  }
);
