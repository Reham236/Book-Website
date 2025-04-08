require("dotenv").config();
const express = require("express");
const paypal = require('./services/paypal')

const cors = require("cors");
const mongoose = require("mongoose");
const Payment = require("./model/payment"); 
const Review = require("./model/review");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/pay', async(req, res) => {
  try {

    const {price}=req.body;
    if (!price || isNaN(price)) {
      return res.status(422).json({ error: "Invalid price value" });
    }

      const url = await paypal.createOrder(price)

      res.json(url)
  } catch (error) {
      res.json('Error: ' + error)
  }
})
app.get('/complete-order', async (req, res) => {
  try {
    const BOOK_LINK ="https://drive.google.com/file/d/1-ZwAUAYfrTMGa3TRh_KXaRE_QkVnInw_/view?pli=1"; 
    const orderId = req.query.token; 
    const orderDetails = await paypal.getOrderDetails(orderId);

    if (orderDetails.status !== "APPROVED") {
      return res.status(400).json({ error: "Order is not in an APPROVED state." });
    }

    await paypal.capturePayment(orderId);
    const payment=new Payment({
   
      orderId: orderId,
      email: orderDetails.payer.email_address,
      booksLinks: [BOOK_LINK] ,
      plan: "Book Membership",
      amount: orderDetails.purchase_units[0].amount.value,
    });
await payment.save();
    console.log("Payment saved to database:", payment);
    return res.redirect(`${process.env. FRONT_URL}/success.html?orderId=${orderId}`);
  } catch (error) {
    console.error("Error capturing payment:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});


app.get("/get-book-link", async (req, res) => {
  const { orderId } = req.query;
  if (!orderId) {
    return res.status(400).json({ error: "orderId is required" });
  }

  try {

    const payment = await Payment.findOne({ orderId });
    if (!payment) {
      return res.status(404).json({ error: "No book link found for this order" });
    }
    res.json({ bookLink: payment.booksLinks[0] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.get('/cancel-order', (req, res) => {
  res.redirect(`${process.env. FRONT_URL}/failure.html`);
})

app.post("/reviews", async (req, res) => { 


  const{username ,comment,rating} = req.body;

  if (!username || !rating || !comment) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (rating < 1 || rating > 5) { 
    return res.status(400).json({ error: "Rate must be between 1 and 5" });
  }

  const newReview = new Review({ name:username, rate:rating, review:comment });
  newReview.save();
  res.status(201).json({ message: "Review submitted successfully" });

});

app.get("/reviews", async (req, res) => {

  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
});


app.listen(3000, () => {
    mongoose.connect("mongodb://localhost:27017/paypalDB");
    console.log("Server running on port 3000")});
