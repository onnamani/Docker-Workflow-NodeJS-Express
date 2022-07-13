const express = require("express");
const postController = require("../controllers/postController");
const authorize = require("../middleware/authMiddleware");

const router = express.Router();

router
    .route("/")
    .get(postController.getAllPosts)
    .post(authorize, postController.createPost);

router
    .route("/:id")
    .get(postController.getOnePost)
    .patch(authorize, postController.updatePost)
    .delete(authorize, postController.deletePost);

module.exports = router;