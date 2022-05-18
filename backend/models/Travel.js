import mongoose from "mongoose";

const TravelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide Title"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    tags: [String],
    image: {
      type: String,
      required: [true, "Please upload image"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("Travel", TravelSchema);
