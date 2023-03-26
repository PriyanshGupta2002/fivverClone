import express from 'express'
import {verifyToken} from '../middleware/jwt.js'
import { createMessage, getMessages } from '../controllers/messageController.js'
const router = express.Router()
router.get("/:conversationId",verifyToken,getMessages)
router.post("/createMessage/:conversationId",verifyToken,createMessage)
export default router
