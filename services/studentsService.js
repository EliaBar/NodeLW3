const express = require('express');
const router = express.Router();
const studensController = require('../controllers/studentsController');

router.get('/admin', (req, res) => {
    res.render('admin', { students: null });
});

router.post('/admin/search', studensController.searchStudents);

module.exports = router;
