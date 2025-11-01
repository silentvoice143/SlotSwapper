import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomException } from "../exception/custom-exception";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export interface AuthRequest extends Request {
  user?: any;
}

// 📌 Verify JWT from cookie
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // ✅ Read token from httpOnly cookie
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomException("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new CustomException("No token provided", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
    };
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// 📌 Check Admin
export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.is_admin) {
    return res
      .status(403)
      .json({ success: false, message: "Admin access required" });
  }
  next();
};
