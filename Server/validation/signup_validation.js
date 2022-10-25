const joi=require ("joi")

const siginupSchema=joi.object({
    fname:joi.string().required().label("First Name"),
    lname:joi.string().required().label("Last Name"),
    username:joi.string().required().regex(/^\S+$/).message("blank spaces not allowed").min(6).label("User Name"),
    password:joi.string().required().regex(/^\S+$/).message("blank spaces not allowed").min(6).label("Password"),
})

const signInValidate=(data)=>{
    
    return siginupSchema.validate(data)
    
}
module.exports= signInValidate
