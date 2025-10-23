const { ObjectId } = require("mongodb");
const Favorite = require("../models/favourite");
const Home = require("../models/home");
const Favourite = require("../models/favourite");

exports.getIndexPage = (req, res, next) => {
  Home.find().then((homelist) => {
    res.render("store/index", {
      registeredHomes: homelist,
      pageTitle: "Airbnb Home",
      currentPage: "home",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getListPage = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Airbnb Home List",
      currentPage: "home-list",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getfavoriteHomes = (req, res, next) => {
  Favourite.find()
    .populate("houseId")
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.houseId);
      res.render("store/favourite", {
        homesArray: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
        isLoggedIn: req.isLoggedIn,
      });
    });
};

exports.getDaitailPage = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId).then((home) => {
    res.render("store/home-deatial", {
      pageTitle: "Deatail Page",
      currentPage: "Datail page",
      houseName: home.houseName,
      description: home.description,
      price: home.price,
      imgUrl: home.imgaeUrl,
      id: home._id,
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.postFavoriteHome = (req, res, next) => {
  const homeId = req.body.homeId;
  console.log("homeId", homeId);
  Favourite.findOne({ houseId: homeId })
    .then((fav) => {
      if (fav) {
        console.log("Already marked as favourite");
      } else {
        fav = new Favourite({ houseId: homeId });
        fav.save().then((result) => {
          console.log("Fav added: ", result);
        });
      }
      res.redirect("/favoriteHomes");
    })
    .catch((err) => {
      console.log("Error while marking favourite: ", err);
    });
};
