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
        const limit = parseInt(req.query.limit) || 10;
        const sortDirection = req.order == 'asc' ? 1 : -1;
        const posts = await post.find({
            ...(req.query.userId && { userId: req.query.userId}),
            ...(req.query.category && { category: req.query.category}),
            ...(req.query.slug && { slug: req.query.slug}),
            ...(req.query.postId && { _id: req.query.postId}),
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
        

        const lastMonthPosts = await post.countDocuments({ createdAt: { $gte: oneMonthAgo } });
        let show = false;
        if (posts.length > 9){
            show = true;
        };

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
            show
        });
    } catch (err) {
        console.log(err)
        next(err);
    }
}


export const deleteposts = async (req, res, next) => {
    if ( !req.user.isAdmin && req.user.Id != req.params.userId ) {
        return next(errorHandler(403, 'You are not allowed to delete this post'));
    };
    try {
        await post.findByIdAndDelete(req.params.postId);
        res.status(200).json("Post has been deleted")
    } catch (err) {
        next(err);
    };
}


export const updatepost = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.Id != req.params.userId) {
        return next(errorHandler(403, 'you are not allowed to update this post'));
    };
    try {
        console.log(req.user.isAdmin)
        const updatedPost = await post.findByIdAndUpdate(req.params.postId,
                                                        {
                                                            $set: {
                                                                title: req.body.title,
                                                                content: req.body.content,
                                                                category: req.body.category,
                                                                image: req.body.image,
                                                            }
                                                        }, { new: true });
        console.log(updatedPost);
        res.status(200).json(updatedPost);
    } catch (err) {
        next(err);
    };
}