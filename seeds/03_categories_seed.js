exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("categories")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("categories").insert([
        { id: 1, name: "Handphone" },
        { id: 2, name: "Komputer" },
        { id: 3, name: "Gaming" },
        { id: 4, name: "Olahraga" },
        { id: 5, name: "Kamera" },
      ]);
    });
};
