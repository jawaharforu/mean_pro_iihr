const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/login', (req, res, next) => {
    res.send('login');
});

module.exports = router;