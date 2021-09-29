import User from '../models/User.js';
import createError from 'http-errors';

export const getUsers = async (req, res, next) => {
  try {
    let users = await User.find().sort('lastName').select('-password');
    res.send(users);
  } catch (err) {
    next(err);
  }
};

export const addUser = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await User.create(body);
    res.send(user);
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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate('cart.record');
    if (!user) throw new createError(404, `Email not valid`);
    if (user.password !== password) throw new createHttpError(404, `Password is not valid`);
    res.send(user);
  } catch (err) {
    next(err);
  }
};