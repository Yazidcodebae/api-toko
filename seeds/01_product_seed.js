var faker = require("faker");
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("products").insert(
        [...Array(20).keys()].map((v) => {
          return {
            id: v + 1,
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            stock: 10,
            image: `public/assets/product/${v + 1}.jpg`,
          };
        })
      );
    });
};
