const { hashPassword } = require("../utils");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("customers")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("customers").insert([
        {
          id: 1,
          name: "M Danil Rafiqi",
          phone: "085788598869",
          profilePicture: "public/assets/profile/customers/default.png",
          user_id: 1,
        },
      ]);
    });
};
