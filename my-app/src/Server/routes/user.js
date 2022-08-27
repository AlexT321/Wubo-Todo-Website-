const express = require("express");
const router = express.Router();
const monk = require("monk");

const db = monk(process.env.MONGO_URI || "localhost/Health-Website");
const users = db.get("Users");

router.post("/Health-Website/create_user", (req, res) => {
  const user = {
    email: req.body.email,
    user_id: req.body.user_id,
    boards: req.body.boards,
    date: req.body.date,
  };
  users.insert(user).then((information) => {
    res.json(information);
  });
});

router.post("/Health-Website/get_user", (req, res) => {
  const user = {
    user_id: req.body.user_id,
  };
  users.find(user.user_id).then((information) => {
    res.json(information);
  });
});

module.exports = router