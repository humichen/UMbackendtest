const express = require('express');
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const data = require("../data.js");
const User = require('../models/userModel');

const userRouter = express.Router();

//使用者原始資料
userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

//使用者登入
userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { number, password } = req.body;
    const user = await User.findOne({ number });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          number: user.number,
          identity: user.identity,
          reserved: user.reserved
        });
        return;
      }else{
        res.status(402).send({ message: "Invalid password" });
      }
    }else{
      res.status(401).send({ message: "Invalid number" });
    }
  })
);

//新增使用者預約紀錄
userRouter.put(
  "/addReserved",
  expressAsyncHandler(async (req, res) => {
    const { number, reservedName, reservedDate } = req.body;
    const user = await User.findOne({ number });
    if (user) {
      const reserved = await User.update({ number } ,{$push: { reserved: {reservedName, reservedDate}}});
      res.send(
        user
      );
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

//刪除使用者預約紀錄
userRouter.put(
  "/deleteReserved",
  expressAsyncHandler(async (req, res) => {
    const { number, reservedName, reservedDate } = req.body;
    const user = await User.findOne({ number });
    if (user) {
      const reserved = await User.update({ number } ,{$pull: { reserved: {reservedName, reservedDate}}});
      res.send(reserved);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

module.exports = userRouter;