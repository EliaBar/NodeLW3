const authService = require('../services/authService');
 
 exports.loginPage = (req, res) => {
     res.render('login', { error: null });
 };
 
 exports.login = (req, res) => {
     const { username, password } = req.body;
     const user = authService.authenticate(username, password);
 
     if (user) {
         if (user.role === 'admin') {
             res.redirect('/admin');
         } else {
             res.redirect('/student');
         }
     } else {
         res.render('login', { error: 'Невірний логін або пароль' });
     }
 };
