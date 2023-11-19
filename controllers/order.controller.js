const { OrderService, getOrderService, deleteOrderService } = require("../services/order.service");



exports.createOrder = async (req, res, next) => {
    try {
        // save or create
        const result = await OrderService(req.body);
        res.status(200).json({
            status: "success",
            message: "Data inserted successfully!",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data is not inserted ",
            error: error.message,
        });
    }
};

exports.getOrder = async (req, res, next) => {
    try {
        const product = await getOrderService();

        if (!product) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find a brand with this id"
            })
        }

        res.status(200).json({
            status: "success",
            data: product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the brands",
            error: error.message
        });
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await deleteOrderService(id);

        if (!product) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete order product"
            })
        }

        res.status(200).json({
            status: "success",
            data: product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the brands",
            error: error.message
        });
    }
};










