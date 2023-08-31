const express = require('express')
const router = express.Router()
const StockController = require('../controllers/stock.controller');


router.route('/')
    .get(StockController.getStocks)
    .post(StockController.createStock)

router.route("/:id")
    .get(StockController.getStockById)
    .patch(StockController.updateStockById)
    .delete(StockController.deleteStockById)

module.exports = router