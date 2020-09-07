const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlist = Schema({
  dateOfApplication: { type: Date },
  wishlistPriority: { type: [String], default: undefined},
  flightDirection: { type: String },
  workOverTime: { type: String },
  workShiftDuration: { type: String },
  preferenceDepartureTime: { type: String },
  weekends: { type: [Date], default: undefined}
});

module.exports = mongoose.model("Wishlist", wishlist);