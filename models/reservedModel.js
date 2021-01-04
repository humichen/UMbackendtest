const mongoose = require('mongoose');

const reservedSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    image: { type: String, required: false },
    stuName: { type: String, required: true},
    stuNumber: { type: String, required: true},
    stuPhone: { type: String, required: true},
    stuEmail: { type: String, required: true},
    reservedDate: { type: String, required: true},
    reservedReason: { type: String, required: true},
    reservedState: { type: String, default:"已預約", required: true},
    getTime: { type: String, required: true}
  },
  // {
  //   timestamps: true,
  // }
);

const reservedModel = mongoose.model("Reserved", reservedSchema);

module.exports = reservedModel;