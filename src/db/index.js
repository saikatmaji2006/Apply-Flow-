import mongoose from "mongoose";
import { DB_Name } from "../constants.js";
const connectDB = async ()=>{
    try{
    await mongoose.connect(`${process.env.mongodbURI}/${DB_Name}`)
    console.log(`\n MongoDB Connected !! DB Host: ${mongoose.connection.host}`);


}
    catch(error){
        console.log("Failed to connect to mongoDb",error);
        process.exit(1)
    }
}
export default connectDB