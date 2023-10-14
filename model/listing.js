const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://c4.wallpaperflare.com/wallpaper/368/492/901/burj-khalifa-dubai-city-cityscape-wallpaper-preview.jpg",
        set: (v) => (v === "" ? "https://c4.wallpaperflare.com/wallpaper/368/492/901/burj-khalifa-dubai-city-cityscape-wallpaper-preview.jpg" : v),
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing ", listingSchema);
module.exports = Listing;