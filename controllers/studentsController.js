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

// Контролер для обробки форми
exports.searchStudents = async (req, res) => {
    const { group } = req.body;
    let students = [];

    try {
        // Використовуємо async/await
        const allStudents = await getStudentsWithAsync();
        students = allStudents.filter(student => student.group === group);
    } catch (err) {
        return res.render('admin', { error: 'Помилка читання файлу', students: null });
    }

    res.render('admin', { students });
};