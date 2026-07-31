const userService = require("../service/user");

/**
 * Add / Update User
 */
exports.add = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    if (req.body.phone_details) {
        req.body.phone_details = JSON.parse(req.body.phone_details);
    }

    if (req.body.email_details) {
        req.body.email_details = JSON.parse(req.body.email_details);
    }

    const result = await userService.add(req.body,req.files);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error("User Add Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};

/**
 * Get User By Id
 */
exports.getById = async (req, res) => {
  try {
    const result = await userService.getById(req.body);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("Get User Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};

/**
 * User List
 */
exports.list = async (req, res) => {
  try {
    const result = await userService.list(req.body);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("User List Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};

/**
 * Delete User
 */
exports.delete = async (req, res) => {
  try {
    const result = await userService.delete(req.body);

    return res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};

/**
 * Change User Status
 */
exports.changeStatus = async (req, res) => {
  try {
    const result = await userService.changeStatus(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error("Change Status Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};

/**
 * Search User
 */
exports.search = async (req, res) => {
  try {
    const result = await userService.search(req.body);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("Search User Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};