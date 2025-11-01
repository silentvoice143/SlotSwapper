import { CustomException } from "../exception/custom-exception";
import { Request } from "../models/request.model";
import { AuthenticatedRequest } from "../types/express";
import { Event } from "../models/event.model";
import { sendNotification } from "../utils/send-notification";

export const createRequest = async (req: AuthenticatedRequest, res: any) => {
  try {
    const { from, to, event } = req.body;

    if (!from || !to || !event) {
      throw new CustomException("All fields are required", 400);
    }

    const existingRequest = await Request.findOne({
      from,
      to,
      event,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message:
          "A pending request already exists for this event between these users.",
      });
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
  } catch (error: any) {
    console.error("Error creating request:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getRequests = async (req: AuthenticatedRequest, res: any) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new CustomException("Unauthorized", 401);
  }

  const { status } = req.query;

  const filter: any = { to: userId };

  if (status) {
    const statuses = (status as string).split(",").map((s) => s.trim());
    filter.status = { $in: statuses };
  }

  const requests = await Request.find(filter)
    .populate({
      path: "from",
      select: "name email",
    })
    .populate({
      path: "event",
      select: "title description startTime endTime status",
    });

  return res.status(201).json({
    success: true,
    message: "Request fetched successfully",
    request: requests,
  });
};

export const getMyRequests = async (req: AuthenticatedRequest, res: any) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new CustomException("Unauthorized", 401);
  }

  const { status } = req.query;

  const filter: any = { from: userId };

  if (status) {
    const statuses = (status as string).split(",").map((s) => s.trim());
    filter.status = { $in: statuses };
  }

  const requests = await Request.find(filter)
    .populate({
      path: "from",
      select: "name email",
    })
    .populate({
      path: "to",
      select: "name email",
    })
    .populate({
      path: "event",
      select: "title description startTime endTime status",
    });

  return res.status(201).json({
    success: true,
    message: "Request fetched successfully",
    request: requests,
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

  event.createdBy = request.from;
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
