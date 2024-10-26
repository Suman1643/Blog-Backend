import  { catchasynErrors } from '../middlewares/catchasyncErrors.js';
import { User } from '../models/user.model.js';
import errorHandler from '../middlewares/error.js';
import jwt from 'jsonwebtoken'

// AUTHENTICATION

export const isAuntheticated = catchasynErrors(async(req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new errorHandler("User is not authenticated!!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    next();
})

// AUTHORIZATION