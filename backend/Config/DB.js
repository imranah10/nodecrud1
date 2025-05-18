import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const ConnectDb=async()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("✅ Connected to MongoDB")
    } catch (error) {
        console.log('❌ Filed to Connect',error)
        
    }
}
export default ConnectDb;