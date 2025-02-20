import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.Schema({
    videoFile: {
        type : String,
        required : true,
    },
    thumbnail: {
        type : String,
        required : true,
    },
    title: {
        type : String,
        required : true,
    },
    description: {
        type : String,
        required : true,
    },
    owner: {
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required : true,
    },
    views: {
        type : Number,
        default : 0,
        
    },
    duration: {
        type : Number,
        required : true,
    },
    isPublished: {
        type : Boolean,
        default : true
    }
},
{
    timestamps: true,
})
export const video = mongoose.model("video",videoSchema)