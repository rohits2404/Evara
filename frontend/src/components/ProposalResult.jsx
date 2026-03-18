import { motion } from "framer-motion";
import { Users, DollarSign, Clock, Globe, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { VenueCard }from "./VenueCard";
import { formatDistanceToNow } from "date-fns";

const ParsedTag = ({ icon, label, value }) => (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/3 border border-white/6">
        <span className="text-champagne-700">{icon}</span>
        <div>
            <p className="text-[10px] font-mono text-obsidian-500 uppercase tracking-wider">{label}</p>
            <p className="text-xs text-obsidian-300 font-sans">{value}</p>
        </div>
    </div>
);

export const ProposalResult = ({ proposal, onDelete, isLatest = false }) => {

    const ref = useRef(null);

    useEffect(() => {
        if (isLatest) {
            setExpanded(true);

            setTimeout(() => {
                ref.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }, 200);
        }
    }, [isLatest]);
  
    const [expanded, setExpanded] = useState(isLatest);
    const timeAgo = proposal.createdAt
    ? formatDistanceToNow(new Date(proposal.createdAt), { addSuffix: true })
    : "just now";

    const { parsedDetails, proposals, userQuery, processingTime } = proposal;

    return (
        <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl overflow-hidden"
        style={{
            background: "rgba(255,255,255,0.02)",
            border: isLatest ? "1px solid rgba(226,190,66,0.2)" : "1px solid rgba(255,255,255,0.06)",
            boxShadow: isLatest ? "0 0 40px rgba(226,190,66,0.04)" : "none",
        }}
        >
            {/* Header */}
            <div
            className="flex items-start justify-between p-5 cursor-pointer group"
            onClick={() => setExpanded((v) => !v)}
            >
                <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {isLatest && (
                            <span className="text-[10px] font-mono text-champagne-500 bg-champagne-500/10 border border-champagne-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest">
                                Latest
                            </span>
                        )}
                        <span className="text-[10px] font-mono text-obsidian-600">{timeAgo}</span>
                        {processingTime && (
                            <span className="text-[10px] font-mono text-obsidian-600">
                                · {(processingTime / 1000).toFixed(1)}s
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-obsidian-300 leading-snug line-clamp-2 group-hover:text-obsidian-200 transition-colors">
                        "{userQuery}"
                    </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button
                    onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(proposal._id);
                    }}
                    className="p-1.5 rounded-lg text-obsidian-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    aria-label="Delete proposal"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="p-1.5 rounded-lg text-obsidian-500 group-hover:text-obsidian-300 transition-colors">
                        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                </div>
            </div>

            {/* Expanded content */}
            {expanded && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Parsed details */}
                    {parsedDetails && Object.keys(parsedDetails).some((k) => parsedDetails[k]) && (
                        <div className="px-5 pb-5 border-t border-white/4">
                            <p className="text-[10px] font-mono text-obsidian-500 uppercase tracking-widest mt-4 mb-3">
                                Extracted Details
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {parsedDetails.attendees && (
                                    <ParsedTag icon={<Users className="w-3 h-3" />} label="Team" value={parsedDetails.attendees} />
                                )}
                                {parsedDetails.budget && (
                                    <ParsedTag icon={<DollarSign className="w-3 h-3" />} label="Budget" value={parsedDetails.budget} />
                                )}
                                {parsedDetails.duration && (
                                    <ParsedTag icon={<Clock className="w-3 h-3" />} label="Duration" value={parsedDetails.duration} />
                                )}
                                {parsedDetails.location && (
                                    <ParsedTag icon={<Globe className="w-3 h-3" />} label="Region" value={parsedDetails.location} />
                                )}
                                {parsedDetails.eventType && (
                                    <ParsedTag icon="🎯" label="Event Type" value={parsedDetails.eventType} />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Venue proposals grid */}
                    {proposals?.length > 0 && (
                        <div className="px-5 pb-5">
                            <p className="text-[10px] font-mono text-obsidian-500 uppercase tracking-widest mb-4">
                                {proposals.length} Venue Proposals
                            </p>
                            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
                                {proposals.map((venue, i) => (
                                    <VenueCard key={`${venue.venueName}-${i}`} venue={venue} index={i} />
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}
