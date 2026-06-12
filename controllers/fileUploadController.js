const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// ==========================================
// Local File Upload
// ==========================================
exports.localFileUpload = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const file = req.files.file;

        console.log("File Content:\n", file);

        const uploadDir = path.join(__dirname, "files");

        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir,`${Date.now()}.${file.name.split(".").pop()}`);

        await file.mv(filePath);

        res.status(201).json({
            success: true,
            message: "File uploaded to local storage successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// ==========================================
// Utility Functions
// ==========================================
function isSupportedImage(extension) {
    const supportedExtensions = ["jpg", "jpeg", "png"];
    return supportedExtensions.includes(extension.toLowerCase());
}

function isSupportedVideo(extension) {
    const supportedExtensions = ["mp4", "mov"];
    return supportedExtensions.includes(extension.toLowerCase());
}

// ==========================================
// Upload To Cloudinary
// ==========================================
async function uploadToCloudinary(file, folder, resourceType = "auto") {
    const options = {
        folder,
        resource_type: resourceType,
    };

    // Optional optimization for large videos
    if (resourceType === "video") {
        options.chunk_size = 6000000;
    }

    return await cloudinary.uploader.upload(
        file.tempFilePath,
        options
    );
}

// ==========================================
// Image Upload
// ==========================================
exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;

        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded",
            });
        }

        const file = req.files.imageFile;

        const imageExtension = file.name.split(".").pop().toLowerCase();

        if (!isSupportedImage(imageExtension)) {
            return res.status(400).json({
                success: false,
                message: "Supported formats: jpg, jpeg, png",
            });
        }

        const response = await uploadToCloudinary(file, "Sample_Files", "image");

        const newFile = await File.create({
            name,
            fileURL: response.secure_url,
            tags,
            email,
        });

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: newFile,
            imageUrl: response.secure_url,
        });
    } 
    catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Image upload failed",
        });
    }
};

// ==========================================
// Video Upload
// ==========================================
exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;

        if (!req.files || !req.files.videoFile) {
            return res.status(400).json({
                success: false,
                message: "No video file uploaded",
            });
        }

        const file = req.files.videoFile;

        const videoExtension = file.name.split(".").pop().toLowerCase();

        if (!isSupportedVideo(videoExtension)) {
            return res.status(400).json({
                success: false,
                message: "Supported formats: mp4, mov",
            });
        }

        const response = await uploadToCloudinary(file, "Sample_Files", "video");

        const newFile = await File.create({
            name,
            fileURL: response.secure_url,
            tags,
            email,
        });

        res.status(200).json({
            success: true,
            message: "Video uploaded successfully",
            data: newFile,
            videoUrl: response.secure_url,
        });
    } 
    catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Video upload failed",
        });
    }
};