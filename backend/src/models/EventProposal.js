import mongoose from "mongoose";

const VenueProposalSchema = new mongoose.Schema(
    {
        venueName: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        estimatedCost: {
            type: String,
            required: true,
        },
        whyItFits: {
            type: String,
            required: true,
        },
        amenities: [{ type: String }],
        capacity: {
            type: String,
        },
        eventType: {
            type: String,
        },
        duration: {
            type: String,
        },
    },
    { _id: false, timestamps: true },
);
 
const EventProposalSchema = new mongoose.Schema(
    {
        userQuery: {
            type: String,
            required: [true, "User Query Is Required"],
            trim: true,
            maxlength: [1000, "Query Cannot Exceed 1000 Characters"],
        },
        parsedDetails: {
            attendees: String,
            budget: String,
            duration: String,
            location: String,
            eventType: String,
        },
        proposals: {
            type: [VenueProposalSchema],
            validate: {
                validator: (arr) => arr.length >= 1 && arr.length <= 5,
                message: "Must have between 1 and 5 venue proposals",
            },
        },
        aiModel: {
            type: String,
            default: "openai/gpt-oss-20b",
        },
        processingTime: {
            type: Number, // milliseconds
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "completed",
        },
        errorMessage: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
 
// Indexes for performance
EventProposalSchema.index({ createdAt: -1 });
EventProposalSchema.index({ status: 1 });
EventProposalSchema.index({ userQuery: "text" });
 
// Virtual for relative time
EventProposalSchema.virtual("relativeTime").get(function () {
    const now = new Date();
    const diff = now - this.createdAt;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
});

const EventProposal = mongoose.model("EventProposal", EventProposalSchema)

export default EventProposal;
