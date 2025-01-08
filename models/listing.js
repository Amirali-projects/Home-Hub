const mongoose=require("mongoose")
let schema=mongoose.Schema;
const reviews=require("./review.js");
const { required, string } = require("joi");
const review = require("./review.js");
//make a new schema
const listingschema=new schema({
    title:
    {
        type:String,
    },
    description:{
        type:String,                            
    },
    image: {
        // type: String,
        // default: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        // set: (v) => v === "" ? "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" : v,
      url:String,
      filename:String,

    },
    price:Number,
    
    location:String,
    
    country:String,
    reviews:[
        {
            type:schema.Types.ObjectId,
            ref:"review",
        }
    ],
    owner:{
        type:schema.Types.ObjectId,
        ref:"user",
    },
    
})
listingschema.post("findOneAndDelete",async(listing)=>{
  if(listing){
   await review.deleteMany({_id:{$in:listing.reviews}})
  }
})
  
const listing=mongoose.model("listing",listingschema);    //  make a model
module.exports=listing;   
