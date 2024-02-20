const express = require("express");
const {
  handleGetAllUrls,
  handleAddNewUrl,
  handleGetUrlById,
  handleUpdateUrlById,
  handleDeleteUrlById
} = require("../controllers/urlController")
const router = express.Router();

router
.route('/')
.get(handleGetAllUrls)
.post(handleAddNewUrl)

router
.route('/:shortId')
.get(handleGetUrlById)
.patch(handleUpdateUrlById)
.delete(handleDeleteUrlById)


module.exports = router;