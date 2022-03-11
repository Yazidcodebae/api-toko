exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("orders")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("orders").insert([
        {
          id: 1,
          address_id: 1,
          customer_id: 1,
          coupon_id: 1,
          total: 1000,
        },
      ]);
    });
};
