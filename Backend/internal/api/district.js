const districtService = require("../service/district");

/**
 * Add / Update District
 */

exports.add = async (req, res) => {
  try {
    const result = await districtService.add(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("District Add Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
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
exports.list = async (req, res) => {
  try {
    const result = await districtService.list(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("District List Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
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