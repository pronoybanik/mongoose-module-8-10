const mongoose = require('mongoose');



// Define the order item schema
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

// Define the payment item schema
const paymentItemSchema = new mongoose.Schema({
    priceData: {
        type: Number,
        required: true,
    },
    orderData: [orderItemSchema], 
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid',
    },
});

// Define the payment item model based on the payment item schema
const PaymentItem = mongoose.model('PaymentItem', paymentItemSchema);

module.exports = PaymentItem;
