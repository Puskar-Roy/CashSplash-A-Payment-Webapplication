import mongoose from "mongoose";

const connect = async () => {
  try {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
