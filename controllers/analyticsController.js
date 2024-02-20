const UrlDBRef = require("../models/urlModel");

const handleGetAllAnalytics = async (req, res) => {
  return res.status(200).json({status: true, message: "read all analytics"});
}

const handleAddNewAnalytics = async (req, res) => {
  return res.status(201).json({status: true, message: "a new analytics added"});
}

const handleGetAnalyticsById = async (req, res) => {
  const shortId = req.params.shortId;

  const response = await UrlDBRef.findOne({
    shortId: shortId
  })

  return res.status(200).json({
    status: true,
    message: `shortId: ${shortId}, redirectUrl: ${response.redirectUrl}, no of visits: ${response.visitHistory.length}`})
}

const handleUpdateAnalyticsById = async (req, res) => {
  const shortId = req.params.shortId;
  res.status(201).json({status: true, message: `updated analytics of id: ${id}`})
}

const handleDeleteAnalyticsById = async (req, res) => {
  const shortId = req.params.shortId;
  res.status(201).json({status: true, message: `deleted analytics of id: ${id}`})
}

module.exports = {
  handleGetAllAnalytics,
  handleAddNewAnalytics,
  handleGetAnalyticsById,
  handleUpdateAnalyticsById,
  handleDeleteAnalyticsById
}