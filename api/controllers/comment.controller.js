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


export const likecomment = async (req, res, next) => {
    try {
        const Comment = await comment.findById(req.params.commentId);
        if (!Comment) {
            return next(errorHandler(403,"Comment does not exist"));
        };
        const userIndex = Comment.likes.indexOf(req.user.Id);
        
        if (userIndex === -1) {
            Comment.likes.push(req.user.Id);
            Comment.numberOfLikes += 1;
        } else {
            Comment.likes.splice(userIndex,1);
            Comment.numberOfLikes -= 1;
        }

        await Comment.save();

        res.status(200).json(Comment);
    } catch(err) {
        next(err);
    }
}


export const editComment = async(req, res, next) => {
    try {
        const Comment = await comment.findById(req.params.commentId);
        if (!comment) {
            return next(errorHandler(404,"Comment not found"));
        };
        if (Comment.userId !== req.user.Id) {
            return next(errorHandler(403,"You are not allowed to edit this comment"));
        };
        const newComment = await comment.findByIdAndUpdate(req.params.commentId,
            {
                content: req.body.content
            }, {new: true});

        res.status(200).json(newComment);
    } catch(err) {
        next(err);
    }
}


export const deleteComment = async(req, res, next) => {
    try {
        const Comment = await comment.findById(req.params.commentId);
        if (!Comment) {
            return next(errorHandler(404, "Comment not found"));
        };
        if (!req.user.isAdmin && Comment.userId !== req.user.Id) {
            return next(errorHandler(403,"You are not allowed to delete this comment"));
        };
        await comment.findByIdAndDelete(req.params.commentId);

        res.status(200).json("Comment has been deleted");
    } catch (err) {
        next(err);
    }
}