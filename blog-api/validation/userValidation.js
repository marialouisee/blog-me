import { body, validationResult } from "express-validator";
import createError from "http-errors";

export const userValidationRules = () => {
  return [
    body('username')
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be between 3 and 20 characters')
      .trim()
      .escape(),
    body("email")
      .isEmail()
      .withMessage("Email is invalid")
      .trim()
      .normalizeEmail()
      .escape(),
    body("password")
      .isStrongPassword({
        minLength: 10,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false
      })
      .withMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol !@#^$%&*"
      )
      .escape()
  ];
};

export const userValidationErrorHandling = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (errors.isEmpty()) return next() // if no return line 31 will be executed

  const arrErrors = errors.array();
  const errorsSummary = mergeErrors(arrErrors);
  const err = new createError(422, errorsSummary);
  next(err)
};

const mergeErrors = (arrErrors) => { // merge errors in one array
  return arrErrors.map((err) => {return `${err.msg} `}).join(", ");
};