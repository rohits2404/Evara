import { validationResult } from "express-validator"
import EventProposal from "../models/EventProposal.js"
import { generateEventProposal } from "../config/openai.js"

// @desc    Generate AI event proposal and save to DB
// @route   POST /api/proposals
// @access  Public
export const createProposal = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((e) => e.msg),
        });
    }
 
    const { userQuery } = req.body;
 
    try {
        // Generate AI proposal
        const aiResult = await generateEventProposal(userQuery);
 
        // Save to MongoDB
        const proposal = await EventProposal.create({
            userQuery,
            parsedDetails: aiResult.parsedDetails,
            proposals: aiResult.proposals,
            aiModel: aiResult.aiModel,
            processingTime: aiResult.processingTime,
            status: "completed",
        });
 
        return res.status(201).json({
            success: true,
            data: proposal,
            message: "Proposal Generated Successfully",
        });
    } catch (error) {
        console.error("❌ Create Proposal Error:", error);
    
        // Save failed attempt for transparency
        try {
            await EventProposal.create({
                userQuery,
                proposals: [],
                status: "failed",
                errorMessage: error.message,
            });
        } catch (_) {}
 
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || "Failed To Generate Proposal. Please Try Again.",
        });
    }
};
 
// @desc    Get all proposals (paginated)
// @route   GET /api/proposals
// @access  Public
export const getProposals = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
        const skip = (page - 1) * limit;
 
        const [proposals, total] = await Promise.all([
            EventProposal.find({ status: "completed" })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
            EventProposal.countDocuments({ status: "completed" }),
        ]);
 
        return res.status(200).json({
            success: true,
            data: proposals,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
                hasMore: skip + limit < total,
            },
        });
    } catch (error) {
        console.error("❌ Get Proposals Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed To Retrieve Proposals.",
        });
    }
};
 
// @desc    Get single proposal by ID
// @route   GET /api/proposals/:id
// @access  Public
export const getProposalById = async (req, res) => {
    try {
        const proposal = await EventProposal.findById(req.params.id);
    
        if (!proposal) {
            return res.status(404).json({
                success: false,
                message: "Proposal Not Found",
            });
        }
 
        return res.status(200).json({
            success: true,
            data: proposal,
        });
    } catch (error) {
        console.error("❌ Get Proposal By ID Error:", error);
        const isInvalidId = error.name === "CastError";
        return res.status(isInvalidId ? 400 : 500).json({
            success: false,
            message: isInvalidId ? "Invalid Proposal ID" : "Failed To Retrieve Proposal.",
        });
    }
};
 
// @desc    Delete a proposal
// @route   DELETE /api/proposals/:id
// @access  Public
export const deleteProposal = async (req, res) => {
    try {
        const proposal = await EventProposal.findByIdAndDelete(req.params.id);
        if (!proposal) {
            return res.status(404).json({ success: false, message: "Proposal Not Found" });
        }
        return res.status(200).json({ success: true, message: "Proposal Deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to Delete Proposal." });
    }
};
 
// @desc    Health / stats endpoint
// @route   GET /api/proposals/stats
// @access  Public
export const getStats = async (req, res) => {
    try {
        const [total, today] = await Promise.all([
            EventProposal.countDocuments({ status: "completed" }),
            EventProposal.countDocuments({
                status: "completed",
                createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
            }),
        ]);
 
        return res.status(200).json({
            success: true,
            data: { totalProposals: total, proposalsToday: today },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed To Get Stats." });
    }
};
