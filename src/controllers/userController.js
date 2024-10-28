import {catchasynErrors} from '../middlewares/catchasyncErrors.js';
import { ErrorHandler } from '../middlewares/newerror.js';
import {User} from '../models/user.model.js';
import { sendToken } from '../utils/jwtTokens.js';
import cloudinary from 'cloudinary';
// abc

const signup = catchasynErrors(async(req, res, next) =>{
    if(!req.files || Object.keys(req.files).length ===0) {
        return next (new ErrorHandler("User Avatar required", 400))
    };
    const {avatar} = req.files;
    const allowedformat = ["image/png", "image/jpeg", "image/webp"];
    if(!allowedformat.includes(avatar.mimetype)){
        return next(
            new ErrorHandler(
                "Invalid file type..! Please provide file in png,jpeg or webp format.",
                400
            ))
    }
    const {name, email, password, phone, role, education} = req.body;
    if(!name || !email || !password || !phone || !role || !education || !avatar){
        return next(new ErrorHandler("Please fill full details", 400))
    };

    let user = await User.findOne({ email });
    if(user){
        return next(new ErrorHandler("User already exists", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath
    );
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary error:", cloudinaryResponse.error || "Unknown cloudinary error")
    }
    

    user = await User.create({
        name,
        email,
        password,
        phone,
        education,
        role,
        avatar:{
            publicId: cloudinaryResponse.publicId,
            url: cloudinaryResponse.secure_url
        }
    });
    sendToken(user, 200, "User registered successfully!!", res);

});

export const login = catchasynErrors(async(req, res, next) =>{
    const {email, password, role} = req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Please fill the full form!", 400))
    };

    const user = await User.findOne({ email }).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid email or password!!", 400));
    }

    const isPasswordMatched= await user.comparePassword(password);


    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password!!", 400));
    };

    if(user.role !== role){
        return next(new ErrorHandler(`User provided role (${role}) not Found!!`, 400));
    };


    sendToken(user, 200, "User LoggedIn successfully!!", res);

});

export const logout =  catchasynErrors(async(req, res, next) =>{
    res
     .status(200)
     .cookie("token", "", {
        expires: new Date(Date.now()) ,
        httpOnly: true
     })
     .json({
        success: true,
        message: "User logged out successfully!!"
     })
})

export const getMyProfile = catchasynErrors((req, res, next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })
});

export const getAllAuthors = catchasynErrors(async(req, res, next)=>{
    const authors = await User.find({role: 'Author'});
    res.status(200).json({
        success: true,
        authors
    })
})
export default signup;