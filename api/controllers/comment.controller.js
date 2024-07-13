import comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async(req, res, next) => {
    try{
        const { content, postId, userId } = req.body;
        if (userId !== req.user.Id) {
            return next(errorHandler(403,"Unauthorized"));
        };
        console.log(content,postId)
        const newComment = new comment(
           {content,
            postId,
            userId,
        }); 
        await newComment.save();

        res.status(200).json(newComment);
    } catch (err) {
        next(err);
    };
}