const typesOfCrimeService = require("../service/typesOfCrime");

/**
 * Add/Update
 */
exports.add = async (req, res) => {
  try {
    const result = await typesOfCrimeService.add(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Types Of Crime Add Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Get Types Of Crime By Id
 */
exports.getById = async (req, res) => {
  try {
    const result = await typesOfCrimeService.getById(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get Types Of Crime Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Types Of Crime List
 */
exports.list = async (req, res) => {
  try {
    const result = await typesOfCrimeService.list(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Types Of Crime List Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Delete Types Of Crime
 */
exports.delete = async (req, res) => {
  try {
    const result = await typesOfCrimeService.delete(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Delete Types Of Crime Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Change Types Of Crime Status
 */
exports.changeStatus = async (req, res) => {
  try {
    const result = await typesOfCrimeService.changeStatus(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Change Status Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Search Types Of Crime
 */
exports.search = async (req, res) => {
  try {
    const result = await typesOfCrimeService.search(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Search Types Of Crime Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};