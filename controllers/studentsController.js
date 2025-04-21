const studentRepo = require('../repositories/studentRepositoryDB'); 

exports.searchStudents = async (req, res) => {
  const groupOrLastName = (req.body && req.body.group) || (req.query && req.query.group) || '';
  const isAdminRoute = req.originalUrl.includes('/admin');
  let students = [];
  let message = null;

  try {
    console.log('Обрана група або прізвище:', groupOrLastName);
    const allStudentsGrouped = await studentRepo.getAllStudentsGroupedByGroup();

    const isGroupSearch = groupOrLastName.length >= 3 && groupOrLastName[2] === '-';

    if (isGroupSearch) {
      // Пошук по назві групи
      if (allStudentsGrouped.hasOwnProperty(groupOrLastName)) {
        students = allStudentsGrouped[groupOrLastName];
        if (students.length === 0) {
          message = `У групі ${groupOrLastName} немає студентів.`;
        }
      } else {
        message = `Групу ${groupOrLastName} не знайдено.`;
      }
    } else {
      // Пошук по прізвищу
      for (const groupName in allStudentsGrouped) {
        allStudentsGrouped[groupName].forEach(student => {
          const lastName = student.name.split(' ')[0];
          if (lastName.toLowerCase() === groupOrLastName.toLowerCase()) {
            students.push({ name: student.name, group: groupName });
          }
        });
      }

      if (students.length === 0) {
        message = `Студентів з прізвищем "${groupOrLastName}" не знайдено.`;
      }
    }

    res.render(isAdminRoute ? 'admin' : 'student', {
      students,
      selectedGroup: groupOrLastName,
      message,
      error: null
    });

  } catch (err) {
    console.error('Помилка при обробці запиту:', err);
    res.render(isAdminRoute ? 'admin' : 'student', {
      students: [],
      selectedGroup: groupOrLastName,
      message: null,
      error: 'Помилка зчитування з бази'
    });
  }
};