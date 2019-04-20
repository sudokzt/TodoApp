//app.js
const express = require("express");
// const path = require("path");
let app = express();
// app.use(express.static(path.join(__dirname, "build")));
const port = process.env.PORT || "3000";

// const router = express.Router();

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
const server = app.listen(port, function() {
  console.log("Node.js is listening to PORT:" + server.address().port);
});

// 写真リストを取得するAPI
app.get("/test", function(req, res) {
  console.log("test");
  console.log(req.baseUrl);
  res.redirect("/");
});
