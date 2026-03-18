import { motion } from "framer-motion";
import { Sparkles, Activity } from "lucide-react";

export const Navbar = ({ stats }) => {
    return (
        <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="border-b border-white/6 bg-[#0e0e0a]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-champagne-400 to-champagne-700 flex items-center justify-center shadow-[0_0_15px_rgba(226,190,66,0.3)]">
                                    <Sparkles className="w-4 h-4 text-obsidian-950" />
                                </div>
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            </div>
                            <div>
                                <span className="font-display text-xl font-medium text-champagne-200 tracking-wide">
                                    Evara
                                </span>
                                <span className="hidden sm:inline text-obsidian-500 font-sans text-sm ml-2">
                                    / AI Event Concierge
                                </span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 sm:gap-6">
                            {stats && (
                                <div className="hidden md:flex items-center gap-1.5 text-obsidian-400 text-xs font-mono">
                                    <Activity className="w-3 h-3 text-emerald-500" />
                                    <span>{stats.totalProposals.toLocaleString()} proposals generated</span>
                                </div>
                            )}
                            <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-obsidian-400 hover:text-champagne-400 text-sm transition-colors duration-200 font-mono"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                                <span className="hidden sm:inline">GitHub</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};
