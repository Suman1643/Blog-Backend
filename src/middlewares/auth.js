import  { catchasynErrors } from '../middlewares/catchasyncErrors.js';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import { ErrorHandler } from './newerror.js';

// AUTHENTICATION

export const isAuntheticated = catchasynErrors(async(req, res, next) => {
    // const token = req.headers.authorization.split(" ")[1];
    const {token} = req.cookies
    console.log(token);
    if(!token){
        return next(new ErrorHandler("User is not authenticated!!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    next();
})

// AUTHORIZATION

export const isAuthorized = (...roles) => {
    return (roles) => {
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(
                    `User with this role (${req.res.next}) not allowed to access this resource`, 400
                )       
            )
        }
        next();
    }
}