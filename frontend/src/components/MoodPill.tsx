"use client";

import { motion } from "framer-motion";
import {
    Smile,
    CloudRain,
    Wind,
    User,
    AlertCircle,
    MinusCircle,
    Heart,
    HelpCircle
} from "lucide-react";

export default function MoodPill({
    mood,
    active = false,
    onClick,
    isTag = false
}: {
    mood: string;
    active?: boolean;
    onClick?: () => void;
    isTag?: boolean;
}) {
    const moodConfig: Record<string, { color: string; icon: any }> = {
        Sad: { color: "text-blue-400 bg-blue-400/5 border-blue-400/10", icon: CloudRain },
        Calm: { color: "text-teal-400 bg-teal-400/5 border-teal-400/10", icon: Wind },
        Lonely: { color: "text-indigo-400 bg-indigo-400/5 border-indigo-400/10", icon: User },
        Stressed: { color: "text-orange-400 bg-orange-400/5 border-orange-400/10", icon: AlertCircle },
        Hopeless: { color: "text-gray-400 bg-gray-400/5 border-gray-400/10", icon: MinusCircle },
        Hopeful: { color: "text-pink-400 bg-pink-400/5 border-pink-400/10", icon: Heart },
        Neutral: { color: "text-purple-400 bg-purple-400/5 border-purple-400/10", icon: Smile },
        All: { color: "text-white/70 bg-white/5 border-white/10", icon: HelpCircle },
    };

    const config = moodConfig[mood] || moodConfig.Neutral;
    const Icon = config.icon;

    return (
        <motion.button
            whileHover={!isTag ? { scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" } : {}}
            whileTap={!isTag ? { scale: 0.98 } : {}}
            onClick={onClick}
            disabled={isTag}
            className={`pill ${isTag ? 'cursor-default' : 'cursor-pointer'} ${config.color} ${active ? 'pill-active ring-1 ring-white/20 !bg-white/10' : ''}`}
        >
            <Icon size={14} className="opacity-70" />
            <span>{mood}</span>
        </motion.button>
    );
}
