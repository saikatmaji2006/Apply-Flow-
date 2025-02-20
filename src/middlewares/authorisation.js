import {asyncHandler}  from "../utils/asyncHandler.js";
import { user } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler( async(req,res,next)=>{
  try {
      //in web application we are already sending cookes in the user.controller.js
      //which is getting accesed by this middleware
      //but to make the code reusable for mobile application there is no system of cookie
      //instead the server sends a "Authorization" header file where the token is stored
      //in this format Authorization: Bearer <token> thus we add or and replace bearer with "" to get the token only
      const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
  
      const Code = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,)
      if(!Code){
          throw new ApiError(400,"invalid token")
      }
      user.findById(Code?._id).select("-password -refreshToken")
      //code?._id    Extracts the user ID from the decoded token payload.
      if(!user){
          throw new ApiError(400,"invalid accessToken")
      }
      next()
  } catch (error) {
    throw new ApiError(400,error)
    
  }

})