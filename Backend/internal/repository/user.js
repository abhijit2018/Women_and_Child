const mongoose = require("mongoose");
const { add } = require("../../pkg/utils/common");
const { getDynamicModel } = require("../../pkg/utils/project_model");
const { userDataSchema } = require("../model/user");
const { buildSearchQuery } = require('../../pkg/utils/encrypt_decrypt');

const COLLECTION_NAME = "user";

/**
 * Get User Model
 */
const UserModel = () => {
    return getDynamicModel(COLLECTION_NAME, userDataSchema);
};

/**
 * Add / Update User
 */
exports.addUser = async (data) => {
    return await add(data, COLLECTION_NAME, userDataSchema);
};

/**
 * Find User By Id
 */
exports.findById = async (_id) => {
    const Model = UserModel();

    return await Model.findById(_id)
        .populate("present_address_id")
        .populate("permanent_address_id")
        .lean();
};

/**
 * Find User By Username
 */
exports.findByUserName = async (user_name) => {
    const Model = UserModel();

    return await Model.findOne({
        user_name: buildSearchQuery(user_name)
    }).lean();
};

/**
 * Find User By Phone Number
 */
exports.findByPhone = async (phone_no) => {
    const Model = UserModel();

    return await Model.findOne({
        "phone_details.phone_no": buildSearchQuery(phone_no)
    }).lean();
};

/**
 * Find User By Email
 */
exports.findByEmail = async (email_id) => {
    const Model = UserModel();

    return await Model.findOne({
        "email_details.email_id": buildSearchQuery(email_id)
    }).lean();
};

/**
 * User List
 */
exports.list = async (
    page = 1,
    limit = 10,
    search = "",
    status = ""
) => {

    const Model = UserModel();

    const filter = {};

    if (search) {
    filter.$or = [
        {
            first_name: buildSearchQuery(search)
        },
        {
            last_name: buildSearchQuery(search)
        },
        {
            full_name: buildSearchQuery(search)
        },
        {
            user_name: buildSearchQuery(search)
        },
        {
            "phone_details.phone_no": buildSearchQuery(search)
        },
        {
            "email_details.email_id": buildSearchQuery(search)
        }
    ];
    }

    if (status) {
        filter.status = status;
    }

    const total = await Model.countDocuments(filter);

    const rows = await Model.find(filter)
        .sort({
            created_date_time: -1
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    return {
        total_records: total,
        page: page,
        limit: limit,
        total_pages: Math.ceil(total / limit),
        rows
    };
};

/**
 * Update User
 */
exports.update = async (_id, data) => {

    const Model = UserModel();

    return await Model.findByIdAndUpdate(
        _id,
        {
            $set: data
        },
        {
            new: true,
            runValidators: true
        }
    );
};

/**
 * Delete User
 */
exports.delete = async (_id) => {

    const Model = UserModel();

    return await Model.findByIdAndDelete(_id);
};

/**
 * Change User Status
 */
exports.changeStatus = async (_id, status) => {

    const Model = UserModel();

    return await Model.findByIdAndUpdate(
        _id,
        {
            status,
            updated_date_time: new Date()
        },
        {
            new: true
        }
    );
};

/**
 * Check User Exists
 */
exports.exists = async (_id) => {

    const Model = UserModel();

    return await Model.exists({
        _id: new mongoose.Types.ObjectId(_id)
    });
};

/**
 * Total Users
 */
exports.totalUsers = async () => {

    const Model = UserModel();

    return await Model.countDocuments();
};

/**
 * Active Users
 */
exports.activeUsers = async () => {

    const Model = UserModel();

    return await Model.countDocuments({
        status: "Active"
    });
};

/**
 * Inactive Users
 */
exports.inactiveUsers = async () => {

    const Model = UserModel();

    return await Model.countDocuments({
        status: "Inactive"
    });
};

exports.search = async (search, status = "") => {
    const Model = UserModel();

    const filter = {};

    if (search) {
        filter.$or = [
            { first_name: buildSearchQuery(search) },
            { last_name: buildSearchQuery(search) },
            { full_name: buildSearchQuery(search) },
            { user_name: buildSearchQuery(search) },
            { "phone_details.phone_no": buildSearchQuery(search) },
            { "email_details.email_id": buildSearchQuery(search) }
        ];
    }

    if (status) {
        filter.status = status;
    }

    return await Model.find(filter)
        .sort({ created_date_time: -1 })
        .lean();
};