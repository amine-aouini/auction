const mongoose = require("mongoose");
let Product = mongoose.model("Product");
let User = mongoose.model("user");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const Products = require('../Database/Product')


app.use(cors());

module.exports = app => {

  app.get('/api/products', (req, res) => {

    Products.getAll((err, data) => {
      if (err) {
        res.status(404).send(err)
      }
      else {
        res.status(200).send(data)
        res.end()
      }
    })
  })


  //  product by id
  app.get("/api/product/:id", (req, res) => {

    let id = req.params.id;
    Product.findById(id)
      .populate("participants.user")
      .populate("winner")
      .exec((err, product) => {
        if (err) { res.json(err); }
        else {
          res.send(product);
          // console.log(product)
        }
        res.end()
      });
  });

  // just for admin add or update in case of error of insertion
  // question if the admin make a mistake on adding a product can he update if ?????

<<<<<<< HEAD
  app.post("/api/add", (req, res) => {
    let product = new Product(req.body);
    product
      .save()
      .then(product => {
        res.status(200).json ({ msg: "product added succesfuly", product });
=======
  app.post("/api/addp", (req, res) => {
    console.log(req.body)
    let product = new Product(req.body);
    product
      .save((err, result) => {
        console.log(err, result)
        res.send(result)
>>>>>>> 0103b7123aacbd974a54c40690186f976c22b5ae
      })
      .catch(err => {
        res.status(400).send({ msg: "adding new product failed", err });
      });
  });

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