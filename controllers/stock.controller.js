const {
    getStocksService,
    createStockService,
    updateStockByIdService,
    deleteStockByIdService
} = require("../services/stock.service");


exports.getStocks = async (req, res, next) => {
    try {

        let filters = { ...req.query };
        const excludeFields = ['sort', 'page', 'limit']
        excludeFields.forEach(field => delete filters[field])

        //gt ,lt ,gte .lte
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        filters = JSON.parse(filtersString)

        const queries = {}

        if (req.query.sort) {
            // price,qunatity   -> 'price quantity'
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy
            console.log(sortBy);
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields
            console.log(fields);
        }

        if (req.query.page) {

            const { page = 1, limit = 10 } = req.query;

            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);

        }

        const stocks = await getStocksService(filters, queries);
        // console.log(stocks);

        res.status(200).json({
            status: "success",
            data: stocks,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
};

exports.createStock = async (req, res, next) => {
    try {
        // save or create
        const result = await createStockService(req.body);

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


exports.updateStockById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateStockByIdService(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully updated the Stock",
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the Stock",
            error: error.message,
        });
    }
};

exports.deleteStockById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await deleteStockByIdService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete the Stock"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the Stock",

        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the Stock",
            error: error.message,
        });
    }
};








