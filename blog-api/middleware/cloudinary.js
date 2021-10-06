import config from '../config/config.js'
import cloudinary from 'cloudinary'
import createError from "http-errors"

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.cloud_api_key,
    api_secret: config.cloud_api_secret,
})

 const cloudinaryUpload = async (req, res, next) => {
    try {
        const fileStr = req.body.image
        const uploadRes = await cloudinary.uploader.upload(fileStr, {})

        if(!uploadRes) throw new createError('upload failed')
        
        // console.log(uploadRes)
        req.body.image = uploadRes.url
        next()
        
    } catch (err) {
        next(err)
    }
}

export default cloudinaryUpload