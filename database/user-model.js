const db = require('./dbConfig.js')

function insert(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => id)
}

function findByUsername(username) {
    return db('users')
        .where({username}).first();
}

function find() {
    return db('users');
}

module.exports = {
    insert,
    findByUsername,
    find
};