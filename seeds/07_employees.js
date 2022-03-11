const { hashPassword } = require("../utils");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("stores")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("stores").insert([
        {
          id: 1,
          name: "danil.rafiqi@gmail.com",
          phone: "085788598869",
          profilePicture: "default.jpg",
          description: "ini deskripsi",
          user_id: 2,
        },
      ]);
    });
};
