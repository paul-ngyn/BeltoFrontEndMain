import axios from 'axios';

const API_BASE_URL = "http://localhost:1234/v1";

class ChatService {

    getModels(){
        return axios.get(`${API_BASE_URL}/models`);
    }

    createChatCompletion(chat: {
        model: string;
        messages: { role: string; content: string; }[];
        temperature: number;
    }) {
        // Construct the data payload as the backend expects it
        const data = {
            model: chat.model,
            messages: chat.messages, // This should already be in the correct format
            temperature: chat.temperature
        };
        return axios.post(`${API_BASE_URL}/chat/completions`, data);
    }

    createCompletion(chat: { text: string; sender: string; }){
        return axios.post(`${API_BASE_URL}/completions`, chat);
    }

    createEmbedding(chat: { text: string; sender: string; }){
        return axios.post(`${API_BASE_URL}/embeddings`, chat);
    }
}

export default new ChatService();