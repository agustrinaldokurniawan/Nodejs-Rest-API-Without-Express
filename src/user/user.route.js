const { getUsers, getUserByEmail } = require("./user.controller");

function userRoute(req, res) {
  switch (req.url) {
    case "/users":
      if (req.method === "GET") {
        return getUsers(req, res);
      }
      break;
    case req.url.match(/^\/users\/([a-zA-Z0-9]+)/).input:
      if (req.method === "GET") {
        req.params = {
          email: req.url.split("/").pop(),
        };
        return getUserByEmail(req, res);
      }
      break;

    default:
      res.end("This route not defined on user route");
  }
}

module.exports = userRoute;
