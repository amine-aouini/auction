const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  type: String
});

mongoose.model("category", categorySchema);