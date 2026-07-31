const { decodeToken } = require("../../pkg/utils/token");
const { decryptFields } = require("../../pkg/utils/encrypt_decrypt");
const { getDynamicModel } = require("../../pkg/utils/project_model");
const registry = require("../../pkg/registry/masterDataRegistry");

/**
 * Works for ANY module registered in masterDataRegistry.js.
 * Pass a token from any module's "add" response, get the decrypted record back.
 */
exports.resolve = async (data) => {
  if (!data.token) throw new Error("Token is required.");

  const { c: collection, i: _id } = decodeToken(data.token);

  const entry = registry[collection];
  if (!entry) throw new Error("Unknown data source for this token.");

  const Model = getDynamicModel(collection, entry.schema);
  const doc = await Model.findById(_id).lean();
  if (!doc) throw new Error("Record not found.");

  return await decryptFields(doc, entry.encryptedFields);
};