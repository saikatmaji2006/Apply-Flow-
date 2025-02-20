import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    UserName : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index: true,

    },
    Email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        

    },
    fullName : {
        type : String,
        required : true,
        trim : true,
        index: true,

    },
    avatar : {
        type : String, // cloudinary url
        required : true
    },
    coverImage : {
        type : String,
    },
    watchHistory : [{
        type : mongoose.Schema.ObjectId,
        ref : "video"


    }],
    password : {
        type : String,
        required : [true,"the password is required"]
    },
    refreshToken : {
        type : String,
    }
},
{
    timestamps : true,
})
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,11);
    next()
    }
})
userSchema.methods.isPasswordCorrect = async function 
(password) {
   return await bcrypt.compare(password,this.password)
}
userSchema.methods.generatAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            Email : this.Email,
            UserName : this.UserName,
            fullName : this.fullName,


        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }

    )
}
userSchema.methods.generatRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
           

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }

    )
}
export const user = mongoose.model("user",userSchema)