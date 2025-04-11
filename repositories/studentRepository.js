const fs = require('fs');
const path = require('path');
const studentsFile = path.join(__dirname, '../data/students.json');

// Синхронне зчитування
function getStudentsSync() {
  const data = fs.readFileSync(studentsFile, 'utf-8');
  return JSON.parse(data);
}

function saveStudentsSync(data) {
  fs.writeFileSync(studentsFile, JSON.stringify(data, null, 2), 'utf-8');
}

// Асинхронне зчитування з колбеком
function getStudents(callback) {
  fs.readFile(studentsFile, 'utf-8', (err, data) => {
    if (err) return callback(err, null);
    try {
      const json = JSON.parse(data);
      callback(null, json);
    } catch (parseErr) {
      callback(parseErr, null);
    }
  });
}

// Асинхронне зчитування з промісом
function getStudentsAsync() {
  return fs.promises.readFile(studentsFile, 'utf-8').then(data => JSON.parse(data));
}

function saveStudentsAsync(data) {
  return fs.promises.writeFile(studentsFile, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  getStudentsSync,
  saveStudentsSync,
  getStudents,
  getStudentsAsync,
  saveStudentsAsync,
};
