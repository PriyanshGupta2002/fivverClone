import express from 'express'
import { verifyToken } from '../middleware/jwt.js'
import { createGig, deleteGig, getGig, getGigs } from '../controllers/gigController.js'

const router = express.Router()
router.post('/creategig',verifyToken,createGig)
router.delete('/deleteGig/:id',verifyToken,deleteGig)
router.get('/singleGig/:id',verifyToken,getGig)
router.get('/',verifyToken,getGigs)

export default router
