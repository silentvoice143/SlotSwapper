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

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management and slot swapping
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     description: Allows an authenticated user to create a new event with title, description, and time range.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - startTime
 *               - endTime
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Team Standup"
 *               description:
 *                 type: string
 *                 example: "Daily sync with the team"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-01T09:00:00.000Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-01T10:00:00.000Z"
 *               status:
 *                 type: string
 *                 enum: [busy, swappable]
 *                 example: "busy"
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Event created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       400:
 *         description: Missing or invalid fields
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events for a specific date
 *     description: Returns events created by the logged-in user filtered by date.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025-11-01"
 *         description: The date to fetch events for (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of events for that date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       400:
 *         description: Date query missing
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/events/swappable:
 *   get:
 *     summary: Get all swappable events
 *     description: Returns events marked as "swappable" excluding the logged-in user’s events.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of swappable events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/events/{eventId}:
 *   delete:
 *     summary: Delete an event
 *     description: Deletes an event owned by the authenticated user.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Event deleted successfully"
 *       404:
 *         description: Event not found or unauthorized
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/events/{eventId}/status/{status}:
 *   patch:
 *     summary: Update event status
 *     description: Changes the status of an event between "busy" and "swappable".
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [busy, swappable]
 *     responses:
 *       200:
 *         description: Event status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Event status updated successfully"
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6724d6f1e4b23b001a8a9b12"
 *         title:
 *           type: string
 *           example: "Team Standup"
 *         description:
 *           type: string
 *           example: "Daily sync-up meeting"
 *         startTime:
 *           type: string
 *           format: date-time
 *           example: "2025-11-01T09:00:00.000Z"
 *         endTime:
 *           type: string
 *           format: date-time
 *           example: "2025-11-01T10:00:00.000Z"
 *         status:
 *           type: string
 *           enum: [busy, swappable]
 *           example: "busy"
 *         createdBy:
 *           type: string
 *           example: "6724d5a1e4b23b001a8a9b10"
 *         createdAt:
 *           type: string
 *           example: "2025-11-01T08:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           example: "2025-11-01T09:00:00.000Z"
 */

export default router;
