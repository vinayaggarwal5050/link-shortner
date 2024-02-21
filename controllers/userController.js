const { v4: uuidv4 } = require("uuid")
const User = require("../models/userModel");
const { setUser } = require("../services/auth");
const { createJwtToken } = require("../services/jwtAuth");

const handleUserSignup = async (req, res) => {

  try {
    const { name, email, password } = req.body;
    const response = await User.create({
      name,
      email,
      password
    })

    console.log(response);
    return res.render("signin", {
      user: response
    });

  } catch(err) {
    console.error(err);
    return res.status(101).json({
      status: false,
      message: "database error"
    })
  }


}

const handleGetAllUsers = async (req, res) => {
  const allUsers = await User.find({})

  res.render('signin', {
    users: allUsers
  })
}

const handleUserSignin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if(!user) return res.render('signin', {
    error: "invalid email or password"
  })

  if(user) {

    /* version 1 - using stateful authentication
    const sessionID = uuidv4();
    setUser(sessionID, user);
    //res.cookie(name, value, {options} )
    const expirationTime = 24 * 60 * 60 * 1000; // 24 hours
    const expiryDate = new Date(Date.now() + expirationTime);

    res.cookie("cookieName", sessionID, {
      domain: "http://localhost.com:3000",
      expires: expiryDate
    });
*/
    //version 2 - using jwtToken authorization header - stateless authentication
     const jwtToken =  createJwtToken({
        email: user.email,
        _id: user._id
      })
      res.json({
        status: true,
        message: "signin successful, store jwtToken in localstorage or in file system",
        data: {
          jwtToken: jwtToken
        }

      })
    
    return res.render('home', {
      user: user
    })
  }
}

module.exports = {
  handleUserSignup,
  handleGetAllUsers,
  handleUserSignin
}