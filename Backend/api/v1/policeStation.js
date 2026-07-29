const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const {
  add,
  getById,
  list,
  delete: deletePoliceStation,
  changeStatus,
  search,
} = require("../../internal/api/policeStation");


router.post("/6025453620013502569001C37BQ1452698", upload.any(), add);
router.post("/6026453620013502669001C37BQ1452701", getById);
router.post("/6027453620013502769001C37BQ1452701", list);
router.post("/6028453620013502869001C37BQ1452701", deletePoliceStation);
router.post("/6029453620013502969001C37BQ1452701", changeStatus);
router.post("/6030453620013503069001C37BQ1452701", search);

module.exports = router;