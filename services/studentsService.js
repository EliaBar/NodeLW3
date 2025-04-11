const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

router.get('/admin', (req, res) => {
    res.render('admin', { students: null, selectedGroup: "" });
});


router.post('/admin/search', studentsController.searchStudents);
router.get('/admin/search', studentsController.searchStudents);


router.get('/student', (req, res) => {
    res.render('student', { students: null, selectedGroup: "" });
});

router.post('/student/search', studentsController.searchStudents);

const addStudentController = require('../controllers/addStudentController');
const addGroupController = require('../controllers/addGroupController');
const editStudentController = require('../controllers/editStudentController');
const deleteStudentController = require('../controllers/deleteStudentController');

router.post('/admin/add-student', addStudentController.addStudent);
router.post('/admin/add-group', addGroupController.addGroup);
router.post('/admin/edit', editStudentController.editStudent);
router.post('/admin/delete', deleteStudentController.deleteStudent);


module.exports = router;