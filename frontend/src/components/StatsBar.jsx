import { motion } from "framer-motion";
import { Zap, Database, Clock } from "lucide-react";

const StatItem = ({ icon, value, label, delay }) => (
    <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center gap-3 px-5 py-3 rounded-xl"
    style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
    }}
    >
        <div className="w-8 h-8 rounded-lg bg-champagne-500/10 flex items-center justify-center text-champagne-600">
            {icon}
        </div>
        <div>
        <p className="text-lg font-display font-medium text-champagne-300">{value}</p>
        <p className="text-xs font-mono text-obsidian-500">{label}</p>
        </div>
    </motion.div>
);

export const StatsBar = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="flex flex-wrap gap-3 justify-center">
            <StatItem
            icon={<Database className="w-4 h-4" />}
            value={stats.totalProposals.toLocaleString()}
            label="total proposals"
            delay={0.1}
            />
            <StatItem
            icon={<Zap className="w-4 h-4" />}
            value={stats.proposalsToday}
            label="generated today"
            delay={0.2}
            />
            <StatItem
            icon={<Clock className="w-4 h-4" />}
            value="~15s"
            label="avg. response time"
            delay={0.3}
            />
        </div>
    );
};
