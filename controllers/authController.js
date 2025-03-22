const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('login');
});


exports.loginPage = (req, res) => {
    res.render('login', { error: null }); // Передаємо error, щоб уникнути undefined
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = authService.authenticate(username, password);

    if (user) {
        if (user.role === 'admin') {
            res.render('admin', { error: null });
        } else {
            res.render('student');
        }
    } else {
        res.render('login', { error: 'Невірні дані' });
    }
});

router.post('/admin', (req, res)=>{
    res.render('admin', { error: null });
});

module.exports = router;