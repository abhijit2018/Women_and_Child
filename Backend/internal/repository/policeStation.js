const mongoose = require("mongoose");
const { add } = require("../../pkg/utils/common");
const { getDynamicModel } = require("../../pkg/utils/project_model");
const { policeStationSchema } = require("../model/policeStation");

const COLLECTION_NAME = "police_station";

/**
 * Get Police Station Model
 */
const PoliceStationModel = () => {
  return getDynamicModel(COLLECTION_NAME, policeStationSchema);
};

/**
 * Add /Update Police Station
 */
exports.addPoliceStation = async (data) => {
  return await add(data, COLLECTION_NAME, policeStationSchema);
};

/**
 * Find Police Station By Id
 */
exports.findById = async (_id) => {
  const Model = PoliceStationModel();

  return await Model.findById(_id)
    .populate("district_id", "district_id district_name")
    .lean();
};

/**
 * Find Police Station By Police Station Id
 */
exports.findByPoliceStationId = async (police_station_id) => {
  const Model = PoliceStationModel();

  return await Model.findOne({
    police_station_id: {
      $regex: new RegExp(`^${police_station_id}$`, "i"),
    },
  }).lean();
};

/**
 * Find Police Station By Police Station Name
 */
exports.findByPoliceStationName = async (police_station_name) => {
  const Model = PoliceStationModel();

  return await Model.findOne({
    police_station_name: {
      $regex: new RegExp(`^${police_station_name}$`, "i"),
    },
  }).lean();
};

/**
 * Check District Exists
 */
exports.districtExists = async (district_id) => {
  const District = mongoose.model("district");

  return await District.exists({
    _id: new mongoose.Types.ObjectId(district_id),
  });
};

/**
 * Police Station Listing
 */
exports.list = async (
  page = 1,
  limit = 10,
  search = "",
  status = ""
) => {
  const Model = PoliceStationModel();

  const filter = {};

  if (search) {
    filter.$or = [
      {
        police_station_id: {
          $regex: search,
          $options: "i",
        },
      },
      {
        police_station_name: {
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
    .populate("district_id", "district_id district_name")
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
 * Update Police Station
 */
exports.update = async (_id, data) => {
  const Model = PoliceStationModel();

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
 * Delete Police Station
 */
exports.delete = async (_id) => {
  const Model = PoliceStationModel();

  return await Model.findByIdAndDelete(_id);
};

/**
 * Change Status
 */
exports.changeStatus = async (_id, status) => {
  const Model = PoliceStationModel();

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
 * Check Police Station Exists
 */
exports.exists = async (_id) => {
  const Model = PoliceStationModel();

  return await Model.exists({
    _id: new mongoose.Types.ObjectId(_id),
  });
};

/**
 * Total Police Stations
 */
exports.totalPoliceStations = async () => {
  const Model = PoliceStationModel();

  return await Model.countDocuments();
};

/**
 * Active Police Stations
 */
exports.activePoliceStations = async () => {
  const Model = PoliceStationModel();

  return await Model.countDocuments({
    status: "Active",
  });
};

/**
 * Inactive Police Stations
 */
exports.inactivePoliceStations = async () => {
  const Model = PoliceStationModel();

  return await Model.countDocuments({
    status: "Inactive",
  });
};