import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRoute,reviewRoute,orderRoute,messageRoute,gigRoute,conversationRoute,authRoute } from './routes/index.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI
const app = express();
app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
mongoose.set('strictQuery',true)


const connect=async()=>{
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    console.log("Successfully Connected")
  } catch (error) {
    console.log(error);
}
}
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/reviews",reviewRoute)
app.use("/api/orders",orderRoute)
app.use("/api/messages",messageRoute)
app.use("/api/gigs",gigRoute)
app.use("/api/conversations",conversationRoute)
app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong"
  return res.status(errorStatus).send(errorMessage)
})
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(PORT, () => {
    connect()
    console.log(`Example app listening on port ${PORT}`)
  })