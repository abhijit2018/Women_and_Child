const bcrypt = require("bcrypt");
const repository = require("../repository/user");
const { encryptStringByChar, decryptStringByChar } = require('../../pkg/utils/encrypt_decrypt');
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');


/**
 * Add / Update User
 */
exports.add = async (data, files) => {
  try {

    if (data._id) {
        const existingUser = await repository.findById(data._id);

        if (!existingUser) {
            throw new Error("User not found.");
        }
    }

    if (!data.prefix)
      throw new Error("prefix is required.");

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
      data.prefix,
      data.first_name,
      data.middle_name,
      data.last_name,
    ]
      .filter(Boolean)
      .join(" ");

    /* ---------------- Encrypt Before Duplicate Check ---------------- */

    const encryptedPrefix = await encryptStringByChar(
      data.prefix
    );

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

    const encryptedNickName = data.nick_name
    ? await encryptStringByChar(data.nick_name)
    : "";

    data.nick_name = encryptedNickName;

    const encryptedGender = data.gender
    ? await encryptStringByChar(data.gender)
    : "";

    data.gender = encryptedGender;

    const encryptedUserName = await encryptStringByChar(
      data.user_name
    );

    /* ---------------- Username ---------------- */

    const userName = await repository.findByUserName(data.user_name);

    if (
      userName &&
      (!data._id || userName._id.toString() !== data._id)
    ) {
      throw new Error("User Name already exists.");
    }

    /* ---------------- Phone ---------------- */

    if (Array.isArray(data.phone_details)) {

      for (const phone of data.phone_details) {

          if (!phone.phone_no) continue;

          const exists = await repository.findByPhone(phone.phone_no);

          if (
              exists &&
              (!data._id || exists._id.toString() !== data._id)
          ) {
              throw new Error("Phone Number already exists.");
          }

          phone.phone_no = await encryptStringByChar(phone.phone_no);
      }
  }

    /* ---------------- Email ---------------- */

    if (Array.isArray(data.email_details)) {

        for (const email of data.email_details) {

            if (!email.email_id) continue;

            const exists = await repository.findByEmail(email.email_id);

            if (
                exists &&
                (!data._id || exists._id.toString() !== data._id)
            ) {
                throw new Error("Email already exists.");
            }

            email.email_id = await encryptStringByChar(email.email_id);
        }
    }

    /* ---------------- Encrypt User Fields ---------------- */

    data.prefix = encryptedPrefix;
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
    } else if (data._id) {
      delete data.password;
    }

    data.updated_date_time = new Date();

    if (!data._id) {
      data.created_date_time = new Date();
    }

    const profileLinks = [];
  const signatureLinks = [];

  const profileDir = "web/uploads/profile/";
  const signatureDir = "web/uploads/signature/";


  if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });
  if (!fs.existsSync(signatureDir)) fs.mkdirSync(signatureDir, { recursive: true });


  for (const file of (files || [])) {
    const filename = Date.now() + "-" + file.originalname;

    if (file.fieldname === "profile_image_link_details") {
      const savePath = path.join(profileDir, filename);

      fs.writeFileSync(savePath, file.buffer);

      const fullPath = await encryptStringByChar(`web/uploads/profile/${filename}`);
      profileLinks.push(fullPath);
    }

    if (file.fieldname === "signature_link_details") {
      const savePath = path.join(signatureDir, filename);

      fs.writeFileSync(savePath, file.buffer);

      const fullPath = await encryptStringByChar(`web/uploads/signature/${filename}`);
      signatureLinks.push(fullPath);
    }
  }


  if (profileLinks.length) {
    data.profile_image_link_details = profileLinks;
  } else if (data._id) {
      data.profile_image_link_details = existingUser.profile_image_link_details;
  }
  
  if (signatureLinks.length) {
    data.signature_link_details = signatureLinks;
  } else if (data._id) {
      data.signature_link_details = existingUser.signature_link_details;
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
  try {
    if (!data._id) {
      throw new Error("User Id is required.");
    }

    const result = await repository.findById(data._id);

    if (!result) {
      throw new Error("User not found.");
    }

    /* ---------------- Decrypt User Fields ---------------- */

    result.prefix = result.prefix
      ? await decryptStringByChar(result.prefix)
      : "";

    result.first_name = result.first_name
      ? await decryptStringByChar(result.first_name)
      : "";

    result.middle_name = result.middle_name
      ? await decryptStringByChar(result.middle_name)
      : "";

    result.last_name = result.last_name
      ? await decryptStringByChar(result.last_name)
      : "";

    result.full_name = result.full_name
      ? await decryptStringByChar(result.full_name)
      : "";

    result.nick_name = result.nick_name
      ? await decryptStringByChar(result.nick_name)
      : "";

    result.gender = result.gender
      ? await decryptStringByChar(result.gender)
      : "";

    result.user_name = result.user_name
      ? await decryptStringByChar(result.user_name)
      : "";

    /* ---------------- Phone ---------------- */

    if (Array.isArray(result.phone_details)) {
      for (const phone of result.phone_details) {
        if (phone.phone_no) {
          phone.phone_no = await decryptStringByChar(
            phone.phone_no
          );
        }
      }
    }

    /* ---------------- Email ---------------- */

    if (Array.isArray(result.email_details)) {
      for (const email of result.email_details) {
        if (email.email_id) {
          email.email_id = await decryptStringByChar(
            email.email_id
          );
        }
      }
    }

    /* ---------------- Profile Images ---------------- */

    if (Array.isArray(result.profile_image_link_details)) {
      const profileLinks = [];

      for (const link of result.profile_image_link_details) {
        profileLinks.push(
          await decryptStringByChar(link)
        );
      }

      result.profile_image_link_details = profileLinks;
    }

    /* ---------------- Signature Images ---------------- */

    if (Array.isArray(result.signature_link_details)) {
      const signatureLinks = [];

      for (const link of result.signature_link_details) {
        signatureLinks.push(
          await decryptStringByChar(link)
        );
      }

      result.signature_link_details = signatureLinks;
    }

    return result;

  } catch (err) {
    throw err;
  }
};

/**
 * User List
 */
exports.list = async (data) => {
  try {
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

    for (const user of result.rows) {

      /* ---------- Basic Fields ---------- */

      user.prefix = user.prefix
        ? await decryptStringByChar(user.prefix)
        : "";

      user.first_name = user.first_name
        ? await decryptStringByChar(user.first_name)
        : "";

      user.middle_name = user.middle_name
        ? await decryptStringByChar(user.middle_name)
        : "";

      user.last_name = user.last_name
        ? await decryptStringByChar(user.last_name)
        : "";

      user.full_name = user.full_name
        ? await decryptStringByChar(user.full_name)
        : "";

      user.nick_name = user.nick_name
        ? await decryptStringByChar(user.nick_name)
        : "";

      user.gender = user.gender
        ? await decryptStringByChar(user.gender)
        : "";

      user.user_name = user.user_name
        ? await decryptStringByChar(user.user_name)
        : "";

      /* ---------- Phone ---------- */

      if (Array.isArray(user.phone_details)) {
        for (const phone of user.phone_details) {
          phone.phone_no = phone.phone_no
            ? await decryptStringByChar(phone.phone_no)
            : "";
        }
      }

      /* ---------- Email ---------- */

      if (Array.isArray(user.email_details)) {
        for (const email of user.email_details) {
          email.email_id = email.email_id
            ? await decryptStringByChar(email.email_id)
            : "";
        }
      }

      /* ---------- Profile Images ---------- */

      if (Array.isArray(user.profile_image_link_details)) {
        for (let i = 0; i < user.profile_image_link_details.length; i++) {
          user.profile_image_link_details[i] =
            await decryptStringByChar(
              user.profile_image_link_details[i]
            );
        }
      }

      /* ---------- Signature Images ---------- */

      if (Array.isArray(user.signature_link_details)) {
        for (let i = 0; i < user.signature_link_details.length; i++) {
          user.signature_link_details[i] =
            await decryptStringByChar(
              user.signature_link_details[i]
            );
        }
      }
    }

    return result;

  } catch (err) {
    throw err;
  }
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
  const result = await repository.search(data.search);

  for (const user of result) {

    user.prefix = user.prefix
      ? await decryptStringByChar(user.prefix)
      : "";

    user.first_name = user.first_name
      ? await decryptStringByChar(user.first_name)
      : "";

    user.middle_name = user.middle_name
      ? await decryptStringByChar(user.middle_name)
      : "";

    user.last_name = user.last_name
      ? await decryptStringByChar(user.last_name)
      : "";

    user.full_name = user.full_name
      ? await decryptStringByChar(user.full_name)
      : "";

    user.nick_name = user.nick_name
      ? await decryptStringByChar(user.nick_name)
      : "";

    user.gender = user.gender
      ? await decryptStringByChar(user.gender)
      : "";

    user.user_name = user.user_name
      ? await decryptStringByChar(user.user_name)
      : "";

    if (Array.isArray(user.phone_details)) {
      for (const phone of user.phone_details) {
        if (phone.phone_no) {
          phone.phone_no = await decryptStringByChar(
            phone.phone_no
          );
        }
      }
    }

    if (Array.isArray(user.email_details)) {
      for (const email of user.email_details) {
        if (email.email_id) {
          email.email_id = await decryptStringByChar(
            email.email_id
          );
        }
      }
    }

    if (Array.isArray(user.profile_image_link_details)) {
      user.profile_image_link_details =
        await Promise.all(
          user.profile_image_link_details.map(link =>
            decryptStringByChar(link)
          )
        );
    }

    if (Array.isArray(user.signature_link_details)) {
      user.signature_link_details =
        await Promise.all(
          user.signature_link_details.map(link =>
            decryptStringByChar(link)
          )
        );
    }
  }

  return result;
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