if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}

const express=require("express");
const app=express();
const mongoose=require('mongoose');
// const Mongo_url='mongodb://127.0.0.1:27017/wanderlust';
const dbUrl=process.env.ATLASDB_URL;
if (!dbUrl) {
  throw new Error("MongoDB URL is not defined in the environment variables.");
}
let methodOverride=require("method-override");   
const path=require("path");
const ejsMate=require("ejs-mate");
const cookieparser=require("cookie-parser");
const expressError=require("./utils/expressError.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');

let flash = require('connect-flash');
const passport=require("passport");
const localstrategy=require("passport-local");
const user=require("./models/user.js");
const listingrouter = require('./routes/listing');
const reviewrouter = require('./routes/review');
const userrouter=require("./routes/user");


const store=MongoStore.create({
    mongoUrl:dbUrl,
        secret:process.env.SECRET,
    touchAfter:24*3600,
});
store.on("error",()=>{
    console.log("Error in Mongo session store",err);
})



const sessionoption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
       httpOnly:true,
    }
}


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.engine("ejs",ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"public")));

async function main(){
    await mongoose.connect(dbUrl);
}
main()
.then((res)=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err.message);
})

app.use(cookieparser("code"));
app.use(session(sessionoption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user;
    res.locals.redirectuser=req.originalUrl;
    next();
})

app.use("/listings",listingrouter);
app.use("/listings/:id/reviews",reviewrouter);
app.use("/",userrouter);


app.all("*",(req,res,next)=>{
   next(new expressError(404,"Page not found !!"));
})

app.use((err,req,res,next)=>{
  let {status=500,message="Some error has been occured"}=err;
res.status(status).render("error.ejs",{message});
})


app.listen(8080,()=>{
    console.log("Your app is listening on port 8080");
});


