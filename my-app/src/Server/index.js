const express = require('express');
const cors = require('cors');
const monk = require('monk');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

const db = monk(process.env.MONGO_URI || 'localhost/Health-Website');
const info = db.get("Boards");
const info2 = db.get("Global_Board_Id");

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
    }
    info.insert(name).then((nameInfo) => {
        res.json(nameInfo);
    })
});

app.get("/Health-Website/:id", (req, res) => {
    const board_id = req.params.id;
    info.find({_id: board_id}).then((board_info) => {
        res.json(board_info);
    });
});

app.post("/Health-Website/Board_Id", (req, res) => {
    
})

app.get("Health-Website/Board_Id", (req, res) => {
    info2.find().then(board_id => {
        res.json(board_id);
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});