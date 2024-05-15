const express = require("express")
const router = express.Router()
const { createUser, updateUser, deleteUser, getAllUsers, getSingleUser } = require("../controllers/userController")

router
    .post("/create", createUser)
    .put("/update/:id", updateUser)
    .delete("/delete/:id", deleteUser)
    .get("/allUsers", getAllUsers)
    .get("/:id", getSingleUser)

module.exports = router