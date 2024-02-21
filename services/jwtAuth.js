const jwt = require("jsonwebtoken")

const createJwtToken = (user) => {
  return jwt.sign({
    email: user.email,
    _id: user._id
  }, "JWTSECRET")
}

const verfityJwtTokenAndReturnUserEmailAndId = (token) => {
  try {
    const userEmailAndId = jwt.verify(token, "JWTSECRET");
    return userEmailAndId;

  } catch(err) {
    return null;
  }
}

module.exports = {
  createJwtToken,
  verfityJwtTokenAndReturnUserEmailAndId
}