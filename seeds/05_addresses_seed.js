exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("addresses")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("addresses").insert([
        {
          id: 1,
          address: "Bandar Sakti, Kec. Abung Surakarta, Kab. Lampung Utara",
          description: "rumah paling elit",
          name: "M Danil Rafiqi",
          phone: "08123456789",
        },
        {
          id: 2,
          address: "Rajabasa, Bandar Lampung",
          description: "rumah paling elit",
          name: "M Danil Rafiqi",
          phone: "08123456789",
        },
        {
          id: 3,
          address: "Mulyaasri, Tulang Bawang Barat",
          description: "rumah paling elit",
          name: "M Danil Rafiqi",
          phone: "08123456789",
        },
      ]);
    });
};
