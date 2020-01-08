const mongoose = require("mongoose");
const { Schema } = mongoose;

const Product = new Schema({
  name: String,
  description: String,
  image : String,
  curent_price : Number,
  value: Number,
  initial_date : Date ,
  duration: String,
  availability: Boolean,
  participants : Array,
  winner: Object
  
});

mongoose.model("products", Product);

