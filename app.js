const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
require("colors");

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


mongoose.connect(process.env.DATABASE).then(() => {
    console.log('database connection is successful'.red);
});

// server port:
const port = process.env.PORT || 5050;

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
});

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

module.exports = app;




