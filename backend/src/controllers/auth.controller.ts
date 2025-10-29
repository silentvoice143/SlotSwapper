import { Request, Response } from "express";
import { AppDataSource } from "../connectDB/data-source";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { CustomException } from "../exception/custom-exception";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generate-jwt-token";
import jwt from "jsonwebtoken";

// 📌 Signup (register user)
export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new CustomException("All fields are required");
  }

  const userRepo = AppDataSource.getRepository(User);
  const existingUser = await userRepo.findOneBy({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = userRepo.create({ name, email, password: hashedPassword });
  const savedUser = await userRepo.save(newUser);

  // remove password before returning
  const { password: _pwd, ...userWithoutPassword } = savedUser as any;

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: userWithoutPassword,
  });
};

// 📌 Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo
    .createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.email = :email", { email })
    .getOne();

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  const accessToken = generateAccessToken({
    id: user.id,
    isAdmin: user.isAdmin,
  });
  const refreshToken = generateRefreshToken({
    id: user.id,
    isAdmin: user.isAdmin,
  });

  // Option 1️⃣: Save refresh token in DB
  await userRepo.update(user.id, { refreshToken });

  // Option 2️⃣: Or send it in HttpOnly cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 min
  });

  const { password: _pwd, ...userWithoutPassword } = user as any;

  return res.json({
    success: true,
    message: "Login successful",
    accessToken,
    user: {
      id: userWithoutPassword.id,
      name: userWithoutPassword.name,
      email: userWithoutPassword.email,
      isAdmin: userWithoutPassword.isAdmin,
    },
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken || req.body.refreshToken; // support both cookie or body

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token missing" });
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
    id: string;
    isAdmin: boolean;
  };

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: +decoded.id });

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid refresh token" });
  }

  const newAccessToken = generateAccessToken({
    id: user.id,
    isAdmin: user.isAdmin,
  });

  return res.json({
    success: true,
    accessToken: newAccessToken,
  });
};
