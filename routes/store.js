const express = require("express");
const userRoute = express.Router();
const homestroe = require("../controllers/stroe");

userRoute.get("/", homestroe.getIndexPage);
userRoute.get("/homeList", homestroe.getListPage);
userRoute.get("/favoriteHomes", homestroe.getfavoriteHomes);
userRoute.post("/favorite/home/add", homestroe.postFavoriteHome);
userRoute.get("/homes/:homeId", homestroe.getDaitailPage);

module.exports = userRoute;
