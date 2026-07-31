const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const {
  add,
  getById,
  list,
  delete: deleteState,
  changeStatus,
  search,
} = require("../../internal/api/state");


router.post("/6013453620013501369001C37BQ1452698", upload.any(), add);
router.post("/6014453620013501469001C37BQ1452701", getById);
router.post("/6015453620013501569001C37BQ1452701", list);
router.post("/6016453620013501669001C37BQ1452701", deleteState);
router.post("/6017453620013501769001C37BQ1452701", changeStatus);
router.post("/6018453620013501869001C37BQ1452701", search);

module.exports = router;