const express = require("express");
const hostRoute = express.Router();
const hostControllers = require("../controllers/host");



hostRoute.get("/host-home", hostControllers.getHostHomeList);
hostRoute.get("/addHome", hostControllers.addHomes);
hostRoute.post("/addHome", hostControllers.postHomes);
hostRoute.get("/editHome/:homeId", hostControllers.getEditHome);
hostRoute.post("/editHome", hostControllers.postEditHome);
hostRoute.post("/deletHome/:homeId", hostControllers.postDeleteById);
// get("/all" , p.get)
module.exports = hostRoute;
