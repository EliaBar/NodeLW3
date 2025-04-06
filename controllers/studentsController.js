const fs = require('fs');
const path = require('path');
const studentsFile = path.join(__dirname, '../data/students.json');

// 1. Синхронне зчитування файлу
function getStudentsSync() {
    const data = fs.readFileSync(studentsFile, 'utf-8');
    return JSON.parse(data);
}

// 2. Асинхронне зчитування з callback
function getStudentsWithCallback(callback) {
    fs.readFile(studentsFile, 'utf-8', (err, data) => {
        if (err) return callback(err);
        callback(null, JSON.parse(data));
    });
}

// 3. Асинхронне зчитування з Promise
function getStudentsWithPromise() {
    return new Promise((resolve, reject) => {
        fs.readFile(studentsFile, 'utf-8', (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data));
        });
    });
}

// 4. Асинхронне зчитування з async/await
async function getStudentsWithAsync() {
    const data = await fs.promises.readFile(studentsFile, 'utf-8');
    return JSON.parse(data);
}

exports.searchStudents = async (req, res) => {
    const { group } = req.body;
    let students = [];

    try {
        const allStudents = await getStudentsWithAsync();

        if (group.length >= 3 && group[2] === '-') {
            // Пошук студентів за групою
            students = allStudents[group] || [];
        } else {
            // Пошук за прізвищем серед усіх груп
            for (const groupName in allStudents) {
                allStudents[groupName].forEach(student => {
                    const lastName = student.name.split(' ')[0];
                    if (lastName.toLowerCase() === group.toLowerCase()) {
                        students.push({ name: student.name, group: groupName });
                    }
                });
            }
        }

        const isAdminRoute = req.originalUrl.includes('/admin');

        if (isAdminRoute) {
            res.render('admin', { students, selectedGroup: group });
        } else {
            res.render('student', { students, selectedGroup: group });
        }

    } catch (err) {
        const isAdminRoute = req.originalUrl.includes('/admin');

        if (isAdminRoute) {
            res.render('admin', { error: 'Помилка читання файлу', students: [], selectedGroup: group });
        } else {
            res.render('student', { error: 'Помилка читання файлу', students: [], selectedGroup: group });
        }
    }
};
