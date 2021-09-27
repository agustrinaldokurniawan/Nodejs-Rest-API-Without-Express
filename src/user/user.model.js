const users = require("../../data/users.json");

function findAll() {
  return new Promise(function (resolve, reject) {
    resolve(users);
  });
}

function findOne(query) {
  return new Promise(function (resolve, reject) {
    const idxUser = users.findIndex((e) => {
      const key = Object.keys(query)[0];
      return e[key] === query[key];
    });

    if (idxUser >= 0) return resolve(users[idxUser]);
    return reject(null);
  });
}

module.exports = {
  findAll,
  findOne,
};
