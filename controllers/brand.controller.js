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
        const brands = await getBrandsService();

        res.status(200).json({
            status: "success",
            data: brands
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