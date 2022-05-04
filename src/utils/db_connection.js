import config from "../config";
import mongoose from "mongoose";

const dbConnection = async() => {
    
    await mongoose.connect(config.DB_CONNECTION_STRING)
    .then(() =>console.log("DB synced successfully "))
    .catch((error) =>console.log(error))
}
export default dbConnection;