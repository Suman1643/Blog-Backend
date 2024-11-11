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
        minlength: [150, "Content must have more than 150 character"]
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
        minlength: [50, "Content must have more than 50 character"]
    },
    paraOneTitle: {
        type: String,
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
        minlength: [50, "Content must have more than 50 character"]
    },
    paraTwoTitle: {
        type: String,
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
        minlength: [50, "Content must have more than 50 character"]
    },
    paraThreeTitle: {
        type: String,
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
        default: true,
        required: true
    }
});

export const Blog= mongoose.model("Blog", blogSchema)