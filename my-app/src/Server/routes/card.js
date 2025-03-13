const express = require("express");
const router = express.Router();
const monk = require("monk");

const db = monk(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Health-Website");
const users = db.get("Users");

router.post("/Health-Website/create_card", (req, res) => {
  const card = {
    list_id: req.body.list_id,
    cards: req.body.cards,
    filter: req.body.filter
  };
  users.update(card.list_id, card.cards, card.filter)
    .then((information) => {
      res.json(information);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/Health-Website/remove_card_from_list", (req, res) => {
  const card = {
    list_id: req.body.list_id,
    cards: req.body.cards,
    filter: req.body.filter,
  };
  users.update(card.list_id, card.cards, card.filter)
    .then((information) => {
      res.json(information);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/Health-Website/add_card_to_list_at_position", (req, res) => {
  const card = {
    list_id: req.body.list_id,
    cards: req.body.cards,
    filter: req.body.filter
  };
  users.update(card.list_id, card.cards, card.filter)
    .then((information) => {
      res.json(information);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/Health-Website/update_label_visibility", (req, res) => {
  const card = {
    card_id: req.body.card_id,
    card: req.body.card,
    filter: req.body.filter,
  };
  users.update(card.card_id, card.card, card.filter)
    .then((information) => {
      res.json(information);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/Health-Website/update_label_color", (req, res) => {
  const card = {
    card_id: req.body.card_id,
    card: req.body.card,
    filter: req.body.filter,
  };
  users.update(card.card_id, card.card, card.filter)
    .then((information) => {
      res.json(information);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;