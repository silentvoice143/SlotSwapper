import mongoose, { Document, Schema, Model } from "mongoose";

export interface IEvent {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: "busy" | "swappable";
  createdBy: mongoose.Types.ObjectId;
}

export interface IEventDocument extends IEvent, Document {
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEventDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { type: String, enum: ["busy", "swappable"], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Event: Model<IEventDocument> =
  mongoose.models.Event || mongoose.model<IEventDocument>("Event", eventSchema);
