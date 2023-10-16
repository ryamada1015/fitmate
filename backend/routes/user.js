const express = require("express")

// controller functions
const { loginUser, signupUser } = require("../controllers/userController")

const router = express.Router()

// loging route
router.post("/login", loginUser)

// sign up route
router.post("/singup", signupUser)

modul.exports = router
