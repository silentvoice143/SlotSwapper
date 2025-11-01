import express from "express";
import { catchAsync } from "../utils/catch-async";
import {
  createEvent,
  deleteEvent,
  getEvents,
  getSwappableEvents,
  updateStatus,
} from "../controllers/event.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, catchAsync(createEvent));
router.get("/", authMiddleware, catchAsync(getEvents));
router.get("/swappable", authMiddleware, catchAsync(getSwappableEvents));
router.delete("/:eventId", authMiddleware, catchAsync(deleteEvent));
router.patch(
  "/:eventId/status/:status",
  authMiddleware,
  catchAsync(updateStatus)
);
router.put("/:eventId", authMiddleware, catchAsync(updateStatus));

export default router;
