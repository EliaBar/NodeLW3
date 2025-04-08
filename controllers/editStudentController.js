const { getStudentsSync, saveStudentsSync } = require('../repositories/studentRepository');

exports.editStudent = (req, res) => {
  const { studentId, studentName, group } = req.body;  // Отримуємо studentId, studentName та group
  const students = getStudentsSync();  // Отримуємо всі студенти з файлу

  // Перевіряємо, чи є така група
  if (students[group]) {
    // Перевіряємо, чи є студент з таким індексом у групі
    const student = students[group][studentId];  // Використовуємо studentId як індекс

    if (student) {
      // Якщо студент знайдений, змінюємо його ім'я
      student.name = studentName;
      saveStudentsSync(students);  // Зберігаємо зміни
      return res.redirect(`/admin/search?group=${group}`);  // Перенаправляємо на сторінку пошуку групи
    } else {
      return res.status(404).send('Student not found');  // Якщо студента не знайдено
    }
  } else {
    return res.status(404).send('Group not found');  // Якщо група не знайдена
  }
};
