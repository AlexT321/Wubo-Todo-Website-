const express = require('express');
const cors = require('cors');
const monk = require('monk');
const app = express();
const PORT = process.env.PORT || 5000;

const db = monk(process.env.MONGO_URI || 'localhost/Health-Website');
const info = db.get("Boards");

app.use(cors());
app.use(express.json());

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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});