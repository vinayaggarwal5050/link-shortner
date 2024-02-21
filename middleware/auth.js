const { getUser  } = require("../services/auth");
const { verfityJwtTokenAndReturnUserEmailAndId } = require("../services/jwtAuth");


  /*
  //when front end stores the token in file and local storage and returns that same in header
  //front end
  fetch("", {
    method: "post",

    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwtToken}`
    },

    body: JSON.stringify({
      title: "some title...",
      description: "some description..."
    })
  })

  */

//Authentication middleware
function checkForAuthentication(req, res, next) {

  req.user = null;
  const authorizationHeader = req.headers.Authorization;

  if(!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
    return next();
  }

  const jwtToken = authString.split('Bearer ')[1];

  req.user = verfityJwtTokenAndReturnUserEmailAndId(jwtToken); //--> user = null, if invalid token, else user = {email: "", _id: ""}
  return next();
}

//authrization middleware
function restrictTo(roles = []) {
  return function(req, res, next) {
    if(!req.user) return res.redirect('/signin');

    if(!roles.includes(req.user.role)) return res.end('you are unauthorized');

    next();

  }
}

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