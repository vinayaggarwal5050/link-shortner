const { verfityJwtTokenAndReturnUserEmailIdAndRole } = require("../services/jwtAuth");


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

  req.user = verfityJwtTokenAndReturnUserEmailIdAndRole(jwtToken); //--> user = null, if invalid token, else user = {email: "", _id: "", role: "NOMRAL"}
  return next();
}

//authorization middleware
function restrictTo(roles = []) {
  return function(req, res, next) {
    if(!req.user) return res.redirect('/signin');

    if(!roles.includes(req.user.role)) return res.end('you are unauthorized');

    //if( ["NORMAL", "ADMIN"].includes("NORMAL") ) return next();

    next();

  }
}

module.exports = {
  checkForAuthentication,
  restrictTo
}