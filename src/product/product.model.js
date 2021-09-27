const products = require("../../data/products.json");

const { writeDataToFile } = require("../../utils/file.manager");

function findAll() {
  return new Promise(function (resolve, reject) {
    resolve(products);
  });
}

function findById(id) {
  return new Promise(async function (resolve, reject) {
    const idxData = await products.findIndex((e) => {
      return e.id === String(id);
    });

    if (idxData >= 0) {
      resolve(products[idxData]);
    }

    reject(null);
  });
}

function create(content) {
  return new Promise((resolve, reject) => {
    const newProduct = {
      id: String(products.length + 1),
      Name: content.Name || "",
      Price: content.Price || "",
      Location: content.Location || "",
    };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products).catch((err) => {
      reject(err);
    });

    resolve(newProduct);
  });
}

function update(content) {
  return new Promise((resolve, reject) => {
    const idxProduct = products.findIndex((e) => {
      return e.id === String(content.id);
    });

    if (idxProduct < 0) return reject("Product not found");

    if (content.Name) products[idxProduct].Name = content.Name;
    if (content.Location) products[idxProduct].Location = content.Location;
    if (content.Price) products[idxProduct].Price = content.Price;

    writeDataToFile("./data/products.json", products).catch((err) => {
      reject(err);
    });

    resolve(products[idxProduct]);
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
};
