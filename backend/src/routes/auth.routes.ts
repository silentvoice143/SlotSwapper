import express from "express";
import { catchAsync } from "../utils/catch-async";
import { login, signup } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", catchAsync(signup));
router.post("/login", catchAsync(login));

export default router;
