const jwt = require("jsonwebtoken")

const createJwtToken = (user) => {
  return jwt.sign({
    email: user.email,
    _id: user._id,
    role: user.role
  }, "JWTSECRET")
}

const verfityJwtTokenAndReturnUserEmailIdAndRole = (token) => {
  try {
    const userEmailIdAndRole = jwt.verify(token, "JWTSECRET");
    return userEmailIdAndRole;

  } catch(err) {
    return null;
  }
}

module.exports = {
  createJwtToken,
  verfityJwtTokenAndReturnUserEmailIdAndRole
}