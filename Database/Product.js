const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const productSchema = new Schema({
  name: { type: String, required: true },
  descreption: { type: String, required: true },
  image: {
    type: String,
    required: true,
    validate: value => {
      if (!validator.isURL(value)) {
        throw new Error({ error: "Invalid URL address" });
      }
    }
  },
  category: [{ type: Schema.Types.ObjectId, ref: "Categorie" }],
  last_auction_price: { type: Number },
  value: { type: Number, required: true },
  initial_date: { type: Date, required: true },
  duration: { type: String, required: true },
  participants: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
      price: { type: Number }
    }
  ],
  winner: [{ type: Schema.Types.ObjectId, ref: "user" }]
});



mongoose.model("products", productSchema);
//  function find make this
