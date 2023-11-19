const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')
const { route } = require('./product.route')



router.route('/')
    .get(orderController.getOrder)
    .post(orderController.createOrder)

router.route('/:id')
    .delete(orderController.deleteOrder)



module.exports = router;
