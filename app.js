// require for express 
const express = require("express");
const app = express();

// require for mongoose 
const mongoose = require("mongoose");

// Set up for ejs
const path = require("path");
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

//For parsing the data 
app.use(express.urlencoded({extended:true}))

// for method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// require ejs-mate for layouts
const ejsMate = require("ejs-mate");
app.engine('ejs', ejsMate);

// for public folder
app.use(express.static(path.join(__dirname,"/public")));


// Require for ExpressError 
const ExpressError = require("./utils/ExpressError.js")


// require for route/listing.js 

const listingsRouter = require("./routes/listing.js");

// require for routes/revews.js
const reviewsRouter = require("./routes/review.js");

// require for routes/user.js
const usersRouter = require("./routes/user.js");

// requiring for cookies 
const cookies = require("./routes/cookie.js");

// require fro cookie-parser;
const cookieParser = require('cookie-parser');

app.use(cookieParser("secretcode"));


// Require for Express session 
const session = require("express-session");
const MongoStore = require('connect-mongo');
// Require  for connect-flash 
const flash = require("connect-flash");

// use of flash-connect 
app.use(flash());

// to require for the possport and passport-local 
const passport = require('passport');
const LocalStrategy = require("passport-local");

//this is require for ./model/user.js

const User = require("./model/user.js");


// Set up a connection between mongoose and express
const dbUrl = process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})


async function main(){
    await mongoose.connect(dbUrl);
}



const store =MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:"mysupersecretstring",
    },
    touchAfter: 24 * 3600,
});

store.on("error",()=>{
    console.log("Error in mongo-session store",err);
})

// middleware for express-session 
let sessionOptions = {
    store:store,
    secret:"mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+ 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    },
};


// use of express sessions 
app.use(session(sessionOptions));


// To use passport 
app.use(passport.initialize()); // Initialize the passport
app.use(passport.session()); // use the passport session
passport.use(new LocalStrategy(User.authenticate()));  // To use the LocalStrategy of the possport
passport.serializeUser(User.serializeUser()); // To save the user information after login
passport.deserializeUser(User.deserializeUser()); // To delete the information after session out


// send signed cookies
app.get("/getsignedcookies",(req,res)=>{
    res.cookie("color","red",{signed:true});
    res.cookie("made-in","India",{signed:true});
    res.send("send cookies");
});

// verify cookie
app.get("/verify",(req,res)=>{
    res.send(req.signedCookies);
});


// These are unsigned coolies

app.get("/greet",(req,res)=>{
    const {name="anonymous"} = req.cookies;
    res.send(`Hii, ${name}`);
});


// use of flash-connect

app.use((req,res,next)=>{
    res.locals.success =  req.flash("success");
    res.locals.error =  req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// This is for using the router listings 
app.use("/listings",listingsRouter);

// This is for using the route reviews
app.use("/listings/:id/reviews",reviewsRouter);

// This is for using the router users 
app.use("/",usersRouter);

app.use("/cookies",cookies);


app.all("*",(req,res,next)=>{
    next(new ExpressError(400,"PAGE NOT FOUND!"))
});

// For Error handling 
app.use((err,req,res,next)=>{
    let {status=500,message="SOMETHING WENT WRONG!"} = err;

    res.status(status).render("listings/error.ejs",{err});
      
});








// route for a Listening port 
app.listen("8080",(req,res)=>{
    console.log("app is listening at port 8080");
});

