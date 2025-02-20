import express from "express"
import  cors from "cors"
import cookiePraiser from 'cookie-parser'



const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential : true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true, limit:"16kb"}) )
app.use(express.static("public"))
app.use(cookiePraiser())


//router import
import userRouter from './routes/user.routes.js'
//define declaration
app.use("/api/v1/user",userRouter)
export{app}

