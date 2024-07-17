import mongoose from "mongoose";


const commentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        postId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        likes: {
            type: Array,
            default: []
        },
        numberOfLikes: {
            type: Number,
            default: 0
        },
        username: {
            type: String,
            required: true
        }
    }, { timestamps: true }
);

const comment = mongoose.model("Comment", commentSchema)

export default comment;