const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  Firstname:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    maxlength:50
  },
  lastName:{
    type:String,
    required:true,
    maxlength:50
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
    minLength:6,
    maxLength:16
  }
})
export default async function mongo() {
  await mongoose.connect("mongodb+srv://cduty:12341118941@cluster0.zc8ka5m.mongodb.net/users");
  const userTable = mongoose.model("users",schema);
  return userTable;
  
}
