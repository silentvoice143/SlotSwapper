import express from "express";
import { catchAsync } from "../utils/catch-async";
import {
  approveRequest,
  createRequest,
  getRequests,
  rejectRequest,
} from "../controllers/request.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/requests", authMiddleware, catchAsync(createRequest));
router.get("/requests", authMiddleware, catchAsync(getRequests));
router.post(
  "/requests/:requestId/approve",
  authMiddleware,
  catchAsync(approveRequest)
);
router.post(
  "/requests/:requestId/reject",
  authMiddleware,
  catchAsync(rejectRequest)
);

export default router;
