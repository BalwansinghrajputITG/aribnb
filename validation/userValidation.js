const { body } = require("express-validator");

const signupValidation = [
  body("firstName")
    .notEmpty()
    .length({ min: 3 })
    .trim()
    .withMessage("First Name must be at least 3 characters long"),

  body("lastName")
    .notEmpty()
    .length({ min: 3 })
    .trim()
    .withMessage("Last Name must be at least 3 characters long"),

  body("email").isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  body("userType")
    .notEmpty()
    .withMessage("User Type is required")
    .isIn(["user", "host"])
    .withMessage("Invalid User Type"),
];

module.exports = {
  signupValidation,
};
