const mongoose = require("mongoose");

const policeStationSchema = new mongoose.Schema(
  {
    police_station_id: { type: String, required: true },
    police_station_name: { type: String, required: true },
    district_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "district",
      required: true
    },
    status: { type: String, default: "Active" },
    selected_date_time: Date,
    created_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    created_date_time: { type: Date, default: Date.now },
    updated_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    updated_date_time: Date
  },
  {
    timestamps: true,
    collection: "police_station"
  }
);

const PoliceStation = mongoose.model("police_station", policeStationSchema);

module.exports = { policeStationSchema, PoliceStation };