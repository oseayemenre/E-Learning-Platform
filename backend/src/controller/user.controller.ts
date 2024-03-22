import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { TAuthSchema } from "../schema/auth.schema";
import {
  createUser,
  deleteuser,
  findUserByEmail,
  findUserById,
  updateUser,
} from "../services/user.services";
import { CustomError } from "../utils/custom-error";
import bcryptjs from "bcryptjs";
import { createToken, verifyToken } from "../utils/jwt";
import { IRequest } from "../interface/jwt.interface";
import { User } from "@prisma/client";

export const createAccount = asyncHandler(
  async (
    req: Request,
    res: Response<{
      status: "success";
      message: string;
      user: User;
    }>
  ) => {
    const {
      firstName,
      lastName,
      email,
      password,
      currentLevel,
      semester,
      course,
      role,
    } = req.body as TAuthSchema;

    const user = await findUserByEmail(email);

    if (user) throw new CustomError(409, "User already exists");

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      currentLevel,
      semester,
      course,
      role,
    });

    const accessToken = createToken({ id: newUser.id }, "ACCESS_TOKEN", "15m");
    const refreshToken = createToken({ id: newUser.id }, "REFRESH_TOKEN", "1d");

    res.status(201).cookie("access_token", accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
    });
    res.status(201).cookie("refresh_token", refreshToken, {
      maxAge: 1 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json({
      status: "success",
      message: "User succesfully created",
      user: newUser,
    });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as { email: string; password: string };

    const user = await findUserByEmail(email);

    if (!user) throw new CustomError(404, "User doesn't exist");

    const verifyUser = await bcryptjs.compare(
      password,
      user.password as string
    );

    if (!verifyUser) throw new CustomError(401, "Invalid credentials");

    const accessToken = createToken({ id: user.id }, "ACCESS_TOKEN", "15m");
    const refreshToken = createToken({ id: user.id }, "REFRESH_TOKEN", "1d");

    res.status(201).cookie("access_token", accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
    });
    res.status(201).cookie("refresh_token", refreshToken, {
      maxAge: 1 * 24 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      message: "User logged in",
      user,
    });
  }
);

export const updatePassword = asyncHandler(
  async (
    req: IRequest,
    res: Response<{
      status: "success";
      message: string;
    }>
  ) => {
    const { password } = req.body as { password: string };

    const user = await findUserById(req.user?.id as string);

    const passwordused = await bcryptjs.compare(
      password,
      user?.password as string
    );

    if (passwordused)
      throw new CustomError(
        400,
        "Password has already been used by you before"
      );

    const hashedPassword = await bcryptjs.hash(password, 10);

    await updateUser((req.user as { id: string }).id, hashedPassword);

    return res.status(200).json({
      status: "success",
      message: "User Password has been updated",
    });
  }
);

export const deleteUser = asyncHandler(
  async (
    req: IRequest,
    res: Response<{
      status: "success";
      message: string;
    }>
  ) => {
    await deleteuser((req.user as { id: string }).id);

    return res.status(200).json({
      status: "success",
      message: "User deleted succesfully",
    });
  }
);

export const getUser = asyncHandler(
  async (
    req: IRequest,
    res: Response<{
      status: "success";
      user: Record<"email", string | undefined>;
    }>
  ) => {
    const user = await findUserById((req.user as { id: string }).id);

    return res.status(200).json({
      status: "success",
      user: {
        email: user?.email,
      },
    });
  }
);

export const refreshToken = asyncHandler(
  async (
    req: Request,
    res: Response<{
      status: "success";
      message: string;
    }>
  ) => {
    const token = req.cookies.refresh_token as string;

    if (!token) throw new CustomError(404, "Refresh token not found");

    const decoderefresh = verifyToken(token, "REFRESH_TOKEN");

    if (!decoderefresh)
      throw new CustomError(401, "Token could not be verified as authentic");

    const accessToken = createToken(
      { id: decoderefresh.id },
      "ACCESS_TOKEN",
      "15m"
    );
    const refreshToken = createToken(
      { id: decoderefresh.id },
      "REFRESH_TOKEN",
      "1d"
    );

    res.status(201).cookie("access_token", accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
    });
    res.status(201).cookie("refresh_token", refreshToken, {
      maxAge: 1 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      status: "success",
      message: "Token has been refreshed succesfully",
    });
  }
);

export const logout = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).cookie("access_token", "").json({
      status: "success",
      message: "User logged out",
    });
  }
);
