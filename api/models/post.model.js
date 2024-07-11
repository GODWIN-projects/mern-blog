import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.berocket.com%2Fhow-long-should-a-blog-post-be%2F&psig=AOvVaw2vpqTb_rA6rqEw0SFjSD1s&ust=1719639908213000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLCSnobM_YYDFQAAAAAdAAAAABAE",
        },
        category: {
            type: String,
            default: "uncategorized",
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        }
    }, {timestamps: true}
);

const post = mongoose.model('Post', postSchema);
export default post;