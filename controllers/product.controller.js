const {
    getProductsService,
    createProductService,
    updateProductByIdService,
    deleteProductByIdService,
    getProductsByIdService
} = require("../services/product.service");


exports.getProducts = async (req, res, next) => {
    try {

        let filters = { ...req.query };
        console.log(filters);
        const excludeFields = ['sort', 'page', 'limit']
        excludeFields.forEach(field => delete filters[field])

        //gt ,lt ,gte .lte
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        filters = JSON.parse(filtersString)

        const queries = {}

        if (req.query.sort) {
            // price,qunatity   -> 'price quantity'
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy
            console.log(sortBy);
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields
            console.log(fields);
        }

        if (req.query.page) {

            const { page = 1, limit = 10 } = req.query;

            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);

        }

        if (req.query.page) {

            const { page } = req.query;
            const currentPage = page;
            queries.page = currentPage
            

        }

        const products = await getProductsService(filters, queries,);

        if (products.length === 0) {
            res.status(404).json({
                status: "fail",
                error: "There Is No Data",
            });
        } else {
            res.status(200).json({
                status: "success",
                data: products,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data",
            error: error.message,
        });
    }
};


exports.getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await getProductsByIdService(id);

        if (!product) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find a brand with this id"
            })
        }

        res.status(200).json({
            status: "success",
            data: product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the brands",
            error: error.message
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

exports.fileUpload = async (req, res) => {
    try {
        return res.status(200).json(req.files)
    } catch (error) {

    }
}







