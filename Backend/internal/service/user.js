const bcrypt = require("bcrypt");
const repository = require("../repository/user");
const { encryptStringByChar, decryptStringByChar } = require('../../pkg/utils/encrypt_decrypt');


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

    /* ---------------- Full Name ---------------- */

    data.full_name = [
      data.first_name,
      data.middle_name,
      data.last_name,
    ]
      .filter(Boolean)
      .join(" ");

    /* ---------------- Encrypt Before Duplicate Check ---------------- */

    const encryptedFirstName = await encryptStringByChar(
      data.first_name
    );

    const encryptedMiddleName = data.middle_name
      ? await encryptStringByChar(data.middle_name)
      : "";

    const encryptedLastName = await encryptStringByChar(
      data.last_name
    );

    const encryptedFullName = await encryptStringByChar(
      data.full_name
    );

    const encryptedUserName = await encryptStringByChar(
      data.user_name
    );

    /* ---------------- Username ---------------- */

    const userName = await repository.findByUserName(
      encryptedUserName
    );

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
      const encryptedPhone = await encryptStringByChar(
        data.phone_details[0].phone_no
      );

      const phone = await repository.findByPhone(
        encryptedPhone
      );

      if (
        phone &&
        (!data._id || phone._id.toString() !== data._id)
      ) {
        throw new Error("Phone Number already exists.");
      }

      data.phone_details[0].phone_no = encryptedPhone;
    }

    /* ---------------- Email ---------------- */

    if (
      data.email_details &&
      data.email_details.length > 0 &&
      data.email_details[0].email_id
    ) {
      const encryptedEmail = await encryptStringByChar(
        data.email_details[0].email_id
      );

      const email = await repository.findByEmail(
        encryptedEmail
      );

      if (
        email &&
        (!data._id || email._id.toString() !== data._id)
      ) {
        throw new Error("Email already exists.");
      }

      data.email_details[0].email_id = encryptedEmail;
    }

    /* ---------------- Encrypt User Fields ---------------- */

    data.first_name = encryptedFirstName;
    data.middle_name = encryptedMiddleName;
    data.last_name = encryptedLastName;
    data.full_name = encryptedFullName;
    data.user_name = encryptedUserName;

    /* ---------------- Password ---------------- */

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(
        data.password,
        salt
      );
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

  let result = await repository.findById(data._id);

  if (!result) {
    throw new Error("User not found.");
  }

  result = await decryptObject(result, [
    "_id",
    "password",
    "status",
    "selected_date_time",
    "created_date_time",
    "updated_date_time",
    "created_user_id",
    "updated_user_id",
    "__v",
    "createdAt",
    "updatedAt",
    "phone_details",
    "email_details",
  ]);

  // Decrypt phone numbers
  if (result.phone_details && result.phone_details.length > 0) {
    for (const phone of result.phone_details) {
      phone.phone_no = await decryptObject({
        phone_no: phone.phone_no,
      }, []).then((r) => r.phone_no);
    }
  }

  // Decrypt email ids
  if (result.email_details && result.email_details.length > 0) {
    for (const email of result.email_details) {
      email.email_id = await decryptObject({
        email_id: email.email_id,
      }, []).then((r) => r.email_id);
    }
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

  const result = await repository.list(
    page,
    limit,
    search,
    status
  );

  if (result.rows && result.rows.length > 0) {
    result.rows = await Promise.all(
      result.rows.map(async (user) => {
        return await decryptObject(user, [
          "_id",
          "password",
          "status",
          "selected_date_time",
          "created_date_time",
          "updated_date_time",
          "created_user_id",
          "updated_user_id",
          "__v",
          "createdAt",
          "updatedAt",
        ]);
      })
    );
  }

  return result;
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