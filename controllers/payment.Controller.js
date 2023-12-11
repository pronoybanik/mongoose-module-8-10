const PaymentItem = require("../models/Payment");
const { OrderPaymentService, getOrderPaymentService, successService, deleteOrderPaymentService, updateOrderPaymentByIdService } = require("../services/payment.service");
const SSLCommerzPayment = require('sslcommerz-lts')
const crypto = require('crypto');


const store_id = "test655ca7d4db14d";
const store_passwd = "test655ca7d4db14d@ssl";
const is_live = false;

const tran_id = crypto.randomBytes(10).toString('hex');

exports.createOrderPayment = async (req, res, next) => {
    try {
        // save or create
        const result = await OrderPaymentService(req.body);

        const getOrder = await PaymentItem.findOne({ _id: result._id })

        const data = {
            total_amount: getOrder.priceData,
            currency: 'BDT',
            tran_id: tran_id,
            success_url: `http://localhost:5050/api/v1/payment/success/${getOrder._id}`,
            fail_url: 'http://localhost:3030/fail',
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: getOrder.email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: getOrder.firstName + ' ' + getOrder.lastName,
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then(async (apiResponse) => {
            // Redirect the user to the payment gateway
            const GatewayPageURL = apiResponse.GatewayPageURL;
            res.send({ url: GatewayPageURL });
        });



    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data is not inserted ",
            error: error.message,
        });
    }
};

exports.getOrderPayment = async (req, res, next) => {
    try {
        const product = await getOrderPaymentService();

        if (!product) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find a payment with this id"
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
            message: "Couldn't get the payment",
            error: error.message
        });
    }
};

exports.deleteOrderPayment = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await deleteOrderPaymentService(id);

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
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the brands",
            error: error.message
        });
    }
};


exports.updateOrderPaymentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("update Id", id);
        const result = await updateOrderPaymentByIdService(id, req.body);


        res.status(200).json({
            status: "success",
            message: "Successfully updated the Store",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the Store",
            error: error.message,
        });
    }
};



