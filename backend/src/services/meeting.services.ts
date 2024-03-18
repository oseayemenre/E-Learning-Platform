import { Meeting, User } from "@prisma/client";
import { TMeetingSchema } from "../schema/meeting.schema";
import { prisma } from "../utils/prisma";
import { CustomError } from "../utils/custom-error";
import { Role } from "@prisma/client";

export const createMeeting = async (
  id: string,
  body: Omit<TMeetingSchema, "meetingDuration" | "meetingTime"> & {
    meetingTime: Date;
    meetingDuration: Date;
    meetingId: string;
  }
): Promise<User | null> => {
  await prisma.user.update({
    where: {
      id,
    },

    data: {
      meeting: {
        create: {
          name: body.name,
          meetingTime: body.meetingTime,
          meetingId: body.meetingId,
          meetingDuration: body.meetingDuration,
        },
      },
    },
  });

  return await prisma.user.findUnique({
    where: {
      id,
    },

    include: {
      meeting: true,
    },
  });
};

export const deleteMeeting = async (id: string): Promise<void> => {
  await prisma.meeting.delete({
    where: {
      id,
    },
  });
};

export const joinMeeting = async (
  userid: string,
  meetingId: string
): Promise<void> => {
  await prisma.user.update({
    where: {
      id: userid,
    },

    data: {
      meetingId,
    },
  });
};

export const findMeeting = async (
  meetingId: string
): Promise<Meeting | null> => {
  return await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },

    include: {
      users: true,
    },
  });
};

export const removeMember = async (
  meetingId: string,
  userId: string
): Promise<Meeting | null> => {
  const findMeeting = await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },

    select: {
      users: true,
    },
  });

  const index = findMeeting?.users.findIndex(
    (user) => user.id === userId
  ) as number;

  console.log(findMeeting?.users);

  if (index < 0) throw new CustomError(404, "User doesn't exist");

  findMeeting?.users.splice(index, 1);

  await prisma.meeting.update({
    where: {
      id: meetingId,
    },

    data: {
      users: {
        set: findMeeting?.users as User[],
      },
    },
  });

  return await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },

    include: {
      users: true,
    },
  });
};

export const assignUserRole = async (id: string, role: Role): Promise<User> => {
  return await prisma.user.update({
    where: {
      id,
    },

    data: {
      role,
    },
  });
};
