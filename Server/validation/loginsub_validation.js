const joi=require ("joi")
const loginSubSchema=joi.object({
    username:joi.string().required().min(6).label("username"),
})

const loginSubValidate=(data)=>{
    
    return loginSubSchema.validate(data)
    
}
module.exports= loginSubValidate