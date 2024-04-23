const express=require('express')
const app=express()
const dotenv=require('dotenv')
const connectDB=require('./DataBase/Connection')
const morgan=require('morgan')
const userRouter=require('./Router/UserRouter')
const cors=require('cors')



dotenv.config({path:'.env'})
const port=process.env.PORT

//Mongodb Connect   
connectDB()

//body       

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({  
    origin: 'http://localhost:3000'
}));

app.use(morgan('dev'))


app.use("/",userRouter)

app.listen(port,()=>console.log('running'))




