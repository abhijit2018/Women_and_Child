const { districtSchema } = require("../../internal/model/district");

  module.exports = {
  district: {
    schema: districtSchema,
    label: "District",
    encryptedFields: ["district_id", "district_name", "status"],
    searchableFields: ["district_id", "district_name"],
    // populate: [{ path: "state_id", select: "state_id state_name" }],
  },

  // When you build the next module, just add an entry here. Example:
  // state: {
  //   schema: stateSchema,
  //   encryptedFields: ["state_id", "state_name"],
  // },
};