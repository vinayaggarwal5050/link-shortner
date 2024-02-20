const { getUser  } = require("../service/auth") 

async function restrictToLoggedInUsersOnly (req, res, next) {
  const userUid = req.cookies.cookieName;

  if(!userUid) return res.redirect("/signin");

  const user = getUser(userUid);
  
  if(!user) return res.redirect("/signin");

  req.user = user;
  next();
}

async function checkAuth (req, res, next) {
  const userUid = req.cookies.cookieName;
  const user = getUser(userUid);
  
  req.user = user;
  next();
}


module.exports = {
  restrictToLoggedInUsersOnly,
  checkAuth
}