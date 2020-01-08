const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = express.Router();
let Product = require('./DataBase/routes/ProductRoute');

app.use(cors());
app.use(bodyParser.json());


module.exports = app => {
// all product
productRoutes.route('/api/').get(function(req, res){
    ProductSchema.find(function(err,products){
      if(err){
          console.log(err);

      } else {
        //   
          console.log(products)
          res.json(products);
          
      }
  }); 
});

//  product by id 
productRoutes.route('/api/:id').get(function(req, res){
    let id = req.params.id;
    Product.findById(id, function(err, product){
        res.json(product);
    });
});

// just for admin add or update in case of error of insertion
// question if the admin make a mistake on adding a product can he update if ?????
productRoutes.route('/api/add').post(function(req,res){
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'product': 'product added succesfuly'})
        })
        .catch(err => {
            res.status(400).send('adding new product failed');

        });

        

        productRoutes.route('/api//update/:id').post(function(req, res){
            Product.findById(req.params.id, function(err, product){
                // maybe we should add a condition of there is no auction in this product yet
                if(!product)
                    res.status(404).send('hheey not found');
                else
                    product.name = req.body.name
                    product.description = req.body.description
                    product.image = req.body.image
                    product.curent_price = req.body.curent_price
                    product.value = req.body.value
                    product.initial_date = req.body.initial_date
                    product.duration = req.body.duration
                    product.availability = true
                    product.participants = []
                    product.winner = {}


                product.save().then(product =>{
                    res.json('product updated');
                })
                .catch(err => {
                    res.status(400).send("Update not done")
                })
            })
        })

})
// update current price 
productRoutes.route('/api/product/:id/:auction').put(function(req,res){
    var auc = params.req.auction ;
    Product.findById(req.params.id, function(err, product){
        if(!product)
                    res.status(404).send('hheey not found');
        else
        // verify how to update
         product.curent_price += auc 
    })

})

// update availability
productRoutes.route('/api/product/:id').get(function(req,res){
    // check if the initial_date + duration >= sysdate, if it is 
    // set the availability in data base to false and get the winner.
    // get winner
    Product.findById(req.params.id, function(err, product){
        if(!product)
            res.status(404).send('hheey not found');
        else
        // if(test the availability){
            product.availability = false
        productRoutes.route('/api/product/:id').get(function(req,res){
        // the winner is the last element in tha array of participant
        
        })
    })

})





}



