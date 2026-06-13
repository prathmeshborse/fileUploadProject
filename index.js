const express = require("express");
const express_fileUpload = require("express-fileupload");

// DB and File upload
const FileUploadRoutes = require("./routes/FileUploadRoutes");
const connectDB = require("./config/database");
const cloudinary = require("./config/cloudinary");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(express_fileUpload({
    useTempFiles: true,
    tempFileDir: 'temp'
}));

app.use("/api/v1/upload", FileUploadRoutes);

// Database Connection cloudinary connection
connectDB();
cloudinary.cloudinaryConnect();

app.listen(PORT, (req, res) =>{
    console.log(`App is running at ${PORT}`);
}); 