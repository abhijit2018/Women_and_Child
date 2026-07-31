const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    state_id: {
      type: String,
      required: true,
      trim: true,
    },
    state_name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "Active",
    },
    selected_date_time: Date,
    created_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    created_date_time: {
      type: Date,
      default: Date.now,
    },
    updated_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    updated_date_time: Date,
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "state",
  }
);

const State =
  mongoose.models.state ||
  mongoose.model("state", stateSchema);

module.exports = {
  stateSchema,
  State,
};