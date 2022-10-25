const express=require("express")
const router=express.Router()
const signInValidate=require("../validation/signup_validation")
const bcrypt=require("bcrypt")
const userDb=require("../models/users")



router.post("/signup",async(req,res)=>{

   const data=req.body
   const response=await signInValidate(data)
   const error=response.error

   if(!error){
    userDb.findOne({username:data.username},(err,userData)=>{      
        if(err){
            console.log(`error in searching in user data base,error: ${err}`)
        }
        else{
            if(userData){
                res.send("username already exists")
            }else{
                bcrypt.hash(data.password,10).then(function(hash) {
                    const hashedPassword=hash;
                    const newUserInfo=new  userDb({
                        fname:data.fname,
                        lname:data.lname,
                        username:data.username,
                        password:hashedPassword
                });saveToDb().then(res.send({success:true}))
                async function saveToDb(){
                    try {
                        return await newUserInfo.save()
                    } catch (error) {
                        console.log("error in saving to db");
                    }  
                } 
                });   
            }     
          }     
    })

   }else{
    res.send(error.message)
   }
})
   


module.exports=router