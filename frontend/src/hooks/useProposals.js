import { useState, useEffect, useCallback, useRef } from "react";
import { proposalAPI } from "../utils/api";
import toast from "react-hot-toast";

export const useProposals = () => {

    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [pagination, setPagination] = useState(null);
    const [stats, setStats] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchProposals = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const res = await proposalAPI.getAll(page, 8);
            if (page === 1) {
                setProposals(res.data);
            } else {
                setProposals((prev) => [...prev, ...res.data]);
            }
            setPagination(res.pagination);
            setCurrentPage(page);
        } catch (err) {
            toast.error(err.message || "Failed To Load Proposals");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchStats = useCallback(async () => {
        try {
            const res = await proposalAPI.getStats();
            setStats(res.data);
        } catch (_) {}
    }, []);

    const generateProposal = useCallback(async (userQuery) => {
        if (!userQuery?.trim() || userQuery.trim().length < 10) {
            toast.error("Please Describe Your Event In At Least 10 Characters");
            return null;
        }
        setGenerating(true);
        const toastId = toast.loading("AI Is Crafting Your Proposal...", {
            icon: "✨",
            style: { background: "#16160f", color: "#e8e8df", border: "1px solid rgba(255,255,255,0.07)" },
        });

        try {
            const res = await proposalAPI.create(userQuery.trim());
            toast.success("Proposal Ready!", { id: toastId, duration: 3000 });
            // Prepend to list
            setProposals((prev) => [res.data, ...prev]);
            setStats((prev) =>
                prev ? { ...prev, totalProposals: prev.totalProposals + 1, proposalsToday: prev.proposalsToday + 1 } : prev
            );
            return res.data;
        } catch (err) {
            toast.error(err.message, { id: toastId, duration: 5000 });
            return null;
        } finally {
            setGenerating(false);
        }
    }, []);

    const deleteProposal = useCallback(async (id) => {
        try {
            await proposalAPI.delete(id);
            setProposals((prev) => prev.filter((p) => p._id !== id));
            toast.success("Proposal Removed");
        } catch (err) {
            toast.error(err.message);
        }
    }, []);

    const loadMore = useCallback(() => {
        if (pagination?.hasMore && !loading) {
            fetchProposals(currentPage + 1);
        }
    }, [pagination, loading, currentPage, fetchProposals]);

    useEffect(() => {
        fetchProposals(1);
        fetchStats();
    }, [fetchProposals, fetchStats]);

    return {
        proposals,
        loading,
        generating,
        pagination,
        stats,
        generateProposal,
        deleteProposal,
        loadMore,
        refetch: () => fetchProposals(1),
    };
};
