const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')
const { route } = require('./product.route')
const verifyToken = require('../middleware/verifyToken')
const authorization = require('../middleware/authorization')



router.route('/')
    .get(orderController.getOrder)
    .post(verifyToken, authorization("buyer"), orderController.createOrder)

router.route('/:id')
    .delete(orderController.deleteOrder)


module.exports = router;
