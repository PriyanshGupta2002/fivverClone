import express from 'express'
import {verifyToken} from '../middleware/jwt.js'
import { createConversation, getConversations, getSingleConversation, updateConversation } from '../controllers/conversationController.js'
const router = express.Router()
router.get("/",verifyToken,getConversations)
router.post("/create",verifyToken,createConversation)
router.get("/single/:conversationId",verifyToken,getSingleConversation)
router.put("/:conversationId",verifyToken,updateConversation)
export default router
