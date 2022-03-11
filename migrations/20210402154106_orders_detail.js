exports.up = function (knex) {
  return knex.schema.createTable("orders_detail", function (table) {
    table.increments("id");
    table.integer("order_id").notNullable();
    table.foreign("order_id").references("orders.id");
    table.integer("quantity").notNullable();
    table.integer("product_id").notNullable();
    table.foreign("product_id").references("products.id");
    table.enum("status", [
      "waiting",
      "ordered",
      "packed",
      "sent",
      "completed",
      "canceled",
    ]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("orders_detail");
};
