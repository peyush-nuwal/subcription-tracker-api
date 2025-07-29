import mongoose from "mongoose";
import { DB_URI ,NODE_ENV } from "../config/env.js";


if (!DB_URI) {
    throw new Error('please define the MONGODB_URI environment varibable inside .env<development/production>.local')
}

//connect to db

const connectToDatabase = async () => {
     try {
         await mongoose.connect(DB_URI)
         console.log(`Connected to database in ${NODE_ENV} mode`)
     } catch (error) {
         console.error(error);

         // eslint-disable-next-line no-undef
         process.exit(1)
        
     }
}

export default connectToDatabase