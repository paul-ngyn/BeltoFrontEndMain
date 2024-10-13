// Import necessary libraries and modules
import express from 'express'; 
import bodyParser from 'body-parser'; 
import path from 'path'; 
import { fileURLToPath } from 'url'; 
import fetch from 'node-fetch';
import cors from 'cors'; // Middleware to enable Cross Resource Sharing
import { MongoClient } from 'mongodb'; // MongoDB client
import dotenv from 'dotenv'; // Load environment variables

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Use the PORT from the .env file or default to 3000

// MongoDB connection details from .env
const url = process.env.MONGO_URI;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'local_test';

// Connect to MongoDB
client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
        const db = client.db(dbName);

        // You can now use the `db` object for CRUD operations within this block or pass it to routes
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Enable CORS for all routes (Important for frontend-backend communication across different origins)
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
            
            // Use the full chat history instead of prompts 
            // messages: messages,

            n_predict, // tokens
            stream // Whether to stream 
        }),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer no-key' } 
    });

    // Handle errors from the API
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

    // Add the user's message to the chat history
    chatHistory.push({ role: "user", content: prompt });

    try {
        const response = await fetchCompletion(prompt, n_predict, stream); // Fetch completion from the external API
        if (stream) {
            // If streaming is enabled, send the response to client
            res.setHeader('Content-Type', 'text/plain'); // Set content type to plain text
            response.body.pipe(res); // Pipe to send the response to the client
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