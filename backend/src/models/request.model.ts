import mongoose, { Document, Schema } from "mongoose";

export interface IRequest {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
}
export interface IRequestDocument extends IRequest, Document {
  createdAt: Date;
  updatedAt: Date;
}

const requestSchema = new Schema<IRequestDocument>(
  {
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Request = mongoose.model<IRequestDocument>(
  "Request",
  requestSchema
);
