const repository = require("../repository/state");

/**
 * Add / Update State
 */
exports.add = async (data) => {
  try {
    if (!data.state_id) {
      throw new Error("State Id is required.");
    }

    if (!data.state_name) {
      throw new Error("State Name is required.");
    }

    // Check duplicate State ID
    const stateById = await repository.findByStateId(data.state_id);

    if (
      stateById &&
      (!data._id || stateById._id.toString() !== data._id)
    ) {
      throw new Error("State Id already exists.");
    }

    // Check duplicate State Name
    const stateByName = await repository.findByStateName(data.state_name);

    if (
      stateByName &&
      (!data._id || stateByName._id.toString() !== data._id)
    ) {
      throw new Error("State Name already exists.");
    }

    data.updated_date_time = new Date();

    if (!data._id) {
      data.created_date_time = new Date();
    }

    const id = await repository.addState(data);

    return {
      message: data._id
        ? "State Updated Successfully."
        : "State Added Successfully.",
      data: {
        _id: id,
      },
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Get State By Id
 */
exports.getById = async (data) => {
  if (!data._id) {
    throw new Error("State Id is required.");
  }

  const result = await repository.findById(data._id);

  if (!result) {
    throw new Error("State not found.");
  }

  return result;
};

/**
 * State Listing
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
 * Delete State
 */
exports.delete = async (data) => {
  if (!data._id) {
    throw new Error("State Id is required.");
  }

  const exists = await repository.exists(data._id);

  if (!exists) {
    throw new Error("State not found.");
  }

  await repository.delete(data._id);

  return {
    message: "State Deleted Successfully.",
  };
};

/**
 * Change Status
 */
exports.changeStatus = async (data) => {
  if (!data._id) {
    throw new Error("State Id is required.");
  }

  if (!data.status) {
    throw new Error("Status is required.");
  }

  const result = await repository.changeStatus(
    data._id,
    data.status
  );

  return {
    message: "State Status Updated Successfully.",
    data: result,
  };
};

/**
 * Search State
 */
exports.search = async (data) => {
  return await repository.list(
    1,
    100,
    data.search || "",
    data.status || ""
  );
};