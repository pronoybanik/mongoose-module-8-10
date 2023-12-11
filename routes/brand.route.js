const express = require("express");
const brandController = require("../controllers/brand.controller");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");

const router = express.Router();

router.route("/")
    .get(brandController.getBrands)
    .post(verifyToken, authorization("storeManager"),brandController.createBrand)

router.route("/:id")
    .get(brandController.getBrandById)
    .patch(brandController.updateBrand)
    .delete(brandController.deleteBrandById)

module.exports = router;