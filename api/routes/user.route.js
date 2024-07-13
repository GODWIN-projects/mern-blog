import express from "express";
import { getUser, getUsers, test } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser } from "../controllers/user.controller.js";
import { signOut } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signOut);
router.get('/getusers', verifyToken, getUsers);
router.get("/:userId", getUser)

export default router;