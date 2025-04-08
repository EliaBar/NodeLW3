const fs = require('fs');
const path = require('path');
const studentsFile = path.join(__dirname, '../data/students.json');

function getStudentsSync() {
  const data = fs.readFileSync(studentsFile, 'utf-8');
  return JSON.parse(data);
}

function saveStudentsSync(data) {
  fs.writeFileSync(studentsFile, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  getStudentsSync,
  saveStudentsSync,
};
