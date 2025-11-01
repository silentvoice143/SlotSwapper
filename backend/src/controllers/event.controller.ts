import { startOfDay } from "date-fns";
import { Request, Response } from "express";
import { CustomException } from "../exception/custom-exception";
import { AuthenticatedRequest } from "../types/express";
import { Event } from "../models/event.model";
import { toUtcIso, getDayRange } from "../utils/date-formatter";

export const createEvent = async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, startTime, endTime, status } = req.body as {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    status: string;
  };

  if (!title || !description || !startTime || !endTime) {
    throw new CustomException("All fields are required", 400);
  }

  const newEvent = new Event({
    title,
    description,
    startTime,
    endTime,
    createdBy: req.user?.id,
    status,
  });

  const savedEvent = await newEvent.save();

  return res.status(201).json({
    success: true,
    message: "Event created successfully",
    data: savedEvent,
  });
};

export const getEvents = async (req: AuthenticatedRequest, res: Response) => {
  const { date } = req.query;

  if (!date) {
    throw new CustomException("Date query parameter is required", 400);
  }

  const userId = req.user?.id;
  if (!userId) {
    throw new CustomException("Unauthorized", 401);
  }

  const { start, end } = getDayRange(date as string);

  const events = await Event.find({
    createdBy: userId,
    startTime: {
      $gte: start,
      $lte: end,
    },
  });

  return res.json({
    success: true,
    data: events,
  });
};

export const getSwappableEvents = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new CustomException("Unauthorized", 401);
  }

  const events = await Event.find({
    status: "swappable",
    createdBy: { $ne: userId },
  }).populate({
    path: "createdBy",
    select: "name email",
  });

  return res.json({
    success: true,
    data: events,
  });
};

export const deleteEvent = async (req: AuthenticatedRequest, res: Response) => {
  const { eventId } = req.params;
  const deletedEvent = await Event.findOneAndDelete({
    _id: eventId,
    createdBy: req.user?.id,
  });
  if (!deletedEvent) {
    throw new CustomException("Event not found or unauthorized", 404);
  }
  return res.json({
    success: true,
    message: "Event deleted successfully",
  });
};

export const updateStatus = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { eventId, status } = req.params;
  const event = await Event.findOne({ _id: eventId, createdBy: req.user?.id });
  if (!event) {
    throw new CustomException("Event not found", 404);
  }
  event.status = status as "swappable" | "busy";
  event.save();
  return res.status(200).json({
    message: "Event status updated successfully",
    event,
    success: true,
  });
};

export const updateEvent = async (req: AuthenticatedRequest, res: Response) => {
  const { eventId, status } = req.params;
  const event = await Event.findByIdAndUpdate(
    { _id: eventId, createdBy: req.user?.id },
    req.body,
    { new: true }
  );
  if (!event) {
    throw new CustomException("Event not found", 404);
  }
  event.status = status as "swappable" | "busy";
  event.save();
  return res
    .status(200)
    .json({ message: "Event status updated successfully", event });
};
