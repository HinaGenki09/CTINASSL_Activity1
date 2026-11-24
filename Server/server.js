
const express = require('express');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET request
app.get('/', (request, response) => {
    response.status(200).send('Welcome to ChemAR API!');
});

// POST request
app.post('/greetings', (request, response) => {
    const { name, course, section } = request.body;

    response.status(200).json({
        name: name,
        course: course,
        section: section,
        message: `Hello ${name}, welcome to ChemAR!`
    });
});

// PUT request
app.put('/greetings', (request, response) => {
    const { name, course, section } = request.body;

    response.status(200).json({
        name: name,
        course: course,
        section: section,
        message: `Greeting successfully updated! Welcome back to ChemAR, ${name}!`
    });
});

// POST login request
app.post('/login', (request, response) => {
    const { username, password } = request.body;

    if (username === 'admin' && password === '1234') {
        return response.status(200).json({
            message: 'Welcome to ChemAR!'
        });
    }

    response.status(401).json({
        message: 'Invalid username or password!'
    });
});

// Start server
app.listen(8000, error => {
    if (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }

    console.log('ChemAR server running on port 8000');
});
