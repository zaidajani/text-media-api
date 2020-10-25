const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to mongodb"));

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timeAndDate: {
    type: String,
    required: true
  }
});

const Data = mongoose.model("data", schema);

app.get("/", async (req, res) => {
  const found = await Data.find();
  res.send(found);
});

app.post("/", async (req, res) => {
  const data = new Data({
    name: req.body.name,
    content: req.body.content,
    timeAndDate: req.body.timeAndDate
  });
  await data.save();
  res.send(data);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
