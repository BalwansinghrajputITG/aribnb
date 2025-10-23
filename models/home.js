const mongoose = require("mongoose");
const favourite = require("./favourite");

const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgaeUrl: String,
  description: String,
});

homeSchema.pre("findOneAndDelete", async function (next) {
  console.log("Came to pre hook while deleting a home");
  const homeId = this.getQuery()._id;
  await favourite.deleteMany({ houseId: homeId });
  next();
});

module.exports = mongoose.model("Home", homeSchema);
