//app.js
const express = require("express");
const path = require("path");

let app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// app.use(express.static(path.join(__dirname, "build")));
const port = process.env.PORT || "3000";

// const router = express.Router();

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
const server = app.listen(port, function() {
  console.log("Node.js is listening to PORT:" + server.address().port);
});
