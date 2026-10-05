const API_BASE_URL = "http://localhost:3000/api";

export const api = {
    post: async (endpoint: string, data: unknown) => {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    get: async (endpoint: string, token: string) => {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.json();
    },
};
