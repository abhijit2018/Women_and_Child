function sendResponse(res, message, statusCode, success = true, result = null) {
  res.status(200).json({    
    message,
    success,
    statusCode,
    result
  });
}

function sendResult(res, result) {
  return res.status(200).json(result);
}

function jwtTokenResponse(res, token) {
  return res.status(200).json({ token });
}

module.exports = {
  sendResponse,
  jwtTokenResponse,
  sendResult
};
                                                                            