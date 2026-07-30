const repository = require("../repository/district");

/**
 * Add / Update District
 */
exports.add = async (data) => {
  try {
    if (!data.district_id) {
      throw new Error("District Id is required.");
    }

    if (!data.district_name) {
      throw new Error("District Name is required.");
    }

    // if (!data.state_id) {
    //   throw new Error("State is required.");
    // }

    // Check State Exists
    // const stateExists = await repository.stateExists(data.state_id);

    // if (!stateExists) {
    //   throw new Error("Selected State does not exist.");
    // }

    // Duplicate District Id
    const districtById = await repository.findByDistrictId(
      data.district_id
    );

    if (
      districtById &&
      (!data._id || districtById._id.toString() !== data._id)
    ) {
      throw new Error("District Id already exists.");
    }

    // Duplicate District Name
    const districtByName = await repository.findByDistrictName(
      data.district_name
    );

    if (
      districtByName &&
      (!data._id || districtByName._id.toString() !== data._id)
    ) {
      throw new Error("District Name already exists.");
    }

    data.updated_date_time = new Date();

    if (!data._id) {
      data.created_date_time = new Date();
    }

    const id = await repository.addDistrict(data);

    return {
      message: data._id
        ? "District Updated Successfully."
        : "District Added Successfully.",
      data: {
        _id: id,
      },
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Get District By Id
 */
exports.getById = async (data) => {
  if (!data._id) {
    throw new Error("District Id is required.");
  }

  const result = await repository.findById(data._id);

  if (!result) {
    throw new Error("District not found.");
  }

  return result;
};

/**
 * District Listing
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
 * Delete District
 */
exports.delete = async (data) => {
  if (!data._id) {
    throw new Error("District Id is required.");
  }

  const exists = await repository.exists(data._id);

  if (!exists) {
    throw new Error("District not found.");
  }

  await repository.delete(data._id);

  return {
    message: "District Deleted Successfully.",
  };
};

/**
 * Change District Status
 */
exports.changeStatus = async (data) => {
  if (!data._id) {
    throw new Error("District Id is required.");
  }

  if (!data.status) {
    throw new Error("Status is required.");
  }

  const result = await repository.changeStatus(
    data._id,
    data.status
  );

  return {
    message: "District Status Updated Successfully.",
    data: result,
  };
};

/**
 * Search District
 */
exports.search = async (data) => {
  return await repository.list(
    1,
    100,
    data.search || "",
    data.status || ""
  );
};