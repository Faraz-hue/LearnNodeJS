const mongoose = require("mongoose")

// 1. Define Schema
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    visitHistory: [{ timestamp: { type: Number } }],
}, { timestamps: true })

// 2. Create model
const URL = mongoose.model("url", urlSchema)

module.exports = URL;