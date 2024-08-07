import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deleteposts, getposts, updatepost } from '../controllers/post.controller.js';

const router = express.Router();

router.post("/createpost", verifyToken, create);
router.get("/getposts", getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deleteposts);
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);

export default router;