const { getStudentsAsync, saveStudentsSync } = require('../repositories/studentRepository');

exports.deleteStudent = async (req, res) => {
  const { studentName, group } = req.body;

  try {
    const students = await getStudentsAsync();

    if (!students[group]) {
      return res.status(404).send('Group not found');
    }

    students[group] = students[group].filter(s => s.name !== studentName);

    saveStudentsSync(students); 
    res.redirect(`/admin/search?group=${encodeURIComponent(group)}`);
  } catch (err) {
    console.error("Read error:", err);
    res.status(500).send('Failed to read student data');
  }
};
