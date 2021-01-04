const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    identity: { type: String, required: true },
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    reserved:[
      {
        reservedName:{ type: String, required: false },
        reservedDate:{ type: String, required: false }
      }
    ]
  }
  // {
  //   timestamps: true,
  // }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;