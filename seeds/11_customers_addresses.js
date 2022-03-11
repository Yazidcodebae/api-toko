exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("customers_addresses")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("customers_addresses").insert([
        { id: 1, address_id: 1, customer_id: 1 },
        { id: 2, address_id: 2, customer_id: 1 },
        { id: 3, address_id: 3, customer_id: 1 },
      ]);
    });
};
