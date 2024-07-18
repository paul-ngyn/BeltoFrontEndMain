import express, { ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 1234; // Use environment variable or default

app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*' // Restrict in production
}));

// Endpoint to get models
app.get('/v1/models', (req, res) => {
    // Logic to retrieve and send models
    res.json({ models: [] }); // Replace with actual model data
});

// Endpoint to create chat completion
app.post('/v1/chat/completions', (req, res) => {
    const { model, messages, temperature } = req.body;
    // Logic to handle chat completion creation
    res.status(201).send(); // Replace with actual response
});

// Endpoint to create a completion
app.post('/v1/completions', (req, res) => {
    const { text, sender } = req.body;
    // Logic to handle completion creation
    res.status(201).send(); // Replace with actual response
});

// Endpoint to create an embedding
app.post('/v1/embeddings', (req, res) => {
    const { text, sender } = req.body;
    // Logic to handle embedding creation
    res.status(201).send(); // Replace with actual response
});

// Simple error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});