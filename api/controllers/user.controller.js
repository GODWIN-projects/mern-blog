import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req,res) =>{
    res.json({message: 'APi testing'});
};

export const updateUser = async (req,res,next) => {
    if (req.user.Id !== req.params.userId) {
        return next(errorHandler(403,'You are not allowed to update this user'));
    };
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be atleast 6 characters'));
        };
        console.log('passs')
        req.body.password = bcryptjs.hashSync(req.body.password,10);
        console.log(req.body.password)
    };
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400,'username must be between 7 and 20 characters'));
        };
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400,'username cannot contain spaces'));
        };
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400,'username must only contain letters and numbers'));
        };
    };
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                photoURL: req.body.photoURL
            }
        }, {new: true});
        const { password: pass, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (err) {
        next(err);
    };
    
}

export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.Id !== req.params.userId) {
        return next(errorHandler(403, 'You are not alloed to delete this'));
    };
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('user deleted successfully')
    } catch (err) {
        next(err);
    };
}

export const signOut = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out');
    } catch (err) {
        next(err);
    }
}


export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "Unauthorized"));
    };
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const sortDirection = req.query.sortDirection == 'asc' ? 1 : -1;
        
        const users = await User.find()
        .sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);

        const userWithoutPass = users.map((user) => {
            const { password, ...rest} = user._doc;
            return rest;
        })

        const totalUsers = await User.countDocuments();

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        oneMonthAgo.setHours(0, 0, 0, 0);

        const lastMonthUsers = await User.countDocuments({createdAt: {$gte: oneMonthAgo}});

        const show = false;
        if (users.length > 9) {
            show = true;
        };

        res.status(200).json(
          { users: userWithoutPass,
            totalUsers,
            lastMonthUsers,
            show
        })
    } catch (err) {
        next(err);
    }
}


export const getUser = async(req, res, next) => {
    try{
        const user = await User.findById(req.params.userId);

        if (!user) {
            return next(errorHandler(403,"User not found"));
        };
        
        const { password, ...rest} = user._doc;
        
        res.status(200).json(rest);

    } catch (err) {
        next(err);
    }
}