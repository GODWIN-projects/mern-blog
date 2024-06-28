import post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Please provide all fields"));
    };
    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, ''); 
    const newPost = new post({
        ...req.body, slug, userId: req.user.Id
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        next(err);
    }
}