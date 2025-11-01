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

/**
 * @swagger
 * tags:
 *   name: Request
 *   description: APIs for creating, fetching, approving, and rejecting event requests
 */

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create a new request
 *     description: Allows a user to send a new event request to another user.
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *               - event
 *             properties:
 *               from:
 *                 type: string
 *                 description: ID of the user sending the request
 *                 example: "6724d6f1e4b23b001a8a9b12"
 *               to:
 *                 type: string
 *                 description: ID of the user receiving the request
 *                 example: "6724d6f1e4b23b001a8a9b15"
 *               event:
 *                 type: string
 *                 description: ID of the event associated with this request
 *                 example: "6724d6f1e4b23b001a8a9b20"
 *     responses:
 *       201:
 *         description: Request created successfully
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
 *                   example: "Request created successfully"
 *                 request:
 *                   $ref: "#/components/schemas/Request"
 *       400:
 *         description: All fields are required
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Get all received requests
 *     description: Fetch all event requests received by the authenticated user. You can filter by status.
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: "pending,accepted,rejected"
 *         description: Comma-separated list of request statuses to filter by
 *     responses:
 *       200:
 *         description: Requests fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Request fetched successfully"
 *                 request:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Request"
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/requests/my-request:
 *   get:
 *     summary: Get all requests created by the authenticated user
 *     description: Fetch all event requests created by the logged-in user. You can filter by status.
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: "pending,accepted,rejected"
 *         description: Comma-separated list of request statuses to filter by
 *     responses:
 *       200:
 *         description: Requests fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Request fetched successfully"
 *                 request:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Request"
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/requests/{requestId}/approve:
 *   post:
 *     summary: Approve a request
 *     description: Approves an event request sent by another user and updates the related event to "busy".
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the request to approve
 *     responses:
 *       200:
 *         description: Request approved successfully
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
 *                   example: "Request approved successfully"
 *                 request:
 *                   $ref: "#/components/schemas/Request"
 *       404:
 *         description: Request or event not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/requests/{requestId}/reject:
 *   post:
 *     summary: Reject a request
 *     description: Rejects an event request sent by another user.
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the request to reject
 *     responses:
 *       200:
 *         description: Request rejected successfully
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
 *                   example: "Request rejected successfully"
 *                 request:
 *                   $ref: "#/components/schemas/Request"
 *       404:
 *         description: Request not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Request:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6724d6f1e4b23b001a8a9b12"
 *         from:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "6724d6f1e4b23b001a8a9b10"
 *             name:
 *               type: string
 *               example: "John Doe"
 *             email:
 *               type: string
 *               example: "john@example.com"
 *         to:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "6724d6f1e4b23b001a8a9b15"
 *             name:
 *               type: string
 *               example: "Jane Smith"
 *             email:
 *               type: string
 *               example: "jane@example.com"
 *         event:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "6724d6f1e4b23b001a8a9b20"
 *             title:
 *               type: string
 *               example: "Team Standup"
 *             description:
 *               type: string
 *               example: "Daily sync-up meeting"
 *             startTime:
 *               type: string
 *               format: date-time
 *               example: "2025-11-02T10:00:00.000Z"
 *             endTime:
 *               type: string
 *               format: date-time
 *               example: "2025-11-02T11:00:00.000Z"
 *             status:
 *               type: string
 *               example: "busy"
 *         status:
 *           type: string
 *           enum: [pending, accepted, rejected]
 *           example: "pending"
 *         createdAt:
 *           type: string
 *           example: "2025-11-01T08:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           example: "2025-11-01T09:00:00.000Z"
 */

export default router;
