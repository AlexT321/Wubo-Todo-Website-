const express = require("express");
const router = express.Router();
const monk = require("monk");

const db = monk(process.env.MONGO_URI || "localhost/Health-Website");
const users = db.get("Users");

router.post("/Health-Website/get_multiple_boards", (req, res) => {
  const user = {
    user_id: req.body.user_id,
   
  }
  users.find(user.user_id).then((informations) => {
    res.json(informations);
  });
});

router.post("/Health-Website/create_board", (req, res) => {
  const board = {
    id: req.body.id,
    board_info: req.body.board_info
  };
  users.update(board.id, board.board_info).then((nameInfo) => {
    res.json(nameInfo);
  });
});

router.post("/Health-Website/update_all_choosen_state", (req, res) => {
  const choosen = {
    id: req.body.id,
    choosen: req.body.choosen,
  };
  users
    .update(choosen.id, choosen.choosen, { multi: true })
    .then((information) => {
      res.json(information);
    });
});

router.post("/Health-Website/update_choosen_state", (req, res) => {
  const choosen = {
    id: req.body.id,
    choosen: req.body.choosen,
  };
  users.update(choosen.id, choosen.choosen).then((infomation) => {
    res.json(infomation);
  });
});

router.post("/Health-Website/update_board_name", (req, res) => {
  const name = {
    id: req.body.id,
    name: req.body.name,
  };
  users.update(name.id, name.name).then((information) => {
    res.json(information);
  });
});

router.get("/Health-Website/Single_Board", (req, res) => {
  users.find({ choosen: true }).then((informations) => {
    res.json(informations);
  });
});

router.post("/Health-Website/update_favorite_state", (req, res) => {
  const favorite = {
    id: req.body.id,
    favorite: req.body.favorite,
  };
  users.update(favorite.id, favorite.favorite).then((information) => {
    res.json(information);
  });
});

router.post("/Health-Website/remove_board", (req, res) => {
  const board = {
    id: req.body.id,
    board: req.body.board,
  };
  users.update(board.id, board.board).then((information) => {
    res.json(information);
  });
});
module.exports = router;