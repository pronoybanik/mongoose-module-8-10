const PaymentItem = require("../models/Payment");

exports.OrderPaymentService = async (data) => {
    const order = await PaymentItem.create(data)
    return order;
};

exports.getOrderPaymentService = async () => {
    const order = await PaymentItem.find({})
    return order;
};

exports.deleteOrderPaymentService = async (id) => {
    const order = await PaymentItem.deleteOne({ _id: id })
    return order;
};

exports.updateOrderPaymentByIdService = async (userId, data) => {
    const result = await PaymentItem.updateOne(
        { _id: userId },
        data,
        {
            runValidators: true,
        }
    );

    return result;
};



