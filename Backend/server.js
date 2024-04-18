const express=require('express')
const app=express()
const dotenv=require('dotenv')
const connectDB=require('./DataBase/Connection')
const morgan=require('morgan')


dotenv.config({path:'.env'})
const port=process.env.PORT

//Mongodb Connect
connectDB()


app.use(morgan('dev'))



app.listen(port,()=>console.log('running'))
