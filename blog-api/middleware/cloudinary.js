import config from '../config/config.js'
import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.cloud_api_key,
    api_secret: config.cloud_api_secret,
})

 const cloudinaryUpload = async (req, res, next) => {
    try {
        const fileStr = req.body.avatar
        const uploadRes = await cloudinary.uploader.upload(fileStr, {})
        console.log(uploadRes)
        req.body.avatar = uploadRes.url
        next()
        
    } catch (err) {
        next(err)
    }
}

export default cloudinaryUpload