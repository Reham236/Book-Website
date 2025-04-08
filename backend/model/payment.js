const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  booksLinks: [{ type: String }],
  email: String,
  plan: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

module.exports=mongoose.model("Payment", PaymentSchema);
