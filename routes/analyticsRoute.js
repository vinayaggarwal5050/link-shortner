const express = require("express");
const {
  handleGetAllAnalytics,
  handleAddNewAnalytics,
  handleGetAnalyticsById,
  handleUpdateAnalyticsById,
  handleDeleteAnalyticsById
} = require("../controllers/analyticsController");
const router = express.Router();

router
.route('/')
.get(handleGetAllAnalytics)
.post(handleAddNewAnalytics)


router
.route('/:shortId')
.get(handleGetAnalyticsById)
.patch(handleUpdateAnalyticsById)
.delete(handleDeleteAnalyticsById)

module.exports = router;