import Gig from '../models/gigModel.js'
import Order from '../models/orderModel.js'
import Stripe from 'stripe'
import dotenv from 'dotenv'
import { createError } from '../utils/createError.js'

dotenv.config()
export const createPayment=async(req,res,next)=>{
    const stripe  = new Stripe(
        process.env.STRIPE_SECRET_KEY
    )
    
    const gig = await Gig.findById(req.params.id)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price*100,
        currency: "inr",
        automatic_payment_methods: {
          enabled: true,
        },
      });
     
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
            payment_intent:paymentIntent.id
        })
        await newOrder.save()
        res.status(201).send({
            clientSecret:paymentIntent.client_secret
        })
      
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

export const confirmOrder=async(req,res,next)=>{
    const payment_intent = req.body.payment_intent
    try {
    await Order.findOneAndUpdate({payment_intent:payment_intent},{
        $set:{isCompleted:true}
    })
    res.status(201).send("Order Confirmed Successfully")
} catch (error) {
        next(error)
}
}