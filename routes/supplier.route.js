const express = require("express");
const supplierController = require("../controllers/Supplier.controller");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/")
    .post(verifyToken, authorization("storeManager"), supplierController.createSupplier)
    .get(supplierController.getSuppliers);

router.route("/:id")
    .get(supplierController.getSupplierById)
    .patch(supplierController.updateSupplier)
    .delete(supplierController.deleteSupplierById)

module.exports = router;