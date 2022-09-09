const express = require("express");
const router = express.Router();
const monk = require("monk");

const db = monk(process.env.MONGO_URI || "mongodb://localhost:27017/Health-Website");
const users = db.get("Users");

router.post("/Health-Website/create_card", (req, res) => {
  const card = {
    list_id: req.body.list_id,
    cards: req.body.cards,
    filter: req.body.filter
  };
  users.update(card.list_id, card.cards, card.filter).then((information) => {
    res.json(information);
  });
});

router.post("/Health-Website/remove_card_from_list", (req, res) => {
  const card = {
    list_id: req.body.list_id,
    cards: req.body.cards,
    filter: req.body.filter,
  };
  users.update(card.list_id, card.cards, card.filter).then((information) => {
    res.json(information);
  });
});

router.post("/Health-Website/add_card_to_list_at_position", (req, res) => {
  const card = {
    list_id: req.body.list_id,
    cards: req.body.cards,
    filter: req.body.filter
  };
  users.update(card.list_id, card.cards, card.filter).then((information) => {
    res.json(information);
  });
});



module.exports = router;