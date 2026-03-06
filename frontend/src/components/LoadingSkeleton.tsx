"use client";

import { motion } from "framer-motion";

export function WhisperSkeleton() {
    return (
        <div className="glass-card mb-6 animate-pulse">
            <div className="flex justify-between items-center mb-6">
                <div className="h-8 w-24 bg-white/5 rounded-full" />
                <div className="h-6 w-32 bg-white/5 rounded-full" />
            </div>
            <div className="space-y-3 mb-8">
                <div className="h-4 w-full bg-white/5 rounded-full" />
                <div className="h-4 w-5/6 bg-white/5 rounded-full" />
            </div>
            <div className="flex justify-between items-center">
                <div className="h-10 w-16 bg-white/5 rounded-xl" />
                <div className="h-4 w-32 bg-white/5 rounded-full" />
            </div>
        </div>
    );
}

export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-[1.5rem] p-6 text-left">
                    <div className="h-4 w-20 bg-white/5 rounded-full mb-3" />
                    <div className="h-8 w-24 bg-white/5 rounded-full" />
                </div>
            ))}
        </div>
    );
}
