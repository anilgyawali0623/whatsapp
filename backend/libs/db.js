import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("data base is connected");
  } catch (error) {
    console.log("connection error", error);
  }
};
