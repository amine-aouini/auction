const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const productSchema = new Schema({
  name: { type: String, required: true },
  descreption: { type: String },
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
  value: { type: Number },
  initial_date: { type: Date },
  duration: { type: String },
  participants: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
      price: { type: Number },
      date: { type: Date }
    }
  ],
  winner: [{ type: Schema.Types.ObjectId, ref: "user" }]
});

var Product = mongoose.model("Product", productSchema);

var getAll = function (callback) {
  Product.find((err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }

  })
}


var getOne = function (id, callback) {
  Product.findById(id)
    .populate("participants.user")
    // .populate("winner")
    .exec((err, product) => {
      if (err) { callback(err, null) }
      else {
        callback(null, product)

      }

    })

}

module.exports.getAll = getAll;
module.exports.getOne = getOne;

