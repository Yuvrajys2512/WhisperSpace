// src/utils/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Helper to handle the "Unexpected token <" error gracefully
async function safeFetch(url: string, options?: RequestInit) {
    const res = await fetch(url, options);

    // If we get HTML instead of JSON (a 404/502), this will tell us exactly why
    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error(`API Error at ${url}: Status ${res.status}`, text.slice(0, 100));
        throw new Error(`Server returned ${res.status} (likely not JSON)`);
    }

    return res.json();
}

export const api = {
    async getWhispers(mood?: string) {
        // Removed trailing slashes to match FastAPI exactly
        const url = mood && mood !== "All"
            ? `${API_URL}/whispers?mood=${mood.toLowerCase()}`
            : `${API_URL}/whispers`;
        return safeFetch(url);
    },

    async createWhisper(content: string) {
        return safeFetch(`${API_URL}/whispers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
        });
    },

    async createReply(id: string, content: string) {
        return safeFetch(`${API_URL}/whispers/${id}/replies`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
        });
    },

    async getStats() {
        return safeFetch(`${API_URL}/stats`);
    },
};