const bcrypt = require("bcrypt");
const repository = require("../repository/user");

/**
 * Add / Update User
 */
exports.add = async (data) => {
  try {
    if (!data.first_name)
      throw new Error("First Name is required.");

    if (!data.last_name)
      throw new Error("Last Name is required.");

    if (!data.user_name)
      throw new Error("User Name is required.");

    if (!data.password && !data._id)
      throw new Error("Password is required.");

    data.full_name = [
      data.first_name,
      data.middle_name,
      data.last_name,
    ]
      .filter(Boolean)
      .join(" ");

    /* ---------------- Username ---------------- */

    const userName = await repository.findByUserName(data.user_name);

    if (
      userName &&
      (!data._id || userName._id.toString() !== data._id)
    ) {
      throw new Error("User Name already exists.");
    }

    /* ---------------- Phone ---------------- */

    if (
      data.phone_details &&
      data.phone_details.length > 0 &&
      data.phone_details[0].phone_no
    ) {
      const phone = await repository.findByPhone(
        data.phone_details[0].phone_no
      );

      if (
        phone &&
        (!data._id || phone._id.toString() !== data._id)
      ) {
        throw new Error("Phone Number already exists.");
      }
    }

    /* ---------------- Email ---------------- */

    if (
      data.email_details &&
      data.email_details.length > 0 &&
      data.email_details[0].email_id
    ) {
      const email = await repository.findByEmail(
        data.email_details[0].email_id
      );

      if (
        email &&
        (!data._id || email._id.toString() !== data._id)
      ) {
        throw new Error("Email already exists.");
      }
    }

    /* ---------------- Password ---------------- */

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    data.updated_date_time = new Date();

    if (!data._id) {
      data.created_date_time = new Date();
    }

    const id = await repository.addUser(data);

    return {
      message: data._id
        ? "User Updated Successfully."
        : "User Added Successfully.",
      data: {
        _id: id,
      },
    };
  } catch (err) {
    throw err;
  }
};

/**
 * Get User By Id
 */
exports.getById = async (data) => {
  if (!data._id) {
    throw new Error("User Id is required.");
  }

  const result = await repository.findById(data._id);

  if (!result) {
    throw new Error("User not found.");
  }

  return result;
};

/**
 * User List
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
 * Delete User
 */
exports.delete = async (data) => {
  if (!data._id) {
    throw new Error("User Id is required.");
  }

  const exists = await repository.exists(data._id);

  if (!exists) {
    throw new Error("User not found.");
  }

  await repository.delete(data._id);

  return {
    message: "User Deleted Successfully."
  };
};

/**
 * Change User Status
 */
exports.changeStatus = async (data) => {
  if (!data._id) {
    throw new Error("User Id is required.");
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
    data: result
  };
};

/**
 * Search User
 */
exports.search = async (data) => {
  return await repository.list(
    1,
    100,
    data.search || "",
    data.status || ""
  );
};

/**
 * Dashboard Count
 */
exports.dashboard = async () => {
  return {
    total_users: await repository.totalUsers(),
    active_users: await repository.activeUsers(),
    inactive_users: await repository.inactiveUsers(),
  };
};