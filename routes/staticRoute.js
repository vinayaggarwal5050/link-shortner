const express = require("express");
const router = express.Router();
const UrlDBRef = require("../models/urlModel");
const User = require("../models/userModel");
const { restrictTo } = require("../middleware/authV2");


router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await UrlDBRef.find({});

  return res.render('home', {
    url: allUrls
  })
})

router.get('/', restrictTo(["NORMAL"]), async (req, res) => {
  
  const userCreatedUrls = await UrlDBRef.find({ createdBy: req.user._id })

  return res.render('home', {
    urls: userCreatedUrls,
  });
})

router.get('/signup', (req, res) => {
  res.render("signup");
})

router.get('/signin', async (req, res) => {
  const allUsers = await User.find({})
  res.render("signin", {
    users: allUsers
  });
})

module.exports = router;