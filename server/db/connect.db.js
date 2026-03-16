import { MONGO_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${MONGO_NAME}`);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;