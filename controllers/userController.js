const { v4: uuidv4 } = require("uuid")
const User = require("../models/userModel");
const { setUser } = require("../service/auth")

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

    const sessionID = uuidv4();
    setUser(sessionID, user);
    res.cookie("cookieName", sessionID);

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