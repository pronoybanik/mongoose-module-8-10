const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


// schema design
const orderSchema = mongoose.Schema({

    productId: {
        type: ObjectId,
        ref: "Product",
        required: true
    },

    userId: {
        type: ObjectId,
        ref: "user",
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },


}, {
    timestamps: true,
});

const order = mongoose.model('Order', orderSchema)

module.exports = order;