const User = require("../user/user.model");

async function getUsers(req, res) {
  try {
    const users = await User.findAll().catch((err) => {
      throw new Error(err);
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.end(error.message);
  }
}

async function getUserByEmail(req, res, next) {
  try {
    const { params } = await req;

    const user = await User.findOne({ email: params.email }).catch((error) => {
      throw new Error("Email not found");
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error.message));
  }
}

module.exports = {
  getUsers,
  getUserByEmail,
};
