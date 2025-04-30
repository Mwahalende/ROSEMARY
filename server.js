const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
// MongoDB Connection
mongoose.connect("mongodb+srv://user1:malafiki@leodb.5mf7q.mongodb.net/?retryWrites=true&w=majority&appName=leodb");
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected successfully");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});
const orderSchema = new mongoose.Schema({
  fullname: String,
  food: String,
  buzzerId: String,
  orderNumber: String,
  price: String,
  isReady: { type: Boolean, default: false }
});

const Order = mongoose.model('Order', orderSchema);

// API to save order
app.post('/submit-order', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({ message: 'Order saved!' });
});

// API to fetch orders
app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// API to simulate buzzer activation
app.post('/activate-buzzer', (req, res) => {
  const { buzzerId } = req.body;
  console.log(`Activate buzzer for ID: ${buzzerId}`);
  res.json({ message: `Buzzer ${buzzerId} activated.` });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
