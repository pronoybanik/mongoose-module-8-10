const Order = require("../models/order");

exports.OrderService = async (data) => {
    const order = await Order.create(data)
    return order;
};

exports.getOrderService = async () => {
    const order = await Order.find({}).populate('productId')   
    return order;
};

exports.deleteOrderService = async (id) => {
    const order = await Order.deleteOne({ _id: id })
    return order;
};

exports.updateOrderByIdService = async (userId, data) => {
    const result = await Order.updateOne(
        { _id: userId },
        data,
        {
            runValidators: true,
        }
    );

    return result;
};
