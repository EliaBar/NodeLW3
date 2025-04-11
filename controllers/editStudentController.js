const { getStudents, saveStudentsSync } = require('../repositories/studentRepository');

exports.editStudent = (req, res) => {
  const { studentName, oldName, group } = req.body;

  getStudents((err, students) => {
    if (err) {
      console.error("Read error:", err);
      return res.status(500).send('Failed to read student data');
    }

    if (students[group]) {
      const student = students[group].find(s => s.name === oldName);

      if (student) {
        student.name = studentName;
        saveStudentsSync(students); 
        return res.redirect(`/admin/search?group=${encodeURIComponent(group)}`);
      } else {
        return res.status(404).send('Student not found');
      }
    } else {
      return res.status(404).send('Group not found');
    }
  });
};

