import { motion } from "framer-motion";

const STEPS = [
    { label: "Parsing your event requirements", icon: "📋" },
    { label: "Searching premium venues", icon: "🔍" },
    { label: "Matching to your budget", icon: "💰" },
    { label: "Crafting personalized proposals", icon: "✨" },
];

export const GeneratingLoader = () => {
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl mx-auto"
        >
            <div
                className="relative rounded-2xl p-8 overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, rgba(226,190,66,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(226,190,66,0.15)",
                    boxShadow: "0 0 60px rgba(226,190,66,0.05)",
                }}
            >
                {/* Animated gradient background */}
                <div
                className="absolute inset-0 opacity-30"
                style={{
                    background:
                    "radial-gradient(ellipse at 50% 0%, rgba(226,190,66,0.15) 0%, transparent 70%)",
                    animation: "glow-pulse 2s ease-in-out infinite",
                }}
                />
                <div className="relative z-10">
                    {/* Central icon */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            {/* Outer ring */}
                            <div
                            className="w-20 h-20 rounded-full border border-champagne-600/20"
                            style={{ animation: "spin 8s linear infinite" }}
                            >
                                <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-champagne-500"
                                />
                            </div>
                            {/* Inner ring */}
                            <div
                                className="absolute inset-3 rounded-full border border-champagne-600/30"
                                style={{ animation: "spin 5s linear infinite reverse" }}
                            >
                                <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-champagne-400"
                                />
                            </div>
                            {/* Center */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                className="w-10 h-10 rounded-full bg-linear-to-br from-champagne-400 to-champagne-700 flex items-center justify-center"
                                style={{ boxShadow: "0 0 20px rgba(226,190,66,0.4)" }}
                                >
                                    <span className="text-xl">✦</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h3 className="font-display text-2xl text-champagne-200 mb-2">
                            AI is Planning Your Event
                        </h3>
                        <p className="text-obsidian-400 text-sm font-sans">
                        Analyzing thousands of venues to find your perfect match
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                        {STEPS.map((step, i) => (
                            <motion.div
                            key={step.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.3, duration: 0.4 }}
                            className="flex items-center gap-2.5 p-3 rounded-xl"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.05)",
                            }}
                            >
                                <div className="shrink-0">
                                    <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{
                                        delay: i * 0.3 + 0.5,
                                        duration: 0.4,
                                        repeat: Infinity,
                                        repeatDelay: 2,
                                    }}
                                    className="text-base"
                                    >
                                        {step.icon}
                                    </motion.div>
                                </div>
                                <span className="text-xs text-obsidian-400 leading-tight">
                                    {step.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-8 max-w-xs mx-auto">
                        <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                            className="h-full rounded-full"
                            style={{
                                background: "linear-gradient(90deg, #c9a12e, #e2be42, #f4e4a8)",
                            }}
                            initial={{ width: "5%" }}
                            animate={{ width: "90%" }}
                            transition={{ duration: 12, ease: "easeInOut" }}
                            />
                        </div>
                        <p className="text-center text-xs font-mono text-obsidian-600 mt-2">
                        This usually takes 10–20 seconds
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
