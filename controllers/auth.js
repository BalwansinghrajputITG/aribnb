exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    currentPage: "login",
    pageTitle: "auth",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogOut = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};

exports.getSignupPage = (req, res, next) => {
  res.render("auth/signup", {
    currentPage: "signup",
    pageTitle: "auth",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.postAddSignup = (req, res, next) => {
  const body = req.body;
  console.log(body);
  req.session.isLoggedIn = true;
  res.redirect("/");
};
