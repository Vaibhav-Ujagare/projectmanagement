import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/User.model.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(
                401,
                "Unauthorized request - Missing Access Token",
            );
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken",
        );

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
});

// import jwt from "jsonwebtoken";

// export const isLoggedIn = async (req, res, next) => {
//     try {
//         console.log("auth.middleware.js line 5", req.cookies);
//         let token =
//             req.cookies?.accessToken ||
//             req.header("Authorization")?.replace("Bearer ", "");
//         console.log("Token Found", token ? "YES" : "NO");
//         if (!token) {
//             return res.status(401).json({
//                 message: "Authentication Failed",
//                 success: false,
//             });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("decoded data", decoded);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.log("Auth middleware failure ");
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// };
