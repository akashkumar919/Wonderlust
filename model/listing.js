const mongoose = require("mongoose");
const Review = require("./review.js");


const listingSchema = new mongoose.Schema({
    title:{
        type : String,
        require : true,
    },
    description : {
        type : String,
    },
    image :{
       url: String,
       filename: String,
    },
    price: {
        type : Number,
        require : true,
    },
    location : {
        type : String,
    },
    country : {
        type : String,
        require : true,
    },
    reviews:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:"Review",
    },
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

});



// for deleting the all reviews asociated with the listing
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
});

const Listing = mongoose.model("Listing",listingSchema);

// For export the listing 
module.exports = Listing;