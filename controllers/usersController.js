exports.studentPage = (req, res) => {
  res.render("student");
};
exports.adminPage = (req, res) => {
  const selectedGroup = req.query.selectedGroup || "";
  const students = getStudentsSync();
  const groupStudents =
    selectedGroup && students[selectedGroup] ? students[selectedGroup] : [];

  res.render("admin", {
    selectedGroup,
    students: groupStudents,
  });
};
