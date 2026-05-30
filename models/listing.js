const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const defaultListingLink = "https://images.unsplash.com/photo-1778855024471-845ffeb951fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXMlMjBvZiUyMGJlYWNoJTIwY2FmZXxlbnwwfHwwfHx8MA%3D%3D";

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
  },
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
