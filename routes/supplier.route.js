const express = require("express");
const supplierController = require("../controllers/Supplier.controller");

const router = express.Router();

router.route("/")
    .post(supplierController.createSupplier)
    .get(supplierController.getSuppliers);

router.route("/:id")
    .get(supplierController.getSupplierById)
    .patch(supplierController.updateSupplier)
    .delete(supplierController.deleteSupplierById)

module.exports = router;