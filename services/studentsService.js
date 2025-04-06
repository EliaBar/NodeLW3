const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

router.get('/admin', (req, res) => {
    res.render('admin', { students: null, selectedGroup: "" });
});

router.post('/admin/search', studentsController.searchStudents);

router.get('/student', (req, res) => {
    res.render('student', { students: null, selectedGroup: "" });
});

router.post('/student/search', studentsController.searchStudents);

module.exports = router;
