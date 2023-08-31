const {
    getStoresService,
    createStoreService,
    updateStoreByIdService,
    deleteStoreByIdService
} = require("../services/store.service");


exports.getStores = async (req, res, next) => {
    try {
        const Stores = await getStoresService();

        res.status(200).json({
            status: "success",
            data: Stores,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
};

exports.createStore = async (req, res, next) => {
    try {
        // save or create
        console.log("createStore 1", req.body);
        const result = await createStoreService(req.body);
        console.log("createStore 3", result);

        res.status(200).json({
            status: "success",
            message: "Data inserted successfully!",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data is not inserted ",
            error: error.message,
        });
    }
};




exports.updateStoreById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateStoreByIdService(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully updated the Store",
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the Store",
            error: error.message,
        });
    }
};

exports.deleteStoreById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await deleteStoreByIdService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete the Store"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the Store",

        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the Store",
            error: error.message,
        });
    }
};


