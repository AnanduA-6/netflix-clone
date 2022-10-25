const express=require("express")
const router=express.Router()
const loginValidator=require("../validation/login_validation")
const loginSubValidate=require('../validation/loginsub_validation')
const userDb=require("../models/users")
const bcrypt=require("bcrypt")
const listDb = require("../models/list")


router.post("/auth",async(req,res)=>{
    const dataUsername=req.body
    const response=await loginSubValidate(dataUsername)
    error=response.error

    if(error){
        res.send(error.message)
    }
    else{
        userDb.findOne({username:dataUsername.username},(err,userData)=>{
            if(err){
                console.log("error in searching database");
            }else{
                if(userData){
                    const stat=true;
                    res.send({username:userData.username,status:stat})
                }else{
                    stat=false;
                    res.send({status:stat})
                }
            }
           
        })
    }
})
router.post("/authsub",async(req,res)=>{
   const data=req.body
   const response=await loginValidator(data)
   error=response.error

   if(error){
    res.send(error.message)
   }

   else{
    userDb.findOne({username:data.username},(err,userData)=>{
        if(err){
            console.log("error in searching database");
        }
        if(userData){
           bcrypt.compare(data.password,userData.password).then(function(result) {

            if(result){
                const stat=true;
                res.send({status:stat,userdata:userData._id})
            }else{
                res.send("invalid password")
            }
            });
        }  
        else{
            res.send("invalid username or password")
        }})
   }
})

router.post("/list",(req,res)=>{
    const data=req.body
    userDb.findOne({username:data.username},(err,userData)=>{
        if(err){
            console.log(err);
        }
        if(userData){
            listDb.findOne({username:data.username},(err,listData)=>{
                if(err){
                    console.log('list'+err);
                }if(!listData){
                    listData=new listDb({
                        username:data.username,
                    })
                }
                let arr=listData.list
                let stat=arr.includes(data.mediaid)
                if(!stat){
                    listData.list=[...listData.list,data.mediaid];
                    listData.save(function(err){
                    if(err){
                        console.log(err);
                    }else{
                        res.send({message:'Added to MY List',status:true})
                    }
                })
                }else{
                    res.send({message:"Already exists in My list",status:false})
                }
                
            })
        }else{
            res.send({msg:"no user found"})
        }
    })
    
})

router.post('/getlist',(req,res)=>{
    const data=req.body;
    listDb.findOne({username:data.username},(err,listData)=>{
        if(err){
            console.log(err);
        }else{
            res.send(listData)
        }
    })
})

router.post('/deletelist',(req,res)=>{
    const data=req.body;
    listDb.findOne({username:data.username},(err,listData)=>{
        if(err){
            console.log(err);
        }else{
            if(listData){
                listDb.updateOne(
                    { username: data.username },
                    { $pull: { list: data.mediaid } },function(err,response){
                        if(err){
                            console.log(err);
                        }else{
                            res.send({stat:true})
                        }
                    });
            }
        }
    })
})

module.exports=router


