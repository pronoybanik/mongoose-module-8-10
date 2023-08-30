const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const fileUploader = require('../middleware/fileUploader');


router.post("/file-upload", fileUploader.single("image"), productController.fileUpload)
// router.post("/file-upload", fileUploader.array("image"), productController.fileUpload)

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct)

router.route("/:id")
    .patch(productController.updateProductById)
    .delete(productController.deleteProductById)

module.exports = router