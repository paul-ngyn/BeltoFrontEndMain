import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:6968";


    class ChatService {

        
        createCompletion(chat: { text: string; sender: string; }) {
            const prompt = chat.text; //Extract the prompt from the chat object
            const n_predict = 300; // I am setting a a value of 200tokens for n_predict
            const stream = false;  // added this which allows to se if streaming with cors 
        
            return axios.post(`${API_BASE_URL}/completion`, {
                prompt, // return the prompt
                n_predict, //return the n_predict
                stream //return the stream option
            });
        }
//This is the original code that was in the ChatService.tsx file, It is unsed in the current implementation
//I am commenting it out to avoid confusion because I just need to get create completion working
//     getModels(){
//         return axios.get(`${API_BASE_URL}/models`);
//     }

//     createChatCompletion(chat: { text: string; sender: string; }){
//         return axios.post(`${API_BASE_URL}/chat/completions`, chat);
//     }

//     createCompletion(chat: { text: string; sender: string; }){
//         return axios.post(`${API_BASE_URL}/completions`, chat);
//     }

//     createEmbedding(chat: { text: string; sender: string; }){
//         return axios.post(`${API_BASE_URL}/embeddings`, chat);
//     }
}

export default new ChatService();