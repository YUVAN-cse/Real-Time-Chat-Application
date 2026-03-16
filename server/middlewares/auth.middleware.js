import User from "../models/user.models.js";
import AppError from "../utils/AppError.js";
import WrapAsync from "../utils/WrapAsync.js";
import jwt, { decode } from "jsonwebtoken";


let verifyJWT = WrapAsync(async (req, res, next) => {
    const accessToken = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!accessToken || typeof accessToken !== 'string') {
        return next(new AppError(401, "Unauthorized"));
    }

    let decoded;
    try {
        decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    } catch (error) {
        return next(new AppError(401, "Invalid or expired token"));
    }
  

    if (!decoded) {
        return next(new AppError(401, "Unauthorized"));
    }

    const user = await User.findById(decoded.id).select("-password -refreshToken");
    if (!user) {
        return next(new AppError(401, "Unauthorized"));
    }

    req.user = user;
    next();
})

export default verifyJWT;