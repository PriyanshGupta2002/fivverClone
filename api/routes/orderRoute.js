import express from 'express'
import { verifyToken } from '../middleware/jwt.js'
import { createOrders, getOrders } from '../controllers/orderController.js'
const router = express.Router()
router.post('/create/:gigId',verifyToken,createOrders)
router.get('/',verifyToken,getOrders)
export default router
