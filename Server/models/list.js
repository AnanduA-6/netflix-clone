const mongoose=require('mongoose')

const listSchema=mongoose.Schema({
    username:{
        type:String
    },
    list:{
        type:Array
    }

})

const listDb=new mongoose.model("list",listSchema)
module.exports=listDb