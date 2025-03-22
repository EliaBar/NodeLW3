const express = require('express');
const app = express();
const authRouter = require('./controllers/authController');

app.use(express.urlencoded({ extended: true })); // Для отримання даних з форми
app.set('view engine', 'ejs');

app.use('/', authRouter);

app.listen(3000, () => console.log('Сервер запущено на порту 3000'));
