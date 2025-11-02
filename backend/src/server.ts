import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";

// Routes
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";
import requestRoutes from "./routes/request.routes";

import { globalException } from "./exception/global-exception-handler";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["https://slotswapper-pvr4.onrender.com", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

// Swagger
setupSwagger(app);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/requests", requestRoutes);

app.get("/", (req: Request, res: Response) => {
  console.log("ping done....");
  return res.json({
    status: "success",
  });
});

app.use(globalException);

export default app;
