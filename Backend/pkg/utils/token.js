const crypto = require("crypto");

function generateToken(collection, _id) {
  const payload = JSON.stringify({ c: collection, i: _id.toString() });

  const iv = crypto.randomBytes(16);
  const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let enc = cipher.update(payload, "utf8", "hex");
  enc += cipher.final("hex");

  return iv.toString("hex") + enc;
}

function decodeToken(token) {
  try {
    const iv = Buffer.from(token.slice(0, 32), "hex");
    const encryptedData = token.slice(32);
    const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let dec = decipher.update(encryptedData, "hex", "utf8");
    dec += decipher.final("utf8");
    return JSON.parse(dec);
  } catch {
    throw new Error("Invalid or expired token.");
  }
}

module.exports = { generateToken, decodeToken };