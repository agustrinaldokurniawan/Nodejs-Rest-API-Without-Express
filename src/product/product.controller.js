const Product = require("./product.model");

async function getProducts(req, res) {
  try {
    const products = await Product.findAll().catch((err) => {
      throw new Error(err);
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (err) {
    res.end(err.message);
  }
}

async function getProductById(req, res) {
  try {
    const { params } = req;

    const product = await Product.findById(params.id).catch((err) => {
      throw new Error("Product not found");
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  } catch (error) {
    res.end(error.message);
  }
}

async function createProduct(req, res) {
  try {
    const { body } = await req;

    const newProduct = {
      Name: body.Name,
      Price: body.Price,
      Location: body.Location,
    };

    const createdProduct = await Product.create(newProduct).catch((error) => {
      throw new Error(error.message);
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(createdProduct));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error.message));
  }
}

async function updateProduct(req, res) {
  try {
    const { body } = await req;

    await Product.findById(body.id).catch((err) => {
      throw new Error("Product not found");
    });

    const updatedProduct = await Product.update(body).catch((error) => {
      throw new Error("Product update failed");
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedProduct));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error.message));
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
};
