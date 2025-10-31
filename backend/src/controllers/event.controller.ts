import { Request, Response } from "express";
import { CustomException } from "../exception/custom-exception";
import { AuthenticatedRequest } from "../types/express";
import { Event } from "../models/event.model";

export const createEvent = async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, startTime, endTime } = req.body as {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
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
  });

  const savedEvent = await newEvent.save();

  return res.status(201).json({
    success: true,
    message: "Event created successfully",
    data: savedEvent,
  });
};

export const getEvents = async (req: AuthenticatedRequest, res: Response) => {
  const events = await Event.find({ createdBy: req.user?.id });
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
  return res
    .status(200)
    .json({ message: "Event status updated successfully", event });
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
