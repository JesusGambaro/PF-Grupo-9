const cloudinary = require("cloudinary")

const {CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET} = process.env

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET
});

module.exports = async (file) =>{
    try {
        const res = await cloudinary.uploader.upload(file);
        return res;
    } catch (error) {
        console.log(error);
    }
};