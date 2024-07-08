import express from 'express'
import helmet from "helmet";
import cors from 'cors';
import { limiter } from './config/Ratelimiter.js';
import logger from './config/Logger.config.js';
import fileUpload from 'express-fileupload'
//initilising dotenv file:
import 'dotenv/config'

const app=express()
const PORT=process.env.PORT || 8000

//Middleware:
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.use(fileUpload())
app.use(helmet())
app.use(cors())
app.use(limiter)

//logger:
logger.info("Hey i am just testing")

app.get("/",(req,res)=>{
    return res.json({message:"hello from advance backend..."})
})

// Routes:
import ApiRoutes from "./routes/api.routes.js"
app.use("/api",ApiRoutes)

//jobs import
import './jobs/index.js'

app.listen(PORT,(req,res)=>{
    console.log(`server is listen at port:${PORT}`);
})