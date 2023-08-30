const Brand = require("../models/Brand");
const Supplier = require("../models/supplier");


exports.getSuppliersService = async () => {
    const Suppliers = await Supplier.find({}).populate("brand");
    return Suppliers;
};

exports.createSupplierService = async (data) => {
    const result = await Supplier.create(data);

    const { _id: supplierId, brand } = result;

    const res = await Brand.updateOne(
        { _id: brand.id },
        { $push: { suppliers: supplierId } }
    )
    return result;
};

exports.getSupplierByIdService = async (id) => {
    const Supplier = await Supplier.findOne({ _id: id });
    return Supplier;
};

exports.deleteSupplierByIdService = async (id) => {
    const result = await Supplier.deleteOne({ _id: id });
    return result;
};

exports.updateSupplierService = async (id, data) => {
    const result = await Supplier.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
};