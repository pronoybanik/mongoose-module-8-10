const express = require('express')
const router = express.Router()
const StockController = require('../controllers/stock.controller');


router.route('/')
    .get(StockController.getStocks)
    .post(StockController.createStock)

router.route("/:id")
    .patch(StockController.updateStockById)
    .delete(StockController.deleteStockById)

module.exports = router