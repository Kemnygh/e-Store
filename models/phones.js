const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let phoneSchema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  color: {type: String, required: true},
  stock: {type: String, required: true}
})

phoneSchema.pre("save", function (next) {
  const phone = this
})

let phone = mongoose.model("phone", phoneSchema)

module.exports = phone;