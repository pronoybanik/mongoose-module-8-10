const PaymentItem = require("../models/Payment");

exports.OrderPaymentService = async (data) => {
    const order = await PaymentItem.create(data)
    return order;
};

exports.getOrderPaymentService = async () => {
    const order = await PaymentItem.find({})
    return order;
};

// exports.successService = async (id) => {
//     console.log("data 2", id);
//     const result = await PaymentItem.updateOne(
//         { _id: id },
//         {
//             $set: {
//                 paymentStatus:
//                     "paid"
//             }
//         },
//         console.log("data 3", result)
//     )
//     return result;
// };

// exports.deleteOrderService = async (id) => {
//     const order = await Order.deleteOne({ _id: id })
//     return order;
// };