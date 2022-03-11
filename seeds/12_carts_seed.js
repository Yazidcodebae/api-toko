exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("carts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("carts").insert([
        { id: 1, customer_id: 1, product_id: 1, quantity: 1 },
        { id: 2, customer_id: 1, product_id: 2, quantity: 1 },
        { id: 3, customer_id: 1, product_id: 3, quantity: 1 },
      ]);
    });
};
