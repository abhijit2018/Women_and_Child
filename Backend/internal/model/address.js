const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone_no: { type: String, required: true },
    address_line_one: { type: String, required: true },
    address_line_two: { type: String },

    house_no: String,
    building_name: String,
    road_name: String,
    area: String,
    colony: String,
    landmark: String,

    city: { type: String, required: true },
    post_office: String,
    police_station: String,

    district: { type: String, required: true }, // (string, not ref)
    state: { type: String, required: true },     // (string, not ref)

    pin_code: { type: String, required: true },

    latitude: String,
    longitude: String,

    type: String,
    status: String,

    selected_date_time: Date,

    created_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    created_date_time: { type: Date, default: Date.now },
    updated_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updated_date_time: Date
  },
  {
    timestamps: true,
    collection: "address"
  }
);

const Address = mongoose.models.address ||
  mongoose.model("address", addressSchema);


module.exports = { addressSchema, Address };