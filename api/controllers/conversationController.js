import Conversation from '../models/conversationModel.js'
import { createError } from '../utils/createError.js'

export const getConversations=async(req,res,next)=>{
    try {
        const conversations = await Conversation.find(req.isSeller ? {sellerId:req.userId}:{buyerId:req.userId}).sort({updatedAt:-1})
        res.status(201).send(conversations)
    } catch (error) {
        next(error)
    }
}
export const createConversation=async(req,res,next)=>{
    const newConversation = new Conversation({
        id:req.isSeller?req.userId+req.body.to:req.body.to+req.userId,
        sellerId:req.isSeller?req.userId:req.body.to,
        buyerId:req.isSeller?req.body.to:req.userId,
        readBySeller:req.isSeller,
        readByBuyer:!req.isSeller
    })
    try {
        const conv = await newConversation.save()
        res.status(201).send(conv)
    } catch (error) {
        next(error)
    }
}
export const getSingleConversation=async(req,res,next)=>{
    try {   
        const conversation = await Conversation.findOne({id:req.params.conversationId})
        if (!conversation) {
            return next(createError(404,"No conversation found"))
        }
        res.status(201).send(conversation)
    } catch (error) {
        next(error)
    }
}

export const updateConversation=async(req,res,next)=>{
    try {
        
  
    const updatedConversation = await Conversation.findOneAndUpdate(
        {id:req.params.conversationId},
        {
        $set:{  
          ...(req.isSeller?{readBySeller:true}:{readByBuyer:true})
        },
    },
    {new:true}
    )
    res.status(201).send(updatedConversation)
    } catch (error) {
        next(error)
    }
}