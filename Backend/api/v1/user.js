const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const {
  add,
  getById,
  list,
  delete: deleteUser,
  changeStatus,
  search
} = require("../../internal/api/user");


router.post(
  "/6001453620013500169001C37BQ1452698",
  upload.any(),  
  add
);


router.post("/6002453620013500269001C37BQ1452698", getById);
router.post("/6003453620013500369001C37BQ1452698", list);
router.post("/6004453620013500469001C37BQ1452698", deleteUser);
router.post("/6005453620013500569001C37BQ1452698", changeStatus);
router.post("/6006453620013500669001C37BQ1452698", search);

module.exports = router;