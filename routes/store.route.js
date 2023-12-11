const express = require('express')
const router = express.Router()
const StoreController = require('../controllers/store.controller');
const authorization = require('../middleware/authorization');
const verifyToken = require('../middleware/verifyToken');


router.route('/')
    .get(StoreController.getStores)
    .post(verifyToken, authorization("storeManager"), StoreController.createStore)

router.route("/:id")
    .patch(StoreController.updateStoreById)
    .delete(StoreController.deleteStoreById)

module.exports = router