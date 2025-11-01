import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Define your secrets
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateAccessToken = (
  user: JwtPayload,
  expiresIn: `${number}${"s" | "m" | "h" | "d"}` = "1h" // Type-safe literal
): string => {
  console.log(
    process.env.JWT_SECRET,
    user._id.toString(),
    "----generating token"
  );
  const payload = { id: user._id.toString(), email: user.email };
  const options: SignOptions = { expiresIn }; // ✅ matches StringValue
  return jwt.sign(payload, JWT_SECRET, options);
};
