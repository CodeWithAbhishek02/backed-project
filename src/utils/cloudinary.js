import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
const fs = require('fs');


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// uploadFiles to cloudinary
const uploadToCloudinary = async (localFilePath, publicId = null) => {
    try {
        if (!localFilePath) throw new Error('No file path provided');

        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // file has been successfully uploaded
        console.log('file is uploded on cloudinary', uploadResult.url);
        
        //Delete local file after upload
        fs.unlinkSync(localFilePath);

        return uploadResult

    } catch (error) {
        console.error('Cloudinary Error:', error.message);

        //  Delete the file if upload fails
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

        return {
            success: false,
            message: 'Upload failed',
            error: error.message,
        };
    }
} 