const express = require("express");
const app = express();
const SSLCommerzPayment = require('sslcommerz-lts')
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());



// routes
const productRoute = require('./routes/product.route');
const brandRoute = require('./routes/brand.route');
const categoryRoute = require('./routes/category.route');
const supplierRoute = require('./routes/supplier.route');
const stockRoute = require('./routes/stock.route');
const storeRoute = require('./routes/store.route');
const userRoute = require('./routes/user.route');
const orderRoute = require('./routes/order.route');
const paymentRoute = require('./routes/payment.route');


app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});


app.use('/api/v1/product', productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/stock", stockRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);

// 01829542754

// create token code and run bash (node app.js);
// const crypto = require('crypto');
// const randomBytes = crypto.randomBytes(10).toString('hex');
// console.log(randomBytes);

module.exports = app;




