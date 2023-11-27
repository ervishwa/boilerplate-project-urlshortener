require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// const URL = require("url").URL;
const isUrl = require("is-url");


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

let url = {};

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

let i = 1;

// const stringIsAValidUrl = (s) => {
//   try {
//     new URL(s);
//     return true;
//   } catch (err) {
//     return false;
//   }
// };

app.post("/api/shorturl", (req, res) => {
  if (isUrl(req.body.url)) {
    let p = i;
    url[p] = req.body.url;
    i++;
    return res.json({
      original_url: req.body.url,
      short_url: p,
    });
  } else {
    res.json({
      error: "invalid url",
    });
  }
});

app.get("/api/shorturl/:id", (req, res) => {
  const { id } = req.params;
  return res.redirect(url[id]);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
