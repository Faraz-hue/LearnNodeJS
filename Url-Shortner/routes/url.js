const express = require("express")
const { handleGenerateNewShortUrl, getHandleAnalytics } = require("../controllers/url")
const router = express.Router()

router.post("/", handleGenerateNewShortUrl)
router.get("/analytics/:shortId", getHandleAnalytics)

module.exports = router;
