import { motion, AnimatePresence } from "framer-motion";
import { History, ChevronDown } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import { GeneratingLoader } from "../components/GeneratingLoader";
import { ProposalResult } from "../components/ProposalResult";
import { HistorySkeletons as SkeletonLoader } from "../components/SkeletonLoader";
import { EmptyState } from "../components/EmptyState";
import { StatsBar } from "../components/StatsBar";
import { HeroBackground } from "../components/HeroBackground";
import { useProposals } from "../hooks/useProposals";
import { useRef, useEffect } from "react";

const Home = () => {

    const resultsRef = useRef(null);
    
    const {
        proposals,
        loading,
        generating,
        pagination,
        stats,
        generateProposal,
        deleteProposal,
        loadMore,
    } = useProposals();

    useEffect(() => {
        if (proposals.length > 0 && !generating) {
            resultsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [proposals, generating]);

    return (
        <div className="min-h-screen bg-[#0e0e0a]">
            <Navbar stats={stats} />

            {/* ── Hero Section ── */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <HeroBackground />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
                        style={{
                        background: "rgba(226,190,66,0.07)",
                        border: "1px solid rgba(226,190,66,0.15)",
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
                        <span className="text-xs font-mono text-champagne-500 tracking-widest uppercase">
                        AI-Powered Corporate Event Planning
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] mb-6 text-balance"
                    >
                        <span className="text-white/90">Your event,</span>
                        <br />
                        <span className="gold-gradient">perfectly placed.</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-obsidian-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-sans font-light"
                    >
                        Describe your corporate offsite in plain language. Get curated, AI-matched
                        venue proposals — with justifications, costs, and amenities — in seconds.
                    </motion.p>

                    {/* Search Bar */}
                    <AnimatePresence mode="wait">
                        {generating ? (
                            <GeneratingLoader key="loader" />
                        ) : (
                        <SearchBar 
                        key="search" 
                        onGenerate={generateProposal} 
                        generating={generating} 
                        />
                        )}
                    </AnimatePresence>

                    {/* Stats */}
                    {stats && (
                        <div className="mt-12">
                            <StatsBar stats={stats} />
                        </div>
                    )}
                </div>
            </section>

            {/* ── Results / History Section ── */}
            <section ref={resultsRef} className="px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto">
                {/* Section header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(226,190,66,0.1)", border: "1px solid rgba(226,190,66,0.15)" }}
                        >
                            <History className="w-3.5 h-3.5 text-champagne-600" />
                        </div>
                        <h2 className="text-sm font-mono text-obsidian-400 uppercase tracking-widest">
                            Proposal History
                        </h2>
                    </div>
                    {pagination && (
                        <span className="text-xs font-mono text-obsidian-600">
                            {pagination.total} total
                        </span>
                    )}
                </div>

                {/* Content */}
                <AnimatePresence>
                    {loading ? (
                        <SkeletonLoader count={3} />
                    ) : proposals.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                        >
                            {proposals.map((proposal, i) => (
                                <ProposalResult
                                key={proposal._id}
                                proposal={proposal}
                                onDelete={deleteProposal}
                                isLatest={i === 0}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Load more */}
                {pagination?.hasMore && !loading && (
                    <div className="flex justify-center mt-8">
                        <motion.button
                        onClick={loadMore}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-ghost flex items-center gap-2 text-sm"
                        >
                            <ChevronDown className="w-4 h-4" />
                            Load more proposals
                        </motion.button>
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="border-t border-white/4 px-4 py-8 text-center">
                <p className="text-xs font-mono text-obsidian-600">
                Built with OpenAI · MongoDB · React · Node.js ·{" "}
                <span className="text-champagne-700">Evara</span>
                </p>
            </footer>
        </div>
    );
};

export default Home;
