const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} = require("./product.controller");

function productRoute(req, res) {
  switch (req.url) {
    case "/products":
      if (req.method === "GET") {
        return getProducts(req, res);
      }
      if (req.method === "POST") {
        let body = "";
        req.on("data", function appendDataToBody(data) {
          body += data.toString();
        });

        req.on("end", async function endOfAppendBody() {
          req.body = await JSON.parse(body);
          return createProduct(req, res);
        });
      }
      if (req.method === "PUT") {
        let body = "";
        req.on("data", function appendDataToBody(data) {
          body += data;
        });

        req.on("end", function endOfAppendBody() {
          req.body = JSON.parse(body);
          return updateProduct(req, res);
        });
      }
      break;
    case req.url.match(/^\/products\/([a-zA-Z0-9]+)/).input:
      if (req.method === "GET") {
        req.params = {
          id: req.url.split("/").pop(),
        };
        return getProductById(req, res);
      }
      break;
    default:
      console.log(req.url);
      res.writeHead(404);
      res.end("Route Product Not Defined");
  }
}

module.exports = productRoute;
