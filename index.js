const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Database connection 
mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true }, 
    () => console.log('MongoDB is connected!')
);

//Importing Routes
const authRouter = require('./routers/auth');

//Setting Routes
app.use('/api/user', authRouter);

// Listing on port
app.listen(3000, () => console.log('Server is running'));