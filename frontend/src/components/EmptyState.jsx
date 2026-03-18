import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const EmptyState = () => (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
        <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{
            background: "rgba(226,190,66,0.08)",
            border: "1px solid rgba(226,190,66,0.12)",
        }}
        >
            <Sparkles className="w-7 h-7 text-champagne-600" />
        </div>
        <h3 className="font-display text-xl text-obsidian-300 mb-2">
            No proposals yet
        </h3>
        <p className="text-sm text-obsidian-500 max-w-xs leading-relaxed">
            Describe your event above and let AI find the perfect venue for your team.
        </p>
        <div className="mt-6 flex gap-2 flex-wrap justify-center">
            {["Mountains", "Beach", "City", "Countryside"].map((loc) => (
                <span
                key={loc}
                className="text-xs font-mono text-obsidian-600 border border-white/5 px-3 py-1.5 rounded-full"
                >
                    {loc}
                </span>
            ))}
        </div>
    </motion.div>
);
