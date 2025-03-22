const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../data/users.json');

exports.getUsers = () => {
    const data = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(data);
};
