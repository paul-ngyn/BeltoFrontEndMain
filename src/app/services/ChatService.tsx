import axios from 'axios';

const API_BASE_URL = "http://localhost:1234/v1";

class ChatService {

    getModels(){
        return axios.get(`${API_BASE_URL}/models`);
    }

    createChatCompletion(chat: { text: string; sender: string; model: string; temperature: number; messages: any[] }) {
        return axios.post(`${API_BASE_URL}/chat/completions`, {
            model: chat.model,
            messages: chat.messages,
            temperature: chat.temperature
        });
    }

    createCompletion(chat: { text: string; sender: string; }){
        return axios.post(`${API_BASE_URL}/completions`, chat);
    }

    createEmbedding(chat: { text: string; sender: string; }){
        return axios.post(`${API_BASE_URL}/embeddings`, chat);
    }
}

export default new ChatService();