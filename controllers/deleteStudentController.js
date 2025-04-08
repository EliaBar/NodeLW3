const { getStudentsSync, saveStudentsSync } = require('../repositories/studentRepository');

exports.deleteStudent = (req, res) => {
  const { studentId } = req.body;
  const students = getStudentsSync();

  for (const group in students) {
    students[group] = students[group].filter((_, index) => index.toString() !== studentId);
  }

  saveStudentsSync(students);
  res.redirect('/admin');
};
