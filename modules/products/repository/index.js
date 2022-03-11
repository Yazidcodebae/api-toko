const table = "products";
module.exports = (knex) => {
  //#region  CUSTOMER
  module.getAllProducts = ({ perPage, currentPage }) => {
    return knex.select().table(table).paginate({ perPage, currentPage });
  };
  module.getProductsById = (id) => {
    return knex.select().where("id", id).first().table(table);
  };
  //#endregion

  module.createProducts = (body) => {
    return knex.table(table).insert(body);
  };
  module.updateProducts = (id, body) => {
    return knex.table(table).where("id", id).update(body);
  };
  module.deleteProducts = (id, body) => {
    return knex.table(table).where("id", id).del();
  };
  return module;
};
