const mongoose = require("mongoose");

/* -------------------------------------------------------------------------- */
/*                         Types Of Crime Schema                              */
/* -------------------------------------------------------------------------- */

const typesOfCrimeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    selected_date_time: {
      type: Date,
      default: Date.now,
    },

    created_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },

    created_date_time: {
      type: Date,
      default: Date.now,
    },

    updated_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },

    updated_date_time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "types_of_crime",
  }
);

/* -------------------------------------------------------------------------- */
/*                                  Indexes                                   */
/* -------------------------------------------------------------------------- */



typesOfCrimeSchema.index({
  status: 1,
});

typesOfCrimeSchema.index({
  created_date_time: -1,
});

typesOfCrimeSchema.index({
  selected_date_time: -1,
});

/* -------------------------------------------------------------------------- */
/*                                   Model                                    */
/* -------------------------------------------------------------------------- */

const TypesOfCrime =
  mongoose.models.types_of_crime ||
  mongoose.model("types_of_crime", typesOfCrimeSchema);

module.exports = {
  typesOfCrimeSchema,
  TypesOfCrime,
};