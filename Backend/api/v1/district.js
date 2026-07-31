const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const {
  add,
  getById,
  list,
  delete: deleteDistrict,
  changeStatus,
  search,
} = require("../../internal/api/district");


router.post("/6019453620013501969001C37BQ1452698", add);
router.post("/6020453620013502069001C37BQ1452701", getById);
router.post("/6021453620013502169001C37BQ1452701", list);
router.post("/6022453620013502269001C37BQ1452701", deleteDistrict);
router.post("/6023453620013502369001C37BQ1452701", changeStatus);
router.post("/6024453620013502469001C37BQ1452701", search);

module.exports = router;