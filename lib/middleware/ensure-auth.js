const UserService = require('../services/Userservice');

module.exports = (req, res, next) => {
  try {
    console.log(req);
    const token = req.cookies.session;
    req.user = UserService.verifyAuthToken(token);
    next();
  } catch(err) {
    err.status = 401;
    next(err);
  }
};
