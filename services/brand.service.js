const Brand = require("../models/Brand");




exports.getBrandsService = async (filters, queries) => {
    const brands = await Brand.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
        // .populate('brand.id')

    const total = await Brand.countDocuments(filters);
    const page = Math.ceil(total / queries.limit);

    return { total, count: brands.length, page, brands };
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