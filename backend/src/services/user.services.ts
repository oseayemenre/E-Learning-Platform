import { User } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { TAuthSchema } from "../schema/auth.schema";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const updateUser = async (
  id: string,
  password: string
): Promise<void> => {
  await prisma.user.update({
    where: {
      id,
    },

    data: {
      password,
    },
  });
};

export const deleteuser = async (id: string): Promise<void> => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const createUser = async (data: TAuthSchema): Promise<User> => {
  return await prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      role: data.role,
      currentLevel: data.currentLevel,
      course: data.course,
      semester: data.semester,
    },
  });
};
