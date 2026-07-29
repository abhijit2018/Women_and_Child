const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const {
  add,
  getById,
  list,
  delete: deleteTypesOfCrime,
  changeStatus,
  search,
} = require("../../internal/api/typesOfCrime");


router.post("/6007453620013500769001C37BQ1452698", upload.any(), add);
router.post("/6008453620013500869001C37BQ1452701", getById);
router.post("/6009453620013500969001C37BQ1452701", list);
router.post("/6010453620013501069001C37BQ1452701", deleteTypesOfCrime);
router.post("/6011453620013501169001C37BQ1452701", changeStatus);
router.post("/6012453620013501269001C37BQ1452701", search);

module.exports = router;