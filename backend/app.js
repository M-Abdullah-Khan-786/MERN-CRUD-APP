const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config({ path: "./config/.env" })


const connectdb = require("./database/connectdb.js")
const userRoute = require("./routes/userRoute.js")
const { errorMiddleware } = require("./middleware/errorMiddleware.js")


const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    Credential: true,
    optionsSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))


app.use("/api/v1/user", userRoute)


connectdb()

app.use(errorMiddleware)

module.exports = app