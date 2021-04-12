const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.send('You are on Register Page');
});

module.exports = router