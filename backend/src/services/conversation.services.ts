import { Conversation, Message, User } from "@prisma/client";
import { prisma } from "../utils/prisma";

export const findConversation = async (
  data: Omit<
    Message,
    "id" | "message" | "createdAt" | "updatedAt" | "conversationId"
  >
): Promise<Conversation | null> => {
  return await prisma.conversation.findFirst({
    where: {
      AND: [
        { members: { has: data.senderId } },
        { members: { has: data.recieverId } },
      ],
    },
  });
};

export const makeConversation = async (
  data: Omit<
    Message,
    "id" | "message" | "createdAt" | "updatedAt" | "conversationId"
  >
): Promise<Conversation> => {
  return await prisma.conversation.create({
    data: {
      members: [data.senderId, data.recieverId],
    },
  });
};

export const sendNewMessage = async (
  data: Omit<Message, "id" | "createdAt" | "updatedAt">
) => {
  return await prisma.message.create({
    data: {
      senderId: data.senderId,
      recieverId: data.recieverId,
      message: data.message,
      conversationId: data.conversationId,
    },
  });
};

export const getAllMessages = async (
  data: Omit<
    Message,
    "id" | "message" | "createdAt" | "updatedAt" | "conversationId"
  >
): Promise<Conversation | null> => {
  return await prisma.conversation.findFirst({
    where: {
      AND: [
        { members: { has: data.senderId } },
        { members: { has: data.recieverId } },
      ],
    },

    include: {
      messages: true,
    },
  });
};

export const deleteUserMessage = async (
  messageId: string
): Promise<Message> => {
  return await prisma.message.delete({
    where: {
      id: messageId,
    },
  });
};

export const getUsers = async (userId: string): Promise<User[] | null> => {
  return await prisma.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
    },
  });
};
