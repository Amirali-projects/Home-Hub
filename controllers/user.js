const user=require("../models/user.js");


module.exports.renderSignUpForm=(req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.signUp=async(req,res)=>{
   try{
    let{username,email,password}=req.body;
    const newuser=new user({email,username});
   const registereduser=await user.register(newuser,password);   
   req.login(registereduser,(err)=>{        // this is provided to login user directly after signup.
      if(err){
         next(err);
      }
      req.flash("success","Welcome to wanderlust");
      res.redirect("/listings"); 
   })
   }
   catch(err){
    req.flash("error",err.message);
    res.redirect("/signup")
   }
};

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to wanderlust again")
    let redirectUrl=res.locals.redirectUrl||"/listings";   // To check if the user has choosen new path before login or not. if choosen then redirect to  another page after loggedin.
    res.redirect(redirectUrl);

};

module.exports.logout=(req,res,next)=>{
   req.logout((err)=>{
    if(err){
      next(err);
    }
    req.flash("success","you are logged out successfully");
   res.redirect("/listings");
 })
}