const Brand = require("../models/Brand");


exports.getBrandsService = async () => {
    const brands = await Brand.find({}).select('-products -suppliers');
    return brands;
};

exports.createBrandService = async (data) => {
    const result = await Brand.create(data);
    return result;
};

exports.getBrandByIdService = async (id) => {
    const brand = await Brand.findOne({ _id: id });
    return brand;
};

exports.deleteBrandByIdService = async (id) => {
    const result = await Brand.deleteOne({ _id: id });
    return result;
};

exports.updateBrandService = async (id, data) => {
    const result = await Brand.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
};