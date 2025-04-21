const studentRepo = require('../repositories/studentRepositoryDB');

exports.addStudent = async (req, res) => {
  const { studentName, group } = req.body;

  try {
    const groupRecord = await studentRepo.getGroupByName(group);

    if (!groupRecord) {
      return res.status(404).send('Group not found');
    }

    await studentRepo.addStudent(studentName, groupRecord.id);

    res.redirect(`/admin/search?group=${encodeURIComponent(group)}`);
  } catch (err) {
    console.error("Add error:", err.message);
    res.status(500).send('Failed to add student');
  }
};
