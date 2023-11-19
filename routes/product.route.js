const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const fileUploader = require('../middleware/fileUploader');
const authorization = require('../middleware/authorization');
const verifyToken = require('../middleware/verifyToken');


router.post("/file-upload", fileUploader.single("image"), productController.fileUpload)
// router.post("/file-upload", fileUploader.array("image"), productController.fileUpload)

router.route('/')
    // .get(verifyToken, authorization("buyer"),productController.getProducts)
    .get(productController.getProducts)
    .post(productController.createProduct)

router.route("/:id")
    .get(productController.getProductById)
    .patch(productController.updateProductById)
    .delete(productController.deleteProductById)

module.exports = router;
