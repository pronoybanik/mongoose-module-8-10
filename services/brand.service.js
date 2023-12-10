const Brand = require("../models/Brand");




exports.getBrandsService = async (filters, queries) => {
    const brands = await Brand.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    // .populate('brand.id')

    const totalBrand = await Brand.countDocuments(filters);
    const numberOfPage = Math.ceil(totalBrand / queries.limit);
    const currentPage = Number(queries.page);
    return { totalBrand, count: brands.length, currentPage, numberOfPage, brands };
};

exports.createBrandService = async (data) => {
    const result = await Brand.create(data);
    return result;
};

exports.getBrandByIdService = async (id) => {
    const brand = await Brand.findOne({ _id: id }).populate("products");
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