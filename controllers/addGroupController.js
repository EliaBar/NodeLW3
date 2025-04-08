const { getStudentsSync, saveStudentsSync } = require('../repositories/studentRepository.js');

exports.addGroup = (req, res) => {
  const { groupName } = req.body;
  const students = getStudentsSync();

  if (!students[groupName]) {
    students[groupName] = [];
    saveStudentsSync(students);
  }

  res.redirect(`/admin?newGroup=true&selectedGroup=${encodeURIComponent(groupName)}`);
};
