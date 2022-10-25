const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:6
    }
})

const userDb=new mongoose.model("user",userSchema)
module.exports=userDb



