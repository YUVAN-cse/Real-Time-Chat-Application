import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    register,
    login,
    refreshtoken,
    getProfile, 
    getProfileOther,    
    updateProfile,
    updatePassword,
    deleteProfile,
    logout
} from "../controllers/auth.controller.js";
import upload from "../utils/multer.config.js";

const router = express.Router();

router.post("/register",upload.single("avatar"), register);
router.post("/login", login);
router.post("/refreshtoken", refreshtoken);  

//secure routes
router.delete("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getProfile);
router.get("/profile/:id", authMiddleware , getProfileOther);
router.put("/profile", authMiddleware, upload.single("avatar"), updateProfile);
router.delete("/profile", authMiddleware, deleteProfile);
router.put("/password", authMiddleware, updatePassword);

export  { router as authRouter };