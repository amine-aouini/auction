const mongoose = require("mongoose");
const Product = require('./Product')
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, unique: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Category = mongoose.model("Category", categorySchema);

var createCategory = function (categoryData, callback) {
  Category.create(categoryData, (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
  });
};


var updateProductCategory = function (nameCategory, idProduct, callback) {
  Category.findOneAndUpdate({ name: nameCategory }, { $addToSet: { products: idProduct } }, { new: true })
    .then(
      doc => {
        callback(doc);
      }
    )
    .catch(err => {
      callback(err)
    })

}


var deleteCategory = function (nameCategory, callback) {
  Category.deleteOne({ name: nameCategory }, (err, result) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, result)
    }
  })
}

var getAllProductByCategory = function (categoryName, callback) {
  Category.find({ name: categoryName }).populate('products').exec((err, category) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, category)
    }

  })
}

var getAll = function (callback) {
  console.log('rrrr')
  Category.find({}, (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }

  })
}
module.exports.updateProductCategory = updateProductCategory;
module.exports.deleteCategory = deleteCategory;
module.exports.createCategory = createCategory;
module.exports.getAllProductByCategory = getAllProductByCategory;
module.exports.getAll = getAll;



