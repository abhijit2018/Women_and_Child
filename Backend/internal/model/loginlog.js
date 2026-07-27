const mongoose = require("mongoose");

const logInLogSchema = new mongoose.Schema(
  {   
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    working_status: {
      type: String,
      required: true,
      trim: true
    },

    ip_address: { type: String, trim: true },
    user_agent: { type: String, trim: true },
    device_type: { type: String, trim: true },
    os: { type: String, trim: true },
    browser: { type: String, trim: true },
    status: { type: String, default: "Active" },
    selected_date_time: Date,
    created_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    created_date_time: { type: Date, default: Date.now },
    updated_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    updated_date_time: Date
  },
  {
    timestamps: true,
    collection: "loginlog"
  }
);

const LoginLog = mongoose.model("loginlog", logInLogSchema);

module.exports = { logInLogSchema, LoginLog };