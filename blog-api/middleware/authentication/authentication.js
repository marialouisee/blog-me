import createError from "http-errors"
import User from '../../models/User.js'

const auth = async (req, res, next) => {
  // grab the token from the cookies
  // verify token
  // console.log(req.cookies)
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(createError(401, "No token provided"));
    }
  
    // custom method in user model
    const user = await User.findByToken(token);
    if (!user) {
      return next(createError(401, "Auth failed. Invalid token"));
    }
  
    // attach user to request object 
    req.user = user;
    next();
  } catch (error) {
      next(error)
  }
}

export default auth
