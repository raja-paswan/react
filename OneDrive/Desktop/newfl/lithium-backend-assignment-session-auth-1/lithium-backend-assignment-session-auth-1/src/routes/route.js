const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const authMW = require("../middleware/authmiddleware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)


router.get("/users/:userId",authMW.auth,userController.getUserData)

router.put("/users/:userId",authMW.auth,userController.updateUser)

router.delete("/users/:userId",authMW.auth,userController.deleteUser)

//router.put("/users/:userId", authMW.auth,userController.updateUser)

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzYzZDA3YmFhMTk5ZjcxZGJhMzZlZTYiLCJpYXQiOjE2Njc0ODczMzh9.2c2fjGnnLJ8lOOtC76SlkNmZZMDXyTqIrz6Z2FpJXbA