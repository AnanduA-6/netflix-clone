const joi=require ("joi")
const loginSchema=joi.object({
    username:joi.string().required().min(6).label("username"),
    password:joi.string().required().min(6).label("password"),
})

const loginValidate=(data)=>{
    
    return loginSchema.validate(data)
    
}
module.exports= loginValidate