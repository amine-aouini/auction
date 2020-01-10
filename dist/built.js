const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./Database/Product");

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/auctionProject`,
  { useUnifiedTopology: true, useNewUrlParser: true }
);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("mongoose is connected connected"));

app.use(bodyParser.json());

//exemple for useing routes files
require("./routes/UserRoute.js")(app);

require("./routes/ProductRoute.js")(app);

require("./routes/CategoryRoute.js")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
;const mongoose = require("mongoose");
const Product = require("./Product");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, unique: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

const Category = mongoose.model("Category", categorySchema);

var createCategory = function(categoryData, callback) {
  Category.create(categoryData, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

var updateProductCategory = function(nameCategory, idProduct, callback) {
  Category.findOneAndUpdate(
    { name: nameCategory },
    { $addToSet: { products: idProduct } },
    { new: true }
  )
    .then(doc => {
      callback(doc);
    })
    .catch(err => {
      callback(err);
    });
};

var deleteCategory = function(nameCategory, callback) {
  Category.deleteOne({ name: nameCategory }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

var getAllProductByCategory = function(categoryName, callback) {
  Category.find({ name: categoryName })
    .populate("products")
    .exec((err, category) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, category);
      }
    });
};

var getAll = function(callback) {
  Category.find({}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};
module.exports.updateProductCategory = updateProductCategory;
module.exports.deleteCategory = deleteCategory;
module.exports.createCategory = createCategory;
module.exports.getAllProductByCategory = getAllProductByCategory;
module.exports.getAll = getAll;
;const mongoose = require("mongoose");
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
  last_auction_price: { type: Number, required: true },
  value: { type: Number, required: true },
  initial_date: { type: Date, required: true },
  Duration: { type: String, required: true },
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
;const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    }
  },
  password: { type: String, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

var User = mongoose.model("user", userSchema);

const createUser = (userInfo, callback) => {
  var user = new User({
    name: userInfo.name,
    email: userInfo.email,
    password: userpassword
  });
  user.save(callback);
};

const findUser = (userEmail, callback) => {
  User.findOne({ email: userEmail }, callback);
};

const generateAuthToken = (user, callback) => {
  // prive key should be  {process.env.JWT_KEY}
  jwt.sign(
    { _id: user._id },
    "private key",
    { expiresIn: "5m" },
    (err, token) => {
      if (err) throw err;
      user.tokens = user.tokens.concat({ token });
      user
        .save()
        .then(user => callback(user, token))
        .catch(err => {
          throw err;
        });
    }
  );
};
exports.User = User;
exports.createUser = createUser;
exports.findUser = findUser;
exports.generateAuthToken = generateAuthToken;
;const mongoose = require("mongoose");
const Category = require("../Database/Category ");
module.exports = app => {

    app.post('/api/newCategory', (req, res) => {
        console.log(req.body)
        Category.createCategory(req.body, (err, data) => {
            if (err) {
                res.status(404).send('duplicate key')
            } else {
                res.status(200).send(data)
            }
        })
    })

    app.delete('/api/deleteCategory', (req, res) => {
        Category.deleteCategory(req.body.name, (err, result) => {
            if (result) {
                res.status(200).send('true')
            } else {
                res.status(404).send('false')
            }
        });
    })

    app.get('/api/getProducts', (req, res) => {
        Category.getAllProductByCategory(req.body.name, (err, data) => {
            if (err) {
                res.status(401).send(err)
            } else {
                res.status(200).send(data)
            }
        })
    })

    app.get('/categories', (req, res) => {
        Category.getAll((err, data) => {
            if (err) res.status(404).send(err)
            else res.status(200).send(data)
        })
    })
};const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userDataBase = require("../../Database/User");
const User = mongoose.model("user");

const auth = (req, res, next) => {
  // const token = req.header("Authorization").replace("Bearer ", "");
  const token = req.body.token;
  if (token !== null) {
    //should be process.env.JWT_KEY
    jwt.verify(token, "private key", (err, decoded) => {
      if (err)
        res
          .status(401)
          .send({ error: "Not authorized to access this resource" });
      User.findOne({ _id: decoded._id, "tokens.token": token }, (err, user) => {
        if (err) throw err;
        if (!user) {
          throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
      });
    });
  } else {
    res.status(404).send("no token");
  }
};
module.exports = auth;
;const mongoose = require("mongoose");
let Product = mongoose.model("products");
let User = mongoose.model("user");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = express.Router();

app.use(cors());

module.exports = app => {
  // all product
  app.get("/api/allProducts", (req, res) => {
    Product.find(function(err, products) {
      if (err) {
        console.log(err);
      } else {
        //
        console.log(products);
        res.json(products);
      }
    });
  });

  //  product by id
  app.get("/api/:id", (req, res) => {
    let id = req.params.id;
    Product.findById(id)
      .populate("participants.user")
      .populate("winner")
      .exec((err, product) => {
        if (err) res.json(err);
        res.json(product);
      });
  });

  // just for admin add or update in case of error of insertion
  // question if the admin make a mistake on adding a product can he update if ?????

  app.post("/api/add", (req, res) => {
    let product = new Product(req.body);
    product
      .save()
      .then(product => {
        res.status(200).json({ msg: "product added succesfuly", product });
      })
      .catch(err => {
        res.status(400).send({ msg: "adding new product failed", err });
      });
  });

  // app.post("/api//update/:id", (req, res) => {   // this function should be reconsidered
  //   console.log("heheh");
  //   Product.findById(req.params.id, (err, product) => {
  //     if (err) res.json(err);
  //     // maybe we should add a condition of there is no auction in this product yet
  //     if (!product) res.status(404).send("hheey not found");
  //     else product.name = req.body.name;
  //     product.descreption = req.body.descreption;
  //     product.image = req.body.image;
  //     product.category = req.body.category;
  //     product.last_auction_price = req.body.last_auction_price;
  //     product.value = req.body.value;
  //     product.initial_date = req.body.initial_date;
  //     product.Duration = req.body.Duration;
  //     product.availability = true;
  //     product.participants = [];
  //     product.winner = {};

  //     product
  //       .save()
  //       .then(product => {
  //         res.json("product updated");
  //       })
  //       .catch(err => {
  //         res.status(400).send("Update not done");
  //       });
  //   });
  // });

  // update current price
  app.put("/api/product/:id/:auction", (req, res) => {
    // the user should be provided for now his id is in the req
    var auc = req.params.auction;
    Product.findById(req.params.id, (err, product) => {
      if (err) res.json(err);
      if (!product) res.status(404).send("hheey not found");
      // verify how to update
      else {
        product.last_auction_price += auc;
        product.participants.push({
          user: req.body.userId,
          price: product.last_auction_price
        });
        product.save(err => {
          if (err) res.josn(err);
          res.json(product);
        });
      }
    });
  });
  //declare a winner for an action
  app.put("/api/win/:id", (req, res) => {
    //they must be a function to validate id the intial time + duration has passed and there is no winner
    Product.findById(req.params.id, (err, product) => {
      if (err) res.json(err);
      if (!product) res.status(404).send("hheey not found");
      else {
        product.winner = req.body.userId;
        product.save(err => {
          if (err) res.json(err);
          res.json(product);
        });
      }
    });
  });
  // update availability
  // app.get("/api/product/:id", (req, res) => { this function might be moved too the front end
  //   // check if the initial_date + duration >= sysdate, if it is
  //   // set the availability in data base to false and get the winner.
  //   // get winner
  //   Product.findById(req.params.id, function(err, product) {
  //     if (!product) res.status(404).send("hheey not found");
  //     // if(test the availability){
  //     else product.availability = false;
  //     productRoutes.route("/api/product/:id").get(function(req, res) {
  //       // the winner is the last element in tha array of participant
  //     });
  //   });
  // });
};
;const mongoose = require("mongoose");
const UserDataBase = require("../Database/User");
const bcrypt = require("bcryptjs");
const User = mongoose.model("user");
const auth = require("./middleware/auth");

module.exports = app => {
  app.post("/api/signup", (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;

    User.findOne({ email: email }, (err, data) => {
      if (err) res.status(404).send(err);
      if (!data) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) res.status(404).send(err);
          var user = new User({
            name: name,
            email: email,
            password: hash
          });
          user.save(err => {
            if (err)
              res.json({
                saved: false
              });
            UserDataBase.generateAuthToken(user, token =>
              res.status(200).send(`user created ${(user, token)}`)
            );
          });
        });
      } else {
        res.json("user already exists");
      }
    });
  });

  app.post("/api/logIn", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (!user) res.status(404).send("user is not found");
      bcrypt
        .compare(req.body.password, user.password)
        .then(comparisonRes => {
          if (comparisonRes) {
            UserDataBase.generateAuthToken(user, (user, token) =>
              res
                .status(200)

                .send({ user, token })
            );
          } else {
            res.send("not match");
          }
        })
        .catch(err => err);
    });
  });

  app.post("/api/me", auth, (req, res) => {
    // View logged in user profile
    res.send(req.user);
  });

  //   app.put(`/api/product/:id`, async (req, res) => {
  //     const { id } = req.params;

  //     let product = await Product.findByIdAndUpdate(id, req.body);

  //     return res.status(202).send({
  //       error: false,
  //       product
  //     });
  //   });

  //   app.delete(`/api/product/:id`, async (req, res) => {
  //     const { id } = req.params;

  //     let product = await Product.findByIdAndDelete(id);

  //     return res.status(202).send({
  //       error: false,
  //       product
  //     });
  //   });
};
