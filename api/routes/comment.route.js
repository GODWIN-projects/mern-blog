import express from "express";
import { createComment, editComment, getcomments, likecomment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.post("/create", verifyToken, createComment);
router.get("/getcomments/:postId", getcomments);
router.put("/likecomment/:commentId", verifyToken, likecomment);
router.put("/editcomment/:commentId", verifyToken, editComment);

export default router;