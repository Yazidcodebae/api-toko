exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("stores_products")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("stores_products").insert([
        { id: 1, product_id: 1, store_id: 1 },
        { id: 2, product_id: 2, store_id: 1 },
        { id: 3, product_id: 3, store_id: 1 },
      ]);
    });
};
