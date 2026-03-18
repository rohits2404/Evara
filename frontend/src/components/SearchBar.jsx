import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";

const EXAMPLE_QUERIES = [
    "A 10-person leadership retreat in the mountains for 3 days with a $4k budget",
    "Team building workshop for 50 engineers in San Francisco, 1 day, under $8,000",
    "Executive board offsite near a beach, 15 people, 2 nights, $12k budget",
    "Annual sales kickoff for 200 people in Las Vegas, 3 days, $50k total",
    "Creative brainstorm retreat for 8-person design team in the countryside, weekend",
];

export const SearchBar = ({ onGenerate, generating }) => {
  
    const [query, setQuery] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [exampleIndex, setExampleIndex] = useState(0);
    const [placeholderText, setPlaceholderText] = useState("");
    const [isTypingPlaceholder, setIsTypingPlaceholder] = useState(true);
  
    const textareaRef = useRef(null);
    const placeholderRef = useRef(null);

    // Animated placeholder typewriter
    useEffect(() => {
        if (query) return;
        const example = EXAMPLE_QUERIES[exampleIndex];
        let i = 0;
        setIsTypingPlaceholder(true);
        setPlaceholderText("");

        const typeInterval = setInterval(() => {
            if (i <= example.length) {
                setPlaceholderText(example.slice(0, i));
                i++;
            } else {
                clearInterval(typeInterval);
                setIsTypingPlaceholder(false);
                // Pause then next
                placeholderRef.current = setTimeout(() => {
                    setExampleIndex((prev) => (prev + 1) % EXAMPLE_QUERIES.length);
                }, 3000);
            }
        }, 35);

        return () => {
            clearInterval(typeInterval);
            clearTimeout(placeholderRef.current);
        };
    }, [exampleIndex, query]);

    const handleChange = (e) => {
        const val = e.target.value;
        if (val.length <= 1000) {
            setQuery(val);
            setCharCount(val.length);
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!query.trim() || generating) return;
        const result = await onGenerate(query);
        if (result) {
            setQuery("");
            setCharCount(0);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleSubmit();
        }
    };

    const useExample = () => {
        const example = EXAMPLE_QUERIES[exampleIndex];
        setQuery(example);
        setCharCount(example.length);
        textareaRef.current?.focus();
    };

    const clearQuery = () => {
        setQuery("");
        setCharCount(0);
        textareaRef.current?.focus();
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Main Input Card */}
            <div
            className="relative rounded-2xl overflow-hidden"
            style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            >
                {/* Top bar */}
                <div className="flex items-center gap-2 px-5 pt-4 pb-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-obsidian-700" />
                        <span className="w-2.5 h-2.5 rounded-full bg-obsidian-700" />
                        <span className="w-2.5 h-2.5 rounded-full bg-obsidian-700" />
                    </div>
                    <span className="text-xs font-mono text-obsidian-600 ml-2">describe your event</span>
                        <div className="ml-auto flex items-center gap-1 text-xs font-mono text-obsidian-600">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-obsidian-500">⌘</kbd>
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-obsidian-500">↵</kbd>
                        <span className="ml-1">to generate</span>
                        </div>
                    </div>

                    {/* Textarea */}
                    <div className="relative px-5 py-4">
                        <textarea
                        ref={textareaRef}
                        value={query}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        rows={4}
                        disabled={generating}
                        className="input-field w-full text-base sm:text-lg leading-relaxed disabled:opacity-60"
                        style={{ minHeight: "100px", maxHeight: "200px" }}
                        aria-label="Event description"
                        />
                        {/* Animated placeholder */}
                        {!query && (
                            <div
                                className="absolute top-4 left-5 right-5 pointer-events-none text-obsidian-600 text-base sm:text-lg leading-relaxed"
                                aria-hidden="true"
                            >
                                {placeholderText}
                                {isTypingPlaceholder && (
                                    <span
                                        className="inline-block w-0.5 h-5 bg-champagne-500/60 ml-0.5 align-text-bottom"
                                        style={{ animation: "blink 1s step-end infinite" }}
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            {/* Char count */}
                            <span
                                className={`text-xs font-mono transition-colors ${
                                charCount > 800 ? "text-amber-500" : "text-obsidian-600"
                                }`}
                            >
                                {charCount}/1000
                            </span>
                            {/* Clear */}
                            <AnimatePresence>
                                {query && (
                                    <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={clearQuery}
                                    className="text-obsidian-500 hover:text-obsidian-300 transition-colors"
                                    aria-label="Clear input"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                            {/* Example */}
                            {!query && (
                                <button
                                onClick={useExample}
                                className="text-xs text-champagne-700/70 hover:text-champagne-500 transition-colors font-mono underline underline-offset-2"
                                >
                                    use example
                                </button>
                            )}
                        </div>

                        {/* Submit */}
                        <motion.button
                        onClick={handleSubmit}
                        disabled={!query.trim() || query.trim().length < 10 || generating}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-primary flex items-center gap-2 text-sm"
                        >
                            {generating ? (
                                <>
                                <div className="w-4 h-4 border-2 border-obsidian-800/40 border-t-obsidian-900 rounded-full animate-spin" />
                                <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                <Sparkles className="w-4 h-4" />
                                <span>Generate Proposal</span>
                                <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Hint tags */}
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-2 mt-4 justify-center"
                >
                    {["Mountain retreat", "Beach offsite", "City conference", "Team building"].map((tag) => (
                        <button
                        key={tag}
                        onClick={() => {
                            setQuery(`${tag} for my team`);
                            setCharCount(`${tag} for my team`.length);
                        }}
                        className="text-xs font-mono text-obsidian-500 hover:text-champagne-400 border border-white/6 hover:border-champagne-600/30 px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-champagne-500/5"
                        >
                            {tag}
                        </button>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
