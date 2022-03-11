exports.up = function (knex) {
  return knex.schema.createTable("products_categories", function (table) {
    table.increments("id");
    table.integer("product_id").notNullable();
    table.foreign("product_id").references("products.id");
    table.integer("category_id").notNullable();
    table.foreign("category_id").references("categories.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products_categories");
};
