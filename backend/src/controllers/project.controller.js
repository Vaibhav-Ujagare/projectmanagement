import { asyncHandler } from "../utils/asyncHandler.js";
import Project from "../models/project.model.js";
import ProjectMember from "../models/projectMember.model.js";
import User from "../models/User.model.js";

import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user._id;
    if (!userId) {
        throw new ApiError(400, "Login required");
    }

    const project = await Project.create({
        name: name,
        description,
        createdBy: userId,
    });

    if (!project) {
        throw new ApiError(400, "Error while creating project");
    }
    await project.save();
    req.project = project;
    return res
        .status(201)
        .json(new ApiResponse(201, "Project Created", project));
});

const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({});
    if (!projects) {
        return res
            .status(201)
            .json(new ApiResponse(201, "No projects created", projects));
    }

    return res.status(201).json(new ApiResponse(201, "All Projects", projects));
});

const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Project Id is not valid");
    }

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(201).json(new ApiResponse(201, "Project Found", project));
});

const updateProjectById = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { projectId } = req.params;

    if (!name || !description) {
        throw new ApiError(400, "Project name or description required");
    }

    if (!projectId) {
        throw new ApiError(400, "Invalid Project ID");
    }

    const project = await Project.findByIdAndUpdate(projectId, {
        $set: {
            name,
            description,
        },
    });

    await project.save();

    return res
        .status(201)
        .json(new ApiResponse(201, "Project Updated Successfully", project));
});

const deleteProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Invalid Project ID");
    }
    await Project.findByIdAndDelete(projectId);

    return res
        .status(201)
        .json(new ApiResponse(201, "Project Deleted Successfully", {}));
});

const addMemberToProject = asyncHandler(async (req, res) => {
    const { projectId, memberEmail } = req.body;

    if (!projectId || !memberEmail) {
        throw new ApiError(400, "Project ID or member email is invalid");
    }
    const user = await User.findOne({ email: memberEmail });
    if (!user) {
        throw new ApiError(400, "User of this email not found");
    }

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(400, "Invalid Project ID");
    }

    const projectMember = await ProjectMember.create({
        user: user._id,
        project: project,
    });

    await projectMember.save();
    return res
        .status(201)
        .json(new ApiResponse(201, "Member add successfully", projectMember));
});

const removeMemberFromProject = asyncHandler(async (req, res) => {
    const { projectId, memberEmail } = req.body;

    if (!projectId || !memberEmail) {
        throw new ApiError(400, "Project ID or member email is invalid");
    }
    const user = await User.findOne({ email: memberEmail });
    if (!user) {
        throw new ApiError(400, "User of this email not found");
    }
    const projectMember = await ProjectMember.findOneAndDelete({
        user: user._id,
        project: projectId,
    });

    if (!projectMember) {
        throw new ApiError(404, "Project member not found");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, "Member removed successfully", {}));
});

const getAllProjectMembers = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    console.log(projectId);
    if (!projectId) {
        throw new ApiError(400, "Project ID is required");
    }

    const members = await ProjectMember.find({ project: projectId }).populate(
        "user",
        "-password -refreshToken",
    );

    res.status(200).json(
        new ApiResponse(200, members, "Project members fetched successfully"),
    );
});

export {
    createProject,
    getProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById,
    addMemberToProject,
    removeMemberFromProject,
    getAllProjectMembers,
};
