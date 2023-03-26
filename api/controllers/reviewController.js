import Review from "../models/reviewModel.js"
import Gig from "../models/gigModel.js"
import { createError } from "../utils/createError.js"
export const getReviews=async(req,res,next)=>{ 
    try {
        const reviews =await Review.find({gigId:req.params.id})
        res.status(201).send(reviews)
    } catch (error) {
        next(error)
    }
}
export const createReview=async(req,res,next)=>{
    if (req.isSeller) {
        return next(createError(403,"Sellers cannot write review"))
    }
    const newReview = new Review({...req.body,userId:req.userId})
    try {
        const review = await Review.findOne({
            gigId:req.body.gigId,
            userId:req.userId
        })
        if (review) {
            return next(createError(403,"You have already created a review"))
        }
        const savedReview = await newReview.save()
        await Gig.findByIdAndUpdate(req.body.gigId,{
            $inc:{totalStars:req.body.star,starNumber:1}
        })
        res.status(201).send(savedReview)
    } catch (error) {
        next(error)
    }
}
export const deleteReview=async(req,res,next)=>{
    const review = await Review.findById(req.params.id)
    if (review.userId!==req.userId) {
        next(createError(403,"You can delete only your review"))
    }
    try {
        await Review.findByIdAndDelete(req.params.id)
        res.status(201).send("Your review has been deleted successfully")
    } catch (error) {
        next(error)
    }
}