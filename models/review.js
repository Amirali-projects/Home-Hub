const { string } = require("joi");
const mongoose=require("mongoose");
const user = require("./user");
let schema=mongoose.Schema;

let reviewschema=new schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdate:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:schema.Types.ObjectId,
        ref:user,
    }
    
})
let review=mongoose.model("review",reviewschema);
module.exports=review;
