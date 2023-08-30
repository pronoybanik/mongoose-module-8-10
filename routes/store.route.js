const express = require('express')
const router = express.Router()
const StoreController = require('../controllers/store.controller');


router.route('/')
    .get(StoreController.getStores)
    .post(StoreController.createStore)

router.route("/:id")
    .patch(StoreController.updateStoreById)
    .delete(StoreController.deleteStoreById)

module.exports = router