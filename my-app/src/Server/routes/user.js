const express = require("express");
const router = express.Router();
const monk = require("monk");

const db = monk(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Health-Website");
const users = db.get("Users");

router.post("/Health-Website/create_user", (req, res) => {
  const user = {
    email: req.body.email,
    user_id: req.body.user_id,
    boards: req.body.boards,
    boards_remaining: req.body.boards_remaining,
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
router.post("/Health-Website/reduce_remaining_boards", (req,res) => {
  const remaining = {
    user_id: req.body.user_id,
    boards_remaining: req.body.boards_remaining,
  };
  users.update(remaining.user_id, remaining.boards_remaining).then((information) => {
    res.json(information);
  });
});
router.post("/Health-Website/increase_remaining_boards", (req, res) => {
  const remaining = {
    user_id: req.body.user_id,
    boards_remaining: req.body.boards_remaining,
  };
  users.update(remaining.user_id, remaining.boards_remaining).then((information) => {
    res.json(information);
  });
})

module.exports = router
//check if the database is connected
db.then(() => {
  console.log("Connected correctly to server");
  }).catch((err) => {
    console.log(err);
    });
