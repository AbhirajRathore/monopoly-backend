import mongoose from "mongoose";
import CustomError from "../errors";

const  connectDB =  (url:string) => {
    if (!url)
        throw new CustomError.BadRequestError(
            "Please provide database connection string"
        );
    else {
        console.log("Mongo database connected successfully!");
    }
    mongoose.set('strictQuery', false);
    return mongoose.connect(url);
};

export = connectDB;