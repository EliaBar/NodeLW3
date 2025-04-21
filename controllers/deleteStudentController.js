const studentRepo = require('../repositories/studentRepositoryDB');

exports.deleteStudent = async (req, res) => {
  const { studentName, group } = req.body;

  try {
    const student = await studentRepo.getStudentByNameAndGroup(studentName, group);

    if (!student) {
      return res.status(404).send('Student not found');
    }

    await studentRepo.deleteStudentById(student.id);

    res.redirect(`/admin/search?group=${encodeURIComponent(group)}`);
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).send('Failed to delete student');
  }
};