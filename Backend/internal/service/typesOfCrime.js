const repository = require("../repository/typesOfCrime");

/**
 * Add / Update Types Of Crime
 */
exports.add = async (data) => {
  try {
    if (!data.name) {
      throw new Error("Name is required.");
    }

    // Check duplicate name
    const crimeType = await repository.findByName(data.name);

    if (
      crimeType &&
      (!data._id || crimeType._id.toString() !== data._id)
    ) {
      throw new Error("Types Of Crime already exists.");
    }

    data.updated_date_time = new Date();

    if (!data._id) {
      data.created_date_time = new Date();
    }

    const id = await repository.addTypesOfCrime(data);

    return {
      message: data._id
        ? "Types Of Crime Updated Successfully."
        : "Types Of Crime Added Successfully.",
      data: {
        _id: id,
      },
    };
  } catch (err) {
    throw err;
  }
};

/**
 * Get Types Of Crime By Id
 */
exports.getById = async (data) => {
  if (!data._id) {
    throw new Error("Types Of Crime Id is required.");
  }

  const result = await repository.findById(data._id);

  if (!result) {
    throw new Error("Types Of Crime not found.");
  }

  return result;
};

/**
 * Types Of Crime List
 */
exports.list = async (data) => {
  const page = Number(data.page) || 1;
  const limit = Number(data.limit) || 10;
  const search = data.search || "";
  const status = data.status || "";

  return await repository.list(
    page,
    limit,
    search,
    status
  );
};

/**
 * Delete Types Of Crime
 */
exports.delete = async (data) => {
  if (!data._id) {
    throw new Error("Types Of Crime Id is required.");
  }

  const exists = await repository.exists(data._id);

  if (!exists) {
    throw new Error("Types Of Crime not found.");
  }

  await repository.delete(data._id);

  return {
    message: "Types Of Crime Deleted Successfully.",
  };
};

/**
 * Change Status
 */
exports.changeStatus = async (data) => {
  if (!data._id) {
    throw new Error("Types Of Crime Id is required.");
  }

  if (!data.status) {
    throw new Error("Status is required.");
  }

  const result = await repository.changeStatus(
    data._id,
    data.status
  );

  return {
    message: "Status Updated Successfully.",
    data: result,
  };
};

/**
 * Search Types Of Crime
 */
exports.search = async (data) => {
  return await repository.list(
    1,
    100,
    data.search || "",
    data.status || ""
  );
};