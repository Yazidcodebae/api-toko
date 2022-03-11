const table = "users";
module.exports = (knex) => {
  module.getAllUsers = () => {
    return knex.column("id", "name", "email", "phone").select().table(table);
  };
  module.getUsersById = (id) => {
    return knex
      .column("id", "name", "email", "phone")
      .select()
      .where("id", id)
      .first()
      .table(table);
  };
  module.createUsers = (body) => {
    return knex.table(table).insert(body);
  };
  module.updateUsers = (id, body) => {
    return knex.table(table).where("id", id).update(body);
  };
  module.deleteUsers = (id, body) => {
    return knex.table(table).where("id", id).del();
  };
  return module;
};
