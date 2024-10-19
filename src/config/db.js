import mongoose from "mongoose";

//datbase connection
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/task-management-system`);
  } catch (error) {
    console.log("connection failed with db");
  }
};
export { connectDB };
