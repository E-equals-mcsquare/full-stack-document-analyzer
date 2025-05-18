import axios from "axios"

export const getRAGResponse = async (query: string) => {
    try {
        const response = await axios.get(`${process.env.PYTHON_API_URL}/qa`, { params: { q: query } });
        return response.data;
    } catch (error) {
        console.error("Error fetching RAG response:", error);
        throw error;
    }
}