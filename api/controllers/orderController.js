import Gig from '../models/gigModel.js'
import Order from '../models/orderModel.js'
import { createError } from '../utils/createError.js'
export const createOrders=async(req,res,next)=>{

    try {
        const gig = await Gig.findById(req.params.gigId)
        if (gig.userId===req.userId) {
            return next(createError(403,"You cannot order your own gig"))
        }
        const newOrder = new Order({
            gigId:gig._id,
            image:gig.cover,
            title:gig.title,
            buyerId:req.userId,
            sellerId:gig.userId,
            price:gig.price,
            payment_intent:"temporary"
        })
            await newOrder.save()
            res.status(201).send("Order Created Succcessfully")
    } catch (error) {
        next(error)
    }
}
export const getOrders=async(req,res,next)=>{
    try {
        const orders = await Order.find({
         ...(req.isSeller?{sellerId:req.userId}:{buyerId:req.userId}),
           isCompleted:true
        })
        res.status(201).send(orders)
    } catch (error) {
        next(error)
    }
}