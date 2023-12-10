const { createBrandService, getBrandsService, getBrandByIdService, updateBrandService, deleteBrandByIdService } = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully created the brand"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "fail",
            message: "Couldn't create the brand",
            error: error.message
        })
    }
};

exports.getBrands = async (req, res, next) => {
    try {

        let filters = { ...req.query };
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

        const brands = await getBrandsService(filters, queries);

        if (brands.length === 0) {
            res.status(404).json({
                status: "fail",
                error: "There Is No Data",
            });
        } else {
            res.status(200).json({
                status: "success",
                data: brands,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the brands",
            error: error.message
        });
    }
};

exports.getBrandById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const brand = await getBrandByIdService(id);

        if (!brand) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find a brand with this id"
            })
        }

        res.status(200).json({
            status: "success",
            data: brand,
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

exports.deleteBrandById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await deleteBrandByIdService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete the product"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the Brand",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the Brand",
            error: error.message,
        });
    }
};


exports.updateBrand = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await updateBrandService(id, req.body);

        console.log("result", result);


        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the brand with this id",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Successfully updated the brand"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't update the brand",
        });
    }
};