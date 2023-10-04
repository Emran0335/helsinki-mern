const usersRouter = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
