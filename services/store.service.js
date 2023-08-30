const Store = require('../models/Store')

exports.getStoresService = async () => {
    const Stores = await Store.find({})
    return Stores;
};

exports.createStoreService = async (data) => {
    const store = await Store.create(data);
    return store;
};

exports.updateStoreByIdService = async (StoreId, data) => {
    const result = await Store.updateOne(
        { _id: StoreId },
        data,
        {
            runValidators: true,
        }
    );

    return result;
};


exports.deleteStoreByIdService = async (id) => {
    const result = await Store.deleteOne({ _id: id });
    return result;
};


