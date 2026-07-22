const express = require("express")
const {
    handleCreateNewUser,
    handleGetAlUsers,
    handleDeleteUserById,
    handleUpdateUserById,
    handleGetUserById
} = require("../controllers/user")

const router = express.Router()

// 1. REST API points
router.route("/").get(handleGetAlUsers).post(handleCreateNewUser)

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router;