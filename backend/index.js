import express from 'express'
const app=express()
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDb from './Config/DB.js'
import router from './routes/Router.js'
dotenv.config()
// middleware 
app.use(cors({
    origin:'*'
}))
app.use(express.json());
// Db connection 
ConnectDb()
const PORT=process.env.PORT ||3000
// defining routes 
app.use('/api',router)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})