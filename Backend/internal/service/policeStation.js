const repository = require("../repository/policeStation");

/**
 * Add / Update Police Station
 */
exports.add = async (data) => {
  try {
    if (!data.police_station_id) {
      throw new Error("Police Station Id is required.");
    }

    if (!data.police_station_name) {
      throw new Error("Police Station Name is required.");
    }

    if (!data.district_id) {
      throw new Error("District is required.");
    }

    // Check District Exists
    const districtExists = await repository.districtExists(
      data.district_id
    );

    if (!districtExists) {
      throw new Error("Selected District does not exist.");
    }

    // Duplicate Police Station Id
    const policeStationById =
      await repository.findByPoliceStationId(
        data.police_station_id
      );

    if (
      policeStationById &&
      (!data._id ||
        policeStationById._id.toString() !== data._id)
    ) {
      throw new Error("Police Station Id already exists.");
    }

    // Duplicate Police Station Name
    const policeStationByName =
      await repository.findByPoliceStationName(
        data.police_station_name
      );

    if (
      policeStationByName &&
      (!data._id ||
        policeStationByName._id.toString() !== data._id)
    ) {
      throw new Error("Police Station Name already exists.");
    }

    data.updated_date_time = new Date();

    if (!data._id) {
      data.created_date_time = new Date();
    }

    const id = await repository.addPoliceStation(data);

    return {
      message: data._id
        ? "Police Station Updated Successfully."
        : "Police Station Added Successfully.",
      data: {
        _id: id,
      },
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Get Police Station By Id
 */
exports.getById = async (data) => {
  if (!data._id) {
    throw new Error("Police Station Id is required.");
  }

  const result = await repository.findById(data._id);

  if (!result) {
    throw new Error("Police Station not found.");
  }

  return result;
};

/**
 * Police Station Listing
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
 * Delete Police Station
 */
exports.delete = async (data) => {
  if (!data._id) {
    throw new Error("Police Station Id is required.");
  }

  const exists = await repository.exists(data._id);

  if (!exists) {
    throw new Error("Police Station not found.");
  }

  await repository.delete(data._id);

  return {
    message: "Police Station Deleted Successfully.",
  };
};

/**
 * Change Police Station Status
 */
exports.changeStatus = async (data) => {
  if (!data._id) {
    throw new Error("Police Station Id is required.");
  }

  if (!data.status) {
    throw new Error("Status is required.");
  }

  const result = await repository.changeStatus(
    data._id,
    data.status
  );

  return {
    message: "Police Station Status Updated Successfully.",
    data: result,
  };
};

/**
 * Search Police Station
 */
exports.search = async (data) => {
  return await repository.list(
    1,
    100,
    data.search || "",
    data.status || ""
  );
};