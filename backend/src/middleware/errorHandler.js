export const errorHandler = (err, req, res, next) => {
  
    console.error("Unhandled Error:", err);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        return res.status(409).json({ success: false, message: "Duplicate Entry Detected." });
    }

    // Mongoose cast error
    if (err.name === "CastError") {
        return res.status(400).json({ success: false, message: "Invalid ID Format." });
    }

    // OpenAI API error
    if (err.constructor?.name === "APIError") {
        return res.status(502).json({
            success: false,
            message: "AI Service Unavailable. Please Try Again Shortly.",
        });
    }

    const statusCode = err.statusCode || err.status || 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

// 404 handler
export const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} Not Found`,
    });
}
