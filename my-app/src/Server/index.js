const express = require("express");
const cors = require("cors");
const cardRoutes = require("./routes/card");

const app = express();
const port = process.env.PORT || 5000;

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

// Use the card routes
app.use("/card", cardRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
