const bcrypt = require('bcryptjs');

const data = {
  users: [
    {
      name: "郭昀甄",
      number: "110934002",
      password: bcrypt.hashSync("0000", 8),
      identity:"student"
    },
    {
      name: "史欣悅",
      number: "12345",
      password: bcrypt.hashSync("0000", 8),
      identity:"teacher"
    },
    {
      name: "車銀優",
      number: "111",
      password: bcrypt.hashSync("111", 8),
      identity:"teacher"
    },
    {
      name: "車永裴",
      number: "222",
      password: bcrypt.hashSync("222", 8),
      identity:"student"
    },
  ],
  items: [
    {
      type: "key",
      name: "E811教室",
      image: "./images/E811.jpg",
      cantBorrowDate: ["2021-1-2", "2021-1-3", "2021-1-9", "2021-1-10", "2021-1-16", "2021-1-17", "2021-1-23", "2021-1-24", "2021-1-30", "2021-1-31",
       "2021-2-6", "2021-2-7", "2021-2-13", "2021-2-14", "2021-2-20", "2021-2-21", "2021-2-27", "2021-2-28"],
    },
    {
      type: "key",
      name: "E812教室",
      image: "./images/E812.jpg",
      cantBorrowDate: ["2021-1-2", "2021-1-3", "2021-1-9", "2021-1-10", "2021-1-16", "2021-1-17", "2021-1-23", "2021-1-24", "2021-1-30", "2021-1-31",
      "2021-2-6", "2021-2-7", "2021-2-13", "2021-2-14", "2021-2-20", "2021-2-21", "2021-2-27", "2021-2-28"]
    },
    {
      type: "equipment",
      name: "延長線",
      image: "./images/extensionCord.jpg",
      cantBorrowDate: ["2021-1-2", "2021-1-3", "2021-1-9", "2021-1-10", "2021-1-16", "2021-1-17", "2021-1-23", "2021-1-24", "2021-1-30", "2021-1-31",
      "2021-2-6", "2021-2-7", "2021-2-13", "2021-2-14", "2021-2-20", "2021-2-21", "2021-2-27", "2021-2-28"],
    },
    {
      type: "equipment",
      name: "轉接頭",
      image: "./images/adapter.jpg",
      cantBorrowDate: ["2021-1-2", "2021-1-3", "2021-1-9", "2021-1-10", "2021-1-16", "2021-1-17", "2021-1-23", "2021-1-24", "2021-1-30", "2021-1-31",
      "2021-2-6", "2021-2-7", "2021-2-13", "2021-2-14", "2021-2-20", "2021-2-21", "2021-2-27", "2021-2-28"]
    },
  ],
};
module.exports = data;
