import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name must have more than 3 charecter"],
        maxlength: [32, "Name can't exceed 32 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid Email"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Name must have more than 8 charecter"],
        maxlength: [32, "Name can't exceed 32 characters"],
        select: true
    },
    phone:{
        type: Number,
        required: true
    },
    avatar: {
       public_id: {
        type: String
       },
       URL: {
        type: String
       }
    },
    education: {
        type:String,
        required: true
    },
    role: {
        type:String,
        required: true ,
        enum: ["Reader", "Author"]       
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre("save", async function () {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);    
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getJWTToken = function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES 
    })
}

export const User = mongoose.model("User", userSchema);