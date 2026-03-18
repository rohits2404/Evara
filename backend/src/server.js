import "dotenv/config"
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db.js";
import proposalRoutes from "./routes/proposalRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Connect to MongoDB
connectDB();
 
const app = express();

app.use(helmet());

const corsOptions = {
    origin: [
        process.env.CLIENT_URL || "http://localhost:5173",
    ],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use(cors(corsOptions));

// Rate limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too Many Requests. Please Slow Down." },
}));

const aiRateLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { success: false, message: "Too Many AI Requests. Please Wait a Moment." },
});
 
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
 
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}
 
//Routes 
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Event Concierge API Is Running 🚀",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
    });
});

app.post("/api/proposals", aiRateLimit); 
app.use("/api/proposals", proposalRoutes);

app.use(notFound);
app.use(errorHandler);
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`CORS allowed: ${corsOptions.origin.join(", ")}\n`);
});
 
export default app;
