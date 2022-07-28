const express = require('express');
const cors = require('cors');
const monk = require('monk');
const app = express();
const PORT = process.env.PORT || 5000;

const db = monk(process.env.MONGO_URI || 'localhost/Health-Website');
const info = db.get("Boards");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/Health-Website", (req, res) => {
    info.find().then(informations => {
        res.json(informations);
    })
})

app.post("/Health-Website/update", (req, res) => {
    const information = {
        id: req.body.id,
        name: req.body.name,
    }
    info.update(information.id, information.update)
})

app.post("/Health-Website", (req, res) => {
    const name = {
        name: req.body.name,
        choosen: req.body.choosen,
        favorite: req.body.favorite,
        board_lists: req.body.board_lists,
        date: req.body.date
    }
    info.insert(name).then((nameInfo) => {
        res.json(nameInfo);
    })
});

app.post("/Health-Website/update_all_choosen_state", (req, res) => {
    const choosen = {
        id: req.body.id,
        choosen: req.body.choosen,
    }
    info.update(choosen.id,choosen.choosen, {multi: true}).then((information) => {
        res.json(information);
    })
})

app.post("/Health-Website/update_choosen_state", (req, res) => {
    const choosen = {
        id: req.body.id,
        choosen: req.body.choosen,
    }
    info.update(choosen.id, choosen.choosen).then((infomation) => {
        res.json(infomation);
    })
})

app.post("/Health-Website/update_board_name", (req, res) => {
    const name = {
        id: req.body.id,
        name: req.body.name,
    }
    info.update(name.id, name.name).then((information) => {
        res.json(information);
    });
});

app.get("/Health-Website/Single_Board", (req, res) => {
    info.find({choosen : true}).then((informations) => {
        res.json(informations);
    })
})

app.get("/Health-Website/:id", (req, res) => {
    const board_id = req.params.id;
    info.find({_id: board_id}).then((board_info) => {
        res.json(board_info);
    });
});

app.post("/Health-Website/update_favorite_state", (req, res) => {
    const favorite = {
        id: req.body.id,
        favorite: req.body.favorite,
    }
    info.update(favorite.id, favorite.favorite).then((information) => {
        res.json(information);
    })
});

app.post("/Health-Website/create_board_list", (req, res) => {
    const board_list = {
        id: req.body.id,
        board_lists: req.body.board_lists,
    }
    info.update(board_list.id, board_list.board_lists).then((information) => {
        res.json(information);
    });
});

app.post("/Health-Website/create_card", (req, res) => {
    const card = {
        list_id: req.body.list_id,
        cards: req.body.cards,
    }
    info.update(card.list_id, card.cards).then((information) => {
        res.json(information);
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});