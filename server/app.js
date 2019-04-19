//app.js
const express = require("express");
const path = require("path");
let app = express();
app.use(express.static(path.join(__dirname, "build")));
const port = process.env.PORT || "8080";
app.set("port", port);

const router = express.Router();

// GET /api/v1/article/test
router.get("/", (req, res) => {
  res
    .render("../index")
    .listen(port, () => console.log(`Running on localhost:${port}`));
  res.json({
    message: "This is article api"
  });
});
