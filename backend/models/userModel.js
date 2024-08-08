import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      require: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String }, //URL For Resume
      resumeName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }, //Creating relation with company model
      profile: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("Users", userSchema);
