exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("coupons")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("coupons").insert([
        {
          id: 1,
          code: "AKHIRTAHUN",
          description: "lorem",
          percentage: 0,
          fixedDiscount: 10000,
          quantity: 10,
          active: true,
        },
        {
          id: 2,
          code: "AKHIRBULAN",
          description: "lorem",
          percentage: 10,
          fixedDiscount: 0,
          quantity: 10,
          active: true,
        },
        {
          id: 3,
          code: "RAMADHAN",
          description: "lorem",
          percentage: 0,
          fixedDiscount: 10000,
          quantity: 10,
          active: true,
        },
        {
          id: 4,
          code: "RAMADHAN2021",
          description: "lorem",
          percentage: 0,
          fixedDiscount: 10000,
          quantity: 10,
          active: true,
        },
        {
          id: 5,
          code: "MUDIK",
          description: "lorem",
          percentage: 0,
          fixedDiscount: 30000,
          quantity: 10,
          active: true,
        },
      ]);
    });
};
