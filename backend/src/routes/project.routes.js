import { Router } from "express";
import {
    createProject,
    getProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById,
    addMemberToProject,
    removeMemberFromProject,
    getAllProjectMembers,
} from "../controllers/project.controller.js";

import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-project").post(isLoggedIn, createProject);
router.route("/allProjects").get(isLoggedIn, getProjects);
router.route("/project/:projectId").post(isLoggedIn, getProjectById);
router.route("/project/update/:projectId").post(isLoggedIn, updateProjectById);
router.route("/project/delete/:projectId").get(isLoggedIn, deleteProjectById);
router.route("/project/add/addMember").post(isLoggedIn, addMemberToProject);
router
    .route("/project/remove/removeMember")
    .post(isLoggedIn, removeMemberFromProject);
router.get("/project/:projectId/members", getAllProjectMembers);
export default router;
