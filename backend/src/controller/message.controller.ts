import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { IRequest } from "../interface/jwt.interface";
import {
  deleteUserMessage,
  findConversation,
  getAllMessages,
  getUsers,
  makeConversation,
  sendNewMessage,
} from "../services/conversation.services";

export const sendMessage = asyncHandler(
  async (req: IRequest, res: Response) => {
    const { id: recieverId } = req.params;
    const senderId = req.user?.id as string;
    const { message } = req.body;

    let conversation = await findConversation({
      senderId,
      recieverId,
    });

    if (!conversation)
      conversation = await makeConversation({ senderId, recieverId });

    const newMessage = await sendNewMessage({
      senderId,
      recieverId,
      message,
      conversationId: conversation.id,
    });

    return res.status(200).json({
      status: "success",
      message: newMessage,
    });
  }
);

export const getMessage = asyncHandler(async (req: IRequest, res: Response) => {
  const { id: recieverId } = req.params;
  const senderId = req.user?.id as string;

  const messages = await getAllMessages({ senderId, recieverId });

  return res.status(200).json({
    status: "success",
    messages,
  });
});

export const deleteMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: messageId } = req.params;

    await deleteUserMessage(messageId);

    return res.status(200).json({
      status: "success",
      message: "Message deleted succesfully",
    });
  }
);

export const getAllUsers = asyncHandler(
  async (req: IRequest, res: Response) => {
    const senderId = req.user?.id as string;

    const users = await getUsers(senderId);

    return res.status(200).json({
      status: "success",
      users,
    });
  }
);
