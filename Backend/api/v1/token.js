const express = require("express");
const router = express.Router();
const { resolve } = require("../../internal/api/token");

router.post("/6030453620013502569001C37BQ1452701", async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Bearer token is required." });
    }

    const token = authHeader.split(" ")[1];

    const result = await resolve({ token });
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;