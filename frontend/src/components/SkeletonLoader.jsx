const SkeletonCard = () => (
    <div
    className="rounded-2xl p-5 overflow-hidden"
    style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
    }}
    >
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <div className="shimmer h-3 w-16 rounded-full mb-3" />
                <div className="shimmer h-4 w-3/4 rounded-full mb-2" />
                <div className="shimmer h-4 w-1/2 rounded-full" />
            </div>
            <div className="shimmer w-8 h-8 rounded-lg" />
        </div>
    </div>
);

export const HistorySkeletons = ({ count = 3 }) => (
    <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
        ))}
    </div>
);
