const mongoose = require("mongoose");
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
  app.post("/api/signOut", (req, res) => {
    User.findOne({ name: req.body.userName }, (err, data) => {
      if (err) res.json(err);
      data.token = [];
      data.save(err => {
        if (err) res.json(err);
        res.status(201).json({ deleted: "success" });
      });
    });
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
