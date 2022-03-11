exports.up = function (knex) {
  return knex.schema.createTable("customers", function (table) {
    table.increments("id");
    table.string("name").notNullable();
    table.string("phone").notNullable();
    table.string("profilePicture").notNullable().defaultTo("default.jpg");
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("customers");
};
