const policeStationService = require("../service/policeStation");

/**
 * Add / Update Police Station
 */
exports.add = async (req, res) => {
  try {
    const result = await policeStationService.add(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Police Station Add Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Get Police Station By Id
 */
exports.getById = async (req, res) => {
  try {
    const result = await policeStationService.getById(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get Police Station Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Police Station Listing
 */
exports.list = async (req, res) => {
  try {
    const result = await policeStationService.list(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Police Station List Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Delete Police Station
 */
exports.delete = async (req, res) => {
  try {
    const result = await policeStationService.delete(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Delete Police Station Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Change Police Station Status
 */
exports.changeStatus = async (req, res) => {
  try {
    const result = await policeStationService.changeStatus(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Change Police Station Status Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * Search Police Station
 */
exports.search = async (req, res) => {
  try {
    const result = await policeStationService.search(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Search Police Station Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};