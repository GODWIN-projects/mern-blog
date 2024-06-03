import jwt from 'jsonwebtoken';
const { verify } = jwt;
import { errorHandler } from "./error.js";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    
    if (!token) {
        console.log('ttttt')
        return(next(errorHandler(401,'Unauthorized')));
    };
    verify(token,process.env.JWT_SECRET, (err,user) => {
        if (err) {
            console.log(err)
            return(next(errorHandler(401,'unauthorized')));
        }
        req.user = user;
        next();
    });
};