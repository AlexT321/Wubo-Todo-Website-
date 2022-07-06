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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});