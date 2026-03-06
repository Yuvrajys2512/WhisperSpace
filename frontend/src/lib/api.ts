const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = {
    async getWhispers(mood?: string) {
        const url =
            mood && mood !== "All"
                ? `${API_URL}/whispers/?mood=${mood.toLowerCase()}`
                : `${API_URL}/whispers/`;

        const res = await fetch(url);
        return res.json();
    },

    async createWhisper(content: string) {
        const res = await fetch(`${API_URL}/whispers/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        });

        return res.json();
    },

    async createReply(id: string, content: string) {
        const res = await fetch(`${API_URL}/whispers/${id}/replies/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        });

        return res.json();
    },

    async getStats() {
        const res = await fetch(`${API_URL}/stats`);
        return res.json();
    },
};