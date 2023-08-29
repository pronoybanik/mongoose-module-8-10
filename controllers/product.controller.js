const {
    getProductsService,
    createProductService,
    updateProductByIdService,
    deleteProductByIdService
} = require("../services/product.service");


exports.getProducts = async (req, res, next) => {
    try {
        const products = await getProductsService();

        res.status(200).json({
            status: "success",
            data: products,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        // save or create
        const result = await createProductService(req.body);

        res.status(200).json({
            status: "success",
            message: "Data inserted successfully!",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data is not inserted ",
            error: error.message,
        });
    }
};


exports.updateProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductByIdService(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully updated the product",
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the product",
            error: error.message,
        });
    }
};

exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await deleteProductByIdService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete the product"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the product",
            
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the product",
            error: error.message,
        });
    }
};







