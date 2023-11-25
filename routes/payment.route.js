const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.Controller')




router.route('/')
    .get(paymentController.getOrderPayment)
    .post(paymentController.createOrderPayment)


router.route('/:id')
    .delete(paymentController.deleteOrderPayment)


module.exports = router;
