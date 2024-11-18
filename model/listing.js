const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title:{
        type : String,
        require : true,
    },
    description : {
        type : String,
    },
    image :{
        type :String,
        default:"https://unsplash.com/photos/two-brown-deer-beside-trees-and-mountain-UCd78vfC8vU",
        set: (url) => typeof url === "object" ? url.url : url === "" ? "https://unsplash.com/photos/two-brown-deer-beside-trees-and-mountain-UCd78vfC8vU" : url,
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
    }
});

const Listing = mongoose.model("Listing",listingSchema);

// For export the listing 
module.exports = Listing;