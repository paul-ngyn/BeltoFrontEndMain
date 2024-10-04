// Import necessary libraries and modules
import express from 'express'; 
import bodyParser from 'body-parser'; 
import path from 'path'; 
import { fileURLToPath } from 'url'; 
import fetch from 'node-fetch';
//Cors is necessary because the frontend and backend are on different origins 
import cors from 'cors'; // Middleware to enable Cross Resource Sharing 

//

const app = express();
const port = 6968; 

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Enable CORS for all routes (Important for frontend-backend communication across different origins)
// I added this
app.use(cors());

// Determine the directory name 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

//Beginning of data structure for chat history
let chatHistory = [
    { role: "system", content: "You are ChatGPT, an AI assistant. Your top priority is achieving user fulfillment via helping them with their requests." }
];

//Ask Michael if we should create User ID for each user and make the data structure like this
//Could look something like this
// const chatHistories = new Map();
// function getChatHistory(userId) {
//     if (!chatHistories.has(userId)) {
//         chatHistories.set(userId, [
//             { role: "system", 
//              content: "You are ChatGPT, an AI assistant. Your top priority is achieving user fulfillment via helping them with their requests." }
//]);
//     }
//     return chatHistories.get(userId);
// }


// Function to fetch completion from the v1/chat/completions endpoint
async function fetchCompletion(prompt, n_predict, stream) {
    // Send a POST request to the external API with the user's prompt 

    const response = await fetch("http://71.84.222.196:8080/v1/chat/completions", {
        method: 'POST',
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // Model for generating the completion

            messages: [
                { role: "system", content: "You are ChatGPT, an AI assistant..." }, 
                { role: "user", content: prompt } 
            ],
            
            //Use the full chat history instead of prompts 
            // messages : messages,

            n_predict, //tokens
            stream // Whether to stream 
        }),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer no-key' } 
    });
    //I added this to handle errors from the API
    // If the response is not OK, throw an error 
    
    if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
    }

    // Return the response object
    return response;
}

// POST endpoint to handle completion requests
app.post('/completion', async (req, res) => {
    const { prompt, n_predict, stream } = req.body; // Extract from the request body
    // Log the client's IP address
    console.log('Client IP:', req.ip); 

    //Add the user's message to the chat history
    chatHistory.push({ role: "user", content: prompt });

    try {
        const response = await fetchCompletion(prompt, n_predict, stream); // Fetch completion from the external API
        //I added this to handle streaming responses instead of res.setHeader automatically
        if (stream) {
            // If streaming is enabled sned the response to client
            res.setHeader('Content-Type', 'text/plain'); // Set content type to plain text
            response.body.pipe(res); //Added pipe to send the response to the client
        } else {
            // If not streaming, handle the response as JSON object
            const data = await response.json(); // Parse the JSON response

            res.json({ content: data.choices[0].message.content }); // Send the completion content to the client
        }
    } catch (error) {
        // Handle any errors
        console.error('Error in completion request:', error);
    }
});

// Start the server and listen on the specified port
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`); // Log that the server is running
});
