const {
  getStudentsSync,
  saveStudentsSync,
} = require("../repositories/studentRepository");

exports.addStudent = (req, res) => {
  const { studentName, group } = req.body;
  
  const students = getStudentsSync();
  if (!students[group]) students[group] = [];
  students[group].push({ name: studentName });
  students[group].sort((a, b) => a.name.localeCompare(b.name));
  saveStudentsSync(students);
  res.redirect(`/admin/search?group=${encodeURIComponent(group)}`);
};
