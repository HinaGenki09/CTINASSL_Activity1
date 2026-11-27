
const express = require('express');
const connectDB = require('./Components/config/dbConnect');
const userRouter = require('./Components/router/userRouter');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.get('/', (request, response) => {
    response.status(200).send('Welcome to ChemAR API!');
});

app.listen(8000, error => {
    if (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }

    console.log('Server running on port 8000');
});
