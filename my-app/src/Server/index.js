const express = require("express");
const cors = require("cors");
const monk = require("monk");
const app = express();
const PORT = process.env.PORT || 5000;

const db = monk(process.env.MONGO_URI || "localhost/Health-Website");
const info = db.get("Boards");
const users = db.get("Users");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/Health-Website/create_user", (req, res) => {
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

app.post("/Health-Website/get_user", (req, res) => {
  const user = {
    user_id: req.body.user_id,
  };
  users.find(user.user_id).then((information) => {
    res.json(information);
  });
});

app.get("/Health-Website", (req, res) => {
  info.find().then((information) => {
    res.json(information);
  });
});


app.post("/Health-Website/get_multiple_boards", (req, res) => {
  const user = {
    user_id: req.body.user_id,
   
  }
  users.find(user.user_id).then((informations) => {
    res.json(informations);
  });
});

app.post("/Health-Website/update", (req, res) => {
  const information = {
    id: req.body.id,
    name: req.body.name,
  };
  users.update(information.id, information.update);
});

app.post("/Health-Website/create_board", (req, res) => {
  const board = {
    id: req.body.id,
    board_info: req.body.board_info
  };
  // name: req.body.name,
  // choosen: req.body.choosen,
  // favorite: req.body.favorite,
  // board_lists: req.body.board_lists,
  // date: req.body.date,
  users.update(board.id, board.board_info).then((nameInfo) => {
    res.json(nameInfo);
  });
});

app.post("/Health-Website/update_all_choosen_state", (req, res) => {
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

app.post("/Health-Website/update_choosen_state", (req, res) => {
  const choosen = {
    id: req.body.id,
    choosen: req.body.choosen,
  };
  users.update(choosen.id, choosen.choosen).then((infomation) => {
    res.json(infomation);
  });
});

app.post("/Health-Website/update_board_name", (req, res) => {
  const name = {
    id: req.body.id,
    name: req.body.name,
  };
  users.update(name.id, name.name).then((information) => {
    res.json(information);
  });
});

app.get("/Health-Website/Single_Board", (req, res) => {
  users.find({ choosen: true }).then((informations) => {
    res.json(informations);
  });
});

app.get("/Health-Website/:id", (req, res) => {
  const board_id = req.params.id;
  users.find({ _id: board_id }).then((board_info) => {
    res.json(board_info);
  });
});

app.post("/Health-Website/update_favorite_state", (req, res) => {
  const favorite = {
    id: req.body.id,
    favorite: req.body.favorite,
  };
  users.update(favorite.id, favorite.favorite).then((information) => {
    res.json(information);
  });
});

app.post("/Health-Website/create_board_list", (req, res) => {
  const board_list = {
    id: req.body.id,
    board_lists: req.body.board_lists,
  };
  users.update(board_list.id, board_list.board_lists).then((information) => {
    res.json(information);
  });
});

app.post("/Health-Website/create_card", (req, res) => {
  const card = {
    list_id: req.body.list_id,
    cards: req.body.cards,
    filter: req.body.filter
  };
  users.update(card.list_id, card.cards, card.filter).then((information) => {
    res.json(information);
  });
});

app.post("/Health-Website/remove_card_from_list", (req, res) => {
  const card = {
    list_id: req.body.list_id,
    cards: req.body.cards,
    filter: req.body.filter,
  };
  users.update(card.list_id, card.cards, card.filter).then((information) => {
    res.json(information);
  });
});

app.post("/Health-Website/add_card_to_list_at_position", (req, res) => {
  const card = {
    list_id: req.body.list_id,
    cards: req.body.cards,
    filter: req.body.filter
  };
  users.update(card.list_id, card.cards, card.filter).then((information) => {
    res.json(information);
  });
});

app.post("/Health-Website/remove_list_from_board", (req, res) => {
  const lists = {
    list_id: req.body.list_id,
    lists: req.body.lists,
  };
  users.update(lists.list_id, lists.lists).then((information) => {
    res.json(information);
  });
});

app.post("/Health-Website/add_list_to_board_at_position", (req, res) => {
  const lists = {
    list_id: req.body.list_id,
    lists: req.body.lists,
  };
  users.update(lists.list_id, lists.lists).then((information) => {
    res.json(information);
  });
});

app.post("/Health-Website/remove_board", (req, res) => {
  const board = {
    id: req.body.id,
    board: req.body.board,
  };
  users.update(board.id, board.board).then((information) => {
    res.json(information);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
