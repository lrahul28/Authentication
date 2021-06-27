const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const app=express()
dotenv.config()
//Database connect
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology: true},()=>{
    console.log("Database connected")
})
//Import Route
const authRoute=require('./Routes/auth')
const postRoute=require('./Routes/privateRoute')
//Middleware
app.use(express.json())


//Route Middlewares
app.use('/api/user',authRoute);
app.use('/api/post',postRoute);

app.listen(3000,()=>{console.log("SERVER UP")})
