import User from "../models/userModel.js"
import { hashPass, verifyPass } from "../utils/authUtils.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { createError } from "../utils/createError.js"

dotenv.config()

export const register=async(req,res,next)=>{
    const {body} = req
    const hashP = hashPass(body.password)
    
   
    try { 
        const newUser = new User({...body,password:hashP})
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }

}
export const login=async(req,res,next)=>{
    try {
        const user = await User.findOne({username:req.body.username}) 
        if(!user){
            return next(createError(404,"User not found!"))
        }
        const isPassGenuine = verifyPass(user.password,req.body.password)
        if (!isPassGenuine) {
           return next(createError(400,"Invalid credentials"))
        }
        const token = jwt.sign({
            id:user._id,
            isSeller:user.isSeller,
        },process.env.JWT_KEY)
        const {password,...info} = user._doc
        return res.cookie("accessToken",token,{
            httpOnly:false
        }).status(201).json(info)
        
    } catch (error) {
       next(error)
        
    }

}
export const logout=(req,res)=>{
    res.clearCookie("accessToken",{
        sameSite:"none",
        secure:true
    }).status(200).send("User has been logged out")
}
