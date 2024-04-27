const express = require("express");

const bcrypt = require("bcrypt");
const mongo = require("../db.js");

//find logic to implemented here
const jwt = require("jsonwebtoken");
const  { signinSchema } = require("./zodvalidation.js");
const  { signupSchema } =  require("./zodvalidation.js");
const userRouter = express.Router();
userRouter.post("/signin",(req,res)=>{
    const body = req.body;
    const succ = signinSchema.safeParse(body).success
    if(succ===true){
        const database = mongo(); 
        let finding = database.findOne({email:body.email})
        if(finding!=null){
        let hashPass = finding.password;
        bcrypt.compare(body.password,hashPass,(err,result)=>{
            if(err){
                res.json({msg:"error check the email and password again"});
                return;
            }
            else{
                let token = jwt.sign(body.username,process.env.JWT_TOKEN,(err,token)=>{
                    if(err){
                        res.status(411).json({message:"error while logging"});
                    }
                    else{
                        res.json({token:token});
                    }
                });
            }
        })
}
}
})
userRouter.post("/signup",async (req,res)=>{
    const body = req.body;
    const succ = signupSchema.safeParse(body).success;
    if(succ===true){
        const database = mongo();
        let finding = await database.findOne({username:body.username});
        if(finding===null){
            const pass = body.password;
            const hashedPass = bcrypt.hash(pass,10,(err,hash)=>{
                if(err){
                    res.json("An unknown error occurred");
                    return;
                }
                else{
                    return hash;

                }
            })
           let creating =  await mongoose.create({Fistname:body.username,lastName:body.lastName,email:body.email,password:hashedPass});
           let token = jwt.sign(body.username,process.env.JWT_TOKEN);
           res.status(200).json({msg:"user created succesfully",token:token});

        }
    else{
        res.json({msg:"user with same email already exists"})
    }
    }
})
module.exports ={userRouter}
