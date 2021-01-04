const express = require('express');
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const Reserved = require('../models/reservedModel');

const reservedRouter = express.Router();

reservedRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Reserved.deleteMany({});
    const createdReserved = await Reserved.insertMany(data.reserved);
    res.send({ createdReserved });
  })
);

//所有預約紀錄
reservedRouter.post(
  "/overview",
  expressAsyncHandler(async (req, res) => {
    const {reservedDate} = req.body;
    const overviewReserved = await Reserved.find({reservedDate, "reservedState":"已預約"});
    const overviewReserved2 = await Reserved.find({reservedDate, "reservedState":"已借出"});
    const overviewReserved3 = await Reserved.find({reservedDate: {$ne : reservedDate}, "reservedState":"已預約"}).sort({_id:-1}).limit(2);
    for (var i = 0; i< overviewReserved2.length; i++)
    {
      overviewReserved.push(overviewReserved2[i]);
    }
    for (var i = 0; i< overviewReserved3.length; i++)
    {
      overviewReserved.push(overviewReserved3[i]);
    }
    res.send(overviewReserved);
  })
);

//新增預約紀錄
reservedRouter.post(
  "/add",
  expressAsyncHandler(async (req, res) => {
    const {name, image, stuName, stuNumber , stuPhone, stuEmail, reservedDate, reservedReason, getTime} = req.body;
    const reservedCreate = await Reserved.create({name, image, stuName, stuNumber , stuPhone, stuEmail, reservedDate, reservedReason, getTime});
    res.send(reservedCreate);
  })
);

//刪除預約紀錄
reservedRouter.post(
  "/remove",
  expressAsyncHandler(async (req, res) => {
    const {_id} = req.body;
    const reservedRemove = await Reserved.remove({_id});
    res.send(reservedRemove);
  })
);

//使用者預約紀錄
reservedRouter.post(
  "/user",
  expressAsyncHandler(async (req, res) => {
    const {number} = req.body;
    const reserveds = await Reserved.find({"stuNumber": number, "reservedState":"已預約"});
    const reserveds2 = await Reserved.find({"stuNumber": number, "reservedState":"已借出"});
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();
    var reserved = [];
    var reserved2 = [];

    for (var i = 0; i< reserveds.length; i++)
    {
      const dateArr = reserveds[i].reservedDate.split("-");
      if(parseInt(dateArr[0]) == currentYear && parseInt(dateArr[1]) == currentMonth + 1 && parseInt(dateArr[2]) >= currentDate)
      {
        const value = {"_id": reserveds[i]._id , "day": parseInt(dateArr[2])}
        reserved.push(value);
      }
    }

    for (var i = 0; i< reserveds2.length; i++)
    {
      const dateArr = reserveds2[i].reservedDate.split("-");
      if(parseInt(dateArr[0]) == currentYear && parseInt(dateArr[1]) == currentMonth + 1 && parseInt(dateArr[2]) >= currentDate)
      {
        const value = {"_id": reserveds2[i]._id , "day": parseInt(dateArr[2])}
        reserved2.push(value);
      }
    }

    const reservedSort = reserved.sort(function (a, b) {
      return a.day > b.day ? 1 : -1;
    });

    const reservedSort2 = reserved2.sort(function (a, b) {
      return a.day > b.day ? 1 : -1;
    });

    var userReserved = [];
    for (var i = 0; i< reservedSort.length; i++)
    {
      const value = await Reserved.findOne({"_id":reservedSort[i]._id});
      userReserved.push(value);
    }

    var userReserved2 = [];
    for (var i = 0; i< reservedSort2.length; i++)
    {
      const value = await Reserved.findOne({"_id":reservedSort2[i]._id});
      userReserved2.push(value);
    }

    for (var i = 0; i< userReserved2.length; i++)
    {
      userReserved.push(userReserved2[i]);
    }

    res.send(userReserved);
  })
);

//使用者預約紀錄
// reservedRouter.post(
//   "/user/:id",
//   expressAsyncHandler(async (req, res) => {
//     const {number} = req.body;
//     const userReserved = await Reserved.findOne({"stuNumber":number , "_id":req.params.id });
//     res.send(userReserved);
//   })
// );

//預約歷史紀錄
reservedRouter.post(
  "/record",
  expressAsyncHandler(async (req, res) => {
    const {name} = req.body;
    const reserveds = await Reserved.find({name, "reservedState":"已歸還"});
    const today = new Date();
    const currentYear = today.getFullYear();
    var reserved = [];
    for (var i = 0; i< reserveds.length; i++)
    {
      const dateArr = reserveds[i].reservedDate.split("-");
      if(parseInt(dateArr[0]) == currentYear)
      {
        const value = {"_id": reserveds[i]._id , "day": parseInt(dateArr[2])}
        reserved.push(value);
      }
    }

    const reservedSort = reserved.sort(function (a, b) {
      return a.day > b.day ? 1 : -1;
    });

    var recordReserved = [];
    for (var i = 0; i< reservedSort.length; i++)
    {
      const value = await Reserved.findOne({"_id":reservedSort[i]._id});
      recordReserved.push(value);
    }

    res.send(recordReserved);
  })
);

//今日預約紀錄
reservedRouter.post(
  "/today",
  expressAsyncHandler(async (req, res) => {
    const {reservedDate} = req.body;
    const todayReserved = await Reserved.find({reservedDate, "reservedState":"已預約"});
    const todayReserved2 = await Reserved.find({reservedDate, "reservedState":"已借出"});
    for (var i = 0; i< todayReserved2.length; i++)
    {
      todayReserved.push(todayReserved2[i]);
    }
    res.send(todayReserved);
  })
);

//最新預約紀錄
reservedRouter.get(
  "/new",
  expressAsyncHandler(async (req, res) => {
    const reserveds = await Reserved.find({"reservedState":"已預約"});
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();
    var reserved = [];
    for (var i = 0; i< reserveds.length; i++)
    {
      const dateArr = reserveds[i].reservedDate.split("-");
      if(parseInt(dateArr[0]) == currentYear && parseInt(dateArr[1]) == currentMonth + 1 && parseInt(dateArr[2]) >= currentDate)
      {
        const value = {"_id": reserveds[i]._id , "day": parseInt(dateArr[2])}
        reserved.push(value);
      }
    }

    const reservedSort = reserved.sort(function (a, b) {
      return a.day > b.day ? 1 : -1;
    });

    var newReserved = [];
    for (var i = 0; i< reservedSort.length; i++)
    {
      const value = await Reserved.findOne({"_id":reservedSort[i]._id});
      newReserved.push(value);
    }
    
    res.send(newReserved);
  })
);

//最新借出紀錄
reservedRouter.get(
  "/lended",
  expressAsyncHandler(async (req, res) => {
    const reserveds = await Reserved.find({"reservedState":"已借出"});
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();
    var reserved = [];
    for (var i = 0; i< reserveds.length; i++)
    {
      const dateArr = reserveds[i].reservedDate.split("-");
      if(parseInt(dateArr[0]) == currentYear && parseInt(dateArr[1]) == currentMonth + 1 && parseInt(dateArr[2]) >= currentDate)
      {
        const value = {"_id": reserveds[i]._id , "day": parseInt(dateArr[2])}
        reserved.push(value);
      }
    }

    const reservedSort = reserved.sort(function (a, b) {
      return a.day > b.day ? 1 : -1;
    });

    var lendedReserved = [];
    for (var i = 0; i< reservedSort.length; i++)
    {
      const value = await Reserved.findOne({"_id":reservedSort[i]._id});
      lendedReserved.push(value);
    }
    
    res.send(lendedReserved);
  })
);

//更新預約狀態
reservedRouter.put(
  "/:id/changeState",
  expressAsyncHandler(async (req, res) => {
    const {reservedState} = req.body;
    const reserved = await Reserved.findById(req.params.id);
    if (reserved) {
      if(reservedState == "已預約"){
        await Reserved.update({_id:req.params.id}, {$set: {reservedState: "已借出"}});
        res.send({reservedState: "已借出"});
      }else if(reservedState == "已借出"){
        await Reserved.update({_id:req.params.id}, {$set: {reservedState: "已歸還"}});
        res.send({reservedState: "已歸還"});
      }
    } else {
      res.status(404).send({ message: "reserved Not Found" });
    }
  })
);

module.exports = reservedRouter;