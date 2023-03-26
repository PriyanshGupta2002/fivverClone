import express from 'express'
import { deleteUser, getUserInfo, test } from '../controllers/userController.js'
import { verifyToken } from '../middleware/jwt.js'

const router = express.Router()

router.delete("/delete/:id",verifyToken,deleteUser)
router.get("/:id",verifyToken,getUserInfo)

export default router