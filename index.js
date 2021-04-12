const express = require('express');
const cors = require('cors');
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Importing Routes
const authRouter = require('./routers/auth');

//Setting Routes
app.use('/api/user', authRouter);

// Listing on port
app.listen(3000, () => console.log('Server is running'));