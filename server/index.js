const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//! Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require("./routes/api/posts");

app.use("/api/posts", posts);

//!Hanlde prodcution
if (process.env.NODE_ENV === "production") {
  //* Static folder
  app.use(express.static(__dirname + "/public/"));

  //* Handle SPA
  app.use(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html")); // for any url use index.html
}

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server is up on port ${port}`));
