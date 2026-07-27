const mongoose = require("mongoose");

/* -------------------------------------------------------------------------- */
/*                               Phone Details                                */
/* -------------------------------------------------------------------------- */

const phoneDetailSchema = new mongoose.Schema(
  {
    phone_no: {
      type: String,
      trim: true,
      maxlength: 15
    }
  },
  {
    _id: false
  }
);

/* -------------------------------------------------------------------------- */
/*                               Email Details                                */
/* -------------------------------------------------------------------------- */

const emailDetailSchema = new mongoose.Schema(
  {
    email_id: {
      type: String,
      trim: true,
      lowercase: true
    }
  },
  {
    _id: false
  }
);

/* -------------------------------------------------------------------------- */
/*                                User Schema                                 */
/* -------------------------------------------------------------------------- */

const userDataSchema = new mongoose.Schema(
  {
    prefix: {
      type: String,
      required: true,
      trim: true
    },

    first_name: {
      type: String,
      required: true,
      trim: true
    },

    middle_name: {
      type: String,
      trim: true,
      default: ""
    },

    last_name: {
      type: String,
      required: true,
      trim: true
    },

    full_name: {
      type: String,
      required: true,
      trim: true
    },

    nick_name: {
      type: String,
      trim: true,
      default: ""
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male"
    },

    phone_details: {
      type: [phoneDetailSchema],
      default: []
    },

    email_details: {
      type: [emailDetailSchema],
      default: []
    },

    date_of_birth: {
      type: Date
    },

    present_address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      default: null
    },

    permanent_address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      default: null
    },

    user_name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    otp: {
      type: String,
      trim: true,
      default: ""
    },

    profile_image_link_details: {
      type: [String],
      default: []
    },

    signature_link_details: {
      type: [String],
      default: []
    },

    type: {
      type: String,
      default: "User"
    },

    user_status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Blocked"
      ],
      default: "Pending"
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Inactive"
      ],
      default: "Active"
    },

    selected_date_time: {
      type: Date,
      default: Date.now
    },

    created_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null
    },

    created_date_time: {
      type: Date,
      default: Date.now
    },

    updated_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null
    },

    updated_date_time: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "user"
  }
);

/* -------------------------------------------------------------------------- */
/*                                   Indexes                                  */
/* -------------------------------------------------------------------------- */

userDataSchema.index(
  {
    user_name: 1
  },
  {
    unique: true
  }
);

userDataSchema.index({
  status: 1
});

userDataSchema.index({
  user_status: 1
});

userDataSchema.index({
  first_name: 1
});

userDataSchema.index({
  last_name: 1
});

userDataSchema.index({
  full_name: 1
});

userDataSchema.index({
  "phone_details.phone_no": 1
});

userDataSchema.index({
  "email_details.email_id": 1
});

userDataSchema.index({
  created_date_time: -1
});

/* -------------------------------------------------------------------------- */
/*                                   Model                                    */
/* -------------------------------------------------------------------------- */

const UserData =
  mongoose.models.user ||
  mongoose.model("user", userDataSchema);

module.exports = {
  userDataSchema,
  UserData
};