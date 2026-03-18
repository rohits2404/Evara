export const HeroBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Main radial glow */}
        <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 opacity-30"
        style={{
            background:
            "radial-gradient(ellipse at 50% 0%, rgba(226,190,66,0.18) 0%, rgba(180,140,20,0.05) 50%, transparent 70%)",
        }}
        />
        {/* Left orb */}
        <div
        className="absolute top-32 -left-32 w-64 h-64 rounded-full opacity-10"
        style={{
            background: "radial-gradient(circle, rgba(226,190,66,0.4), transparent)",
            filter: "blur(60px)",
            animation: "float 9s ease-in-out infinite",
        }}
        />
        {/* Right orb */}
        <div
        className="absolute top-48 -right-32 w-80 h-80 rounded-full opacity-10"
        style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.3), transparent)",
            filter: "blur(80px)",
            animation: "float 7s ease-in-out infinite reverse",
        }}
        />
        {/* Grid lines */}
        <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
            backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
        }}
        />
        {/* Bottom fade */}
        <div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{
            background: "linear-gradient(to top, #0e0e0a, transparent)",
        }}
        />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
            <div
            key={i}
            className="absolute rounded-full bg-champagne-400/20"
            style={{
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
                left: `${15 + i * 13}%`,
                top: `${20 + (i % 3) * 20}%`,
                animation: `float ${5 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
            }}
            />
        ))}
    </div>
);
