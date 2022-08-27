const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const boardRouter = require("./routes/board");
app.use("/board", boardRouter);

const listRouter = require("./routes/list");
app.use("/list", listRouter);

const cardRouter = require("./routes/card");
app.use("/card", cardRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
