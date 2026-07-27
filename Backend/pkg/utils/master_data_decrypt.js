const service = require("../../internal/service/ov285561012844_service");
const { decryptStringByChar } = require('../utils/encrypt_decrypt');


async function decryptMasterData(url_code) {
  try {
    const filters = { "url_code": url_code, "status": "Active" };

    const FUNCTION_NAME = "OV882697795291023792281";
    const FUNCTION_NAME_ONE = "OV579832210211022651987";
    const COLLECTION_NAME = "master_data";
    const page = 1;
    const limit = 100;
    if (typeof service[FUNCTION_NAME] !== "function") {
      throw new Error(`Service function '${FUNCTION_NAME}' not found`);
    }
    const  result  = await service[FUNCTION_NAME](
      filters,
      FUNCTION_NAME_ONE,
      COLLECTION_NAME,
      page,
      limit
    );

    const function_name = "OV882697795291033791283";
    const function_name_one = "OV579832210211022651987";
    const finalResult = await service[function_name](
      result.result,
      function_name_one,
      COLLECTION_NAME,
    );   
  
    return finalResult || { result: [], totalRecords: 0 }; 
  } catch (err) {
    console.error("decryptMasterData ERROR:", err.message);
    return { result: [], totalRecords: 0 };
  }
}


 async function decrypted_master_data(data = []) {
  if (!Array.isArray(data)) {
    throw new Error("decrypted_master_data expects an array");
  }

  
return await Promise.all(data.map(async record => ({
  _id: record._id,
  function_name: await decryptStringByChar(record.function_name),
  function_name_one: await decryptStringByChar(record.function_name_one),
  collection_name: await decryptStringByChar(record.collection_name),
  url_code: await decryptStringByChar(record.url_code),
  status: await decryptStringByChar(record.status),
  __v: record.__v,
  created_date_time: record.created_date_time
})));
}

module.exports = {
  decryptMasterData,
  decrypted_master_data
};
