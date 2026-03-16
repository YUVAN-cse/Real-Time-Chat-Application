import User from "../models/user.models.js";
import WrapAsync from "../utils/WrapAsync.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadAndDeleteLocal } from "../utils/cloudinary.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";

export const register = WrapAsync(async (req, res, next) => {

    let { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
        return next(new AppError(400, "Missing required fields"));
    }
     let avatar;
    if (req.file) {
        avatar = await uploadAndDeleteLocal(req.file.path);
    }

    
    const user = await User.create({
        username,
        email,
        password,
        avatar: avatar?.secure_url || null,
    });
    
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    let UUser = await User.findOne({ email }).select("-password -refreshToken")

    res.status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        .json(
            new ApiResponse(200, UUser, "Login successful")
        );
});

export const login = WrapAsync(async (req, res, next) => {
    let { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
        return next(new AppError(400, "Missing required fields"));
    }

    let user = await User.findOne({ email });
    if (!user) {
        return next(new AppError(401, "Invalid credentials"));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return next(new AppError(401, "Invalid credentials"));
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    let UUser = await User.findOne({ email }).select("-password -refreshToken")

    res.status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })
        .json(
            new ApiResponse(200, UUser, "Login successful")
        );

});

export const logout = WrapAsync(async (req, res, next) => {
    const user = req.user;

    if (!user) {
        return next(new AppError(401, "Unauthorized"));
    }


    await user.clearRefreshToken();

    res.status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(
            new ApiResponse(200, null, "Logout successful")
        );
});

export const refreshtoken = WrapAsync(async (req, res, next) => {


    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return next(new AppError(401, "Unauthorized"));
    }


    let user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (!user) {
        return next(new AppError(401, "Unauthorized"));
    }

    user = await User.findById(user.id).select("-password -refreshToken");


    const accessToken = await user.generateAccessToken();
    const newRefreshToken = await user.generateRefreshToken();

    res.status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        .cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        .json(
            new ApiResponse(200, user, "Refresh token updated")
        );
});

export const getProfile = WrapAsync(async (req, res, next) => {
    const user = req.user;

    if (!user) {
        return next(new AppError(401, "Unauthorized"));
    }

    res.status(200).json(
        new ApiResponse(200, user, "Profile fetched successfully")
    );
});

export const getProfileOther = WrapAsync(async (req, res, next) => {
    let otherId = req.params.id;

    if(!otherId){
        return next(new AppError(400, "Missing required fields"));
    }

    const user = await User.findById(otherId).select("-password -refreshToken");

    if (!user) {
        return next(new AppError(404, "User not found"));
    }

    res.status(200).json(
        new ApiResponse(200, user, "Profile fetched successfully")
    );
});

export const updateProfile = WrapAsync(async (req, res, next) => {
    const user = req.user;

    if (!user) {
        return next(new AppError(401, "Unauthorized"));
    }

    let { username, email } = req.body;

    if (!username?.trim() || !email?.trim()) {
        return next(new AppError(400, "Missing required fields"));
    }

    user.username = username;
    user.email = email;

    if (req.file) {
        const avatar = await uploadAndDeleteLocal(req.file.path);
        user.avatar = avatar.secure_url;
    }

    await user.save({ validateBeforeSave: false });

    res.status(200).json(
        new ApiResponse(200, user, "Profile updated successfully")
    );
});

export const deleteProfile = WrapAsync(async (req, res, next) => {
    const user = req.user;

    if (!user) {
        return next(new AppError(401, "Unauthorized"));
    }

    await user.deleteOne();



    res.status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(
            new ApiResponse(200, null, "Profile deleted successfully")
        );
});

export const updatePassword = WrapAsync(async (req, res, next) => {
    const userId = req.user.id;
    if (!userId) {
        return next(new AppError(401, "Unauthorized"));
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword?.trim() || !newPassword?.trim()) {
        return next(new AppError(400, "Missing required fields"));
    }

    const user = await User.findById(userId);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        return next(new AppError(400, "Current password is incorrect"));
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    res.status(200).json(
        new ApiResponse(200, null, "Password updated successfully")
    );
});
