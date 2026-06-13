const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name: {type: String, required: true},
    fileURL: {type: String, required: true},
    tags:{type: String},
    email: {type: String}
});

// Post middleware (For sending eamil on successful upload of image). Should be define befor exporting model

fileSchema.post("save", async function(doc){
    try{
        console.log("Doc:", doc);

        // Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USR,
                pass: process.env.MAIL_PASSWORD,
            }
        });


        const info = await transporter.sendMail({
            from: `"Cloud Upload Service" <${process.env.MAIL_USR}>`,
            to: doc.email,
            subject: "File Uploaded Successfully 🎉",
            html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                    </head>
                    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                        
                        <div style="
                            max-width: 600px;
                            margin: auto;
                            background: white;
                            border-radius: 10px;
                            overflow: hidden;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        ">
                            
                            <div style="
                                background: #4F46E5;
                                color: white;
                                padding: 20px;
                                text-align: center;
                            ">
                                <h1>File Uploaded Successfully 🎉</h1>
                            </div>

                            <div style="padding: 30px;">
                                <h2>Hello ${doc.name},</h2>

                                <p>
                                    Your file has been uploaded successfully to Cloudinary.
                                </p>

                                <table style="width:100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding:10px; border:1px solid #ddd;">
                                            <strong>File Name</strong>
                                        </td>
                                        <td style="padding:10px; border:1px solid #ddd;">
                                            ${doc.name}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:10px; border:1px solid #ddd;">
                                            <strong>Tags</strong>
                                        </td>
                                        <td style="padding:10px; border:1px solid #ddd;">
                                            ${doc.tags}
                                        </td>
                                    </tr>
                                </table>

                                <div style="text-align:center; margin-top:30px;">
                                    <a href="${doc.fileURL}"
                                    style="
                                        background:#4F46E5;
                                        color:white;
                                        text-decoration:none;
                                        padding:12px 24px;
                                        border-radius:6px;
                                        display:inline-block;
                                    ">
                                        View File
                                    </a>
                                </div>

                                <p style="margin-top:30px;">
                                    Thank you for using our service.
                                </p>
                            </div>

                            <div style="
                                background:#f8f8f8;
                                text-align:center;
                                padding:15px;
                                color:#666;
                                font-size:12px;
                            ">
                                © 2026 Cloud Upload Service
                            </div>

                        </div>

                    </body>
                    </html>
                    `
        });

        console.log(info);
    }
    catch(error){
        console.log("Error: ", error);
    }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;