const express = require('express');

const router = express.Router();

//Make a connection to pages
router.get('/', (req, res) => {
    res.render('register');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;