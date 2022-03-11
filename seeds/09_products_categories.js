exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("products_categories")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("products_categories").insert([
        { id: 1, product_id: 1, category_id: 1 },
        { id: 2, product_id: 2, category_id: 1 },
        { id: 3, product_id: 3, category_id: 1 },
      ]);
    });
};
