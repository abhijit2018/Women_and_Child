const stateService = require("../service/state");

/**
 * Add / Update State
 */
exports.add = async (req, res) => {
  try {
    const result = await stateService.add(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("State Add Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Get State By Id
 */
exports.getById = async (req, res) => {
  try {
    const result = await stateService.getById(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get State Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * State Listing
 */
exports.list = async (req, res) => {
  try {
    const result = await stateService.list(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("State List Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Delete State
 */
exports.delete = async (req, res) => {
  try {
    const result = await stateService.delete(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Delete State Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Change State Status
 */
exports.changeStatus = async (req, res) => {
  try {
    const result = await stateService.changeStatus(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Change State Status Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Search State
 */
exports.search = async (req, res) => {
  try {
    const result = await stateService.search(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Search State Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};