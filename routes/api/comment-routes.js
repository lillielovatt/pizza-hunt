const router = require("express").Router();
const {
    addComment,
    removeComment,
} = require("../../controllers/comment-controller");

// POST a comment
router.route("/:pizzaId").post(addComment);

// DELETE a comment
router.route("/:pizzaId/:commentId").delete(removeComment);
//need 2 parameters to delete a comment becasue after deleting a specific comment, you need to know which pizza it was assoc with

module.exports = router;
