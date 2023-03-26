import express from 'express'
import { verifyToken } from '../middleware/jwt.js'
import { createReview, deleteReview, getReviews } from '../controllers/reviewController.js'
const router = express.Router()

router.get("/:id",verifyToken,getReviews)
router.post("/createReview",verifyToken,createReview)
router.delete("/deleteReview/:id",verifyToken,deleteReview)


export default router
