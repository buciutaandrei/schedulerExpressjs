const express = require("express");
const cors = require("cors");
const passport = require("passport");
const users = require("./api/users");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
require("dotenv").config();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);

MongoClient.connect(
  "mongodb://localhost/proiect",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("proiect");

    db.on("error", error => console.error(error));
    db.once("open", () => console.log("connected to database"));

    app.get("/", (req, res) => {});

    app.post("/logging", (req, res) => {
      console.log(req.body);
    });

    app.get("/database/:id", (req, res) => {
      db.collection(req.params.id)
        .find({})
        .toArray((err, result) => {
          res.json(result);
        });
    });

    app.post("/database/:id", (req, res) => {
      let date = req.params.id;
      db.collection(date)
        .insertOne(req.body)
        .then(data => res.send(data));
    });

    app.patch("/database/:id", (req, res) => {});

    app.delete("/database/:id", (req, res) => {
      db.collection(req.params.id)
        .deleteOne({ index: req.body.id })
        .then(data => res.send(data));
    });

    app.listen(3001, () => console.log("server started"));
  }
);
