const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const MONGODB_ATLAS_URL = "mongodb+srv://admin:ntuedtd@cluster0.j51e3.mongodb.net/borrowweb?retryWrites=true&w=majority";
const itemRouter = require("./routers/itemRouter");
const userRouter = require("./routers/userRouter");
const reservedRouter = require("./routers/reservedRouter");
require("dotenv").config();

mongoose.connect(MONGODB_ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/items", itemRouter);
app.use("/api/users", userRouter);
app.use("/api/reserved", reservedRouter);

app.get("/", (req, res) => {
  res.send(process.env.PORT);
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
