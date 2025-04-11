const fs = require("fs");
const path = require("path");
const studentsFile = path.join(__dirname, "../data/students.json");

async function getStudentsWithAsync() {
  const data = await fs.promises.readFile(studentsFile, "utf-8");
  return JSON.parse(data);
}
exports.searchStudents = async (req, res) => {
  const group = (req.body && req.body.group) || (req.query && req.query.group);
  let students = [];
  let message = null;

  try {
    const allStudents = await getStudentsWithAsync();
    const isGroupSearch = group.length >= 3 && group[2] === "-";
    const isAdminRoute = req.originalUrl.includes("/admin");

    if (isGroupSearch) {
      if (allStudents.hasOwnProperty(group)) {
        students = allStudents[group];
        if (students.length === 0) {
          message = `У групі ${group} немає студентів у групі. Додайте студентів.`;
        }
      } else {
        message = `Групу ${group} не знайдено.`;
      }
    } else {
      // Пошук за прізвищем
      for (const groupName in allStudents) {
        allStudents[groupName].forEach((student) => {
          const lastName = student.name.split(" ")[0];
          if (lastName.toLowerCase() === group.toLowerCase()) {
            students.push({ name: student.name, group: groupName });
          }
        });
      }
      if (students.length === 0) {
        message = `Студентів з прізвищем "${group}" не знайдено.`;
      }
    }

    res.render(isAdminRoute ? "admin" : "student", {
      students,
      selectedGroup: group,
      message,
      error: null,
    });
  } catch (err) {
    const isAdminRoute = req.originalUrl.includes("/admin");
    res.render(isAdminRoute ? "admin" : "student", {
      error: "Помилка читання файлу",
      students: [],
      selectedGroup: group,
      message: null,
    });
  }
};
