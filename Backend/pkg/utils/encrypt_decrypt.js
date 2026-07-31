
const crypto = require('crypto');

function encryptChar(ch) {
  const normalizedCh = ch.toUpperCase(); 
  
  const iv = crypto.createHmac('sha256', process.env.ENCRYPTION_KEY)
    .update(normalizedCh)
    .digest()
    .slice(0, 16);
    
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let enc = cipher.update(normalizedCh, 'utf8', 'hex');
  enc += cipher.final('hex');
  
  return iv.toString('hex') + enc; 
}

function decryptChar(hexToken) {
  const iv = Buffer.from(hexToken.slice(0, 32), 'hex');
  const encryptedData = hexToken.slice(32);
  
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let dec = decipher.update(encryptedData, 'hex', 'utf8');
  dec += decipher.final('utf8');
  
  return dec; 
}

async function encryptStringByChar(text) {
  let result = '';
  for (const ch of text) {
    const enc = encryptChar(ch); 
    if (/[A-Z]/.test(ch)) {
      result += '01' + enc + ' '; 
    } else if (/[a-z]/.test(ch)) {
      result += '00' + enc + ' '; 
    } else {
      result += '02' + enc + ' '; 
    }
  }
  return result.trim();
}

async function decryptStringByChar(encryptedText) {
  const parts = encryptedText.split(' ');
  let result = '';
  for (const part of parts) {
    const marker = part.substring(0, 2);
    const hexToken = part.substring(2);
    const ch = decryptChar(hexToken); 
    if (marker === '00') {
      result += ch.toLowerCase(); 
    } else if (marker === '01') {
      result += ch.toUpperCase(); 
    } else {
      result += ch; 
    }
  }
  return result;
}

async function buildSearchQuery(field, text) {
  const normalizedText = text.toUpperCase();

  let pattern = "";

  for (let i = 0; i < normalizedText.length; i++) {
    const ch = normalizedText[i];
    const enc = encryptChar(ch);

    pattern += `(01|00|02)${enc}`;

    if (i < normalizedText.length - 1) {
      pattern += " ";
    }
  }

  return {
    [field]: {
      $regex: pattern
    }
  };
}

async function encryptFields(obj, fields) {
  const result = { ...obj };
  for (const field of fields) {
    if (result[field] !== undefined && result[field] !== null && result[field] !== '') {
      result[field] = await encryptStringByChar(String(result[field]));
    }
  }
  return result;
}

async function decryptFields(obj, fields) {
  if (!obj) return obj;
  const plainObj = obj.toObject ? obj.toObject() : obj;
  const result = { ...plainObj };
  for (const field of fields) {
    if (result[field]) {
      try {
        result[field] = await decryptStringByChar(result[field]);
      } catch {
        // leave as-is if it can't be decrypted
      }
    }
  }
  return result;
}

async function decryptObject(obj, skipFields = ['_id', 'selected_date_time', 'created_date_time', '__v', 'createdAt', 'updatedAt']) {
  if (!obj) return null;
  const plainObj = obj.toObject ? obj.toObject() : obj;
  const result = {};
  for (const key of Object.keys(plainObj)) {
    if (skipFields.includes(key)) {
      result[key] = plainObj[key];
    } else if (typeof plainObj[key] === 'string') {
      try {
        result[key] = await decryptStringByChar(plainObj[key]);
      } catch {
        result[key] = plainObj[key];
      }
    } else {
      result[key] = plainObj[key];
    }
  }
  return result;
}

module.exports = {
  encryptChar,
  decryptChar,
  encryptStringByChar,
  decryptStringByChar,
  buildSearchQuery,
  decryptObject,
  encryptFields,
  decryptFields, 
};