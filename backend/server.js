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
      const url = await paypal.createOrder()

      res.json(url)
  } catch (error) {
      res.json('Error: ' + error)
  }
})

app.get('/complete-order', async (req, res) => {
  try {
      console.log("Token:", req.query.token);
      console.log("PayerID:", req.query.PayerID);
      
      const orderDetails = await paypal.getOrderDetails(req.query.token);
      console.log("Order Details:", orderDetails);

      if (orderDetails.status !== "APPROVED") {
          return res.status(400).json({ error: "Order is not in an APPROVED state." });
      }

      const paymentResponse = await paypal.capturePayment(req.query.token);
      return res.redirect('http://localhost:5500/sucess.html');
  } catch (error) {
      console.error("Error capturing payment:", error.response?.data || error.message);
      res.status(500).json({ error: error.response?.data || error.message });
  }
});


app.get('/cancel-order', (req, res) => {
  res.redirect('http://localhost:5500/failure.html');
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
