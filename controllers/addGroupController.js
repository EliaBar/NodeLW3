const {
  getStudentsSync,
  saveStudentsSync,
} = require("../repositories/studentRepository.js");

exports.addGroup = (req, res) => {
  const { groupName } = req.body;
  const students = getStudentsSync();
  if (!students[groupName]) {
    students[groupName] = [];
    saveStudentsSync(students);
    group = groupName;
  }
  res.redirect("/admin");
};
