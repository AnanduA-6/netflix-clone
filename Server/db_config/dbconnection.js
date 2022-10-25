const mongoose=require("mongoose")
module.exports=connection=async()=>{
    try {
       await mongoose.connect('mongodb+srv://netflixclone-admin:admin123@netflixclone.pzjn9gp.mongodb.net/NetflixClone',{useNewUrlParser:true})
        console.log("connected to database");
    } catch (error) {
        console.log("database connection error");
        console.log(error);
    }
    }
 connection();