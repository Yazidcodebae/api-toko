const { hashPassword } = require("../utils");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          email: "danil.rafiqi@gmail.com",
          password: hashPassword("12345678"),
        },
        {
          id: 2,
          email: "mdanilrafiqi@gmail.com",
          password: hashPassword("12345678"),
        },
        {
          id: 3,
          email: "muhamaddanilrafiqi@gmail.com",
          password: hashPassword("12345678"),
        },
      ]);
    });
};
