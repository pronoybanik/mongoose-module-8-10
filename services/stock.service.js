const Stock = require("../models/stock")

exports.getStocksService = async (filters, queries) => {

    const stocks = await Stock.find(filters)
    
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
        .populate("supplied.id")

    const total = await Stock.countDocuments(filters);
    const page = Math.ceil(total / queries.limit);

    return { total, count: stocks.length, page, stocks };
};

exports.createStockService = async (data) => {
    const stock = await Stock.create(data);
    return stock;
};

exports.getStockByIdService = async (storeId) => {
    const store = await Stock.findOne({ _id: storeId }).populate("brand.id").populate("store.id").populate("suppliedBy.id");
    return store;
};

exports.updateStockByIdService = async (stockId, data) => {
    const result = await Stock.updateOne(
        { _id: stockId }, data, { runValidators: true, }
    );
    return result;
};


exports.deleteStockByIdService = async (id) => {
    const result = await Stock.deleteOne({ _id: id });
    return result;
};


