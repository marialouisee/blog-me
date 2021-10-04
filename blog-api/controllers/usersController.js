import User from '../models/User.js';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import config from '../config/config.js'

export const getUsers = async (req, res, next) => {
  try {
    let users = await User.find().sort('lastName').select('-password');
    res.send(users);
  } catch (err) {
    next(err);
  }
};

export const addUser = async (req, res, next) => {
  let body = req.body;
  try {
    const user = new User(body)
    user.password = bcrypt.hashSync(user.password, 10);
    await user.save();
    user.password = undefined;
    res.send(user);

    // console.log('add user body', body)
    // res.json(body)
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
    if (!user) throw new createError(404, `No user with id:${id} was found.`);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    let user = await User.findByIdAndUpdate(id, req.body, { new: true }).populate('cart.record');
    if (!user) throw new createError(404, `No user with id:${id} was found.`);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    let userDeleted = await User.findByIdAndDelete(id);
    if (!userDeleted) throw new createError(404, `No user with id:${id} was found.`);
    res.send(userDeleted);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) throw new createError(404, `Username not valid`);

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) throw new createError(401, `Password not valid`);

    user.password = undefined;
    
    const token = user.generateAuthToken() //jwt.sign({ id: user._id }, config.secretKey, { expiresIn: '1d' });

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 172800000),
      sameSite: config.env === "production" ? "none" : "lax",
      secure: config.env === "production" ? true : false,
    };

    res.cookie("token", token, cookieOptions).send(user);
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  res.clearCookie("token").send();
}

export const authUser = async (req, res) => {
  let user = req.user;
  user.password = undefined;
  res.send(user);
}