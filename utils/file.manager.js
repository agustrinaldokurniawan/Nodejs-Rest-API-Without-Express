const fs = require("fs");

function writeDataToFile(filename, content) {
  return new Promise(function (resolve, reject) {
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
      if (err) return reject(err);
      return resolve("writted on file");
    });
  });
}

module.exports = { writeDataToFile };
