const router=require('express').Router();
const verify=require('./verifyToken')
router.get('/',verify,(req,res)=>{

res.json({name:"Hey",post:"My first email",desc:"You have created your first post"});

})
module.exports=router;