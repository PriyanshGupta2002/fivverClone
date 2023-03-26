import User from "../models/userModel.js"
import { createError } from "../utils/createError.js"
export const test=(req,res)=>{
    res.send("Hello test controller")
}
export const deleteUser=async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(createError(404,"User not found"))
    }
        if (req.userId!==user._id.toString()) {
            return next(createError(403,"You can delete only your account"))
        }
        await User.findByIdAndDelete(req.params.id)
        res.status(201).send("Account successfully deleted")
    
}

export const getUserInfo=async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return next(createError(404,"User not found"))
        }
        res.status(201).send(user)
    } catch (error) {
        next(error)
    }
}