// require for express 
const express = require("express");
const app = express();

// require for listing.js
const Listing = require("./model/listing.js");

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
app.use(express.static(path.join(__dirname,"/public")))



// Set up a connection for database

main().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}



// FOR home route 
app.get("/",(req,res)=>{
    res.send("request is sent ")
});


// For index route /listings
app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
});

// for create route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
});

// route for adding the create route 
app.post("/listings",async (req,res)=>{
    const newListing = new Listing(req.body.listing)
    await newListing.save();
    res.redirect("/listings");
})



// For show route /listings/:id
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
    
});

// for edit route 
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
});

//for update route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});


//for delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    
});

// search route



// // For creating a document
// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title: 'My new villa',
//         description: 'By the beach',
//         image: 'https://unsplash.com/photos/two-brown-deer-beside-trees-and-mountain-UCd78vfC8vU',
//         price: 1200,
//         location: 'Greator Noida,UP',
//         country: 'India',
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("testListing is successful");

// });











// route for a Listening port 
app.listen("8080",(req,res)=>{
    console.log("app is listening at port 8080");
});

