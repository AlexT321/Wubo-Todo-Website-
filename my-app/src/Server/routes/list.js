const express = require("express");
const router = express.Router();
const monk = require("monk");

const db = monk(process.env.MONGO_URI || "localhost/Health-Website");
const users = db.get("Users");

router.post("/Health-Website/create_board_list", (req, res) => {
  const board_list = {
    id: req.body.id,
    board_lists: req.body.board_lists,
  };
  users.update(board_list.id, board_list.board_lists).then((information) => {
    res.json(information);
  });
});

router.post("/Health-Website/remove_list_from_board", (req, res) => {
  const lists = {
    list_id: req.body.list_id,
    lists: req.body.lists,
  };
  users.update(lists.list_id, lists.lists).then((information) => {
    res.json(information);
  });
});

router.post("/Health-Website/add_list_to_board_at_position", (req, res) => {
  const lists = {
    list_id: req.body.list_id,
    lists: req.body.lists,
  };
  users.update(lists.list_id, lists.lists).then((information) => {
    res.json(information);
  });
});


module.exports = router;