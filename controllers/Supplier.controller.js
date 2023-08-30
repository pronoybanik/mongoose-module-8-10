const { createSupplierService, getSuppliersService, getSupplierByIdService, updateSupplierService, deleteSupplierByIdService } = require("../services/supplier.service");

exports.createSupplier = async (req, res, next) => {
    try {
        const result = await createSupplierService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully created the Supplier"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "fail",
            message: "Couldn't create the Supplier",
            error: error.message
        })
    }
};



exports.getSuppliers = async (req, res, next) => {
    try {
        const Suppliers = await getSuppliersService();

        res.status(200).json({
            status: "success",
            data: Suppliers
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the Suppliers",
            error: error.message
        });
    }
};

exports.getSupplierById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const Supplier = await getSupplierByIdService(id);

        if (!Supplier) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find a Supplier with this id"
            })
        }

        res.status(200).json({
            status: "success",
            data: Supplier,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the Suppliers",
            error: error.message
        });
    }
};

exports.deleteSupplierById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await deleteSupplierByIdService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete the product"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the Supplier",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the Supplier",
            error: error.message,
        });
    }
};


exports.updateSupplier = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await updateSupplierService(id, req.body);

        console.log("result", result);


        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the Supplier with this id",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Successfully updated the Supplier"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't update the Supplier",
        });
    }
};