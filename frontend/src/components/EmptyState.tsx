"use client";

import { motion } from "framer-motion";
import { Wind } from "lucide-react";

export default function EmptyState({ message }: { message: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 px-6 flex flex-col items-center"
        >
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                <Wind size={40} className="text-white/20" />
            </div>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-2">
                Quiet in here...
            </h3>
            <p className="text-white/30 text-sm max-w-xs mx-auto leading-relaxed">
                {message}
            </p>
        </motion.div>
    );
}
