
const express=require("express");
const app=express();
const cookieParser = require("cookie-parser");
const session=require("express-session");
app.use(cookieParser("secretcode"));
const path=require("path");
const flash = require('connect-flash');
app.use(flash());

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");


let sessionoption={
    secret:"Mysecret",
    resave:false,
    saveUninitialized:true,

}
app.use(session(sessionoption));
  // app.get("/session",(req,res)=>{

//     if(req.session.count){
//         req.session.count++;
//         res.send(`you sent a request ${req.session.count} times`)
//     }
//     req.session.count=1;
//     res.send(`you sent a request ${req.session.count} times`)
// })

// app.use((req,res,next)=>{
//     res.locals.errormsg=req.flash("error")
//     res.locals.successmsg=req.flash("success");
//     next();
// })

app.get("/register",(req,res)=>{
   let{name="anonymous"}=req.query;
    req.session.name=name;
    console.log(req.session.name);
    req.flash("success","Name has been printed successfully");
   res.redirect("/world");
})
app.get("/world",(req,res)=>{
    res.locals.successmsg=req.flash("success");
res.render("flash.ejs",{name:req.session.name});
})



// app.get("/hello",(req,res)=>{
//     // res.locals.errormsg=req.flash("error")
//     // res.locals.successmsg=req.flash("success");
//     // res.send(`hello ${req.session.name}`);
//    res.render("flash.ejs",{name:req.session.name});
// })
   

// app.get("/getcookies",(req,res)=>{
//     res.cookie("color","red");
//     res.send("cookie has been sended");
// })



// app.get("/showcookie",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("printed on console");
// })


// app.get("/getcookies",(req,res)=>{
//     res.cookie("color","red",{signed:true});
//     res.send("cookie has been sended");
// })

// app.get("/showcookie",(req,res)=>{
//     console.dir(req.signedCookies);
//     res.send("printed on console");
// })


app.listen(8080,(req,res)=>{
    console.log("Listening on port 8080");
})