import comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async(req, res, next) => {
    try{
        const { content, postId, userId } = req.body;
        if (userId !== req.user.Id) {
            return next(errorHandler(403,"Unauthorized"));
        };
        
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

export const getcomments = async(req, res, next) => {
    try{
        const comments = await comment.find({ postId: req.params.postId })
            .sort({ createdAt: -1 });

        res.status(200).json(comments);

    } catch(err) {
        next(err);
    };
}