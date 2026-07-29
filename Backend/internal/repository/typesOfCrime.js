const mongoose = require("mongoose");
const { add } = require("../../pkg/utils/common");
const { getDynamicModel } = require("../../pkg/utils/project_model");
const { typesOfCrimeSchema } = require("../model/typesOfCrime");

const COLLECTION_NAME = "types_of_crime";

/**
 * Get Types Of Crime Model
 */
const TypesOfCrimeModel = () => {
  return getDynamicModel(COLLECTION_NAME, typesOfCrimeSchema);
};

/**
 * Add / Update Types Of Crime
 */
exports.addTypesOfCrime = async (data) => {
  return await add(data, COLLECTION_NAME, typesOfCrimeSchema);
};

/**
 * Find Types Of Crime By Id
 */
exports.findById = async (_id) => {
  const Model = TypesOfCrimeModel();

  return await Model.findById(_id).lean();
};

/**
 * Find Types Of Crime By Name
 */
exports.findByName = async (name) => {
  const Model = TypesOfCrimeModel();

  return await Model.findOne({
    name: {
      $regex: new RegExp(`^${name}$`, "i"),
    },
  });
};

/**
 * Types Of Crime List
 */
exports.list = async (
  page = 1,
  limit = 10,
  search = "",
  status = ""
) => {
  const Model = TypesOfCrimeModel();

  const filter = {};

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
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
    .sort({
      created_date_time: -1,
    })
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
 * Update Types Of Crime
 */
exports.update = async (_id, data) => {
  const Model = TypesOfCrimeModel();

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
 * Delete Types Of Crime
 */
exports.delete = async (_id) => {
  const Model = TypesOfCrimeModel();

  return await Model.findByIdAndDelete(_id);
};

/**
 * Change Status
 */
exports.changeStatus = async (_id, status) => {
  const Model = TypesOfCrimeModel();

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
 * Check Types Of Crime Exists
 */
exports.exists = async (_id) => {
  const Model = TypesOfCrimeModel();

  return await Model.exists({
    _id: new mongoose.Types.ObjectId(_id),
  });
};

/**
 * Total Types Of Crime
 */
exports.totalTypesOfCrime = async () => {
  const Model = TypesOfCrimeModel();

  return await Model.countDocuments();
};

/**
 * Active Types Of Crime
 */
exports.activeTypesOfCrime = async () => {
  const Model = TypesOfCrimeModel();

  return await Model.countDocuments({
    status: "Active",
  });
};

/**
 * Inactive Types Of Crime
 */
exports.inactiveTypesOfCrime = async () => {
  const Model = TypesOfCrimeModel();

  return await Model.countDocuments({
    status: "Inactive",
  });
};