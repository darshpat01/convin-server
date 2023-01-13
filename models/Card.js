var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  bucket: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Card", cardSchema);
