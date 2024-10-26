import {catchasynErrors} from '../middlewares/catchasyncErrors.js';
import {ErrorHandler} from '../middlewares/Error.js';
import {User} from '../models/user.model.js';
import { sendToken } from '../utils/jwtTokens.js';

const signup = catchasynErrors(async(req, res, next) =>{
    const {name, email, password, phone, role, education} = req.body;
    if(!name || !email || !password || !phone || !role || !education){
        return next(new ErrorHandler("Please fill full details", 400))
    };

    let user = await User.findOne({ email });
    if(user){
        return next(new ErrorHandler("User already exists", 400));
    }

    user = await User.create({
        name,
        email,
        password,
        phone,
        education,
        role
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
    }

    sendToken(user, 200, "User LoggedIn successfully!!", res);
});

export const logout =  catchasynErrors(async(req, res, next) =>{
    res
     .status(200)
     .cookie("token", "", {
        expires: Date.now(),
        httpOnly: true
     })
     .json({

     })
})
export default signup;