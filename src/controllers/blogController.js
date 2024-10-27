import {catchasynErrors} from '../middlewares/catchasyncErrors.js';
import ErrorHandler from '../middlewares/newerror.js';
import cloudinary from 'cloudinary';
import {Blog} from '../models/blogSchema.model.js';

export const blogPost = catchasynErrors(async(req, res, next)=> {
    if(!req.files || Object.keys(req.files).length ===0){
        return next(new ErrorHandler("Main Image Is Mandatory!!", 400));
    }
    const {mainImage, paraOneImage, paraTwoImage, paraThreeImage} = req.files;
    if(!mainImage){
        return next(new ErrorHandler("Main Image Is Mandatory!!", 400));
    };
    const allowedformats= ['img/png', 'img/jpeg', 'img/webp'];
    if(!allowedformats.includes(mainImage.mimetype) ||
     (paraOneImage && !allowedformats.includes(paraOneImage.mimetype)) ||
     (paraTwoImage && !allowedformats.includes(paraTwoImage.mimetype)) ||
     (paraThreeImage && !allowedformats.includes(paraThreeImage.mimetype)) ){
        return next(new ErrorHandler("Invalid image format!!Please select png, jpeg or webp format.", 400))
    };

    const {title,
           intro,
           paraOneDescription,
           paraOneTitle,
           paraTwoDescription,
           paraTwoTitle,
           paraThreeDescription,
           paraThreeTitle,
           category} = req.body;

    const createdBy = req.user._id;
    const authorName = req.body.name;
    const authorAvatar = req.body.avatar.url;
    
    if(!title || !intro || !category){
        return next(new ErrorHandler("title, intro and category are required field!!", 400));
    };

    const  uploadPromise = [
        cloudinary.uploader.upload(mainImage.tempFilePath),
        paraOneImage ? cloudinary.uploader.upload(paraOneImage.tempFilePath) : Promise.resolve(null),
        paraTwoImage ? cloudinary.uploader.upload(paraTwoImage.tempFilePath) : Promise.resolve(null),
        paraThreeImage ? cloudinary.uploader.upload(paraThreeImage.tempFilePath) : Promise.resolve(null)
    ];
    const [mainImageRes, paraOneImageRes, paraTwoImageRes, paraThreeImageRes] = await Promise.all(uploadPromise);

    if(!mainImageRes || mainImageRes.error ||
       (paraOneImageRes && (!paraOneImageRes || paraOneImageRes.error)) ||
       (paraTwoImageRes && (!paraTwoImageRes || paraTwoImageRes.error)) ||
       (paraThreeImageRes && (!paraThreeImageRes || paraThreeImageRes.error))){
          return next(new  ErrorHandler("Error occured during uploading the one or more images"));
       };

       const blogData = {
           title,
           intro,
           paraOneDescription,
           paraOneTitle,
           paraTwoDescription,
           paraTwoTitle,
           paraThreeDescription,
           paraThreeTitle,
           category,
           createdBy,
           authorName,
           authorAvatar,
           mainImage: {
            public_id: mainImageRes.public_id,
            url: mainImageRes.secure_url    
           }   
       };
       if(paraOneImageRes){
        blogData.paraOneImage={
            public_id: paraOneImageRes.public_id,
            url: paraOneImageRes.secure_url} 
       }
       if(paraTwoImageRes){
        blogData.paraTwoImage={
            public_id: paraTwoImageRes.public_id,
            url: paraTwoImageRes.secure_url} 
       }
       if(paraThreeImageRes){
        blogData.paraThreeImage={
            public_id: paraThreeImageRes.public_id,
            url: paraThreeImageRes.secure_url} 
       }
       const blog = await Blog.create(blogData);
       res.status(200).json({
        success: true,
        message: "Blog Posted Successfully!!",
        blog
       })
})