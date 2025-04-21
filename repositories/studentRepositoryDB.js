const pool = require('./db');

async function getAllStudentsGroupedByGroup() {
    try {
      const [rows] = await pool.query(`
        SELECT g.group_name, s.name_ AS name
        FROM groups_ g
        LEFT JOIN student s ON g.id = s.group_id
        ORDER BY g.group_name, s.name_
      `);
  
      const grouped = {};
  
      // Перевірка, чи є дані в rows
      if (!rows || rows.length === 0) {
        console.log("Не знайдено студентів.");
        return {};
      }
  
      rows.forEach(row => {
        if (!grouped[row.group_name]) {
          grouped[row.group_name] = [];
        }
        if (row.name) {
          grouped[row.group_name].push({ name: row.name });
        }
      });
  
      return grouped;
    } catch (error) {
      console.error("Помилка при отриманні студентів:", error);
      throw error; 
    }
  }

async function getStudentByNameAndGroup(name, groupName) {
  const [rows] = await pool.query(`
    SELECT s.id, s.name_, g.group_name 
    FROM student s
    JOIN groups_ g ON s.group_id = g.id
    WHERE s.name_ = ? AND g.group_name = ?
  `, [name, groupName]);

  return rows[0]; // Повертаємо першого знайденого (або undefined)
}


async function updateStudentName(id, newName) {
  await pool.query(`
    UPDATE student
    SET name_ = ?
    WHERE id = ?
  `, [newName, id]);
}


async function deleteStudentById(id) {
  await pool.query(`
    DELETE FROM student
    WHERE id = ?
  `, [id]);
}

async function getGroupByName(groupName) {
  const [rows] = await pool.query(`
    SELECT * FROM groups_ WHERE group_name = ?
  `, [groupName]);
  return rows[0]; // або undefined, якщо не знайдена
}

async function addStudent(name, groupId) {
  await pool.query(`
    INSERT INTO student (name_, group_id)
    VALUES (?, ?)
  `, [name, groupId]);
}

async function addGroup(groupName) {
  await pool.query(`
    INSERT INTO groups_ (group_name) VALUES (?)
  `, [groupName]);
}


module.exports = {
  getAllStudentsGroupedByGroup,
  addStudent,
  getStudentByNameAndGroup,
  deleteStudentById,
  updateStudentName,
  getGroupByName,
  addStudent,
  addGroup
};
