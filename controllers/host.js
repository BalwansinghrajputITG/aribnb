const Home = require("../models/home");

exports.getHostHomeList = (req, res, next) => {
  Home.find().then((homelist) => {
    res.render("host/home-list", {
      registeredHomes: homelist,
      pageTitle: "Host Home List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.addHomes = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
  });
};

exports.postHomes = (req, res, next) => {
  const { home, imageUrl, price, description } = req.body;
  const homes = new Home({
    houseName: home,
    imgaeUrl: imageUrl,
    price: price,
    description: description,
  });
  homes.save().then(() => {
    console.log("home added sussesfully");
  });
  res.render("host/susses", {
    pageTitle: "Susses Home",
    currentPage: "addHome",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    res.render("host/addHome", {
      pageTitle: "Edit Home",
      currentPage: "edditHome",
      editing: editing,
      home: home,
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { home, imageUrl, price, description, _id } = req.body;

  Home.findById(_id)
    .then((homeById) => {
      homeById.houseName = home;
      homeById.price = price;
      homeById.imageUrl = imageUrl;
      homeById.description = description;
      homeById
        .save()
        .then(() => {
          console.log(`home edit sussese`);
        })
        .catch((e) => {
          console.log("home not edited", e);
        });
      res.redirect("/host/host-home");
    })
    .catch((e) => {
      console.log("home not edited", e);
    });
};

exports.postDeleteById = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId)
    .then(() => {
      console.log("home Deletet Succes");
    })
    .catch((e) => {
      console.log("home not delete", e);
    });

  res.redirect("/host/host-home");
};
