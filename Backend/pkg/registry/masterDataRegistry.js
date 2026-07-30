const { districtSchema } = require("../../internal/model/district");

module.exports = {
  district: {
    schema: districtSchema,
    encryptedFields: ["district_id", "district_name", "status"],
  },

  // When you build the next module, just add an entry here. Example:
  // state: {
  //   schema: stateSchema,
  //   encryptedFields: ["state_id", "state_name"],
  // },
};