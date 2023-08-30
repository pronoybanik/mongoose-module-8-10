const Brand = require("../models/Brand");
const Product = require("../models/Product");


exports.getProductsService = async () => {
    const products = await Product.find({})
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


