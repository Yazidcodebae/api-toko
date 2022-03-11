exports.up = function (knex) {
  return knex.schema.createTable("addresses", function (table) {
    table.increments("id");
    table.string("address").notNullable();
    table.string("description").notNullable();
    table.string("name").notNullable();
    table.string("phone").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("addresses");
};
