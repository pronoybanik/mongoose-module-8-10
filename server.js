const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
require("colors");


mongoose.connect(process.env.DATABASE).then(() => {
    console.log('database connection is successful'.red);
});


// server port
const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
});
