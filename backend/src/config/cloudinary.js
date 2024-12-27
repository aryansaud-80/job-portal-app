import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (filepath) => {
  try {
    if (!filepath) return null;
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: 'auto',
    });

    fs.unlinkSync(filepath);
    return response;
  } catch (error) {
    console.error('Error uploading image to cloudinary', error);
    fs.unlinkSync(filepath);
    return null;
  }
};

const cloudinaryDelete = async (publicId) => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    return null;
  }
};

export { cloudinaryUpload, cloudinaryDelete };
