const router = require("express").Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply,
} = require("../../controllers/comment-controller");

//remember, cb function of a route method has req and res as parameters, so we don't have to explicitly pass any arguments to add function

// POST a comment
router.route("/:pizzaId").post(addComment);

// DELETE a comment
router.route("/:pizzaId/:commentId").delete(removeComment).put(addReply);
//need 2 parameters to delete a comment because after deleting a specific comment, you need to know which pizza it was assoc with
// put route for adding a reply because we are NOT creating a new reply resource, just updating existing comment resource

// DELETE a reply
router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);
//"Go to this pizza, then look at this particular comment, then delete this one reply."

module.exports = router;
