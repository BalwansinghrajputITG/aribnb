const express = require("express");
const hostRoute = require("./routes/host");
const userRoute = require("./routes/store");
const errorControllers = require("./controllers/error");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/auth");
const session = require("express-session");
const mongoDBStroe = require("connect-mongodb-session")(session);
require("dotenv").config();
const databaseUrl = process.env.DATADASE_URL;
const path = require("path");

//const mongoConnect = require("./utils/database.js");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

// Views folder ka path
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());

const store = new mongoDBStroe({
  uri: databaseUrl,
  collection: "sessions",
});

app.use(
  session({
    secret: "aribnb for node",
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(express.static("public"));

app.use("/", userRoute);

app.use("/host", hostRoute);

app.use("/auth", authRouter);

app.use(errorControllers.getErrorPage);

const PORT = 3000;

mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("mongooes connet");
    app.listen(PORT, () => {
      console.log(`sever start http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log("mongoose connet error", e);
  });
