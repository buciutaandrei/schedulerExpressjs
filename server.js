const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

MongoClient.connect(
  "mongodb://localhost/proiect",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("proiect");

    db.on("error", error => console.error(error));
    db.once("open", () => console.log("connected to database"));

    app.use(express.json());

    app.get("/", (req, res) => {
      db.collection("asdasd")
        .find({})
        .toArray((err, result) => {
          res.json(result);
        });
    });

    app.get("/:id", (req, res) => {
      db.collection(req.params.id)
        .find({})
        .toArray((err, result) => {
          res.json(result);
        });
    });

    app.post("/:id", (req, res) => {
      db.collection(req.params.id)
        .save(req.body)
        .then(data => res.send(data));
    });

    app.patch("/:id", (req, res) => {});

    app.delete("/:id", (req, res) => {
      db.collection(req.params.id)
        .deleteOne({ index: req.body.id })
        .then(data => res.send(data));
    });

    app.listen(3001, () => console.log("server started"));
  }
);
