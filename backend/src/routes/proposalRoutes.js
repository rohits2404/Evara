import express from "express";
import { body, param, validationResult } from "express-validator";
import {
  createProposal,
  deleteProposal,
  getProposalById,
  getProposals,
  getStats,
} from "../controller/proposalController.js";

const router = express.Router();

// Validation middleware handler
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((err) => ({
                field: err.path,
                message: err.msg,
            })),
        });
    }
    next();
};

// Strong validation rules
const createProposalValidation = [
    body("userQuery")
    .exists({ checkFalsy: true })
    .withMessage("Event description is required")
    .bail()
    .isString()
    .withMessage("Event description must be a string")
    .bail()
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage("Description must be between 20 and 1000 characters")
    .bail()
    .custom((value) => {
        if (/^(.)\1+$/.test(value)) {
            throw new Error("Invalid repetitive input");
        }
        return true;
    })
    .custom((value) => {
        if (/<[^>]*>?/.test(value)) {
            throw new Error("HTML/script content is not allowed");
        }
        return true;
    })
    .custom((value) => {
        const words = value.trim().split(/\s+/);
        if (words.length < 5) {
            throw new Error("Please provide a meaningful event description");
        }
        return true;
    })
    .custom((value) => {
        const words = value.trim().split(/\s+/);
        const meaningfulWords = words.filter((word) =>
            /^[a-zA-Z]{3,}$/.test(word)
        );
        if (meaningfulWords.length < 4) {
            throw new Error("Please provide a meaningful event description");
        }
        return true;
    })
];

const idValidation = [
    param("id")
    .exists()
    .withMessage("ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid ID format"),
];

router.get("/stats", getStats);
router.get("/", getProposals);
router.get("/:id", idValidation, handleValidation, getProposalById);
router.post("/", createProposalValidation, handleValidation, createProposal);
router.delete("/:id", idValidation, handleValidation, deleteProposal);

export default router;
