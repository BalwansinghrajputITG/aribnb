const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth");

authRouter.get("/login", authController.getLogin);
authRouter.post("/user/login", authController.postLogin);
authRouter.post("/user/logOut", authController.postLogOut);
authRouter.get("/signup", authController.getSignupPage);
authRouter.post("/user/submit", authController.postAddSignup);

module.exports = authRouter;

// productRouter.get("/allProucts" , )
