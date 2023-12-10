const Brand = require("../models/Brand");
const Product = require("../models/Product");


exports.getProductsService = async (filters, queries) => {
    const products = await Product.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    // .populate('brand.id')
    

    const totalProduct = await Product.countDocuments(filters);
    const numberOfPage = Math.ceil(totalProduct / queries.limit);
    const currentPage = Number(queries.page);
    return { totalProduct, parPageLimitProductNumber: products.length, numberOfPage, currentPage, products };
};
exports.getProductsByIdService = async (id) => {
    const products = await Product.findOne({ _id: id })
    return products;
};

exports.createProductService = async (data) => {
    const product = await Product.create(data);
    const { _id: productId, brand } = product;

    const res = await Brand.updateOne(
        { _id: brand.id },
        { $push: { products: productId } }
    )
    return product;
};

exports.updateProductByIdService = async (productId, data) => {
    const result = await Product.updateOne(
        { _id: productId },
        data,
        {
            runValidators: true,
        }
    );

    return result;
};


exports.deleteProductByIdService = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
};


