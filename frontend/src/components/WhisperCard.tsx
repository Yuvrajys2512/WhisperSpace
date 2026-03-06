"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MoodPill from "./MoodPill";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Send, Clock, Loader2 } from "lucide-react";

export default function WhisperCard({ whisper, onReply }: { whisper: any; onReply: (id: string, content: string) => void }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSendReply = async () => {
        if (!replyContent.trim()) return;
        setIsSending(true);
        await onReply(whisper.id, replyContent);
        setReplyContent("");
        setIsSending(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card mb-6 group"
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    {whisper.mood ? (
                        <MoodPill mood={whisper.mood} isTag={true} />
                    ) : (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/40">
                            <Loader2 size={10} className="animate-spin" />
                            Detecting mood...
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-white/30 bg-white/5 px-3 py-1 rounded-full">
                    <Clock size={12} />
                    {formatDistanceToNow(new Date(whisper.created_at.replace(" ", "T") + "Z"))} ago
                </div>
            </div>

            <p className="text-xl leading-relaxed mb-8 text-white/90 font-medium selection:bg-purple-500/30">
                {whisper.content}
            </p>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-white/60 transition-all active:scale-95"
                    >
                        <MessageCircle size={16} className={whisper.replies?.length > 0 ? "text-purple-400" : ""} />
                        <span>{whisper.replies?.length || 0}</span>
                    </button>
                </div>

                {!isExpanded && (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="text-xs font-bold uppercase tracking-widest text-white/20 hover:text-white/40 transition-colors"
                    >
                        Support this whisper
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-8 pt-8 border-t border-white/[0.05] space-y-4">
                            {whisper.replies?.length > 0 ? (
                                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
                                    {whisper.replies.map((reply: any) => (
                                        <motion.div
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            key={reply.id}
                                            className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 text-sm text-white/70 leading-relaxed"
                                        >
                                            {reply.content}
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center py-4 text-white/20 text-xs italic">
                                    No replies yet. Be the first to provide support.
                                </p>
                            )}

                            <div className="relative mt-6">
                                <input
                                    type="text"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Write something supportive..."
                                    className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                                />
                                <button
                                    onClick={handleSendReply}
                                    disabled={isSending || !replyContent.trim()}
                                    className="absolute right-2 top-2 bottom-2 bg-white text-black px-4 rounded-xl text-xs font-bold hover:bg-purple-100 transition-all disabled:opacity-30 disabled:grayscale flex items-center gap-2"
                                >
                                    {isSending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                                    Send
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
