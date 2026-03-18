import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

function App() {
    return (
        <Router>
            <Toaster
            position="bottom-right"
            gutter={12}
            toastOptions={{
                duration: 4000,
                style: {
                    background: "#16160f",
                    color: "#e8e8df",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontFamily: "'DM Sans', sans-serif",
                    padding: "12px 16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                },
                success: {
                    iconTheme: { primary: "#e2be42", secondary: "#0e0e0a" },
                    style: {
                    borderColor: "rgba(226,190,66,0.2)",
                    },
                },
                error: {
                    iconTheme: { primary: "#f87171", secondary: "#0e0e0a" },
                    style: {
                    borderColor: "rgba(248,113,113,0.2)",
                    },
                },
            }}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                path="*"
                element={
                    <div className="min-h-screen bg-[#0e0e0a] flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="font-display text-6xl text-champagne-500 mb-4">404</h1>
                            <p className="text-obsidian-400 font-sans mb-6">Page not found</p>
                            <a href="/" className="btn-ghost text-sm">
                                ← Return Home
                            </a>
                        </div>
                    </div>
                }
                />
            </Routes>
        </Router>
    );
}

export default App;
