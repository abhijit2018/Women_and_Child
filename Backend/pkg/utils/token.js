// const crypto = require("crypto");

// const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours 

// function generateToken(collection, _id) {
//   const payload = JSON.stringify({
//     c: collection,
//     i: _id.toString(),
//     exp: Date.now() + TOKEN_TTL_MS,
//   });

//   const iv = crypto.randomBytes(12); 
//   const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
//   const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

//   let enc = cipher.update(payload, "utf8", "hex");
//   enc += cipher.final("hex");
//   const authTag = cipher.getAuthTag();

//   // iv + authTag + ciphertext, all concatenated as hex
//   return iv.toString("hex") + authTag.toString("hex") + enc;
// }

// function decodeToken(token) {
//   try {
//     const iv = Buffer.from(token.slice(0, 24), "hex");        
//     const authTag = Buffer.from(token.slice(24, 56), "hex");   
//     const encryptedData = token.slice(56);

//     const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
//     const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
//     decipher.setAuthTag(authTag);

//     let dec = decipher.update(encryptedData, "hex", "utf8");
//     dec += decipher.final("utf8");

//     const payload = JSON.parse(dec);

//     if (payload.exp && Date.now() > payload.exp) {
//       throw new Error("Token expired.");
//     }

//     return payload;
//   } catch (err) {
//     if (err.message === "Token expired.") throw err;
//     throw new Error("Invalid or expired token.");
//   }
// }

// module.exports = { generateToken, decodeToken };


const crypto = require("crypto");

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function generateToken(payload) {
  const fullPayload = JSON.stringify({
    ...payload,
    exp: Date.now() + TOKEN_TTL_MS,
  });

  const iv = crypto.randomBytes(12);
  const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let enc = cipher.update(fullPayload, "utf8", "hex");
  enc += cipher.final("hex");
  const authTag = cipher.getAuthTag();

  return iv.toString("hex") + authTag.toString("hex") + enc;
}

function decodeToken(token) {
  try {
    const iv = Buffer.from(token.slice(0, 24), "hex");
    const authTag = Buffer.from(token.slice(24, 56), "hex");
    const encryptedData = token.slice(56);

    const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    let dec = decipher.update(encryptedData, "hex", "utf8");
    dec += decipher.final("utf8");

    const payload = JSON.parse(dec);
    if (payload.exp && Date.now() > payload.exp) {
      throw new Error("Token expired.");
    }
    return payload;
  } catch (err) {
    if (err.message === "Token expired.") throw err;
    throw new Error("Invalid or expired token.");
  }
}

module.exports = { generateToken, decodeToken };