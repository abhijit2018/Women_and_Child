const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema(
  {
    district_id: { type: String, required: true },
    district_name: { type: String, required: true },
    state_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "state"
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
    collection: "district"
  }
);

const District = mongoose.models.district || mongoose.model("district", districtSchema);

module.exports = { districtSchema, District };