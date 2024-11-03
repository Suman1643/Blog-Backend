import {catchasynErrors} from '../middlewares/catchasyncErrors.js';
import {ErrorHandler} from '../middlewares/newerror.js';
import cloudinary from 'cloudinary';
import {Blog} from '../models/blogSchema.model.js';
import fileUpload from 'express-fileupload';

export const blogPost = catchasynErrors(async(req, res, next)=> {
    if(!req.files || Object.keys(req.files).length ===0){
        return next(new ErrorHandler("Main Image Is Mandatory!!", 400));
    }
    const {mainImage, paraOneImage, paraTwoImage, paraThreeImage} = req.files;
    if(!mainImage){
        return next(new ErrorHandler("Main Image Is Mandatory!!", 400));
    };
    const allowedformats= ['image/png', 'image/jpeg', 'image/webp'];
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
    const authorName = req.user.name;
    const authorAvatar = req.user.avatar.url;
    
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
          return next(new  ErrorHandler("Error occured during uploading the one or more images", 400));
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
            publicId: mainImageRes.public_id,
            url: mainImageRes.secure_url    
           }   
       };
       if(paraOneImageRes){
        blogData.paraOneImage={
            publicId: paraOneImageRes.public_id,
            url: paraOneImageRes.secure_url} 
       }
       if(paraTwoImageRes){
        blogData.paraTwoImage={
            publicId: paraTwoImageRes.public_id,
            url: paraTwoImageRes.secure_url} 
       }
       if(paraThreeImageRes){
        blogData.paraThreeImage={
            publicId: paraThreeImageRes.public_id,
            url: paraThreeImageRes.secure_url} 
       }
       const blog = await Blog.create(blogData);
       res.status(200).json({
        success: true,
        message: "Blog Posted Successfully!!",
        blog
       })
})

export const deleteBlog = catchasynErrors(async (req, res, next) => {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog) {
        return next(new ErrorHandler("Blog not found!!", 404));
    }
    await blog.deleteOne();
    res.status(200).json({
        success: true,
        message: "Blog deleted successfully!!"
    });
})

export const getallBlogs = catchasynErrors(async (req, res, next)=>{
    const allBlogs = await Blog.find({publish: true});
    res.status(200).json({
        success: true,
        allBlogs
    })
});

export const getSingleBlog = catchasynErrors(async (req, res, next)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog) {
        return next(new ErrorHandler("Blog not found!!", 404));
    }
    res.status(200).json({
        success: true,
        blog
    })
});

export const getMyBlog = catchasynErrors(async (req, res, next) => {
    const createdBy = req.user._id;
    const blogs = await Blog.find({ createdBy });
    res.status(200).json({
        success: true,
        blogs
    });
});

export const updateBlog = catchasynErrors(async (req, res, next) => {
    const {id} = req.params;
    let blog = await Blog.findById(id);
    if(!blog){
        return next(new ErrorHandler("Blog not found!!", 404));
    }
    const newBlogData = {
        title: req.body.title,
        intro: req.body.intro,
        paraOneDescription: req.body.paraOneDescription,
        paraOneTitle: req.body.paraOneTitle,
        paraTwoDescription: req.body.paraTwoDescription,
        paraTwoTitle: req.body.paraTwoTitle,
        paraThreeDescription: req.body.paraThreeDescription,
        paraThreeTitle: req.body.paraThreeTitle,
        category: req.body.category,
        publish: req.body.publish
    }
    if(req.files){
        const {mainImage, paraOneImage, paraTwoImage, paraThreeImage} = req.files;
        const allowedformats= ['image/png', 'image/jpeg', 'image/webp'];
        if((mainImage && !allowedformats.includes(mainImage.mimetype)) ||
        (paraOneImage && !allowedformats.includes(paraOneImage.mimetype)) ||
        (paraTwoImage && !allowedformats.includes(paraTwoImage.mimetype)) ||
        (paraThreeImage && !allowedformats.includes(paraThreeImage.mimetype))){
            return next(new ErrorHandler("Invalid image format!!Please select png, jpeg or webp format.", 400));
        }
    }
    if(req.file && mainImage){
        const blogMainImage = blog.mainImage.public_id;
        await cloudinary.uploader.destroy(blogMainImage);
        const newblogMainImage = await cloudinary.uploader.upload(mainImage.tempFilePath)
        newBlogData.mainImage = {
            publicId: newblogMainImage.public_id,
            url: newblogMainImage.secure_url
        }
    }
    if(req.file && paraOneImage){
        if(paraOneImage){const blogparaOneImage = blog.paraOneImage.public_id;
        await cloudinary.uploader.destroy(blogparaOneImage);
        }
     const newblogparaOneImage = await cloudinary.uploader.upload(paraOneImage.tempFilePath)
        newBlogData.paraOneImage = {
            publicId: newblogparaOneImage.public_id,
            url: newblogparaOneImage.secure_url
        }   
    }
    if(req.file && paraTwoImage){
        if(paraTwoImage){const blogparaTwoImage = blog.paraTwoImage.public_id;
        await cloudinary.uploader.destroy(blogparaTwoImage);
        }
     const newblogparaTwoImage = await cloudinary.uploader.upload(paraTwoImage.tempFilePath)
        newBlogData.paraTwoImage = {
            publicId: newblogparaTwoImage.public_id,
            url: newblogparaTwoImage.secure_url
        }   
    }
    if(req.file && paraThreeImage){
        if(paraThreeImage){const blogparaThreeImage = blog.paraThreeImage.public_id;
        await cloudinary.uploader.destroy(blogparaThreeImage);
        }
     const newblogparaThreeImage = await cloudinary.uploader.upload(paraThreeImage.tempFilePath)
        newBlogData.paraThreeImage = {
            publicId: newblogparaThreeImage.public_id,
            url: newblogparaThreeImage.secure_url
        }   
    } 
    blog = await Blog.findByIdAndUpdate(id, newBlogData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        message: "Blog updated successfully!!",
        blog
    });

})