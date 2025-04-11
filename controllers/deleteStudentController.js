const { getStudentsSync, saveStudentsSync } = require('../repositories/studentRepository');

exports.deleteStudent = (req, res) => {
  const { studentName, group } = req.body;
  const students = getStudentsSync();

  console.log("studentName:", studentName);
  console.log("group:", group);

  if (!students[group]) {
    return res.status(404).send('Group not found');
  }

  students[group] = students[group].filter(s => s.name !== studentName);

  saveStudentsSync(students);
  res.redirect(`/admin/search?group=${encodeURIComponent(group)}`);
};
