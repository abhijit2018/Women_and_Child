const mongoose = require("mongoose");
const { getDynamicModel } = require("../utils/project_model");

/**
 * Add / Update Document
 */
exports.add = async (data, collection_name, dataSchema) => {
    const Model = getDynamicModel(collection_name, dataSchema);

    let document;

    if (data._id) {

        const id = data._id;
        delete data._id;

        document = await Model.findByIdAndUpdate(
            id,
            {
                $set: data
            },
            {
                new: true,
                runValidators: true
            }
        );

    } else {

        document = await Model.create(data);

    }

    return document;
};

/**
 * Find By Id
 */
exports.findById = async (_id, collection_name, dataSchema, populate = []) => {

    const Model = getDynamicModel(collection_name, dataSchema);

    let query = Model.findById(_id);

    populate.forEach(item => {
        query = query.populate(item);
    });

    return await query.lean();
};

/**
 * Find One
 */
exports.findOne = async (filter, collection_name, dataSchema) => {

    const Model = getDynamicModel(collection_name, dataSchema);

    return await Model.findOne(filter);

};   


exports.find = async (
    filter,
    collection_name,
    dataSchema,
    projection = {},
    sort = {}
) => {

    const Model = getDynamicModel(collection_name, dataSchema);

    return await Model.find(filter)
        .select(projection)
        .sort(sort)
        .lean();

};

/**
 * List
 */
exports.list = async (
    filter,
    page,
    limit,
    collection_name,
    dataSchema,
    sort = { created_date_time: -1 }
) => {

    const Model = getDynamicModel(collection_name, dataSchema);

    const total_records = await Model.countDocuments(filter);

    const rows = await Model.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    return {
        total_records,
        total_pages: Math.ceil(total_records / limit),
        current_page: page,
        page_size: limit,
        rows
    };

};

/**
 * Update
 */
exports.update = async (
    _id,
    data,
    collection_name,
    dataSchema
) => {

    const Model = getDynamicModel(collection_name, dataSchema);

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
 * Delete
 */
exports.delete = async (
    _id,
    collection_name,
    dataSchema
) => {

    const Model = getDynamicModel(collection_name, dataSchema);

    return await Model.findByIdAndDelete(_id);

};

/**
 * Exists
 */
exports.exists = async (
    _id,
    collection_name,
    dataSchema
) => {

    const Model = getDynamicModel(collection_name, dataSchema);

    return await Model.exists({
        _id: new mongoose.Types.ObjectId(_id)
    });

};

/**
 * Count
 */
exports.count = async (
    filter,
    collection_name,
    dataSchema
) => {

    const Model = getDynamicModel(collection_name, dataSchema);

    return await Model.countDocuments(filter);

};

/**
 * Aggregate
 */
exports.aggregate = async (
    pipeline,
    collection_name,
    dataSchema
) => {

    const Model = getDynamicModel(collection_name, dataSchema);

    return await Model.aggregate(pipeline);

};

/**
 * Insert Many
 */
exports.insertMany = async (
    data,
    collection_name,
    dataSchema
) => {

    const Model = getDynamicModel(collection_name, dataSchema);

    return await Model.insertMany(data);

};

/**
 * Delete Many
 */
exports.deleteMany = async (
    filter,
    collection_name,
    dataSchema
) => {

    const Model = getDynamicModel(collection_name, dataSchema);

    return await Model.deleteMany(filter);

};