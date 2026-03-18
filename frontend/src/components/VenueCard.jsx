import { motion } from "framer-motion";
import { MapPin, DollarSign, Users, Clock, CheckCircle } from "lucide-react";

const RANK_CONFIG = [
    {
        label: "Best Fit",
        icon: "★",
        color: "from-champagne-600/20 to-transparent",
        border: "border-champagne-600/30",
        badge: "bg-champagne-500/10 text-champagne-400 border-champagne-600/30",
        dot: "bg-champagne-400",
    },
    {
        label: "Premium",
        icon: "◈",
        color: "from-violet-600/15 to-transparent",
        border: "border-violet-500/25",
        badge: "bg-violet-500/10 text-violet-300 border-violet-500/30",
        dot: "bg-violet-400",
    },
    {
        label: "Unique Pick",
        icon: "⟡",
        color: "from-teal-600/15 to-transparent",
        border: "border-teal-500/25",
        badge: "bg-teal-500/10 text-teal-300 border-teal-500/30",
        dot: "bg-teal-400",
    },
];

export const VenueCard = ({ venue, index }) => {
  
    const rank = RANK_CONFIG[index] || RANK_CONFIG[0];

    return (
        <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            duration: 0.55,
            delay: index * 0.12,
            ease: [0.16, 1, 0.3, 1],
        }}
        className={`relative rounded-2xl border ${rank.border} overflow-hidden group transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]`}
        style={{
            background: `linear-gradient(160deg, ${rank.color.replace("from-", "").replace("to-transparent", "").trim()}, rgba(255,255,255,0.02))`,
            backdropFilter: "blur(8px)",
        }}
        >
            {/* Rank badge */}
            <div className="absolute top-4 right-4">
                <span
                className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border ${rank.badge}`}
                >
                    <span>{rank.icon}</span>
                    {rank.label}
                </span>
            </div>

            <div className="p-6">
                {/* Header */}
                <div className="pr-24 mb-4">
                    <h3 className="font-display text-xl sm:text-2xl text-white/90 leading-tight mb-1.5 group-hover:text-champagne-200 transition-colors">
                        {venue.venueName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-obsidian-400">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-champagne-700" />
                        <span className="text-sm">{venue.location}</span>
                    </div>
                </div>

                {/* Meta chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {venue.estimatedCost && (
                        <Chip icon={<DollarSign className="w-3 h-3" />} text={venue.estimatedCost} />
                    )}
                    {venue.capacity && (
                        <Chip icon={<Users className="w-3 h-3" />} text={venue.capacity} />
                    )}
                    {venue.duration && (
                        <Chip icon={<Clock className="w-3 h-3" />} text={venue.duration} />
                    )}
                </div>

                {/* Divider */}
                <div className="h-px bg-white/5 mb-5" />

                {/* Why it fits */}
                <div className="mb-5">
                    <p className="text-xs font-mono text-obsidian-500 uppercase tracking-widest mb-2">
                        Why it fits
                    </p>
                    <p className="text-obsidian-300 text-sm leading-relaxed">
                        {venue.whyItFits}
                    </p>
                </div>

                {/* Amenities */}
                {venue.amenities?.length > 0 && (
                    <div>
                        <p className="text-xs font-mono text-obsidian-500 uppercase tracking-widest mb-3">
                            Amenities
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {venue.amenities.map((amenity, i) => (
                                <span
                                key={i}
                                className="inline-flex items-center gap-1.5 text-xs text-obsidian-400 bg-white/4 border border-white/6 px-2.5 py-1 rounded-full"
                                >
                                    <CheckCircle className="w-2.5 h-2.5 text-emerald-500/70" />
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom accent line */}
            <div
            className={`h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out`}
            style={{
                background: index === 0
                    ? "linear-gradient(90deg, #c9a12e, #e2be42)"
                    : index === 1
                    ? "linear-gradient(90deg, #7c3aed, #a78bfa)"
                    : "linear-gradient(90deg, #0d9488, #2dd4bf)",
                }}
            />
        </motion.div>
    );
};

const Chip = ({ icon, text }) => (
    <span className="inline-flex items-center gap-1.5 text-xs text-obsidian-300 bg-white/4 border border-white/[0.07] px-2.5 py-1 rounded-full font-mono">
        <span className="text-champagne-700">{icon}</span>
        {text}
    </span>
);
