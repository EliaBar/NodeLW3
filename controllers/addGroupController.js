const studentRepo = require('../repositories/studentRepositoryDB');

exports.addGroup = async (req, res) => {
  const { groupName } = req.body;

  try {
    const existingGroup = await studentRepo.getGroupByName(groupName);

    if (!existingGroup) {
      await studentRepo.addGroup(groupName);
    }

    res.redirect('/admin');
  } catch (err) {
    console.error("Add group error:", err.message);
    res.status(500).send('Failed to add group');
  }
};