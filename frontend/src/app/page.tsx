"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MoodPill from "@/components/MoodPill";
import WhisperCard from "@/components/WhisperCard";
import EmptyState from "@/components/EmptyState";
import { WhisperSkeleton, StatsSkeleton } from "@/components/LoadingSkeleton";
import { api } from "@/lib/api";
import { Send, Shield, Sparkles, MessageSquare, Zap } from "lucide-react";

const MOODS = ["All", "Sad", "Calm", "Lonely", "Stressed", "Hopeless", "Hopeful"];

export default function Home() {
    const [whispers, setWhispers] = useState([]);
    const [activeMood, setActiveMood] = useState("All");
    const [newWhisper, setNewWhisper] = useState("");
    const [stats, setStats] = useState({ total_whispers: 0, total_replies: 0, safety_moderation: "99.9%" });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchWhispers = async () => {
        setIsLoading(true);
        try {
            const data = await api.getWhispers(activeMood);
            setWhispers(data);
        } catch (error) {
            console.error("Failed to fetch whispers", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const data = await api.getStats();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch stats", error);
        }
    };

    useEffect(() => {
        fetchWhispers();
        fetchStats();
    }, [activeMood]);

    const handleSubmitWhisper = async () => {
        if (!newWhisper.trim()) return;
        setIsSubmitting(true);
        try {
            await api.createWhisper(newWhisper);
            setNewWhisper("");
            fetchWhispers();
            fetchStats();
        } catch (error) {
            alert("Error: " + (error as any).message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReply = async (id: string, content: string) => {
        try {
            await api.createReply(id, content);
            // Re-fetch only if necessary or update local state
            fetchWhispers();
            fetchStats();
        } catch (error) {
            alert("Error: " + (error as any).message);
        }
    };

    return (
        <main className="max-w-4xl mx-auto px-6 py-12 md:py-24">
            {/* Hero Section */}
            <header className="text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-purple-400 mb-8"
                >
                    <Sparkles size={14} />
                    <span>Your Anonymous Sanctuary</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-8xl font-black mb-8 tracking-tighter hero-gradient leading-tight"
                >
                    WhisperSpace
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-white/50 font-medium max-w-xl mx-auto leading-relaxed"
                >
                    A safe place to share what's on your mind. Stay completely anonymous, receive genuine encouragement.
                </motion.p>
            </header>

            {/* Stats Section */}
            <section className="mb-24">
                {isLoading && whispers.length === 0 ? (
                    <StatsSkeleton />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass rounded-[1.5rem] p-6 border-white/[0.05]"
                        >
                            <div className="flex items-center gap-3 mb-3 text-purple-400">
                                <MessageSquare size={18} />
                                <span className="text-xs font-bold uppercase tracking-widest text-white/30">Total Whispers</span>
                            </div>
                            <p className="text-4xl font-black tracking-tighter">{stats.total_whispers.toLocaleString()}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass rounded-[1.5rem] p-6 border-white/[0.05]"
                        >
                            <div className="flex items-center gap-3 mb-3 text-pink-400">
                                <Zap size={18} />
                                <span className="text-xs font-bold uppercase tracking-widest text-white/30">Support Given</span>
                            </div>
                            <p className="text-4xl font-black tracking-tighter">{stats.total_replies.toLocaleString()}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass rounded-[1.5rem] p-6 border-white/[0.05]"
                        >
                            <div className="flex items-center gap-3 mb-3 text-green-400">
                                <Shield size={18} />
                                <span className="text-xs font-bold uppercase tracking-widest text-white/30">Platform Safety</span>
                            </div>
                            <p className="text-4xl font-black tracking-tighter">{stats.safety_moderation}</p>
                        </motion.div>
                    </div>
                )}
            </section>

            {/* Submission Form */}
            <section className="mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card relative overflow-hidden group border-white/10"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <MessageSquare size={120} />
                    </div>

                    <textarea
                        value={newWhisper}
                        onChange={(e) => setNewWhisper(e.target.value)}
                        placeholder="What are you feeling right now?"
                        className="w-full bg-transparent text-2xl md:text-3xl text-white/90 placeholder:text-white/10 resize-none h-40 focus:outline-none font-medium leading-tight"
                        maxLength={500}
                    />

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8 pt-8 border-t border-white/[0.05]">
                        <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold tracking-widest ${newWhisper.length > 450 ? 'text-orange-400' : 'text-white/20'}`}>
                                {newWhisper.length} <span className="opacity-50">/ 500</span>
                            </span>
                        </div>
                        <button
                            onClick={handleSubmitWhisper}
                            disabled={isSubmitting || !newWhisper.trim()}
                            className="w-full md:w-auto bg-white text-black px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        >
                            {isSubmitting ? (
                                <>
                                    <Sparkles size={18} className="animate-spin" />
                                    <span>Whispering...</span>
                                </>
                            ) : (
                                <>
                                    <span>Send Whisper</span>
                                    <Send size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Filters */}
            <section className="flex flex-wrap items-center gap-3 mb-12">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/20 mr-2">Filter by</span>
                <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide flex-1">
                    {MOODS.map((mood) => (
                        <MoodPill
                            key={mood}
                            mood={mood}
                            active={activeMood === mood}
                            onClick={() => setActiveMood(mood)}
                        />
                    ))}
                </div>
            </section>

            {/* Feed */}
            <section className="min-h-[400px]">
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        [1, 2, 3].map((i) => <WhisperSkeleton key={i} />)
                    ) : whispers.length > 0 ? (
                        whispers.map((whisper: any) => (
                            <WhisperCard
                                key={whisper.id}
                                whisper={whisper}
                                onReply={handleReply}
                            />
                        ))
                    ) : (
                        <EmptyState message={`No whispers found in the ${activeMood === 'All' ? 'repository' : activeMood.toLowerCase() + ' category'}.`} />
                    )}
                </AnimatePresence>
            </section>

            <footer className="mt-40 text-center pb-12">
                <p className="text-white/10 text-[10px] font-bold uppercase tracking-[0.3em]">
                    WhisperSpace • Anonymous Support Platform
                </p>
            </footer>
        </main>
    );
}
