const mongoose = require("mongoose");
const { add } = require("../../pkg/utils/common");
const { getDynamicModel } = require("../../pkg/utils/project_model");
const { districtSchema } = require("../model/district");

const COLLECTION_NAME = "district";

/**
 * Get District Model
 */
const DistrictModel = () => {
  return getDynamicModel(COLLECTION_NAME, districtSchema);
};

/**
 * Add / Update District
 */
exports.addDistrict = async (data) => {
  return await add(data, COLLECTION_NAME, districtSchema);
};

/**
 * Find District By Id
 */
exports.findById = async (_id) => {
  const Model = DistrictModel();

  return await Model.findById(_id)
    .populate("state_id", "state_id state_name")
    .lean();
};

/**
 * Find District By District Id
 */
exports.findByDistrictId = async (district_id) => {
  const Model = DistrictModel();

  return await Model.findOne({
    district_id: {
      $regex: new RegExp(`^${district_id}$`, "i"),
    },
  }).lean();
};

/**
 * Find District By District Name
 */
exports.findByDistrictName = async (district_name) => {
  const Model = DistrictModel();

  return await Model.findOne({
    district_name: {
      $regex: new RegExp(`^${district_name}$`, "i"),
    },
  }).lean();
};

/**
 * District Listing
 */
exports.list = async (
  page = 1,
  limit = 10,
  search = "",
  status = ""
) => {
  const Model = DistrictModel();

  const filter = {};

  if (search) {
    filter.$or = [
      {
        district_id: {
          $regex: search,
          $options: "i",
        },
      },
      {
        district_name: {
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
    .populate("state_id", "state_id state_name")
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
 * Update District
 */
exports.update = async (_id, data) => {
  const Model = DistrictModel();

  return await Model.findByIdAndUpdate(
    _id,
    { $set: data },
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Delete District
 */
exports.delete = async (_id) => {
  const Model = DistrictModel();

  return await Model.findByIdAndDelete(_id);
};

/**
 * Change Status
 */
exports.changeStatus = async (_id, status) => {
  const Model = DistrictModel();

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
 * Check District Exists
 */
exports.exists = async (_id) => {
  const Model = DistrictModel();

  return await Model.exists({
    _id: new mongoose.Types.ObjectId(_id),
  });
};

/**
 * Check State Exists
 */
exports.stateExists = async (state_id) => {
  const State = mongoose.model("state");

  return await State.exists({
    _id: new mongoose.Types.ObjectId(state_id),
  });
};

/**
 * Total Districts
 */
exports.totalDistricts = async () => {
  const Model = DistrictModel();

  return await Model.countDocuments();
};

/**
 * Active Districts
 */
exports.activeDistricts = async () => {
  const Model = DistrictModel();

  return await Model.countDocuments({
    status: "Active",
  });
};

/**
 * Inactive Districts
 */
exports.inactiveDistricts = async () => {
  const Model = DistrictModel();

  return await Model.countDocuments({
    status: "Inactive",
  });
};