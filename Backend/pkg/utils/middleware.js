const UAParser = require("ua-parser-js");

const captureRequestInfo = (req, res, next) => {
  const ip_address =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket.remoteAddress ||
    req.ip;

  const userAgentString = req.headers["user-agent"] || "";
  const parser = new UAParser(userAgentString);
  const uaResult = parser.getResult();

req.requestInfo = {
  ip_address,
  user_agent: userAgentString,
  device_type:
    uaResult.device.type ||
    (uaResult.device.vendor || uaResult.device.model ? "Mobile" : "Desktop"),
  os: uaResult.os.name || "Unknown",
  browser: uaResult.browser.name || "Unknown",
};
console.log("requestInfo set:", req.requestInfo);
  next();
};

module.exports = captureRequestInfo;