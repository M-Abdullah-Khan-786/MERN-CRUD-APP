const { errorHandler } = require("../middleware/errorMiddleware");
const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');

// create a user
exports.createUser = asyncHandler(async (req, res, next) => {
    const { first_name, last_name, email, phone } = req.body

    if (!first_name || !last_name || !email || !phone) {
        return next(errorHandler(400, "Please fill all the required fields"))
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
        return next(errorHandler(400, "User already exist on this email"))
    }

    const user = await User.create({ first_name, last_name, email, phone })
    return res.status(200).json({
        success: true,
        message: "User Created Successfully",
        user
    })
})


// update a user
exports.updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const userExist = await User.findById(id)
    if (!userExist) {
        return next(errorHandler(404, "User not Exist"))
    }
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true
    })
    return res.status(200).json({
        success: true,
        message: "User Updated Successfully",
        updateUser
    })

})


// delete a user
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const userExist = await User.findById(id)
    if (!userExist) {
        return next(errorHandler(404, "User not Exist"))
    }
    const deleteUser = await User.findByIdAndDelete(id)
    return res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
        deleteUser
    })
})

// get all the user
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find()
    return res.status(200).json({
        success: true,
        message: "User fetched Successfully",
        users
    })
})


// get single user
exports.getSingleUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
        return next(errorHandler(404, "User not Exist"))
    }
    return res.status(200).json({
        success: true,
        message: "User fetched Successfully",
        user
    })
})