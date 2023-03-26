import Message from "../models/messageModel.js"
import Conversation from "../models/conversationModel.js"
export const getMessages=async(req,res,next)=>{
try {
    const messages = await Message.find({conversationId:req.params.conversationId})
    res.status(201).send(messages)
} catch (error) {
    next(error)
}
}
export const createMessage=async(req,res,next)=>{
    const newMessage = new Message({
        conversationId:req.params.conversationId,
        userId:req.userId,
        desc:req.body.desc
    })
try {
    const savedMessage = await newMessage.save()
    await Conversation.findOneAndUpdate({id:req.params.conversationId},{
        $set:{
            readBySeller:req.isSeller,
            readByBuyer:!req.isSeller,
            lastMessage:req.body.desc
        }
    },{new:true})
    res.status(201).send(savedMessage)
} catch (error) {
    next(error)
}
}