const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const defaultListingLink = "https://res.cloudinary.com/dzhczzqwf/image/upload/v1780122916/img2_qvl7mi.jpg";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    set: (v) => v === "" ? defaultListingLink : v,
    default: defaultListingLink,
  },
  price: {
    type: Number,
    default: 0,
    set: (v) => v === "" ? 0 : v
  },
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
