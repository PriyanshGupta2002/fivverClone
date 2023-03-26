import { createError } from "../utils/createError.js"
import Gig from "../models/gigModel.js"
export const createGig=async(req,res,next)=>{
    if (!req.isSeller) {
        return next(createError(403,"Only sellers can create a gig"))
    }
    const newGig = new Gig({
        userId:req.userId,
        ...req.body
    })
    try {
        const savedGig = await newGig.save()
        res.status(201).send(savedGig)
    } catch (error) {
        next(error)
    }
}   


export const deleteGig=async(req,res,next)=>{
    try {
        const gig = await Gig.findById(req.params.id)
        if (!gig) {
            return next(createError(404,`No gig found with the id ${req.params.id}`))
        }
        if(gig.userId!==req.userId){
            return next(createError(403,"You can only delete your gig"))
        }
        await Gig.findByIdAndDelete(req.params.id)
        res.status(201).send("Gig deleted successfully")
    } catch (error) {
        next(error)
    }
}
export const getGig=async(req,res,next)=>{
    try {
        const gig = await Gig.findById(req.params.id)
        if (!gig) {
            return next(createError(404,"Gig not found"))
        }
        return res.status(201).send(gig)
    } catch (error) {
        next(error)
    }
}
export const getGigs=async(req,res,next)=>{
    const q = req.query
    const filters = {
        ...(q.userId && {userId:q.userId}),
        ...(q.cat && {cat:q.cat}),
        ...( (q.min||q.max) && {
            price:{...(q.min && {$gt:q.min}),...(q.max && {$lt:q.max})}
        } ),
        ...(q.search&&{title:{$regex:q.search,$options:"i"}})
    }
    try {
        return res.status(201).send(await Gig.find(filters).sort({[q.sort]:-1}))
    } catch (error) {
        next(error)
    }
}
