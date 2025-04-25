import { Router } from "express";
import {
    registerUser,
    loginUser,
    verifyEmail,
    logoutUser,
    resendVerificationEmail,
    refreshAccessToken,
    forgotPasswordRequest,
    resetPasswordController,
    getCurrentUser,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
    userRegistrationValidator,
    userLoginValidator,
} from "../validators/index.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

// import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

// router.post("/register", userRegistrationValidator(), validate, registerUser);

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
    ]),
    userRegistrationValidator(),
    validate,
    registerUser,
);

router.route("/login").post(userLoginValidator(), validate, loginUser);

router.get("/verify/:token", verifyEmail);

router.post("/verify/resend", resendVerificationEmail);

router.route("/refresh-token").post(refreshAccessToken);

router.post("/logout", isLoggedIn, logoutUser);

router.post("/forgot-password", forgotPasswordRequest);

router.post("/reset-password/:hashedToken", resetPasswordController);

router.get("/profile", isLoggedIn, getCurrentUser);

export default router;
