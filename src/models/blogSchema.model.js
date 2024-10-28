import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [10, "Title must have more than 10  charecter"],
        maxlength: [100, "Title can't exceed 100 characters"]
    },
    mainImage: {
        publicId:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    intro: {
        type: String,
        required: true,
        minlength: [250, "Content must have more than 10 charecter"]
    },
    paraOneImage: {
        publicId:{
            type: String
        },
        url: {
            type: String
        }        
    },
    paraOneDescription: {
        type: String,
        required: true,
        minlength: [50, "Content must have more than 50 charecter"]
    },
    paraOneTitle: {
        type: String,
        minlength: [50, "Content must have more than 50 charecter"]
    }, 
    paraTwoImage: {
        publicId:{
            type: String
        },
        url: {
            type: String
        }        
    },
    paraTwoDescription: {
        type: String,
        required: true,
        minlength: [50, "Content must have more than 50 charecter"]
    },
    paraTwoTitle: {
        type: String,
        minlength: [50, "Content must have more than 50 charecter"]
    },
    paraThreeImage: {
        publicId:{
            type: String
        },
        url: {
            type: String
        }        
    },
    paraThreeDescription: {
        type: String,
        required: true,
        minlength: [50, "Content must have more than 50 charecter"]
    },
    paraThreeTitle: {
        type: String,
        minlength: [50, "Content must have more than 50 charecter"]
    } ,
    category: {
        type: String,
        required: true
    }  ,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorName: {
        type:String,
        required: true
    },
    authorAvatar: {
        type: String
    },
    publish: {
        type: Boolean,
        default: false
    }
});

export const Blog= mongoose.model("Blog", blogSchema)