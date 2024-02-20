const express = require("express");
const router = express.Router();
const { handleUserSignup, handleGetAllUsers, handleUserSignin } = require("../controllers/userController")

router
.route('/')
.get(handleGetAllUsers)
.post(handleUserSignup);

router.post('/signin', handleUserSignin);



module.exports = router;