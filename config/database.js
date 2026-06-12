const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fileUploadDB';

const connectDB = async () =>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully");
    }
    catch(err){
        console.error("Database connection failed", err);
        process.exit(1); // Exit the process with failure code 1
    }
}

module.exports = connectDB;