const mongoose = require("mongoose");




const PaymentSchema = new mongoose.Schema({
  email: String,
  plan: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", PaymentSchema);
