// require for mongoose 
const mongoose = require("mongoose");

// require for listing.js schema
const Listing = require("../model/listing.js");

//require for data.js
const initData = require("./data.js")

// Set up a connection for database

main().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
};


//for initializing the data
const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data,{runValidators:true})
    console.log("data was initialized");
}

initDB();
