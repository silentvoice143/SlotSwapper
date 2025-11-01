import express from "express";
import { catchAsync } from "../utils/catch-async";
import {
  approveRequest,
  createRequest,
  getMyRequests,
  getRequests,
  rejectRequest,
} from "../controllers/request.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/", authMiddleware, catchAsync(createRequest));
router.get("/", authMiddleware, catchAsync(getRequests));
router.get("/my-request", authMiddleware, catchAsync(getMyRequests));
router.post("/:requestId/approve", authMiddleware, catchAsync(approveRequest));
router.post("/:requestId/reject", authMiddleware, catchAsync(rejectRequest));

export default router;
