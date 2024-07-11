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
    };
};

export const getposts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.order == 'asc' ? 1 : -1;
        const posts = await post.find({
            ...(req.query.userId && { userId: req.query.userId}),
            ...(req.query.category && { category: req.query.category}),
            ...(req.query.slug && { slug: req.query.slug}),
            ...(req.query.postId && { postId: req.query.postId}),
            ...(req.query.searchTerm && {
                $or: [
                    { title: {$regex: req.query.searchTerm, $options: 'i'}},
                    { content: {$regex: req.query.searchTerm, $options:'i'}},
                ]
            })
        }).sort({ updateAt: sortDirection }).skip(startIndex).limit(limit);

        const totalPosts = await post.countDocuments();

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        oneMonthAgo.setHours(0, 0 ,0, 0);
        console.log(oneMonthAgo)

        const lastMonthPosts = await post.countDocuments({ createdAt: { $gte: oneMonthAgo } });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        });
    } catch (err) {
        console.log(err)
        next(err);
    }
}