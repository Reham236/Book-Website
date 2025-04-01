require("dotenv").config();
const express = require("express");
const paypal = require("paypal-rest-sdk");
const cors = require("cors");
const mongoose = require("mongoose");
const Payment = require("./model/payment"); 
const app = express();
app.use(cors());
app.use(express.json());


paypal.configure({
  mode: "sandbox", 
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET,
});


app.post("/pay", (req, res) => {
  const { plan, price } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: plan,
              sku: "001",
              price: price,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: price,
        },
        description: "Buying access to book PDFs",
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating payment" });
    } else {
      
      for (let link of payment.links) {
        if (link.rel === "approval_url") {
          return res.json({ url: link.href });
        }
      }
    }
  });
});


app.get("/success", async (req, res) => {
    const { paymentId, PayerID } = req.query;
  
    paypal.payment.execute(paymentId, { payer_id: PayerID }, async (error, payment) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error executing payment");
      } else {
       
        await Payment.create({
          email: payment.payer.payer_info.email,
          plan: payment.transactions[0].item_list.items[0].name,
          amount: payment.transactions[0].amount.total,
        });
  
        res.send("Payment successful! Access granted.");
      }
    });
  });

app.get("/cancel", (req, res) => {
  res.send("Payment cancelled!");
});


app.listen(3000, () => {
    mongoose.connect("mongodb://localhost:27017/paypalDB");
    console.log("Server running on port 3000")});
