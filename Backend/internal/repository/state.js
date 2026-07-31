const mongoose = require("mongoose");
const { add } = require("../../pkg/utils/common");
const { getDynamicModel } = require("../../pkg/utils/project_model");
const { stateSchema } = require("../model/state");

const COLLECTION_NAME = "state";

/**
 * Get State Model
 */
const StateModel = () => {
  return getDynamicModel(COLLECTION_NAME, stateSchema);
};

/**
 * Add / Update State
 */
exports.addState = async (data) => {
  return await add(data, COLLECTION_NAME, stateSchema);
};

/**
 * Find State By Id
 */
exports.findById = async (_id) => {
  const Model = StateModel();

  return await Model.findById(_id).lean();
};

/**
 * Find State By State Id
 */
exports.findByStateId = async (state_id) => {
  const Model = StateModel();

  return await Model.findOne({
    state_id: {
      $regex: new RegExp(`^${state_id}$`, "i"),
    },
  }).lean();
};

/**
 * Find State By State Name
 */
exports.findByStateName = async (state_name) => {
  const Model = StateModel();

  return await Model.findOne({
    state_name: {
      $regex: new RegExp(`^${state_name}$`, "i"),
    },
  }).lean();
};

/**
 * State Listing
 */
exports.list = async (
  page = 1,
  limit = 10,
  search = "",
  status = ""
) => {
  const Model = StateModel();

  const filter = {};

  if (search) {
    filter.$or = [
      {
        state_id: {
          $regex: search,
          $options: "i",
        },
      },
      {
        state_name: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (status) {
    filter.status = status;
  }

  const total = await Model.countDocuments(filter);

  const rows = await Model.find(filter)
    .sort({ created_date_time: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return {
    total_records: total,
    page,
    limit,
    total_pages: Math.ceil(total / limit),
    rows,
  };
};

/**
 * Update State
 */
exports.update = async (_id, data) => {
  const Model = StateModel();

  return await Model.findByIdAndUpdate(
    _id,
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Delete State
 */
exports.delete = async (_id) => {
  const Model = StateModel();

  return await Model.findByIdAndDelete(_id);
};

/**
 * Change Status
 */
exports.changeStatus = async (_id, status) => {
  const Model = StateModel();

  return await Model.findByIdAndUpdate(
    _id,
    {
      status,
      updated_date_time: new Date(),
    },
    {
      new: true,
    }
  );
};

/**
 * Check State Exists
 */
exports.exists = async (_id) => {
  const Model = StateModel();

  return await Model.exists({
    _id: new mongoose.Types.ObjectId(_id),
  });
};

/**
 * Total States
 */
exports.totalStates = async () => {
  const Model = StateModel();

  return await Model.countDocuments();
};

/**
 * Active States
 */
exports.activeStates = async () => {
  const Model = StateModel();

  return await Model.countDocuments({
    status: "Active",
  });
};

/**
 * Inactive States
 */
exports.inactiveStates = async () => {
  const Model = StateModel();

  return await Model.countDocuments({
    status: "Inactive",
  });
};