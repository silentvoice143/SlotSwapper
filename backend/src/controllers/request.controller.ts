import { CustomException } from "../exception/custom-exception";
import { Request } from "../models/request.model";
import { AuthenticatedRequest } from "../types/express";
import { Event } from "../models/event.model";
import { sendNotification } from "../utils/send-notification";

export const createRequest = async (req: AuthenticatedRequest, res: any) => {
  const { from, to, event } = req.body;
  if (!from || !to || !event) {
    throw new CustomException("All fields are required", 400);
  }
  const newRequest = new Request({ from, to, event });
  await newRequest.save();
  await sendNotification(
    to.toString(),
    "New Request Received",
    "You have a new request for an event."
  );
  return res.status(201).json({
    success: true,
    message: "Request created successfully",
    request: newRequest,
  });
};

export const getRequests = async (req: AuthenticatedRequest, res: any) => {
  const requests = await Request.find({ to: req.user?.id });
  return res.json({
    success: true,
    data: requests,
  });
};

export const approveRequest = async (req: AuthenticatedRequest, res: any) => {
  const { requestId } = req.params;
  const request = await Request.findById(requestId)
    .populate("from", "name email")
    .populate("to", "name email")
    .populate("event", "title");
  if (!request) {
    throw new CustomException("Request not found", 404);
  }

  const event = await Event.findById(request.event);
  if (!event) {
    throw new CustomException("Event not found", 404);
  }

  event.createdBy = request.to;
  event.status = "busy";
  await event.save();
  request.status = "accepted";
  await request.save();
  // Send notification
  await sendNotification(
    request.from._id.toString(),
    "Request Approved",
    "Your request was approved."
  );
  return res.json({
    success: true,
    message: "Request approved successfully",
    request,
  });
};

export const rejectRequest = async (req: AuthenticatedRequest, res: any) => {
  const { requestId } = req.params;
  const request = await Request.findById(requestId)
    .populate("from", "name email")
    .populate("to", "name email")
    .populate("event", "title");
  if (!request) {
    throw new CustomException("Request not found", 404);
  }
  request.status = "rejected";
  await request.save();
  // Send notification
  await sendNotification(
    request.from._id.toString(),
    "Request Rejected",
    "Your request was approved."
  );
  return res.json({
    success: true,
    message: "Request rejected successfully",
    request,
  });
};
