exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("orders_detail")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("orders_detail").insert([
        { id: 1, order_id: 1, product_id: 1, status: "ordered", quantity: 1 },
        { id: 2, order_id: 1, product_id: 2, status: "ordered", quantity: 1 },
        { id: 3, order_id: 1, product_id: 3, status: "ordered", quantity: 1 },
      ]);
    });
};
