import cookieParser from "cookie-parser";
import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";

// Routes
import authRoutes from "./routes/auth.routes";
import { globalException } from "./exception/global-exception-handler";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Swagger
setupSwagger(app);

//Routes
app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  console.log("ping done....");
  return res.json({
    status: "success",
  });
});

app.use(globalException);

export default app;
