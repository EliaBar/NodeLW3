const fs = require('fs');

function authenticate(username, password) {
    const data = fs.readFileSync('./data/users.json', 'utf-8');
    const users = JSON.parse(data);

    return users.find(user => user.username === username && user.password === password);
}

module.exports = { authenticate };
