import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDb connected to: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(`${error.message}`.underline.red);
    process.exit(1);
  }
};
