const { getStudentsSync, saveStudentsSync } = require('../repositories/studentRepository');

exports.editStudent = (req, res) => {
  const { studentName, oldName, group } = req.body;
  const students = getStudentsSync();  

  console.log("studentName:", studentName);
  console.log("oldName:", oldName);
  console.log("group:", group);

  if (students[group]) {
    const student = students[group].find(s => s.name === oldName);

    if (student) {
      student.name = studentName;
      saveStudentsSync(students);  
      res.redirect(`/admin/search?group=${encodeURIComponent(group)}`);
    } else {
      return res.status(404).send('Student not found');
    }
  } else {
    return res.status(404).send('Group not found');
  }
};
