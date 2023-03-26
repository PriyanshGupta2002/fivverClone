import express from 'express'
import { verifyToken } from '../middleware/jwt.js'
import {  confirmOrder, createPayment, getOrders } from '../controllers/orderController.js'
const router = express.Router()
// router.post('/create/:gigId',verifyToken,createOrders)
router.get('/',verifyToken,getOrders)
router.post('/create-payment-intent/:id',verifyToken,createPayment)
router.put('/',verifyToken,confirmOrder)

export default router
