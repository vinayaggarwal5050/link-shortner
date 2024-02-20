const express = require("express");
const router = express.Router();
const UrlDBRef = require("../models/urlModel");
const User = require("../models/userModel");


router.get('/', async (req, res) => {

  if(!req.user) return res.redirect("/signin");
  
  //const allUrls = await UrlDBRef.find({});
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