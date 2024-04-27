const zod = require("zod");
const signinSchema = zod.object({
    username:zod.string().max(50),
    password:zod.string().max(16).min(6)
})

const signupSchema = zod.object({ 
    username:zod.string().max(50),
    password:zod.String().min(6).max(16),
    firstname:zod.string().max(50),
    lastname:zod.string().max(50),
    birthdate: zod.string().date()
    
})
module.exports = {signinSchema,signupSchema}