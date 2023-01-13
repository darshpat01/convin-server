require("dotenv").config();
const Card = require("./models/Card");
const express = require("express");
const app = express();

const cors = require("cors");
const History = require("./models/History");

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/getAllCards", (req, res) => {
  Card.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/addHistory", (req, res) => {
  const history = new History({
    title: req.body.title,
    url: req.body.url,
  });
  history
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getHistory", (req, res) => {
  History.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/deleteCard/:id", (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/addCard", (req, res) => {
  const card = new Card({
    title: req.body.title,
    url: req.body.url,
    bucket: req.body.bucket,
  });
  card
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3008;

app.listen(port, () => {
  console.log(`Server running on : ${port}`);
});
