const express = require('express');
const cors = require('cors');
const monk = require('monk');
const app = express();
const PORT = process.env.PORT || 5000;

const db = monk(process.env.MONGO_URI || 'localhost/Health-Website');
const info = db.get("Health-Updates");

app.use(cors());
app.use(express.json());



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});