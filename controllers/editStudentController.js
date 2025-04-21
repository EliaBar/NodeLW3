const studentRepo = require('../repositories/studentRepositoryDB');

exports.editStudent = async (req, res) => {
  const { studentName, oldName, group } = req.body;

  try {
    console.log('Old Name:', oldName);
    console.log('New Name:', studentName);
    console.log('Group:', group);

    const student = await studentRepo.getStudentByNameAndGroup(oldName, group);
    console.log('Found Student:', student);

    if (!student) {
      return res.status(404).send('Student not found');
    }

    await studentRepo.updateStudentName(student.id, studentName);

    res.redirect(`/admin/search?group=${encodeURIComponent(group)}`);
  } catch (err) {
    console.error('Error updating student:', err.message, err.stack);
    res.status(500).send('Failed to update student');
  }
};
