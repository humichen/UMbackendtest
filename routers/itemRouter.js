const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const Item = require("../models/itemModel.js");

const itemRouter = express.Router();

//物品原始資料
itemRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Item.deleteMany({});
    const createdItems = await Item.insertMany(data.items);
    res.send({ createdItems });
  })
);

//所有物品資料
itemRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const items = await Item.find({});
    res.send(items);
  })
);

// //所有鑰匙資料
// itemRouter.get(
//   "/keys",
//   expressAsyncHandler(async (req, res) => {
//     const keyItems = await Item.find({type:"key"});
//     res.send(keyItems);
//   })
// );

// //所有器材資料
// itemRouter.get(
//   "/equipments",
//   expressAsyncHandler(async (req, res) => {
//     const equipmentItems = await Item.find({type:"equipment"});
//     res.send(equipmentItems);
//   })
// );

//依物品名稱找資料
itemRouter.put(
  "/findItem",
  expressAsyncHandler(async (req, res) => {
    const { name } = req.body;
    const item = await Item.findOne({name});
    if (item) {
      res.send(item);
    } else {
      res.status(404).send({ message: "Item Not Found" });
    }
  })
);

//新增物品可租借時間
itemRouter.put(
  "/:id/addAlreadyBorrowDate",
  expressAsyncHandler(async (req, res) => {
    const { alreadyBorrowDate } = req.body;
    const item = await Item.findById(req.params.id);
    if (item) {
      const itemDateChange = await Item.update({ _id: req.params.id }, { $push: { alreadyBorrowDate } });
      res.send(itemDateChange);
    } else {
      res.status(404).send({ message: "Item Not Found" });
    }
  })
);

//刪除物品可租借時間
itemRouter.put(
  "/:id/removeAlreadyBorrowDate",
  expressAsyncHandler(async (req, res) => {
    const { alreadyBorrowDate } = req.body;
    const item = await Item.findById(req.params.id);
    if (item) {
      const itemDateChange = await Item.update({ _id: req.params.id }, { $pull: { alreadyBorrowDate } });
      res.send(itemDateChange);
    } else {
      res.status(404).send({ message: "Item Not Found" });
    }
  })
);

//修改物品資料
itemRouter.put(
  "/:id/edit",
  expressAsyncHandler(async (req, res) => {
    const { name, rules, cantBorrowDate } = req.body;
    const item = await Item.findById(req.params.id);
    if (item) {
      const itemChange = await Item.update({ _id: req.params.id }, { $set: { name, rules, cantBorrowDate } });
      res.send(itemChange);
    } else {
      res.status(404).send({ message: "Item Not Found" });
    }
  })
);

//新增物品
itemRouter.post(
  "/add",
  expressAsyncHandler(async (req, res) => {
    const { type, name, rules, cantBorrowDate, alreadyBorrowDate } = req.body;
    const itemCreate = await Item.create({ type, name, rules, cantBorrowDate, alreadyBorrowDate });
    res.send(itemCreate);
  })
);

module.exports = itemRouter;
