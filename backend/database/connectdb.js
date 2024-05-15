const mongoose = require("mongoose")


const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "CRUD"
        });
        console.log("Database connected Succesfully")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


module.exports = connectdb