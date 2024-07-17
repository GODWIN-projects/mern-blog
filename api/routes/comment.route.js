import express from "express";
import { createComment, deleteComment, editComment, getAllComments, getcomments, likecomment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.post("/create", verifyToken, createComment);
router.get("/getcomments/:postId", getcomments);
router.put("/likecomment/:commentId", verifyToken, likecomment);
router.put("/editcomment/:commentId", verifyToken, editComment);
router.delete("/delete/:commentId", verifyToken, deleteComment);
router.get("/getallcomments", verifyToken, getAllComments);

export default router;