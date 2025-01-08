const mongoose=require('mongoose');
const Mongo_url='mongodb://127.0.0.1:27017/wanderlust';
const listing=require("../models/listing.js");
const initdata=require("./data.js");
async function main(){
    await mongoose.connect(Mongo_url);
}
main()
.then((res)=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log("err");
})
const initdb=async()=>{
    await listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"675a7ac736846e183192a5cb"}))
    await listing.insertMany(initdata.data);
    console.log("data was initialized");
}
initdb();