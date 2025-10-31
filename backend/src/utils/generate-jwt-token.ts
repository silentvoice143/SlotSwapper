import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

// Define your secrets
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "default_refresh_secret";

export const generateAccessToken = (
  user: JwtPayload,
  expiresIn: `${number}${"s" | "m" | "h" | "d"}` = "1h" // Type-safe literal
): string => {
  const payload = { id: user.id, email: user.email };
  const options: SignOptions = { expiresIn }; // ✅ matches StringValue
  return jwt.sign(payload, JWT_SECRET, options);
};
