import { Request, Response } from "express";

import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { CustomException } from "../exception/custom-exception";
import { generateAccessToken } from "../utils/generate-jwt-token";

// -----------------signup-----------------
export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new CustomException("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomException("User already exists", 400);
  }

  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};

// -----------------login-----------------
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomException("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomException("Invalid email or password", 401);
  }
  const accessToken = generateAccessToken(user, "3d");

  const userWithoutPassword = user.toObject();
  userWithoutPassword.password = "";
  console.log("User logged in:", userWithoutPassword, user);

  return res.json({
    success: true,
    message: "Login successful",
    accessToken,
    user: {
      id: userWithoutPassword._id,
      name: userWithoutPassword.name,
      email: userWithoutPassword.email,
    },
  });
};
