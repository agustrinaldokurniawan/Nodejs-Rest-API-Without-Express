const http = require("http");

const productRoute = require("../src/product/product.route");
const userRoute = require("../src/user/user.route");

const server = http.createServer((req, res) => {
  if (req.url.match(/^\/products/)) return productRoute(req, res);

  if (req.url.match(/^\/users/)) return userRoute(req, res);

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route Not Found" }));
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
