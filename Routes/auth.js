const router=require('express').Router();
const User=require('../Model/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const {registerValidation,loginValidation}=require('./validation')
//Register
router.post('/register',async (req,res)=>{

//Validation of the data received
const {error}=registerValidation(req.body)
if(error){ return res.status(400).send(error.details[0].message)}
 
// Checking if the user already exists
const emailExist=await User.findOne({email:req.body.email})
if(emailExist) return res.status(400).send("Email Already Exists")

//Bcrypt to hash the password
const salt= await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(req.body.password,salt)



//Creating New User
    const user=new User({
    name:req.body.name,
    email:req.body.email,
    password:hashedPassword
})
try{
    const savedUser= await user.save()
    
    res.send(savedUser)
}
catch(err){
    res.status(400).send(err);
}
res.send(savedUser)
})

//Login Route

router.post('/login',async (req,res)=>{
    const {error}=loginValidation(req.body)
    if(error)return res.status(400).send(error.details[0].message)
    const user= await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("Invalid Credentials")
const validPass=await bcrypt.compare(req.body.password,user.password)
if(!validPass) return res.status(400).send("Incorrect Password")
//Create and Assign a JWT token


 const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
 res.header("auth-token",token).send(token);
res.status(500).send("welcome  "+user.email)


})

module.exports=router;