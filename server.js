const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const app = express();

app.use(bodyParser.json());

require("./Database/Product");

require("./routes/UserRoute.js")(app);

require("./routes/ProductRoute.js")(app);

require("./routes/CategoryRoute.js")(app);

require("./routes/AdminRoute")(app);

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/auctionProject`,
  { useUnifiedTopology: true, useNewUrlParser: true }
);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("mongoose is connected connected"));

//exemple for useing routes files

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

let io = socket(server);

io.on("connection", socket => {
  socket.on("new-auc", data => {
    io.sockets.emit("new-auc", data);
  });
});