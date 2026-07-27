const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config/jwt");
const { encryptStringByChar,decryptStringByChar } = require("../../pkg/utils/encrypt_decrypt");

const modelCache = {}; // optional cache (recommended)

const getDynamicModel = (collectionName, schema) => {
  if (!collectionName) {
    throw new Error("collectionName is required");
  }
  if (!schema) {
    throw new Error("schema is required");
  }

  // Return existing model if already compiled
  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName];
  }

  // Create new model dynamically
  return mongoose.model(collectionName, schema, collectionName);
};

const ov37229652 = async (ab) => {
    try {  
        const [token0, token1] = ab.split("@~~@");
        if (!token0 || !token1) {
            return "";
        }   
        const result = jwt.verify(token1, JWT_SECRET);
        const decryptedAction = await decryptStringByChar(result.Action);  
        const [name, no] = decryptedAction.split("~^");        
        if(no == 2279) {
            if(token0 == "UserList" && decryptedAction == "UserList~^2279") {
            return token1;
          }
        } else if(no == 2280) {
          if(token0 == "SectionList" && decryptedAction == "SectionList~^2280") {
            return token1; 
          }
        } else if(no == 2281) {
          if(token0 == "OrganizationList" && decryptedAction == "OrganizationList~^2281") {
            return token1;
          }
        } else if(no == 2282) {
          if(token0 == "RankList" && decryptedAction == "RankList~^2282") {
            return token1;
          }
        } else if(no == 2283) {
          if(token0 == "StateList" && decryptedAction == "StateList~^2283") {
            return token1;
          }
        } else if(no == 2284) {
          if(token0 == "DistrictList" && decryptedAction == "DistrictList~^2284") {
            return token1;
          }
        } else if(no == 2285) {
          if(token0 == "PoliceStationList" && decryptedAction == "PoliceStationList~^2285") {
            return token1;
          }
        } else if(no == 2286) {
          if(token0 == "DesignationList" && decryptedAction == "DesignationList~^2286") {
            return token1;
          }
        } else if(no == 2287) {
          if(token0 == "LoginlogList" && decryptedAction == "LoginlogList~^2287") {
            return token1;
          }
        } else {
          return "";
        }
    } catch (err) {
        console.error("Token verification failed:", err.message);
        return "";
    }
};

module.exports = { getDynamicModel, ov37229652 };

