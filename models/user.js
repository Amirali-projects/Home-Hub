const mongoose=require("mongoose");
const schema= mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const userschema=new schema({
  email:{
    type:String,
    required:true,
  },
})
userschema.plugin(passportLocalMongoose);//We have used it as a plugin as it automatically adds username salting and hashing.
module.exports=mongoose.model("user",userschema);