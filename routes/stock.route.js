const express = require('express')
const router = express.Router()
const StockController = require('../controllers/stock.controller');
const authorization = require('../middleware/authorization');
const verifyToken = require('../middleware/verifyToken');


router.route('/')
    .get(StockController.getStocks)
    .post(verifyToken, authorization("storeManager"), StockController.createStock)

router.route("/:id")
    .get(StockController.getStockById)
    .patch(StockController.updateStockById)
    .delete(StockController.deleteStockById)

module.exports = router