const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  image: { type: String, required: false },
  rules: [String],
  cantBorrowDate: [String],
  alreadyBorrowDate: [String]
});

const itemModel = mongoose.model("Item", itemSchema);

module.exports = itemModel;