// const { decodeToken } = require("../../pkg/utils/token");
// const { decryptFields } = require("../../pkg/utils/encrypt_decrypt");
// const { getDynamicModel } = require("../../pkg/utils/project_model");
// const registry = require("../../pkg/registry/masterDataRegistry");

// exports.resolve = async (data) => {
//   if (!data.token) throw new Error("Token is required.");

//   const { c: collection, i: _id } = decodeToken(data.token);

//   const entry = registry[collection];
//   if (!entry) throw new Error("Unknown data source for this token.");

//   const Model = getDynamicModel(collection, entry.schema);

//   let query = Model.findById(_id);
//   if (entry.populate && entry.populate.length) {
//     for (const p of entry.populate) {
//       query = query.populate(p);
//     }
//   }

//   const doc = await query.lean();
//   if (!doc) throw new Error("Record not found.");

//   const decrypted = await decryptFields(doc, entry.encryptedFields);

//   return {
//     message: `${capitalize(collection)} Data Retrieved Successfully.`,
//     data: decrypted,
//   };
// };

// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }


const { decodeToken } = require("../../pkg/utils/token");
const { decryptFields, buildSearchQuery, buildExactQuery } = require("../../pkg/utils/encrypt_decrypt");
const { getDynamicModel } = require("../../pkg/utils/project_model");
const registry = require("../../pkg/registry/masterDataRegistry");

exports.resolve = async (data) => {
  if (!data.token) throw new Error("Token is required.");

  const payload = decodeToken(data.token);
  const entry = registry[payload.c];
  if (!entry) throw new Error("Unknown data source for this token.");

  if (payload.t === "list") {
    return await resolveList(payload, entry);
  }
  return await resolveRecord(payload, entry);
};

async function resolveRecord(payload, entry) {
  const Model = getDynamicModel(payload.c, entry.schema);

  let query = Model.findById(payload.i);
  if (entry.populate) {
    for (const p of entry.populate) query = query.populate(p);
  }

  const doc = await query.lean();
  if (!doc) throw new Error("Record not found.");

  const decrypted = await decryptFields(doc, entry.encryptedFields);

  return {
    message: `${entry.label} Data Retrieved Successfully.`,
    data: decrypted,
  };
}

// async function resolveList(payload, entry) {
//   const Model = getDynamicModel(payload.c, entry.schema);
//   const page = Number(payload.page) || 1;
//   const limit = Number(payload.limit) || 10;
//   const search = payload.search || "";
//   const status = payload.status || "";

//   const filter = {};

//   if (search && entry.searchableFields?.length) {
//     filter.$or = [];
//     for (const field of entry.searchableFields) {
//       filter.$or.push(await buildSearchQuery(field, search));
//     }
//   }

//   if (status) {
//     Object.assign(filter, await buildExactQuery("status", status));
//   }

//   const total = await Model.countDocuments(filter);

//   let query = Model.find(filter)
//     .sort({ created_date_time: -1 })
//     .skip((page - 1) * limit)
//     .limit(limit);

//   if (entry.populate) {
//     for (const p of entry.populate) query = query.populate(p);
//   }

//   const rows = await query.lean();
//   const decryptedRows = await Promise.all(
//     rows.map((row) => decryptFields(row, entry.encryptedFields))
//   );

//   return {
//     message: `${entry.label} List Retrieved Successfully.`,
//     data: {
//       total_records: total,
//       page,
//       limit,
//       total_pages: Math.ceil(total / limit),
//       rows: decryptedRows,
//     },
//   };
// }
async function resolveList(payload, entry) {
  const Model = getDynamicModel(payload.c, entry.schema);
  const page = Number(payload.page) || 1;
  const limit = Number(payload.limit) || 10;
  const status = payload.status || "";
  const filters = payload.filters || {};

  const andConditions = [];

  for (const [field, value] of Object.entries(filters)) {
    if (!value) continue;
    // only allow filtering on fields the module explicitly registered
    if (!entry.searchableFields?.includes(field)) continue;
    andConditions.push(await buildSearchQuery(field, value));
  }

  const filter = {};
  if (andConditions.length) filter.$and = andConditions;
  if (status) Object.assign(filter, await buildExactQuery("status", status));

  const total = await Model.countDocuments(filter);

  let query = Model.find(filter)
    .sort({ created_date_time: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  if (entry.populate) {
    for (const p of entry.populate) query = query.populate(p);
  }

  const rows = await query.lean();
  const decryptedRows = await Promise.all(
    rows.map((row) => decryptFields(row, entry.encryptedFields))
  );

  return {
    message: `${entry.label} List Retrieved Successfully.`,
    data: {
      total_records: total,
      page,
      limit,
      total_pages: Math.ceil(total / limit),
      rows: decryptedRows,
    },
  };
}